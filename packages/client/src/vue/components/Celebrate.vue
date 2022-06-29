<script setup lang="ts">
import JSConfetti from 'js-confetti'

const confetti = new JSConfetti()

function showConfetti() {
  confetti.addConfetti()
}

defineProps<{
  msg: string
}>()
</script>

<template>
  <span class="pink" @click="showConfetti">{{ msg }}</span>
</template>