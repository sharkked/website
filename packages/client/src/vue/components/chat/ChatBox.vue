<script setup lang="ts">
import { ref } from 'vue'
import { chatSay } from '@/ts/chat'
import ChatLine from './ChatLine.vue'
import { useChatStore } from '@/ts/stores/ChatStore';
const message = ref('')
const chatStore = useChatStore()

function sendMessage(event: Event) {
  chatSay("name", message.value)
  message.value = ''
}

</script>

<template>
  <div class="chat-box">
    <div class="message-list">
      <ChatLine v-for="message in chatStore.messages" :message="message"/>
    </div>
    <div class="message-bar">
      <input class="message-input" 
        v-model="message" 
        v-on:keyup.enter="sendMessage" 
        placeholder="message"/>
    </div>
  </div>
</template>

<style>
.chat-box {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px var(--color-border) solid;
}

.message-bar { 
  height: 3rem; 
  padding: 0.25rem; 
  position: relative; 
  bottom: 0; 
  left: 0; 
  right: 0; 
  display: flex; 
  box-sizing: border-box; 
  border-top: 1px var(--color-border) solid;
  backdrop-filter: blur(10px); 
}

.message-input { 
  border: none; 
  background: #fff0;
  color: var(--text-color); 
  padding: 0 1rem; 
  flex-grow: 1; 
  margin: 0.25rem; 
}

.message-input:focus { 
  outline: none; 
}

.message-bar > button { 
  background: #333; 
  border: none; 
  padding: 0 1rem; 
  margin: 0.25rem; 
  border-radius: 3px; 
  outline: none; 
  color: #fff; 
}

.message-list { 
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  overflow: scroll;
  list-style-type: none; 
  margin: 0; 
  padding: 0; 
  border-collapse: collapse;
}

.message-list > .chat-line { 
  padding: 0.5rem 1rem; 
  border-top: 1px var(--color-border) solid;
  margin-top: -1px;
}

.message-list > .chat-line:nth-child(odd) { 
  background: #fff1; 
}
</style>