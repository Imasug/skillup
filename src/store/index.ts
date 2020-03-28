import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// TODO module divide
// TODO must decide naming policy
// TODO must get state through getters?
export default new Vuex.Store({
  state: {
    testName: "",
    questionIndex: 0,
    questions: [],
    answers: [],
    auth: null,
    isCheckMode: false
  },
  mutations: {
    // testName
    saveTestName(state, testName) {
      state.testName = testName;
    },
    // questionIndex
    incrementQuestionIndex(state) {
      if (state.questionIndex < state.questions.length - 1) {
        state.questionIndex++;
      }
    },
    decrementQuestionIndex(state) {
      if (state.questionIndex > 0) {
        state.questionIndex--;
      }
    },
    changeQuestionIndex(state, index) {
      state.questionIndex = index;
    },
    // questions
    saveQuestions(state, questions) {
      state.questions = questions;
    },
    // answers
    saveAnswers(state, answers) {
      state.answers = answers;
    },
    saveAnswer(state, payload) {
      state.answers[payload.index] = payload.value as never;
    },
    clearAnswers(state) {
      state.answers = new Array(state.questions.length) as never[];
    },
    // auth
    saveAuth(state, auth) {
      state.auth = auth;
    },
    // checkMode
    changeCheckMode(state, value) {
      state.isCheckMode = value;
    }
  },
  getters: {
    getQuestionByIndex: state => (index: number) => {
      return state.questions[index];
    },
    getAnswerByIndex: state => (index: number) => {
      return state.answers[index];
    },
    questionsLength: state => {
      return state.questions.length;
    },
    isCheckMode: state => {
      return state.isCheckMode;
    }
  },
  actions: {},
  modules: {}
});
