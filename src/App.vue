<script setup lang="ts">
import RecordsTable from "./features/RecordsTable.vue";
import AddRecordForm from "./features/AddRecordForm.vue";
import { NConfigProvider } from "naive-ui";
</script>

<template>
  <n-config-provider>
    <add-record-form />
    <records-table />
  </n-config-provider>
</template>

<style scoped></style>
