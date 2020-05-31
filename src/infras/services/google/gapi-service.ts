import load from "little-loader";
import { bindCallback } from "rxjs/index";
import { mergeMap, tap, map } from "rxjs/operators";
import { loading } from "@/plugins/vue-loading";

// TODO
const API_ID: string = "AIzaSyAAKWfKsy2vRVeGe6B5wZjtvFNNqMK5ssc";

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
    load("https://apis.google.com/js/api.js", () => {
      (loading as any).show();
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_ID,
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES.join(" ")
          })
          .then(async () => {
            let auth = gapi.auth2.getAuthInstance();
            if (!auth.isSignedIn) {
              await auth.signIn();
            }
            return processing();
          }).then((response: any) => {
            if (response && "result" in response) {
              callback(response.result);
            } else {
              callback(response);
            }
            (loading as any).hide();
          }, error => {
            // TODO to error page
            console.log(error);
          });
      });
    });
  }
}
