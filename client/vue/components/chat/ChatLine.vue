<script setup lang="ts">
import type { ChatMessage } from '@/ts/common/interfaces';

defineProps<{
  message: ChatMessage
}>()
</script>

<template>
  <div class="chat-line">
    [<span>{{message.name}}</span>] <span>{{message.message}}</span>
  </div>
</template>