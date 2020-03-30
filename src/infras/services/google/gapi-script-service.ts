import load from "little-loader";
import { bindCallback } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { loading } from "@/plugins/vue-loading";

// TODO
const SCOPES = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/spreadsheets"
];

const params = {
  client_id: require("@/assets/json/client_secret.json").web.client_id,
  scope: SCOPES,
  immediate: true
};

export default class GapiScriptService {
  static run(
    scriptId: string,
    requestBody: {
      function: string;
      parameters?: any[];
    },
    callback: (data: any) => void
  ) {
    (loading as any).show();
    bindCallback(load)("https://apis.google.com/js/api.js")
      .pipe(
        mergeMap(() => bindCallback(gapi.load)("client:auth2")),
        mergeMap(() => bindCallback(gapi.client.load)("script", "v1")),
        mergeMap(() => bindCallback(gapi.auth.authorize)(params)),
        mergeMap(() =>
          (gapi.client as any).script.scripts.run({
            scriptId: scriptId,
            resource: {
              devMode: true,
              function: requestBody.function,
              parameters: requestBody.parameters
            }
          })
        ),
        map((response: any) => {
          const result = response.result;
          if (result.error) {
            // TODO
            alert("error");
          } else {
            const data = result.response.result;
            callback(data);
          }
          (loading as any).hide();
        })
      )
      .subscribe();
  }
}
