<template>
  <v-dialog v-model="dialog" :max-width="options.width">
    <v-card>
      <v-card-title>Confirm</v-card-title>
      <v-card-text>
        <div class="text--primary">{{ message }}</div>
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
export default class ConfirmDialog extends Vue {
  dialog: boolean = false;
  message: string = "";
  resolve: any = null;
  reject: any = null;
  options: Options = {
    width: 290
  };

  open<T>(message: string, options?: Options): Promise<T> {
    this.dialog = true;
    this.message = message;
    this.options = Object.assign(this.options, options);
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

interface Options {
  width?: number;
}
</script>
