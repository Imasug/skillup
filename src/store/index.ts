import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


const MOCK_QUESTION1 = {
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
      value: 1,
      label: "コンパイルエラーが発生する"
    },
    {
      value: 2,
      label: "実行時にIOExceptionが発生する"
    },
    {
      value: 3,
      label: "実行時にIOExceptionが発生し、 例外発生！！ と表示される"
    },
    {
      value: 4,
      label: "コンパイル、および実行に成功する"
    }
  ]
};

const MOCK_QUESTION2 = {
  sentence: `public class Test {

    public static void main(String[] args) {
      System.out.print("test");
    }
}`,
  question:
    "このコードをコンパイル、および実行するとどのような結果になりますか。",
  choices: [
    {
      value: 1,
      label: "コンパイルエラーが発生する"
    },
    {
      value: 2,
      label: "実行時にIOExceptionが発生する"
    },
    {
      value: 3,
      label: "実行時にIOExceptionが発生し、 例外発生！！ と表示される"
    },
    {
      value: 4,
      label: "コンパイル、および実行に成功する"
    }
  ]
};

const MOCK_QUESTIONS = [MOCK_QUESTION1, MOCK_QUESTION2];

// TODO module divide
export default new Vuex.Store({
  state: {
    questionIndex: 0,
    questions: [],
    answers: []
  },
  mutations: {
    initTest(state, id) {
      // TODO backend access
      // TODO specify properly type
      // TODO recover answer
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
    setAnswer(state, payload) {
      state.answers[payload.index] = payload.value as never;
      console.log(state.answers);
    }
  },
  getters: {
    getQuestionByIndex: (state) => (index: number) => {
      return state.questions[index];
    },
    questionsLength: (state) => {
      return state.questions.length;
    },
    getAnswerByIndex: (state) => (index: number) => {
      return state.answers[index];
    }
  },
  actions: {},
  modules: {}
});
