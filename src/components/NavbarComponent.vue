<script setup>
import IconAniList from "@/components/icons/IconAniList.vue";
import {onMounted, onUnmounted, ref} from "vue";

const isNavbarHidden = ref(false)

const handleScroll = () => {
  isNavbarHidden.value = window.scrollY > 80
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark p-3 sticky-top" :class="{'nav-hidden' : isNavbarHidden}">
    <div class="container">
      <RouterLink class="navbar-brand" :to="{name: 'home'}">
        <IconAniList class="navbar-img"/>
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #2A2D41;
  transition: transform 0.2s ease-in-out;
  transform: translateY(0);
}

.navbar-brand .navbar-img {
  width: 50px;
  background-color: rgb(237, 241, 245);
  border-radius: 12px;
}

.nav-hidden {
  transform: translateY(-100%);
}
</style>