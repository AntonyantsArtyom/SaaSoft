<script setup lang="ts">
import { ref, watch } from "vue";
import { NInput, NSelect, NDynamicTags, NFormItem, NForm, NButton, NIcon } from "naive-ui";
import { TrashOutline } from "@vicons/ionicons5";
import { storeToRefs } from "pinia";
import { useRecordsStore } from "./RecordsStore";
import { RecordDataTypes } from "./RecordsTypes";
import { useAppStateStore } from "../../shared/AppStateStore";

const RecordDataTypesEnum = RecordDataTypes;

const AppStateStore = useAppStateStore();
const { isAddingNewRecord } = storeToRefs(AppStateStore);

const recordsStore = useRecordsStore();
const { records } = storeToRefs(recordsStore);

const typeOptions = [
  { label: "Локальная", value: RecordDataTypes.LOCAL },
  { label: "LDAP", value: RecordDataTypes.LDAP },
];

const newRecord = ref({
  tags: [] as string[],
  type: null as RecordDataTypes | null,
  login: "",
  password: "",
});

const newRecordTouched = ref({
  type: false,
  login: false,
  password: false,
});

const getValidationStatus = (value: unknown, touched: boolean) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return touched ? "error" : "warning";
  }
  return undefined;
};

watch(isAddingNewRecord, (isAdding) => {
  if (!isAdding) {
    newRecord.value = {
      tags: [],
      type: null,
      login: "",
      password: "",
    };
    newRecordTouched.value = {
      type: false,
      login: false,
      password: false,
    };
  }
});

watch(
  [() => ({ ...newRecord.value }), () => ({ ...newRecordTouched.value })],
  ([recordDraft, touched]) => {
    const isLocal = recordDraft.type === RecordDataTypes.LOCAL;
    const isComplete = recordDraft.type !== null && recordDraft.login.trim().length > 0 && (!isLocal || recordDraft.password.trim().length > 0);

    const allTouched = touched.type && touched.login && (!isLocal || touched.password);

    if (isComplete && allTouched) {
      recordsStore.addRecord({
        id: new Date().toString(),
        tags: recordDraft.tags,
        type: recordDraft.type!,
        login: recordDraft.login.trim(),
        password: recordDraft.password.trim(),
      });

      newRecord.value = {
        tags: [],
        type: null,
        login: "",
        password: "",
      };

      newRecordTouched.value = {
        type: false,
        login: false,
        password: false,
      };

      AppStateStore.isAddingNewRecord = false;
    }
  },
  { deep: true }
);
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
        <div class="keyboard_inputs">
          <n-form-item :label="index === 0 ? 'Логин' : undefined">
            <n-input v-model:value="record.login" placeholder="Введите логин" />
          </n-form-item>

          <n-form-item v-if="record.type === RecordDataTypesEnum.LOCAL" :label="index === 0 ? 'Пароль' : undefined">
            <n-input v-model:value="record.password" type="password" placeholder="Введите пароль" />
          </n-form-item>
        </div>
        <n-form-item>
          <n-button class="delete-button" quaternary type="error" @click="recordsStore.removeRecord(record.id)">
            <n-icon>
              <trash-outline />
            </n-icon>
          </n-button>
        </n-form-item>
      </n-form>
    </div>

    <div v-if="isAddingNewRecord" class="record-row">
      <n-form label-placement="top" class="record-form">
        <n-form-item :label="records.length === 0 ? 'Метки' : undefined" :validation-status="'warning'" :feedback="!newRecord.tags.length ? 'Добавьте метки при необходимости' : undefined">
          <n-dynamic-tags v-model:value="newRecord.tags" placeholder="Введите метки" />
        </n-form-item>

        <n-form-item
          :label="records.length === 0 ? 'Тип' : undefined"
          :validation-status="getValidationStatus(newRecord.type, newRecordTouched.type)"
          :feedback="!newRecord.type ? 'Выберите тип' : undefined"
        >
          <n-select v-model:value="newRecord.type" :options="typeOptions" placeholder="Выберите тип" @blur="newRecordTouched.type = true" />
        </n-form-item>
        <div class="keyboard_inputs">
          <n-form-item
            :label="records.length === 0 ? 'Логин' : undefined"
            :validation-status="getValidationStatus(newRecord.login, newRecordTouched.login)"
            :feedback="!newRecord.login ? 'Введите логин' : undefined"
          >
            <n-input v-model:value="newRecord.login" placeholder="Введите логин" @blur="newRecordTouched.login = true" />
          </n-form-item>

          <n-form-item
            v-if="newRecord.type === RecordDataTypesEnum.LOCAL"
            :label="records.length === 0 ? 'Пароль' : undefined"
            :validation-status="getValidationStatus(newRecord.password, newRecordTouched.password)"
            :feedback="!newRecord.password ? 'Введите пароль' : undefined"
          >
            <n-input v-model:value="newRecord.password" type="password" placeholder="Введите пароль" @blur="newRecordTouched.password = true" />
          </n-form-item>
        </div>
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

  .keyboard_inputs {
    display: flex;
    gap: 5px;

    > * {
      flex: 1 1 0;
    }
  }

  .record-form {
    display: grid;
    grid-template-columns: minmax(200px, 500px) 130px minmax(300px, 1200px) 50px;
    gap: 5px;

    ::v-deep(.n-dynamic-tags) {
      .n-tag {
        min-height: 34px;
      }

      .n-button {
        min-height: 34px;
        margin-top: 0;
      }
    }

    ::v-deep(.n-form-item-feedback-wrapper) {
      min-height: unset;
      max-height: unset;
      height: 20px;
    }

    .delete-button {
      .n-icon {
        width: 24px;
        height: 24px;

        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>
