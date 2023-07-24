<script setup>
import {onMounted, ref} from "vue";
import Loader from "@/components/LoaderComponent.vue";
import Cover from "@/components/CoverComponent.vue";
import {useAxios} from "@/use/useAxios";

const Axios = useAxios()
const baseUrl = ref(import.meta.env.VITE_JIKAN_API)
const topAnime = ref([])
const isLoading = ref(true)
const isFinished = ref(false)

const getTopAnime = async () => {
  try {
    const res = await Axios.get(baseUrl.value, '/top/anime?filter=favorite')
    topAnime.value = res.data.data
  } catch (e) {
    console.log(e.message)
  } finally {
    isLoading.value = false
    isFinished.value = true
  }
}

onMounted(() => {
  setTimeout(getTopAnime, 1000)
})
</script>

<template>
  <div class="container">
    <h1 class="mt-4 mb-3 text-capitalize">Top 100 Anime</h1>
    <Loader v-if="isLoading"/>
    <div class="d-flex flex-wrap justify-content-between" v-if="isFinished">
      <Cover
          v-for="(anime, index) in topAnime"
          :key="anime.mal_id"
          :id="anime.mal_id"
          :image="anime.images.webp.image_url"
          :title="anime.title"
          :isRanked="true"
          :rank="index+1"
      />
    </div>
  </div>
</template>