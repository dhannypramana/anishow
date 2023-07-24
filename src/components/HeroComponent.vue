<script setup>
import IconStats from "@/components/icons/IconStats.vue";
import IconApps from "@/components/icons/IconApps.vue";
import IconSocial from "@/components/icons/IconSocial.vue";
import IconCustom from "@/components/icons/IconCustom.vue";
import IconArrowRight from "@/components/icons/IconArrowRight.vue";
</script>

<template>
  <div class="d-flex justify-content-center">
    <div class="hero">
      <div class="header d-flex flex-column justify-content-center align-items-center">
        <h1 class="text-heading text-center">The next-generation Anime Platform</h1>
        <h3 class="text-subheading text-center mt-3">Track, share, and discover your favorite anime and manga with
          AniList.</h3>
      </div>
      <div class="context mt-5">
        <div class="row">
          <div class="col-md-6">
            <div class="d-flex align-items-center">
              <div class="icon">
                <IconStats class="icon"/>
              </div>
              <div class="meta ms-3">
                <h4 class="text-secondary">Discover your obsessions</h4>
                <p class="description">What are your highest rated genres or most watched voice actors? Follow your
                  watching habits over time with in-depth statistics.</p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex align-items-center">
              <div class="icon">
                <IconApps class="icon"/>
              </div>
              <div class="meta ms-3">
                <h4 class="text-secondary">Bring AniList anywhere</h4>
                <p class="description">
                  Keep track of your progress on-the-go with one of many AniList apps across iOS, Android, macOS, and
                  Windows.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-6">
            <div class="d-flex align-items-center">
              <div class="icon">
                <IconSocial class="icon"/>
              </div>
              <div class="meta ms-3">
                <h4 class="text-secondary">Join the conversation</h4>
                <p class="description">
                  Share your thoughts with our thriving community, make friends, socialize, and receive recommendations.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex align-items-center">
              <div class="icon">
                <IconCustom class="icon"/>
              </div>
              <div class="meta ms-3">
                <h4 class="text-secondary">Tweak it to your liking</h4>
                <p class="description">
                  Customize your scoring system, title format, color scheme, and much more! Also, we have a dark mode.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fly d-flex align-items-center justify-content-center">
        <button class="btn-join">
          <span class="me-3">Join now</span>
          <IconArrowRight />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background-color: #0B1625;
  width: 88%;
  padding: 3em;
  border-radius: 7px;
  color: white;
}

.text-heading {
  font-size: 32px;
}

.text-subheading {
  width: 400px;
  font-size: 21px;
}

.icon {
  width: 75px;
  height: 75px;
}

.fly {
  position: relative;
  top: 70px;
}

.btn-join {
  border: 2px solid rgb(237,241,245);
  background-color: dodgerblue;
  border-radius: 12px;
  width: 200px;
  padding: 10px;
  transition: 0.5s ease;
}

.btn-join:hover {
  transform: scale(1.1);
  box-shadow: 5px 5px 8px dodgerblue;
}

@media screen and (max-width: 491px) {
  .hero {
    padding: 24px;
  }
  .text-heading {
    font-size: 28px;
  }
  .text-subheading {
    width: 100%;
    font-size: 18px;
  }
}
</style>