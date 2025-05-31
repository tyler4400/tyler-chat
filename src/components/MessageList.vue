<script setup lang="ts">
import { MessageProps } from "../types";
import { Icon } from '@iconify/vue'

defineProps<{ messages: MessageProps[] }>()
</script>

<template>
  <div class="message-list">
    <div
      v-for="message in messages"
      :key="message.id"
      class="message-item mb-3 flex"
      :class="message.type === 'question' ? 'justify-end' : 'justify-start'"
    >
      <div>
        <div  class="text-xs text-gray-500" :class="{'text-right': message.type === 'question'}">
          {{message.createdAt}}
        </div>
        <div class="message-question bg-green-700 text-white p-2 rounded" v-if="message.type === 'question'">
          {{message.content}}
        </div>

        <div class="message-answer bg-gray-200 text-gray-700 p-2 rounded inline-block" v-else>
          <template v-if="message.status === 'loading'">
            <Icon icon="eos-icons:three-dots-loading" />
          </template>
          <template v-else>
            {{message.content}}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
