<template>
  <div>
    <TestStepper />
    <v-container fluid class="mt-2">
      <v-row class="mx-5">
        <v-col class="col">
          <pre class="code">
public class Issue02 {

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
}
        </pre
          >
        </v-col>
        <v-col class="col">
          <p>
            このコードをコンパイル、および実行するとどのような結果になりますか。
          </p>
          <v-radio-group>
            <v-radio color="#28a89c">
              <template v-slot:label>
                <v-label>
                  <span>
                    コンパイルエラーが発生する
                  </span>
                </v-label>
              </template>
            </v-radio>
            <v-radio color="#28a89c">
              <template v-slot:label>
                <v-label>
                  <span>
                    実行時にIOExceptionが発生する
                  </span>
                </v-label>
              </template>
            </v-radio>
            <v-radio color="#28a89c">
              <template v-slot:label>
                <v-label>
                  <span>
                    実行時にIOExceptionが発生し、 例外発生！！ と表示される
                  </span>
                </v-label>
              </template>
            </v-radio>
            <v-radio color="#28a89c">
              <template v-slot:label>
                <v-label>
                  <span>
                    コンパイル、および実行に成功する
                  </span>
                </v-label>
              </template>
            </v-radio>
          </v-radio-group>
          <v-row>
            <v-btn icon>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn icon style="margin-left:75px;" @click="submit">
              <v-icon>mdi-send</v-icon>
            </v-btn>
            <v-btn icon @click="reset">
              <v-icon>mdi-undo-variant</v-icon>
            </v-btn>
            <v-btn icon @click="navigateToResult">
              <v-icon>mdi-chart-donut</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <ConfirmDialog ref="confirm" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TestStepper from "@/views/test/components/TestStepper.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";

@Component({
  components: { TestStepper, ConfirmDialog }
})
export default class Test extends Vue {
  submit(): void {
    (this.$refs.confirm as any).open("提出しますか？").then((flag: boolean) => {
      if (flag) {
        alert("submit");
        this.$router.push({ name: "test-result" });
      }
    });
  }

  reset(): void {
    (this.$refs.confirm as any)
      .open("リセットしますか？")
      .then((flag: boolean) => {
        if (flag) {
          alert("reset");
        }
      });
  }

  navigateToResult(): void {
    this.$router.push({ name: "test-result" });
  }
}
</script>

<style scoped>
* {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.87);
}

.code {
  font-family: "Source Code Pro", monospace;
}

.col {
  max-width: 500px;
  min-width: 500px;
}
</style>
