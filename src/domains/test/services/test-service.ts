import GapiService from "@/infras/services/google/gapi-service";
import store from "@/store";
import _ from "lodash";
import moment from "moment";
import { from } from "rxjs";
import { mergeMap } from "rxjs/operators";
import Test from "../entities/test";
import Question from "../entities/question";
import TestResult from "../entities/test-result";
import ArrayUtil from "@/infras/utils/array-util";

const TEST_LIST_FOLDER_ID: string = "17MBwpcRnYwVO8Gca1ZgsVtm8YwJNAqyC";
const TEST_RESULT_FOLDER_ID: string = "16rnp_mER7VLTQNn1fnK6mwDZDtbhEsde";
const TEST_RESULT_TEMPLATE_FILE_ID: string =
  "1BIjBmTf4wCHxUSIx6HATwhfnYHlxrPu4KfjzqP9J4GU";

export default class TestService {
  static getTests(callback: (tests: Test[]) => void) {
    GapiService.run(
      () => {
        return gapi.client.drive.files.list({
          fields: "files(id, name, description, modifiedTime, owners)",
          q: `'${TEST_LIST_FOLDER_ID}' in parents`
        });
      },
      result => {
        let tests: Test[] = [];
        result.files.forEach((file: any) => {
          tests.push({
            id: file.id,
            name: file.name,
            description: file.description,
            owner: file.owners[0].displayName,
            updated: file.modifiedTime
          });
        });
        callback(tests);
      }
    );
  }

  static getQuestions(id: string, callback: (questions: Question[]) => void) {
    GapiService.run(
      () => {
        return gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: id,
          range: "questions"
        });
      },
      result => {
        const values: Array<Array<string>> = result.values;
        const header = values.slice(0, 1)[0];
        const body = values.slice(1);
        const list = _.map(body, row => ArrayUtil.arrayToObj(row, header));
        let questions: Question[] = [];
        list.forEach(obj => {
          let question: Question = new Question();
          question.id = obj.id;
          question.category = obj.category;
          question.sentence = obj.sentence;
          question.question = obj.question;
          question.choices = [];
          for (let i = 1; i <= 4; i++) {
            question.choices.push({
              value: `${i}`,
              label: obj[`choice${i}`]
            });
          }
          question.correct = obj.correct;
          questions.push(question);
        });
        callback(questions);
      }
    );
  }

  static submit(callback: (result: any) => void) {
    // correctCounts
    const total = store.getters.questionsLength;
    const corrects = _.map(store.state.questions, "correct");
    const answers = store.state.answers;
    let correctCounts = 0;
    for (let i = 0; i < total; i++) {
      if (corrects[i] === answers[i]) {
        correctCounts++;
      }
    }

    // result
    let testResults: Array<TestResult> = [];
    const questions: Question[] = store.state.questions;
    _.each(questions, (q, i) => {
      const answer = answers[i];
      const answerLabel = q.getLabel(answer);
      const correctLabel = q.getCorrectLabel();
      const isCorrect = q.correct === answer;
      testResults.push({
        category: q.category!,
        sentence: q.sentence!,
        question: q.question!,
        answerLabel: answerLabel,
        correctLabel: correctLabel,
        isCorrect: isCorrect
      });
    });
    const result = _.map(testResults, ArrayUtil.objToArray);

    const date = [[moment().format("YYYY/MM/DD")]];
    // TODO
    const name = [["テスト太郎"]];
    const testName = [[store.state.testName]];
    const score = [[`${correctCounts} / ${total}`]];
    const rate = [[correctCounts / total]];

    const category = _.reduce(
      _.groupBy(testResults, testResult => testResult.category),
      (array: Array<Array<any>>, results, category) => {
        array.push([
          category,
          _.filter(results, result => result.isCorrect).length / results.length
        ]);
        return array;
      },
      []
    );

    GapiService.run(() => {
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
          return gapi.client.sheets.spreadsheets.values.batchUpdate({
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
    }, callback);
  }
}
