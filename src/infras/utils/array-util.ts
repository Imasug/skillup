import _ from "lodash";

export default class ArrayUtil {
  static objToArray(obj: {}): Array<any> {
    return _.reduce(
      obj,
      (result, value) => {
        result.push(value);
        return result;
      },
      []
    );
  }

  static arrayToObj(array: Array<any>, keys: Array<string>) {
    if (array.length !== keys.length) {
      throw new Error();
    }
    return _.reduce(
      array,
      (obj: any, value, i) => {
        obj[keys[i]] = value;
        return obj;
      },
      {}
    );
  }
}
