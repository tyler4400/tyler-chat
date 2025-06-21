<template>
  <div class="settings w-[80%] mx-auto p-8">
    <h1 class="text-2xl font-bold mb-8">应用设置</h1>
    <div class="space-y-6">
      <div class="setting-item">
        <label for="language" class="block text-sm font-medium text-gray-700 mb-2" >语言设置</label>
        <SelectRoot v-model="currentConfig.language" id="language" class="select-root">
          <SelectTrigger class="w-40 flex items-center justify-between rounded-md px-3 py-2 text-sm gap-1 bg-white border border-gray-300">
            <SelectValue placeholder="选择语言..." />
            <SelectIcon>
              <Icon icon="radix-icons:chevron-down" />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectContent class="bg-white rounded-md shadow-lg border">
              <SelectViewport class="p-2">
                <SelectGroup>
                  <SelectItem value="zh" class="relative flex items-center px-8 py-2 rounded-md cursor-default
                  text-sm text-green-700 data-[highlighted]:text-white data-[highlighted]:bg-green-700">
                    <SelectItemText>中文</SelectItemText>
                    <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                      <Icon icon="radix-icons:check" />
                    </SelectItemIndicator>
                  </SelectItem>
                  <SelectItem value="en" class="relative flex items-center px-8 py-2 rounded-md cursor-default
                  text-sm text-green-700 data-[highlighted]:text-white data-[highlighted]:bg-green-700">
                    <SelectItemText>English</SelectItemText>
                    <SelectItemIndicator class="absolute left-2 inline-flex items-center">
                      <Icon icon="radix-icons:check" />
                    </SelectItemIndicator>
                  </SelectItem>
                </SelectGroup>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
      </div>
      <div class="setting-item">
        <label for="fontSize" class="block text-sm font-medium text-gray-700 mb-2" >字体大小</label>
        <NumberFieldRoot
          v-model="currentConfig.fontSize"
          id="fontSize"
          class="number-root inline-flex w-40"
          :min="12"
          :max="20"
        >
          <NumberFieldDecrement class="px-2 border border-r-0 border-gray-300 rounded-l-md hover:bg-green-100 focus:outline-none disabled:bg-gray-50">
            <Icon icon="radix-icons:minus" />
          </NumberFieldDecrement>
          <NumberFieldInput
            class="number-input w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 text-center"
          />
          <NumberFieldIncrement class="px-2 border border-l-0 border-gray-300 rounded-r-md hover:bg-green-100 focus:outline-none disabled:bg-gray-50">
            <Icon icon="radix-icons:plus" />
          </NumberFieldIncrement>
        </NumberFieldRoot>
      </div>
    </div>
  </div>
  </template>
<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  NumberFieldRoot,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
} from 'radix-vue'
import { onMounted, reactive, watch } from "vue";
import { AppConfig } from "../types";
import { Icon } from '@iconify/vue'

const currentConfig = reactive<AppConfig>({
  language: 'zh',
  fontSize: 14
})

onMounted(async () => {
  const config = await window.electronAPI.getConfig()
  Object.assign(currentConfig, config)
})

watch(currentConfig, async (newConfig) => {
  await window.electronAPI.updateConfig({ ...newConfig })
}, { deep: true })


</script>
