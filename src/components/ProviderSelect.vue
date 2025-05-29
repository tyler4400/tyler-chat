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

defineProps<{ items: ProviderProps[] }>()
</script>

<template>
  <div class="provider-select">
    <SelectRoot>
      <SelectTrigger>
        <SelectValue placeholder="Select a model..." />
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectViewport>
            <div v-for="provider in items">
              <SelectLabel>
                <img :src="provider.avatar" :alt="provider.name">
              </SelectLabel>
              <SelectGroup>
                <SelectItem v-for="(model, index) in provider.models" :key="index" :value="model">
                  <SelectItemText>{{model}}</SelectItemText>
                </SelectItem>
              </SelectGroup>
            </div>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>

<style scoped>

</style>
