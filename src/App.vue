<script setup>
import Navbar from "@/components/NavbarComponent.vue";
import Footer from "@/components/FooterComponent.vue";
</script>

<template>
  <div class="app">
    <Navbar/>

    <div class="main-content">
      <RouterView/>
    </div>

    <Footer />
  </div>
</template>