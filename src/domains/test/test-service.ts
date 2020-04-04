import GapiService from "@/infras/services/google/gapi-service";

const TEST_LIST_FOLDER_ID: string = "17MBwpcRnYwVO8Gca1ZgsVtm8YwJNAqyC";

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

  static submit(callback: () => void) {
    alert("submit");
    callback();
  }
}
