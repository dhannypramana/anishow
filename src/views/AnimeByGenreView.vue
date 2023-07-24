<script setup>
import Loader from "@/components/LoaderComponent.vue";
import Cover from "@/components/CoverComponent.vue";
import {useAxios} from "@/use/useAxios";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const Axios = useAxios()
const route = useRoute()
const genreId = route.params.genreId
const genreName = ref(route.params.genreName)
const baseUrl = ref(import.meta.env.VITE_JIKAN_API)
const animes = ref([])
const isLoading = ref(true)
const isFinished = ref(false)

const setAnimes = async () => {
  try {
    const res = await Axios.get(baseUrl.value, `/anime?genres=${genreId}&order_by=score&sort=desc`)
    animes.value = res.data.data
  } catch (e) {
    console.log(e.message)
  } finally {
    isLoading.value = false
    isFinished.value = true
  }
}

onMounted(() => {
  setTimeout(setAnimes, 1000)
})
</script>

<template>
  <div class="container">
    <h1 class="my-5 text-capitalize">{{ genreName }} Anime</h1>
    <Loader v-if="isLoading"/>
    <div class="d-flex flex-wrap justify-content-center" v-if="isFinished">
      <Cover
          v-for="(anime, index) in animes" :key="anime.mal_id"
          :isRanked="true"
          :rank="index+1"
          :id="anime.mal_id"
          :image="anime.images.webp.image_url"
          :title="anime.title"
      />
    </div>
  </div>
</template>