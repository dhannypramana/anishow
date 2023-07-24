import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/anime/:id/:title',
      name: 'anime.details',
      component: () => import('../views/AnimeDetailsView.vue')
    },
    {
      path: '/anime/:genreId/:genreName',
      name: 'anime.byGenre',
      component: () => import('../views/AnimeByGenreView.vue')
    },
    {
      path: '/anime/this-season',
      name: 'anime.this-season',
      component: () => import('../views/ThisSeasonView.vue')
    },
    {
      path: '/anime/upcoming-season',
      name: 'anime.upcoming-season',
      component: () => import('../views/UpcomingSeasonView.vue')
    },
    {
      path: '/anime/top-100-anime',
      name: 'anime.top-100-anime',
      component: () => import('../views/TopAnimeView.vue')
    },
  ]
})

export default router
