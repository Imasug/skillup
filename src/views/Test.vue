<template>
  <v-container fluid>
    <v-row class="ma-2">
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
        </pre>
      </v-col>
      <v-col class="col">
        <p>
          このコードをコンパイル、および実行するとどのような結果になりますか。
        </p>
        <v-radio-group>
          <v-radio color="green" label="コンパイルエラーが発生する"></v-radio>
          <v-radio
            color="green"
            label="実行時にIOExceptionが発生する"
          ></v-radio>
          <v-radio
            color="green"
            label="実行時にIOExceptionが発生し、 例外発生！！ と表示される"
          ></v-radio>
          <v-radio
            color="green"
            label="コンパイル、および実行に成功する"
          ></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Test extends Vue {}
</script>

<style scoped>
.code {
  font-size: 16px;
  font-family: "Source Code Pro", monospace;
}

.col {
  min-width: 500px;
}
</style>
