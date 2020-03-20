<template>
  <v-container fluid class="py-0">
    <v-row class="mx-5">
      <v-data-table :headers="headers" :items="items" dense>
        <template v-slot:item.icon>
          <img src="../../assets/java.svg" width="32px" />
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DataTableHeader } from "vuetify";

const HEADERS: DataTableHeader[] = [
  { text: "", value: "icon", align: "center", sortable: false, width: "75px" },
  { text: "Name", value: "name", width: "200px" },
  { text: "Contents", value: "contents", width: "400px" },
  { text: "Version", value: "version", align: "center", width: "200px" },
  { text: "Created", value: "created", align: "center", width: "200px" },
  { text: "Created By", value: "createdBy", width: "200px" }
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
}
</script>

<style scoped>
* {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.87);
}
</style>
