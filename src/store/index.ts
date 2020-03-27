import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const MOCK_QUESTION = {
  sentence: `public class Issue02 {

    public static void main(String[] args) {
        Issue02 service = new Issue02();

        try{
            service.newException();
        }catch(IOException e ){
            e.printStackTrace();
        }
    }


    public void newException() {
        throw new IOException("例外発生！！");
    }
}`,
  question:
    "このコードをコンパイル、および実行するとどのような結果になりますか。",
  choices: [
    {
      value: "1",
      label: "コンパイルエラーが発生する"
    },
    {
      value: "2",
      label: "実行時にIOExceptionが発生する"
    },
    {
      value: "3",
      label: "実行時にIOExceptionが発生し、 例外発生！！ と表示される"
    },
    {
      value: "4",
      label: "コンパイル、および実行に成功する"
    }
  ],
  correct: "1"
};

const MOCK_QUESTIONS: any[] = [];

for (let i = 0; i < 10; i++) {
  MOCK_QUESTIONS.push(MOCK_QUESTION);
}

// TODO module divide
// TODO must decide naming policy
// TODO must get state through getters?
export default new Vuex.Store({
  state: {
    questionId: "",
    questionIndex: 0,
    questions: [],
    answers: [],
    auth: null,
    isCheckMode: false
  },
  mutations: {
    initTest(state, questionId) {
      if (state.questionId === questionId) {
        return;
      }
      // TODO backend access
      // TODO specify properly type
      // TODO recover answer
      state.questionId = questionId;
      state.questions = MOCK_QUESTIONS as never[];
      state.answers = new Array(state.questions.length) as never[];
    },
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
    saveAnswer(state, payload) {
      state.answers[payload.index] = payload.value as never;
      console.log(state.answers);
    },
    changeCheckMode(state, value) {
      state.isCheckMode = value;
    },
    clearAnswer(state) {
      state.answers = new Array(state.questions.length) as never[];
    },
    saveAuth(state, auth) {
      state.auth = auth;
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
