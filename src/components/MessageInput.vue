<script setup lang="ts">
import Button from "./Button.vue";

import { MessageEmits } from "../types";
import { computed } from "vue";

const { disabledInput = false } = defineProps<{  disabledInput?: boolean }>()
const message = defineModel<string>()
const emits = defineEmits<MessageEmits>()

const disabledSend = computed(() => {
  return !message.value || message.value?.trim() === '' || disabledInput
})

const onSend = () => {
  if (message.value && message.value?.trim() !== '' ) {
    emits('send', message.value)
  }
}
</script>

<template>
  <div class="message-input w-full flex items-center
    border shadow-md rounded py-1.5 px-2 gap-2
    data-[placeholder]:text-gray-400"
  >
    <input
      type="text"
      v-model="message"
      placeholder="请输入内容"
      class="flex-1 outline-none bg-white focus:ring-0"
    >
    <Button icon-name="radix-icons:paper-plane" @click="onSend" :disabled="disabledSend">
      发送
    </Button>
  </div>
</template>

<style scoped>

</style>
