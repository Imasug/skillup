<template>
  <div>
    <div class="mx-10" style="min-width: 500px;">
      <v-stepper class="elevation-0">
        <v-stepper-header class="justify-start" style="height: auto;">
          <v-stepper-step
            class="pa-0"
            v-for="n of 20"
            :key="n"
            color="#28a89c"
            :step="n"
          ></v-stepper-step>
        </v-stepper-header>
      </v-stepper>
    </div>
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
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Test extends Vue {}
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