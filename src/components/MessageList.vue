<script setup lang="ts">
import { MessageListInstance, MessageProps } from "../types";
import { Icon } from '@iconify/vue'
import dayjs from "dayjs";
import VueMarkdown from "vue-markdown-render";
import markdownItHighlightjs from "markdown-it-highlightjs";
import { useTemplateRef } from "vue";

const listRef = useTemplateRef<HTMLDivElement>('listRef')
defineProps<{ messages?: MessageProps[] }>()

defineExpose<MessageListInstance>({
  scrollIntoView: () => {
    if (listRef.value) {
      console.log('clientHeight', listRef.value.clientHeight)
      console.log('offsetHeight', listRef.value.offsetHeight)
      console.log('scrollHeight', listRef.value.scrollHeight)
      listRef.value.scrollIntoView({ behavior: 'smooth', block: 'end' })
      /**
       * 滚动到试图中还有两种优化方法
       * 1. 判断message-list的clientHeight和scrollHeight
       * 2. 在底部设置一个不可见元素， 监控它的mutationObsever，超出屏幕就让起滚动出现
       * */
    }
  }
})
</script>

<template>
  <div class="message-list" ref="listRef">
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
          <div class="prose prose-slate prose-headings:my-1
            prose-li:my-0 prose-ul:my-1 prose-p:my-1 prose-hr:my-0
            prose-pre:p-0 prose-pre:m-0" v-else>
            <VueMarkdown :source="message.content" :plugins="[markdownItHighlightjs]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
