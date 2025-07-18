<script setup lang="ts">
import { NButton, NIcon, NText } from "naive-ui";
import { Add } from "@vicons/ionicons5";
import { Remove } from "@vicons/ionicons5";
import { useAppStateStore } from "../shared/AppStateStore";
import { storeToRefs } from "pinia";

const AppStateStore = useAppStateStore();
const { isAddingNewRecord } = storeToRefs(AppStateStore);

const setIsAddingNewRecord = AppStateStore.setIsAddingNewRecord;
const handleClick = () => setIsAddingNewRecord(!isAddingNewRecord.value);
</script>

<template>
  <div class="add_record_form">
    <n-text tag="h1">Учетные записи</n-text>
    <n-button @click="handleClick">
      <n-icon>
        <add v-if="!isAddingNewRecord" />
        <remove v-else />
      </n-icon>
    </n-button>
  </div>
</template>

<style scoped lang="scss">
.add_record_form {
  margin: 16px 32px;
  display: flex;
  align-items: center;
  gap: 15px;

  .n-button {
    width: 40px;
    height: 40px;
    padding: 0;

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
</style>
