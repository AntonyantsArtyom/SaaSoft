<script setup lang="ts">
import { NInput, NSelect, NDynamicTags, NFormItem, NForm } from "naive-ui";
import { storeToRefs } from "pinia";
import { useRecordsStore } from "./RecordsStore";
import { RecordDataTypes } from "./RecordsTypes";

const recordsStore = useRecordsStore();
const { records } = storeToRefs(recordsStore);

const typeOptions = [
  { label: "Local", value: RecordDataTypes.LOCAL },
  { label: "LDAP", value: RecordDataTypes.LDAP },
];
</script>

<template>
  <div class="records-table">
    <div v-for="(record, index) in records" :key="record.id" class="record-row">
      <n-form label-placement="top" class="record-form">
        <n-form-item :label="index === 0 ? 'Метки' : undefined">
          <n-dynamic-tags v-model:value="record.tags" />
        </n-form-item>
        <n-form-item :label="index === 0 ? 'Тип' : undefined">
          <n-select v-model:value="record.type" :options="typeOptions" placeholder="Выберите тип" />
        </n-form-item>
        <n-form-item :label="index === 0 ? 'Логин' : undefined">
          <n-input v-model:value="record.login" placeholder="Введите логин" />
        </n-form-item>
        <n-form-item :label="index === 0 ? 'Пароль' : undefined">
          <n-input v-model:value="record.password" type="password" placeholder="Введите пароль" />
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.records-table {
  display: flex;
  flex-direction: column;

  .record-row {
    padding: 0 32px;
  }

  .record-form {
    display: flex;
    flex-direction: row;
    gap: 16px;
    flex-wrap: wrap;

    & > .n-form-item {
      flex: 1 1 200px;

      ::v-deep(.n-form-item-feedback-wrapper) {
        min-height: unset;
        max-height: unset;
      }
    }
  }
}
</style>
