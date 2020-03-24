<template>
  <div class="px-10">
    <v-data-table :headers="headers" :items="items" dense @click:row="navigateToTest">
      <template v-slot:item.icon>
        <td style="height: 35px;">
          <div class="d-flex justify-center align-center">
            <img src="../../assets/java.svg" width="28px" />
          </div>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DataTableHeader } from "vuetify";

const HEADERS: DataTableHeader[] = [
  { text: "", value: "icon", sortable: false },
  { text: "Name", value: "name" },
  { text: "Contents", value: "contents" },
  { text: "Version", value: "version" },
  { text: "Created", value: "created" },
  { text: "Created By", value: "createdBy" }
];

@Component
export default class TestList extends Vue {
  headers: DataTableHeader[] = HEADERS;
  items: any[] = [
    {
      icon: "../../assets/java.png",
      name: "Java",
      version: "1.0.0",
      contents: "For java test.",
      created: "2020/03/21",
      createdBy: "skill up commity"
    }
  ];

  navigateToTest(): void {
    this.$router.push({ name: "test" });
  }
}
</script>