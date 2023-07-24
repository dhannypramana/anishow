<script setup>
import {useAxios} from "@/use/useAxios";
import IconLove from "@/components/icons/IconLove.vue";
import Review from "@/components/ReviewComponent.vue";
import Cover from "@/components/CoverComponent.vue";
import Loader from "@/components/LoaderComponent.vue";
import {useRoute, useRouter} from "vue-router";
import {capitalize, onMounted, ref} from "vue";
import {useHelpers} from "@/use/useHelpers";

const route = useRoute()
const router = useRouter()
const Axios = useAxios()
const {slugify} = useHelpers()
const animeId = ref(route.params.id)
const baseUrl = ref(import.meta.env.VITE_JIKAN_API)
const anime = ref({})
const characters = ref([])
const staffs = ref([])
const reviews = ref([])
const recommendations = ref([])
const isLoading = ref(true)
const isFinished = ref(false)

const setAnime = async () => {
  try {
    const res = await Axios.get(baseUrl.value, `/anime/${animeId.value}/full`)
    anime.value = res.data.data
  } catch (e) {
    console.log(e.message)
  } finally {
    isLoading.value = false
    isFinished.value = true
  }
}

const setCharacters = async () => {
  try {
    const res = await Axios.get(baseUrl.value, `/anime/${animeId.value}/characters`)
    characters.value = res.data.data.splice(0, 10)
  } catch (e) {
    console.log(e.message)
  } finally {
    isLoading.value = false
    isFinished.value = true
  }
}

const setStaffs = async () => {
  try {
    const res = await Axios.get(baseUrl.value, `/anime/${animeId.value}/staff`)
    staffs.value = res.data.data.splice(0, 4)
  } catch (e) {
    console.log(e.message)
  } finally {
    isLoading.value = false
    isFinished.value = true
  }
}

const setReviews = async () => {
  try {
    const res = await Axios.get(baseUrl.value, `/anime/${animeId.value}/reviews`)
    reviews.value = res.data.data.splice(0, 3)
  } catch (e) {
    console.log(e.message)
  } finally {
    isLoading.value = false
    isFinished.value = true
  }
}

const setRecommendations = async () => {
  try {
    const res = await Axios.get(baseUrl.value, `/anime/${animeId.value}/recommendations`)
    recommendations.value = res.data.data.splice(0, 5)
  } catch (e) {
    console.log(e.message)
  } finally {
    isLoading.value = false
    isFinished.value = true
  }
}

const animeByGenre = (genreId, genreName) => {
  router.push({
    name: 'anime.byGenre',
    params: {
      genreId,
      genreName: slugify(genreName)
    }
  })
}

onMounted(() => {
  setTimeout(setAnime, 1000)
  setTimeout(() => setCharacters(), 1000)
  setTimeout(() => setStaffs(), 1000)
  setTimeout(() => setReviews(), 3000)
  setTimeout(() => setRecommendations(), 3000)
})
</script>

