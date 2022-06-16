<script setup lang="ts">
import ChatBox from "../components/chat/ChatBox.vue"
</script>

<template>
  <div class="chat-box-wrapper">
    <ChatBox />
  </div>
</template>

<style>
.chat-box-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: flex-end;
}
</style>