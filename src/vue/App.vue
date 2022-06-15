<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import SocketioService from '@/ts/client/services/socketio.service'
import { onChatMessage } from '@/ts/client/chat';
import { useChatStore } from '@/ts/client/stores/ChatStore'
import type { ChatMessage } from '@/ts/common/interfaces';
SocketioService.setupSocketConnection()

const chatStore = useChatStore()

onChatMessage((message: ChatMessage) => {
  chatStore.$patch((state) => {
    state.messages.push(message)
  })
})

onBeforeUnmount(() => {
  SocketioService.disconnect()
})
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/p">Users</RouterLink>
      <RouterLink to="/chat">Chat</RouterLink>
    </nav>
  </header>
  <RouterView class="main" />
</template>

<style>
@import '@/styles/base.css';

#app {
  width: 100%;
  height: 100vh;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

a,
.pink {
  text-decoration: none;
  color: #e261b7;
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(320, 100%, 37%, 0.2);
  }
}

nav {
  display: flex;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  height: fit-content;
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    flex-direction: column;
    place-items: center;
  }

  #app {
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    border-left: 1px solid var(--color-border);
    border-right: 1px solid var(--color-border);
  }

  header {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    padding-right: calc(var(--section-gap) / 2);
  }

  .main {
    display: flex;
    min-height: calc(100vh - 2.5rem);
    padding-bottom: 2rem;
    align-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    font-size: 1rem;
    margin-top: 1rem;
  }
}
</style>
