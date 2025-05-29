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
            <SelectItem value="apple">
              <SelectItemText>
                Apple
              </SelectItemText>
            </SelectItem>
            <SelectItem value="banana">
              <SelectItemText>
                Banana
              </SelectItemText>
            </SelectItem>
            <SelectItem value="dog">
              <SelectItemText>
                Dog
              </SelectItemText>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>

<style scoped>

</style>
