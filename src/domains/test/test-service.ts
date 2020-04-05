import GapiService from "@/infras/services/google/gapi-service";
import store from "@/store";
import _ from "lodash";
import moment from "moment";
import { from } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Question } from "@/@types/skillup";

const TEST_LIST_FOLDER_ID: string = "17MBwpcRnYwVO8Gca1ZgsVtm8YwJNAqyC";
const TEST_RESULT_FOLDER_ID: string = "16rnp_mER7VLTQNn1fnK6mwDZDtbhEsde";
const TEST_RESULT_TEMPLATE_FILE_ID: string =
  "1BIjBmTf4wCHxUSIx6HATwhfnYHlxrPu4KfjzqP9J4GU";

export default class TestService {
  static getTestList(callback: (data: any) => void) {
    GapiService.run(
      () => {
        // TODO if the update time of folder doesn't update, return
        return (gapi.client as any).drive.files.list({
          fields: "files(id, name, description, modifiedTime, owners)",
          q: `'${TEST_LIST_FOLDER_ID}' in parents`
        });
      },
      result => {
        // TODO typesafe
        let data: any[] = [];
        result.files.forEach((file: any) => {
          data.push({
            id: file.id,
            name: file.name,
            description: file.description,
            owner: file.owners[0].displayName,
            updated: file.modifiedTime
          });
        });
        callback(data);
      }
    );
  }

  static getTests(id: any, callback: (data: any) => void) {
    GapiService.run(
      () => {
        return (gapi.client as any).sheets.spreadsheets.values.get({
          spreadsheetId: id,
          range: "questions"
        });
      },
      result => {
        const values: Array<Array<string>> = result.values;
        const header = values.slice(0, 1)[0];
        const body = values.slice(1);
        const list = body.map(obj => {
          return obj.reduce((result: any, value, index) => {
            result[header[index]] = value;
            return result;
          }, {});
        });
        const items: any[] = [];
        list.forEach(obj => {
          const item: any = {};
          item.id = obj.id;
          item.category = obj.category;
          item.sentence = obj.sentence;
          item.question = obj.question;
          item.choices = [];
          for (let i = 1; i <= 4; i++) {
            item.choices.push({
              value: `${i}`,
              label: obj[`choice${i}`]
            });
          }
          item.correct = obj.correct;
          items.push(item);
        });
        callback(items);
      }
    );
  }

  static submit(callback: (result: any) => void) {
    // correctCount
    const total = store.getters.questionsLength;
    const corrects = _.map(store.state.questions, "correct");
    const answers = store.state.answers;
    let correctCount = 0;
    for (let i = 0; i < total; i++) {
      if (corrects[i] === answers[i]) {
        correctCount++;
      }
    }

    // result
    let result: Array<Array<any>> = [];
    const questions: Question[] = store.state.questions;
    _.each(questions, (q, i) => {
      const choices = q.choices;
      const answer = _.first(
        _.filter(choices, choice => {
          return choice.value === answers[i];
        })
      );
      const correct = _.first(
        _.filter(choices, choice => {
          return choice.value === q.correct;
        })
      );
      const isTrue = q.correct === answers[i];
      result.push([
        q.category,
        q.sentence,
        q.question,
        answer ? answer.label : "",
        correct!.label,
        isTrue
      ]);
    });

    const date = [[moment().format("YYYY/MM/DD")]];
    // TODO
    const name = [["テスト太郎"]];
    const testName = [[store.state.testName]];
    const score = [[`${correctCount} / ${total}`]];
    const rate = [[correctCount / total]];

    const category = _.reduce(
      _.groupBy(result, arr => arr[0]),
      (result: any, value, key) => {
        result.push([key, _.filter(value, v => v[5]).length / value.length]);
        return result;
      },
      []
    );

    GapiService.run(
      () => {
        return from(
          (gapi.client as any).drive.files.copy({
            fileId: TEST_RESULT_TEMPLATE_FILE_ID,
            resource: {
              parents: [TEST_RESULT_FOLDER_ID],
              name: `${date}_${name}_${testName}`
            }
          })
        ).pipe(
          mergeMap((response: any) => {
            return (gapi.client as any).sheets.spreadsheets.values.batchUpdate({
              spreadsheetId: response.result.id,
              resource: {
                valueInputOption: "RAW",
                data: [
                  {
                    range: "testName",
                    values: testName
                  },
                  {
                    range: "score",
                    values: score
                  },
                  {
                    range: "rate",
                    values: rate
                  },
                  {
                    range: "category",
                    values: category
                  },
                  {
                    range: "date",
                    values: date
                  },
                  {
                    range: "name",
                    values: name
                  },
                  {
                    range: "result",
                    values: result
                  }
                ]
              }
            });
          })
        );
      },
      result => {
        callback(result);
      }
    );
  }
}
