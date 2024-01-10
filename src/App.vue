<template>
  <div>
    <div class="flex min-h-screen">
      <div class="leading-normal tracking-normal text-white gradient w-full">
        <HeaderComp />
        <RouterView />
        <FooterComp />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComp from './components/HeaderComp.vue'
import FooterComp from './components/FooterComp.vue'
</script>
