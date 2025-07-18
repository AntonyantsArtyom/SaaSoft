<script setup lang="ts">
import { NButton, NIcon, NText } from "naive-ui";
import { Add } from "@vicons/ionicons5";
</script>

<template>
  <div class="add_record_form">
    <n-text tag="h1">Учетные записи</n-text>
    <n-button>
      <n-icon>
        <Add />
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
