<script setup>
import {useHelpers} from "@/use/useHelpers";
import IconStar from "@/components/icons/IconStar.vue";
import Category from "@/components/CategoryComponent.vue";

defineProps(['data'])

const {slugify} = useHelpers()

const checkType = (type) => {
  if (type === 'TV') {
    return `${type} Show`
  } else {
    return type
  }
}
</script>

<template>
  <div class="row mt-4 box" v-for="(d, index) in data" :key="d.mal_id">
    <div class="rank col-lg-1 d-flex align-items-center justify-content-center">
      <h3>#{{ index + 1 }}</h3>
    </div>
    <div class="shadow col-lg-11 bg-white border rounded">
      <div class="row">
        <div class="col-lg-6 d-flex align-items-center">
          <div class="cover py-3">
            <img class="img" :src="d.images.jpg.image_url" alt="aot">
          </div>
          <div class="info-wrapper ms-3">
            <h5>
              <RouterLink :to="{
                name: 'anime.details',
                params: {
                  id: d.mal_id,
                  title: slugify(d.title)
                }}" class="text-decoration-none anime-title">{{ d.title }}</RouterLink>
            </h5>
            <Category :genres="d.genres"/>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="row h-100 d-flex justify-content-between align-items-center">
            <div class="col-lg-4">
              <div class="fw-bold">
                <span>{{ d.score }}</span>
                <sup class="ms-1">
                  <IconStar class="star"/>
                </sup>
              </div>
              <div class="text-secondary">{{ d.scored_by }} users</div>
            </div>
            <div class="col-lg-4">
              <div class="fw-bold">{{ checkType(d.type) }}</div>
              <div class="text-secondary">{{ d.episodes }} Episodes</div>
            </div>
            <div class="col-lg-4">
              <div class="fw-bold text-capitalize">{{ d.season }} {{ d.year }}</div>
              <div class="text-secondary">{{ d.status }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img {
  width: 50px;
}

.anime-title {
  color: black;
}

.anime-title:hover {
  color: rgba(0,0,0,0.5);
}

@media screen and (max-width: 491px) {
  .rank {
    opacity: 0;
  }

  .box {
    width: 95%;
    margin: 0 auto;
  }
}
</style>