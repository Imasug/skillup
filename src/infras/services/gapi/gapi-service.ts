import { google } from "googleapis"
import store from "@/store"

const SCRIPT = google.script("v1");

export default class GapiService {
    static run(scriptId: string, name: string, parameters?: any[]) {
        const auth = store.state.auth;
        if (!auth) {
            throw new Error();
        }
        return SCRIPT.scripts.run({
            scriptId: scriptId,
            auth: auth,
            requestBody: {
                function: name,
                parameters: parameters
            }
        });
    }
}