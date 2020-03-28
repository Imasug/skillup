import GapiScriptService from "@/infras/services/gapi/gapi-script-service";

const SCRIPT_ID: string =
  "1WpUQ1cvJkDvdJKNPnGKpRxKeK4jLUdbHgghHJoHuAaxPA50OBcwPo1fR";

export default class TestService {
  static getTestList(callback: (data: any) => void) {
    GapiScriptService.run(SCRIPT_ID, { function: "getTestList" }, callback);
  }

  static getTests(testName: string, callback: (data: any) => void) {
    GapiScriptService.run(
      SCRIPT_ID,
      { function: "getTests", parameters: [testName] },
      callback
    );
  }

  static submit(callback: () => void) {
    GapiScriptService.run(SCRIPT_ID, { function: "submit" }, callback);
  }
}
