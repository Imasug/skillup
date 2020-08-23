<template>
  <div class="px-10">
    <v-data-table :headers="headers" :items="items" dense @click:row="navigateToTest">
      <template v-slot:item.icon="{ item }">
        <td style="height: 35px; border: none">
          <div class="d-flex justify-center align-center">
            <v-icon>{{ getIconName(item.name) }}</v-icon>
          </div>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DataTableHeader } from "vuetify";
import TestService from "../../domains/test/test-service";
import GapiService from "@/infras/services/google/gapi-service";

const HEADERS: DataTableHeader[] = [
  { text: "", value: "icon", width: "50px", sortable: false },
  { text: "Name", value: "name", width: "300px" },
  { text: "Description", value: "description" },
  { text: "Owner", value: "owner", width: "150px" },
  { text: "Updated", value: "updated", width: "150px" }
];

const JAVA_REGEX = new RegExp(".*java.*", "i");
const DATABASE_REGEX = new RegExp(".*db.*", "i");

@Component
export default class TestList extends Vue {
  headers: DataTableHeader[] = HEADERS;
  items: any[] = [];

  navigateToTest(data: any): void {
    this.$router.push({
      name: "test",
      params: { testName: data.name },
      query: { id: data.id }
    });
  }

  getIconName(name: string): string {
    let iconName = "";
    switch (true) {
      case JAVA_REGEX.test(name):
        iconName = "$java";
        break;
      case DATABASE_REGEX.test(name):
        iconName = "$database";
        break;
      default:
        break;
    }
    return iconName;
  }

  created() {
    TestService.getTestList(data => (this.items = data));
  }
}
</script>
