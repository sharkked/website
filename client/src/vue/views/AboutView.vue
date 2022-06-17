<script setup lang="ts">
import Celebrate from "../components/Celebrate.vue";
</script>

<template>
  <div class="about">
      <p>i am <Celebrate class="huge" msg="about"/> to kill you</p>
  </div>
</template>

<style>
.about {
  margin: auto;
  text-align: right;
}

.huge {
  font-size: 10rem;
}
</style>
