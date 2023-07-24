<script setup>
import Cover from "@/components/CoverComponent.vue";
import Loader from "@/components/LoaderComponent.vue";
import {computed, onMounted, ref} from "vue";
import {useAxios} from "@/use/useAxios";
import {useHelpers} from "@/use/useHelpers";

const {trimify} = useHelpers()
const Axios = useAxios()
const baseUrl = ref(import.meta.env.VITE_JIKAN_API)
const upcomingNextSeason = ref([])
const isLoading = ref(true)
const isFinished = ref(false)

const setUpcomingNextSeason = async () => {
  try {
    const res = await Axios.get(baseUrl.value, '/seasons/upcoming?filter=tv')
    upcomingNextSeason.value = res.data.data
  } catch (e) {
    console.log(e.message)
  } finally {
    isLoading.value = false
    isFinished.value = true
  }
}

const getSeason = computed(() => {
  const season = upcomingNextSeason.value[0].season
  const year = upcomingNextSeason.value[0].year
  return `${season} ${year} `
})

onMounted(() => {
  setTimeout(setUpcomingNextSeason, 1000)
})
</script>

<template>
  <Loader v-if="isLoading"/>
  <div class="container" v-if="isFinished">
    <h1 class="mt-4 mb-3 text-capitalize">{{ getSeason }} Anime</h1>
    <div class="d-flex flex-wrap justify-content-between">
      <Cover
          v-for="anime in upcomingNextSeason"
          :key="anime.mal_id"
          :id="anime.mal_id"
          :image="anime.images.webp.image_url"
          :title="trimify(anime.title, 60)"
      />
    </div>
  </div>
</template>
