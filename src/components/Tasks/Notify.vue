<template>
  <div class="notify">{{ message }}</div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<style>
.notify {
  position: absolute;
  bottom: 100px;
  right: 100px;
  padding: 10px;
  background-color: lightgreen;
  color: black;
}
</style>
