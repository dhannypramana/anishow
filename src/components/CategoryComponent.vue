<script setup>
import {useRouter} from "vue-router";

defineProps(['genres'])
const router = useRouter()
const randColor = `hsla(${Math.random() * 360}, 20%, 55%, 1)`

const navigateToAnimeByGenre = (genreId, genreName) => {
  router.push({
    name: 'anime.byGenre',
    params: {
      genreId,
      genreName,
    }
  })
}
</script>

<template>
  <div class="d-flex">
    <div class="category"
         :class="['' , { 'ms-1': index !== 0 }]"
         :style="{backgroundColor: randColor}"
         v-for="(genre, index) in genres"
         :key="genre.id"
         @click="navigateToAnimeByGenre(genre.mal_id, genre.name)">{{ genre.name }}</div>
  </div>
</template>

<style scoped>
.category {
  width: fit-content;
  border-radius: 10px;
  padding: 0 6px 0 6px;
  font-size: 11px;
  color: white;
}

.category:hover {
  cursor: pointer;
}
</style>