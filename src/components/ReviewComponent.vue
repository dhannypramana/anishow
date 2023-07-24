<script setup>
import moment from "moment";
import IconLove from "@/components/icons/IconLove.vue";
import IconStar from "@/components/icons/IconStar.vue";
import {useHelpers} from "@/use/useHelpers";

defineProps(['review'])
const {trimify} = useHelpers()
</script>

<template>
  <div class="row m-3 p-3 border border-2 shadow-sm rounded-4">
    <div class="col-lg-2 p-0 d-flex flex-column align-items-center justify-content-center">
      <img class="user-img rounded" :src="review.user.images.webp.image_url" :alt="review.user.username + 'Poster'">
    </div>
    <div class="col-lg-10">
      <div class="head d-flex justify-content-between">
        <div class="user">
          <h5 class="title">{{ review.user.username }}</h5>
        </div>
        <div class="date">
          <p class="title">{{ moment(review.date).format('MMM D, YYYY') }}</p>
        </div>
      </div>
      <div class="tags btn btn-sm btn-primary mb-3">
        <span>&#11088;</span>
        <span class="ms-2" v-for="tag in review.tags" :key="tag.id">{{ tag }}</span>
      </div>
      <div class="review">
        <p class="value">{{ trimify(review.review, 250, '...') }}</p>
      </div>
      <div class="footer d-flex">
        <div class="score">
          <sup><IconStar /></sup>
          <span class="ms-1">{{ review.score }}</span>
        </div>
        <div class="reactions ms-3">
          <span><IconLove /></span>
          <span class="ms-1">{{ review.reactions.overall }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tags {
  width: fit-content;
}

.user-img {
  width: 100px;
}
</style>