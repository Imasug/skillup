<template>
  <v-dialog v-model="dialog" :max-width="options.width">
    <v-card>
      <v-card-title class="grey lighten-2">{{ title }}</v-card-title>
      <v-card-text :style="{height: options.height + 'px'}">
        <div class="text--primary mt-3">
          <pre style="white-space: pre-wrap">{{ message }}</pre>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="var(--accent1)" text @click.native="agree">OK</v-btn>
        <v-btn color="gray" text @click.native="cancel">CANCEL</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Dialog extends Vue {
  title: string = "";
  dialog: boolean = false;
  message: string = "";
  resolve: any = null;
  reject: any = null;
  options: Options = {};

  confirm<T>(message: string, options?: Options): Promise<T> {
    return this.open("確認", message, options);
  }

  open<T>(title: string, message: string, options?: Options): Promise<T> {
    this.title = title;
    this.dialog = true;
    this.message = message;
    this.options = Object.assign(new Options(), options);
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  agree(): void {
    this.resolve(true);
    this.dialog = false;
  }

  cancel(): void {
    this.resolve(false);
    this.dialog = false;
  }
}

class Options {
  width?: number = 300;
  height?: number = 50;
}
</script>
