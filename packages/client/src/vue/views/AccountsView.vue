<script setup lang="ts">
import UserCard from '@/vue/components/UserCard.vue'
import { useUserStore } from '@/ts/stores/AccountStore'
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
    width: 100%;
    display: flex;
    place-items: center;
    flex-direction: column;
  }
}
</style>