<template>
  <div class="body">
    <Loader v-if="isLoading" />
    <div class="content" v-if="isFinished">
      <!-- Hero -->
      <div class="hero" :style="{backgroundImage: `url(${anime.images.jpg.large_image_url})`}">
        <div class="hero-dark"></div>
      </div>
      <!-- Head - Info -->
      <div class="info">
        <div class="container d-flex">
          <div class="cover">
            <img class="cover-image rounded" :src="anime.images.jpg.image_url" :alt="anime.title + 'Poster'">
            <div class="d-flex justify-content-between mt-4">
              <div class="btn-group">
                <button type="button" class="btn btn-primary">Add to List</button>
                <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split"
                        data-bs-toggle="dropdown" aria-expanded="false">
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Set as Watching</a></li>
                  <li><a class="dropdown-item" href="#">Set as Planning</a></li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li><a class="dropdown-item" href="#">Open List Editor</a></li>
                </ul>
              </div>
              <div class="btn btn-danger">
                <IconLove/>
              </div>
            </div>
          </div>
          <div class="head-wrapper w-100">
            <div class="head-title">
              <h3>{{ anime.title }}</h3>
            </div>
            <div class="head-synopsis mt-4">
              <p>{{ anime.synopsis }}</p>
            </div>
            <div class="card-nav d-flex justify-content-between mt-4">
              <RouterLink to="#" class="link text-decoration-none active">Overview</RouterLink>
              <RouterLink to="#" class="link text-decoration-none">Characters</RouterLink>
              <RouterLink to="#" class="link text-decoration-none">Staff</RouterLink>
              <RouterLink to="#" class="link text-decoration-none">Stats</RouterLink>
              <RouterLink to="#" class="link text-decoration-none">Social</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-3">
        <div class="row">
          <div class="col-lg-3">
            <!-- Body - Info -->
            <div class="meta-box shadow-sm p-3">
              <div class="data-set format">
                <div class="title">Format</div>
                <div class="value">{{ anime.type }}</div>
              </div>
              <div class="data-set rating">
                <div class="title">Rating</div>
                <div class="value" v-if="anime.rating">{{ anime.rating }}</div>
                <div class="value" v-else>No rating yet</div>
              </div>
              <div class="data-set episodes">
                <div class="title">Episodes</div>
                <div class="value" v-if="anime.episodes">{{ anime.episodes }}</div>
                <div class="value" v-else>Unknown</div>
              </div>
              <div class="data-set episodes-duration">
                <div class="title">Episodes Duration</div>
                <div class="value">{{ anime.duration }}</div>
              </div>
              <div class="data-set status">
                <div class="title">Status</div>
                <div class="value">{{ anime.status }}</div>
              </div>
              <div class="data-set broadcast">
                <div class="title">Broadcast</div>
                <div class="value">{{ anime.broadcast.string }}</div>
              </div>
              <div class="data-set date">
                <div class="title">Date</div>
                <div class="value">{{ anime.aired.string }}</div>
              </div>
              <div class="data-set season">
                <div class="title">Season</div>
                <div class="value" v-if="anime.season && anime.year">{{ capitalize(anime.season) }} {{
                    anime.year
                  }}
                </div>
              </div>
              <div class="data-set studios">
                <div class="title">Studios</div>
                <div class="value d-flex" v-for="studio in anime.studios" :key="studio.mal_id">{{ studio.name }}</div>
              </div>
              <div class="data-set producers">
                <div class="title">Producers</div>
                <div class="value d-flex" v-for="producer in anime.producers" :key="producer.mal_id">{{
                    producer.name
                  }}
                </div>
              </div>
              <div class="data-set source">
                <div class="title">Source</div>
                <div class="value">{{ anime.source }}</div>
              </div>
              <div class="data-set english-title">
                <div class="title">English</div>
                <div class="value">{{ anime.title_english }}</div>
              </div>
              <div class="data-set japanese-title">
                <div class="title">Native</div>
                <div class="value">{{ anime.title_japanese }}</div>
              </div>
              <div class="data-set synonyms">
                <div class="title">Synonyms</div>
                <div class="value" v-if="anime.title_synonyms.length === 0">There isn't any synonyms</div>
                <div class="value" v-else v-for="synonym in anime.title_synonyms" :key="synonym.mal_id">{{
                    synonym
                  }}
                </div>
              </div>
            </div>
            <!-- Statistic -->
            <div class="statistics mt-3">
              <div class="title">Statistics</div>
              <div class="meta-box shadow-sm mt-2 px-3">
                <div class="data-set score">
                  <div class="title">Score</div>
                  <div class="value" v-if="anime.score">{{ anime.score }}</div>
                  <div class="value" v-else>Not scored yet</div>
                </div>
                <div class="data-set ranked">
                  <div class="title">Ranked</div>
                  <div class="value" v-if="anime.rank">#{{ anime.rank }}</div>
                  <div class="value" v-else>Not ranked yet</div>
                </div>
                <div class="data-set popularity">
                  <div class="title">Popularity</div>
                  <div class="value">{{ anime.popularity }}</div>
                </div>
                <div class="data-set members">
                  <div class="title">Members</div>
                  <div class="value">{{ anime.members }}</div>
                </div>
                <div class="data-set favorites">
                  <div class="title">Favorites</div>
                  <div class="value">{{ anime.favorites }}</div>
                </div>
              </div>
            </div>
            <!-- Themes -->
            <div class="themes mt-3">
              <div class="title">Themes</div>
              <div class="meta-box shadow-sm mt-2 px-3" v-for="theme in anime.themes" :key="theme.mal_id">{{
                  theme.name
                }}
              </div>
            </div>
            <!-- Demographics -->
            <div class="demographics mt-3">
              <div class="title">Demographics</div>
              <div class="meta-box shadow-sm mt-2 px-3" v-for="demographic in anime.demographics"
                   :key="demographic.mal_id">{{ demographic.name }}
              </div>
            </div>
            <!-- Genres -->
            <div class="genres mt-3">
              <div class="title">Genres</div>
              <div class="meta-box genre shadow-sm mt-2 px-3" v-for="genre in anime.genres" :key="genre.mal_id" @click="animeByGenre(genre.mal_id, genre.name)">{{
                  genre.name
                }}
              </div>
            </div>
            <!-- External Links -->
            <div class="external mt-3">
              <div class="title">External Links</div>
              <div class="meta-box shadow-sm mt-2 px-3" v-for="external in anime.external" :key="external.mal_id">
                <a :href="external.url" target="_blank" class="link text-decoration-none">{{ external.name }}</a>
              </div>
            </div>
            <!-- Streamings Links -->
            <div class="streamings mt-3">
              <div class="title">Streamings Links</div>
              <div class="meta-box shadow-sm mt-2 px-3" v-for="streaming in anime.streaming" :key="streaming.mal_id">
                <a :href="streaming.url" target="_blank" class="link text-decoration-none">{{ streaming.name }}</a>
              </div>
            </div>
          </div>
          <div class="related-anime col-lg-9">
            <!-- Related Anime -->
            <div class="meta-box shadow-sm py-3">
              <div class="px-3">
                <h5>Related Anime</h5>
                <hr>
              </div>
              <table class="table">
                <tr v-for="relation in anime.relations" :key="relation.id">
                  <th class="px-3 py-2">{{ relation.relation }}</th>
                  <td v-for="re in relation.entry" :key="re.mal_id" class="value">{{ re.name }}</td>
                </tr>
              </table>
            </div>
            <!-- Characters -->
            <div class="meta-box shadow-sm mt-4 py-3">
              <div class="px-3">
                <h5>Characters</h5>
                <hr>
              </div>
              <div class="chara-wrapper d-flex flex-wrap justify-content-between">
                <div class="chara-box d-flex justify-content-between border rounded shadow-sm m-2"
                     v-for="chara in characters" :key="chara.mal_id">
                  <div class="chara-info d-flex">
                    <img
                        class="person-img"
                        :src="chara.character.images.webp.image_url"
                        :alt="chara.character.name + 'Poster'">
                    <div class="d-flex flex-column justify-content-between p-2">
                      <p class="chara-name title">{{ chara.character.name }}</p>
                      <p class="value">{{ chara.role }}</p>
                    </div>
                  </div>
                  <div class="va-info">
                    <div v-for="(va) in chara.voice_actors" :key="va.mal_id">
                      <div class="d-flex overflow-auto" v-if="va.language === 'Japanese'">
                        <div class="d-flex flex-column justify-content-between p-2">
                          <p class="chara-name title">{{ va.person.name }}</p>
                          <p class="value">{{ va.language }}</p>
                        </div>
                        <img
                            class="person-img"
                            :src="va.person.images.jpg.image_url"
                            alt="Poster">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Staff -->
            <div class="meta-box shadow-sm mt-4 py-3">
              <div class="px-3">
                <h5>Staff</h5>
                <hr>
              </div>
              <div class="chara-wrapper d-flex flex-wrap justify-content-between">
                <div class="chara-box d-flex justify-content-between border rounded shadow-sm m-2"
                     v-for="staff in staffs" :key="staff.mal_id">
                  <div class="chara-info d-flex">
                    <img
                        class="person-img"
                        :src="staff.person.images.jpg.image_url"
                        :alt="staff.person.name + 'Poster'">
                    <div class="d-flex flex-column justify-content-between p-2">
                      <p class="chara-name title">{{ staff.person.name }}</p>
                      <div v-for="position in staff.positions" :key="position.mal_id" class="value">
                        {{ position }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Soundtrack Theme -->
            <div class="meta-box shadow-sm mt-4 py-3">
              <div class="row py-2">
                <div class="col">
                  <div class="px-3">
                    <h5>Opening Theme</h5>
                    <hr>
                    <div v-for="opening in anime.theme.openings" :key="opening.mal_id" class="value">{{ opening }}</div>
                  </div>
                </div>
                <div class="col">
                  <div class="px-3">
                    <h5>Ending Theme</h5>
                    <hr>
                    <div v-for="ending in anime.theme.endings" :key="ending.mal_id" class="value">{{ ending }}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Reviews -->
            <div class="meta-box shadow-sm mt-4 py-3" v-if="isFinished">
              <div class="px-3">
                <h5>Reviews</h5>
                <hr>
              </div>
              <Review
                  v-for="review in reviews"
                  :key="review.mal_id"
                  :review="review"/>
            </div>
            <!-- Recommendations -->
            <div class="meta-box shadow-sm mt-4 py-3">
              <div class="px-3">
                <h5>Recommendations</h5>
                <hr>
              </div>
              <div class="d-flex" v-if="isFinished">
                <Cover
                    v-for="recommendation in recommendations"
                    :key="recommendation.entry.mal_id"
                    :id="recommendation.entry.mal_id"
                    :image="recommendation.entry.images.webp.image_url"
                    :title="recommendation.entry.title"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-dark {
  width: 100%;
  height: 250px;
  background-color: rgba(0, 0, 0, 0.6);
}

.hero {
  width: 100%;
  height: 250px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.cover-image {
  height: 300px;
  margin-top: -100px;
  border: 1px solid white;
  border-radius: 8px;
}

.info {
  width: 100%;
  height: 300px;
  background-color: white;
}

.head-wrapper {
  margin-top: 24px;
  margin-left: 48px;
}

.head-synopsis {
  font-size: 15px;
  height: 150px;
  overflow: auto;
}

.btn-group {
  width: 75%;
}


.meta-box {
  width: 100%;
  padding: 8px;
  background-color: white;
  border-radius: 8px;
  font-size: 14px;
}

.data-set {
  margin-top: 8px;
  margin-bottom: 8px;
}

.chara-wrapper {
  margin-left: 8px;
}

.genre:hover {
  cursor: pointer;
}

.chara-box {
  width: 45%;
}

.va-info {
  text-align: right;
}

.chara-name {
  font-size: 15px;
}

.person-img {
  width: 80px;
}

@media screen and (max-width: 767px) {
  .card-nav a{
    display: none;
  }

  .chara-box {
    width: 100%;
  }

  .related-anime {
    margin-top: 25px;
  }
}

@media screen and (max-width: 491px) {
  .head-wrapper {
    margin: 24px 0 8px 21px;
  }

  .head-wrapper .head-title h3{
    font-size: 18px;
  }
  .head-wrapper .head-synopsis{
    font-size: 11px;
  }
}

</style>