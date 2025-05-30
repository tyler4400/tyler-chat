<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'
import { ProviderProps } from "../types";
import { Icon } from "@iconify/vue"

defineProps<{ items: ProviderProps[] }>()
const currentModel = defineModel<string>()
</script>

<template>
  <div class="provider-select w-full">
    <SelectRoot v-model="currentModel">
      <SelectTrigger class="flex w-full items-center justify-between rounded-md py-1.5 px-3 shadow-sm border data-[placeholder]:text-gray-400">
        <SelectValue placeholder="Select a model..." />
        <Icon icon="radix-icons:chevron-down" class="h-5 w-5"/>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent class="bg-white shadow-md rounded-md border z-[100]">
          <SelectViewport class="px-2 py-1">
            <template v-for="provider in items">
              <SelectLabel class="flex items-center gap-2 text-gray-500 h-6">
                <img :src="provider.avatar" :alt="provider.name" class="w-5 h-5 rounded" />
                {{provider.name}}
              </SelectLabel>
              <SelectGroup class="pl-5">
                <SelectItem
                  v-for="(model, index) in provider.models"
                  :key="index"
                  :value="`${provider.id}/${model}`"
                  class="outline-none rounded h-7 leading-7 text-green-700 border-t border-t-gray-100
                    cursor-pointer px-2 flex justify-start gap-2 items-center
                    data-[state=checked]:bg-green-700 data-[state=checked]:text-white
                    hover:bg-green-700 hover:text-white"
                >
                  <SelectItemIndicator>
                    <Icon icon="radix-icons:check" class="text-white" />
                  </SelectItemIndicator>
                  <SelectItemText>{{model}}</SelectItemText>
                </SelectItem>
              </SelectGroup>
            </template>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>
