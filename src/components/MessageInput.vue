<script setup lang="ts">
import Button from "./Button.vue";

import { MessageEmits } from "../types";
import { computed, ref } from "vue";
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
    emits('send', message.value as string)
    message.value = ''
  }
}

// const inputFileRef = useTemplateRef<HTMLInputElement>('inputFileRef')
const attchedImage = ref('')
const selectFile = async () => {
  // inputFileRef?.value?.click()
  const { canceled, filePaths } = await window.electronAPI.selectFile()
  console.log('user selection info::', canceled, filePaths)
  if (canceled) return
  attchedImage.value = filePaths[0]
}

// const handleImageUpload = (e: Event) => {
//   const file = (e.target as HTMLInputElement).files?.[0]
//   if (file) {
//     console.log('123', file)
//     const reader = new FileReader()
//     reader.onload = (e) => {
//       console.log(e.target?.result)
//       attchedImage.value = e.target?.result as string
//     }
//     reader.readAsDataURL(file)
//   }
// }

const removeImage = () => {
  attchedImage.value = ''
  // if (inputFileRef.value) {
  //   inputFileRef.value.value = ''
  // }
}
</script>

<template>
  <div class="message-input w-full border shadow-md rounded py-1.5 px-2 data-[placeholder]:text-gray-400"
  >
    <div class="flex items-center gap-2">
<!--      <input type="file" accept="image/*" class="hidden" ref="inputFileRef" :multiple="false" @change="handleImageUpload">-->
      <Icon
        :class="loadingMsgStore.isLoading ? 'text-green-700/50 pointer-events-none' : 'text-green-700 cursor-pointer'"
        icon="lets-icons:img-box-fill"
        width="24"
        height="24"
        @click="selectFile"
      />
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
    <div class="relative inline-block group" v-if="attchedImage">
      <img :src="`tyler-file://${attchedImage}`" alt="Preview" class="h-12 object-cover rounded">
      <div class="absolute inset-0 flex items-center justify-center
            group-hover:bg-gray-400/50 opacity-0 group-hover:opacity-100
            transition-colors duration-200">
        <Icon @click="removeImage" class="text-green-900 cursor-pointer" icon="line-md:trash" width="24" height="24" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
