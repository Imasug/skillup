<template>
  <div>
    <div class="mx-2 mt-1">
      <v-breadcrumbs :items="items"></v-breadcrumbs>
    </div>
    <v-container fluid>
      <v-row class="mx-3">
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
            <v-radio color="green">
              <template v-slot:label>
                <v-label>
                  <span>
                    コンパイルエラーが発生する
                  </span>
                </v-label>
              </template>
            </v-radio>
            <v-radio color="green">
              <template v-slot:label>
                <v-label>
                  <span>
                    実行時にIOExceptionが発生する
                  </span>
                </v-label>
              </template>
            </v-radio>
            <v-radio color="green">
              <template v-slot:label>
                <v-label>
                  <span>
                    実行時にIOExceptionが発生し、 例外発生！！ と表示される
                  </span>
                </v-label>
              </template>
            </v-radio>
            <v-radio color="green">
              <template v-slot:label>
                <v-label>
                  <span>
                    コンパイル、および実行に成功する
                  </span>
                </v-label>
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Test extends Vue {
  items = [
    {
      text: "Test"
    },
    {
      text: "Java"
    }
  ];
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
