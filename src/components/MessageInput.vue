<script setup lang="ts">
import Button from "./Button.vue";

import { MessageEmits } from "../types";
import { computed } from "vue";
import { useLoadingMsgStore } from "../stores/useLoadingMsgStore";

const { disabledInput = false } = defineProps<{  disabledInput?: boolean }>()
const message = defineModel<string>()
const emits = defineEmits<MessageEmits>()

const loadingMsgStore = useLoadingMsgStore()

const disabledSend = computed(() => {
  return !message.value || message.value?.trim() === '' || loadingMsgStore.isLoading || disabledInput
})

const onSend = () => {
  if (!disabledSend.value) {
    emits('send', message.value as string)
    message.value = ''
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
      @keydown.enter="onSend"
    >
    <Button icon-name="radix-icons:paper-plane" @click="onSend" :disabled="disabledSend">
      发送
    </Button>
  </div>
</template>

<style scoped>

</style>
