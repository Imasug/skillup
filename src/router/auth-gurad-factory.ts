import { google } from "googleapis";
import store from "@/store";

// TODO
const SCOPES = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/spreadsheets"
];

export default class AuthGuardFactory {
  static create() {
    return this.local();
  }

  static local() {
    const web = require("@/assets/json/client_secret.json").web;
    const oauthClient = new google.auth.OAuth2({
      clientId: web.client_id,
      clientSecret: web.client_secret,
      redirectUri: web.redirect_uris[0]
    });
    const authUrl = oauthClient.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES
    });
    return async (to: any, from: any, next: any) => {
      if (store.state.auth) {
        next();
      }
      const code = to.query.code;
      if (code) {
        let { tokens } = await oauthClient.getToken(code);
        oauthClient.setCredentials(tokens);
        store.commit("saveAuth", oauthClient);
        next({ name: "home" });
      } else {
        window.location.href = authUrl;
      }
    };
  }
}
