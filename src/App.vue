<script setup lang="ts">
import RecordsTable from "./entities/Records/RecordsTable.vue";
import AddRecordForm from "./features/AddRecordForm.vue";
import HelpMessage from "./shared/HelpMessage.vue";
import { NConfigProvider } from "naive-ui";
</script>

<template>
  <n-config-provider>
    <add-record-form />
    <help-message text='Для указания нескольких меток используйте разделитель ";"' />
    <records-table />
  </n-config-provider>
</template>

<style scoped></style>
