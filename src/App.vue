<script setup>
import NavBar from "./components/NavBar.vue";
import HeroSection from "./components/HeroSection.vue";
import NewArrivalsSection from "./components/NewArrivalsSection.vue";
import CategorySection from "./components/CategorySection.vue";
import DiscountsSection from "./components/DiscountsSection.vue";
import ReviewsSection from "./components/ReviewsSection.vue";
import AboutSection from "./components/AboutSection.vue";
import ContactSection from "./components/ContactSection.vue";
import FooterSection from "./components/FooterSection.vue";
</script>

<template>
  <NavBar />

  <!-- Show Homepage Sections Only If Not on Shoes Page -->
  <template
    v-if="
      $route.path !== '/shoes-page' &&
      $route.path !== '/success' &&
      $route.path !== '/ordered-items'
    "
  >
    <HeroSection />
    <AboutSection />
    <NewArrivalsSection />
    <CategorySection />
    <DiscountsSection />
    <ReviewsSection />
    <ContactSection />
    <FooterSection />
  </template>

  <!-- Dynamic Route Rendering -->
  <router-view />
</template>
