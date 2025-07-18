<script setup lang="ts">
import { NIcon, NText } from "naive-ui";
import { HelpCircleOutline } from "@vicons/ionicons5";

defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="help_message_container">
    <n-icon><HelpCircleOutline /></n-icon>
    <n-text>{{ text }}</n-text>
  </div>
</template>

<style scoped lang="scss">
.help_message_container {
  margin: 16px 32px;
  padding: 0 6px;
  height: 40px;
  display: flex;
  gap: 5px;
  align-items: center;
  background: #eef4fa;
  border-radius: 5px;

  .n-icon {
    width: 24px;
    height: 24px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
