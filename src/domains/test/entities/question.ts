import Choice from "./choice";
import _ from "lodash";

export default class Question {
  id?: string;
  category?: string;
  sentence?: string;
  question?: string;
  choices?: Choice[];
  correct?: string;
  constructor() {}

  getCorrectLabel() {
    return this.getLabel(this.correct);
  }

  getLabel(value: string | undefined) {
    const choice = _.first(
      _.filter(this.choices, choice => choice.value === value)
    );
    return choice ? choice.label : "";
  }
}
