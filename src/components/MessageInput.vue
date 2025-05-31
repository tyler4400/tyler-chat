<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { MessageEmits } from "../types";

const message = defineModel<string>()
const emits = defineEmits<MessageEmits>()
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
    <button
      @click="onSend"
      class="bg-green-700 hover:bg-green-700/90 rounded shadow-sm px-3 py-1.5
       text-white text-sm inline-flex items-center justify-center gap-2
        active:bg-green-800 active:translate-y-0.5 active:shadow-inner"
    >
      <Icon icon="radix-icons:paper-plane" class="text-white" />
      发送
    </button>
  </div>
</template>

<style scoped>

</style>
