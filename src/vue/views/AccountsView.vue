<script setup lang="ts">
import UserCard from '../components/UserCard.vue'
import { useUserStore } from '@/ts/client/stores/AccountStore'
const userStore = useUserStore()
userStore.fill()
</script>

<template>
  <div class="users">
    <UserCard
      v-for="user in userStore.users"
      :id="user.id"
      :user="user" 
    />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .users {
    display: flex;
    place-items: left;
    place-content: center;
    flex-direction: column;
  }
}
</style>
