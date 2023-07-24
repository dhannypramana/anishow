<script setup>
import Hero from "@/components/HeroComponent.vue";
import List from "@/components/ListComponent.vue";
import Loader from "@/components/LoaderComponent.vue";
import Cover from "@/components/CoverComponent.vue";

import {onMounted, ref} from "vue";
import {useAxios} from "@/use/useAxios";

const Axios = useAxios()
const seasonPopularAnime = ref([])
const upcomingNextSeason = ref([])
const topAnime = ref([])
const isLoading = ref(true)
const isFinished = ref(false)
const baseUrl = ref(import.meta.env.VITE_JIKAN_API)

const setSeasonPopularAnime = async () => {
  try {
    const res = await Axios.get(baseUrl.value, '/seasons/now?&filter=tv&page=1&limit=5')
    seasonPopularAnime.value = res.data.data
  } catch (e) {
    console.log(e.message)
  } finally {
    isLoading.value = false
    isFinished.value = true
  }
}

const setUpcomingNextSeason = async () => {
  try {
    const res = await Axios.get(baseUrl.value, '/seasons/upcoming?filter=tv&page=1&limit=5')
    upcomingNextSeason.value = res.data.data
  } catch (e) {
    console.log(e.message)
  } finally {
    isLoading.value = false
    isFinished.value = true
  }
}

const setTopAnime = async () => {
  try {
    const res = await Axios.get(baseUrl.value, '/anime?order_by=score&sort=desc')
    topAnime.value = res.data.data
  } catch (e) {
    console.log(e.message)
  } finally {
    isLoading.value = false
    isFinished.value = true
  }
}

onMounted(() => {
  setTimeout(setSeasonPopularAnime, 1000)
  setTimeout(setUpcomingNextSeason, 1000)
  setTimeout(setTopAnime, 1000)
})
</script>

<template>
  <div class="container my-5">
    <Hero/>

    <!-- Popular This Season -->
    <div class="wrap">
      <div class="mb-3 d-flex justify-content-between align-items-center">
        <h3>Trending Now</h3>
        <RouterLink
            v-if="isFinished"
            :to="{name: 'anime.this-season'}"
            class="link text-decoration-none text-end">View all
        </RouterLink>
      </div>
      <Loader
          v-if="isLoading"/>
      <div class="cover-wrapper d-flex flex-wrap justify-content-between" v-if="isFinished">
        <Cover
            v-for="anime in seasonPopularAnime"
            :key="anime.mal_id"
            :id="anime.mal_id"
            :image="anime.images.webp.image_url"
            :title="anime.title"
        />
      </div>
    </div>

    <!-- Upcoming Next Season -->
    <div class="wrap">
      <div class="mb-3 d-flex justify-content-between align-items-center">
        <h3>Upcoming next season</h3>
        <RouterLink
            v-if="isFinished"
            :to="{name: 'anime.upcoming-season'}"
            class="link text-decoration-none text-end">View all
        </RouterLink>
      </div>
      <Loader
          v-if="isLoading"/>
      <div class="cover-wrapper d-flex flex-wrap justify-content-between" v-if="isFinished">
        <Cover
            v-for="anime in upcomingNextSeason"
            :key="anime.mal_id"
            :id="anime.mal_id"
            :image="anime.images.webp.image_url"
            :title="anime.title"
        />
      </div>
    </div>

    <!-- Top 100 Anime -->
    <div class="wrap">
      <div class="mb-3 d-flex justify-content-between align-items-center">
        <h3>Top 100 Anime</h3>
        <RouterLink
            v-if="isFinished"
            :to="{name: 'anime.top-100-anime'}"
            class="link text-decoration-none text-end">View all
        </RouterLink>
      </div>
      <Loader
          v-if="isLoading"/>
      <List
          v-if="isFinished"
          :data="topAnime"/>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  margin-top: 48px;
}

a {
  margin-right: 12px;
}
</style>