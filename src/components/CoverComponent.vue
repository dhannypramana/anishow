<script setup>
import {useRouter} from "vue-router";
import {useHelpers} from "@/use/useHelpers";

const props = defineProps(['id', 'isRanked', 'rank', 'image', 'title'])
const {slugify} = useHelpers()
const router = useRouter()
const randomColor = `hsla(${Math.random() * 360}, 90%, 35%, 1)`

const navigateToDetails = () => {
  router.push({
    name: 'anime.details',
    params: {
      id: props.id,
      title: slugify(props.title)
    }
  })
}
</script>

<template>
  <div class="card rounded-3" @click="navigateToDetails">
    <img :src="image" :alt="title + 'Poster'"
         class="rounded-3">
    <div
        class="rank-box d-flex justify-content-center align-items-center text-white"
        :style="{backgroundColor: randomColor}"
        v-if="isRanked">#{{ rank }}</div>
    <div class="image-caption text-center">
      {{ title }}
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: 0.5s ease;
}

.card {
  margin: 12px;
}

.card:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.image-caption {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  font-size: 13px;
}

.rank-box {
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: lightblue;
  position: absolute;
  top: -10px;
  left: -10px;
}

@media screen and (max-width: 768px) {
  .card {
    width: 150px;
  }

  .image-caption {
    display: none;
  }
}
</style>