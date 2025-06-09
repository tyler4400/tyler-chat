<script setup lang="ts">
import { MessageProps } from "../types";
import { Icon } from '@iconify/vue'
import dayjs from "dayjs";
import VueMarkdown from "vue-markdown-render";

defineProps<{ messages?: MessageProps[] }>()
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
          {{dayjs(message.createdAt).format('YYYY-MM-DD HH:mm:ss')}}
        </div>

        <div class="message-question bg-green-700 text-white p-2 rounded" v-if="message.type === 'question'">
          {{message.content}}
        </div>
        <div class="message-answer bg-gray-200 text-gray-700 p-2 rounded inline-block" v-else>
          <template v-if="message.status === 'loading'">
            <Icon icon="eos-icons:three-dots-loading" />
          </template>
          <template v-if="message.status === 'error'">
            <div class="inline-flex items-center gap-2">
              <Icon icon="codicon:error" class="text-red-700" />
              {{message.content}}
            </div>
          </template>
          <div class="prose prose-slate prose-headings:my-1 prose-li:my-0 prose-ul:my-1 prose-p:my-1" v-else>
            <VueMarkdown :source="message.content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
