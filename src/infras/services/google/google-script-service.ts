export default class GoogleScriptService {
  static run(functionName: string, ...args: any[]) {
    return new Promise((resolve, reject) => {
      window.google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        [functionName](args);
    });
  }
}

declare global {
  interface Window {
    google: any;
  }
}
