<script setup>
import Cover from "@/components/CoverComponent.vue";
import Loader from "@/components/LoaderComponent.vue";
import {computed, onMounted, ref} from "vue";
import {useAxios} from "@/use/useAxios";

const baseUrl = ref(import.meta.env.VITE_JIKAN_API)
const Axios = useAxios()
const seasonPopularAnime = ref([])
const isLoading = ref(true)
const isFinished = ref(false)

const getSeasonPopularAnime = async () => {
  try {
    const res = await Axios.get(baseUrl.value, '/seasons/now?filter=tv')
    seasonPopularAnime.value = res.data.data
  } catch (e) {
    console.log(e.message)
  } finally {
    isLoading.value = false
    isFinished.value = true
  }
}

const getSeason = computed(() => {
  if (isFinished.value) {
    const season = seasonPopularAnime.value[0].season
    const year = seasonPopularAnime.value[0].year
    return `${season} ${year}`
  }
})


onMounted(() => {
  setTimeout(getSeasonPopularAnime, 1000)
})
</script>

<template>
  <div class="container">
    <Loader v-if="isLoading"/>
    <div class="d-flex flex-wrap justify-content-between" v-if="isFinished">
      <h1 class="mt-4 mb-3 text-capitalize">{{ getSeason }} Anime</h1>
      <Cover
          v-for="anime in seasonPopularAnime"
          :key="anime.mal_id"
          :id="anime.mal_id"
          :image="anime.images.webp.image_url"
          :title="anime.title"
      />
    </div>
  </div>
</template>