import load from "little-loader";
import { bindCallback } from "rxjs/index";
import { mergeMap, tap, map } from "rxjs/operators";
import { loading } from "@/plugins/vue-loading";

// TODO
const CLIENT_ID: string = require("@/assets/json/client_secret.json").web
  .client_id;

const DISCOVERY_DOCS: string[] = [
  "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  "https://sheets.googleapis.com/$discovery/rest?version=v4"
];

const SCOPES: string[] = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/spreadsheets"
];

export default class GapiService {
  static run(processing: () => any, callback: (result: any) => void) {
    (loading as any).show();
    const args = {
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES.join(" "),
      clientId: CLIENT_ID
    };
    bindCallback(load)("https://apis.google.com/js/api.js")
      .pipe(
        mergeMap(() => bindCallback(gapi.load)("client:auth2")),
        map(() => console.log("gapi.load")),
        mergeMap(() => gapi.client.init(args)),
        map(() => console.log("gapi.client.init")),
        mergeMap(processing)
      )
      .subscribe(
        (response: any) => {
          const result = response.result;
          callback(result);
          // TODO error handling
        },
        error => {
          console.log(error);
        },
        () => {
          (loading as any).hide();
        }
      );
  }
}
