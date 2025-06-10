<script setup lang="ts">
import Button from "./Button.vue";

import { MessageEmits } from "../types";
import { computed } from "vue";
import { useLoadingMsgStore } from "../stores/useLoadingMsgStore";
import { Icon } from '@iconify/vue'

const { disabledInput = false } = defineProps<{  disabledInput?: boolean }>()
const message = defineModel<string>()
const emits = defineEmits<MessageEmits>()

const loadingMsgStore = useLoadingMsgStore()

const disabledSend = computed(() => {
  return !message.value || message.value?.trim() === '' || loadingMsgStore.isLoading || disabledInput
})

const onSend = () => {
  if (!disabledSend.value) {
    loadingMsgStore.setEnableAutoScroll(true)
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
    <Icon class="text-green-700 cursor-pointer" icon="lets-icons:img-box-fill" width="24" height="24" />
    <input
      type="text"
      v-model="message"
      placeholder="请输入内容"
      class="flex-1 outline-none bg-white focus:ring-0"
      @keydown.enter="onSend"
    >
    <Button icon-name="radix-icons:paper-plane" @click="onSend" :loading="loadingMsgStore.isLoading" :disabled="disabledSend">
      {{loadingMsgStore.isLoading ? '接收中' : '发送'}}
    </Button>
  </div>
</template>

<style scoped>

</style>
