<script setup lang="ts">
import AddRecordForm from "./features/AddRecordForm.vue";
import HelpMessage from "./shared/HelpMessage.vue";
</script>

<template>
  <add-record-form />
  <help-message text='Для указания нескольких меток используйте разделитель ";"' />
</template>

<style scoped></style>
