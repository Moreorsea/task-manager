<template>
  <div class="preloader">
    <div class="preloader__spinner">
      <Icon icon="line-md:loading-twotone-loop" width="70" height="70" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<style lang="less">
.preloader {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(white, 0.5);
  top: 0;
  left: 0;
  z-index: 100;

  &__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
