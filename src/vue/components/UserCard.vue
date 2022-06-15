<script setup lang="ts">
import type { User } from '@/ts/common/types'

defineProps<{
  id: number,
  user: User
}>()
</script>

<template>
  <div class="user">
    <img class="pfp" :src="user.pfp" />
    <div class="info">
      <h1>{{ user.name }}</h1>
      <h2>@{{ user.username }}</h2>
      <p v-if="user.links">
        <a v-for="link in user.links" :href="link.url">{{ link.name }}</a>
      </p>
    </div>
  </div>
</template>

<style>
.user {
  margin-top: 2rem;
}

.info {
  margin-left: 1rem;
  display: inline-block;
  flex-direction: column;
}

.pfp {
  border-radius: 50%;
  display: inline-block;
  width: 64px;
  height: 64px;
}
</style>