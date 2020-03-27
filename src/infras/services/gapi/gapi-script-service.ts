import { google } from "googleapis";
import store from "@/store";
import { from } from "rxjs";
import { tap } from "rxjs/operators";

const SCRIPT = google.script("v1");

export default class GapiScriptService {
  static run(
    scriptId: string,
    requestBody: {
      function: string;
      parameters?: any[];
    },
    callback: (data: any) => void
  ) {
    // TODO loading
    const auth = store.state.auth;
    if (!auth) {
      throw new Error();
    }
    from(
      SCRIPT.scripts.run({
        scriptId: scriptId,
        auth: auth,
        requestBody: {
          function: requestBody.function,
          parameters: requestBody.parameters
        }
      })
    ).subscribe(data => {
      const response = data.data.response;
      if (response) {
        callback(response.result);
      } else {
        // TODO error handling
        throw new Error();
      }
    });
  }
}
