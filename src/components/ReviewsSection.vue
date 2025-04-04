<template>
  <section
    id="reviews"
    class="py-16 bg-gradient-to-b from-[#1A1A1A] to-[#121212] text-white"
  >
    <div class="container mx-auto text-center px-4">
      <h2
        class="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500"
      >
        What Our Customers Say
      </h2>
      <p class="text-gray-400 mb-10 max-w-xl mx-auto">
        See why thousands of customers love our products
      </p>

      <!-- Rating Filter -->
      <div class="mb-8 flex flex-wrap justify-center gap-2">
        <button
          @click="filterRating(0)"
          class="px-4 py-2 rounded-full text-sm transition-all"
          :class="
            currentFilter === 0
              ? 'bg-yellow-500 text-black font-medium'
              : 'bg-[#252525] hover:bg-[#303030]'
          "
        >
          All Reviews
        </button>
        <button
          v-for="rating in [5, 4, 3]"
          :key="rating"
          @click="filterRating(rating)"
          class="px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1"
          :class="
            currentFilter === rating
              ? 'bg-yellow-500 text-black font-medium'
              : 'bg-[#252525] hover:bg-[#303030]'
          "
        >
          {{ rating }} <span class="text-yellow-400">★</span>
        </button>
      </div>

      <!-- Review Carousel -->
      <div class="relative w-full max-w-4xl mx-auto overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-out"
          :Shop="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(review, index) in filteredReviews"
            :key="review.id"
            class="min-w-full px-6"
          >
            <div
              class="p-8 bg-gradient-to-br from-[#252525] to-[#1e1e1e] rounded-xl shadow-xl text-left border border-gray-800 transition-transform hover:scale-[1.01] duration-300"
            >
              <div class="flex items-center gap-4">
                <div class="relative">
                  <img
                    :src="review.avatar"
                    alt="User"
                    class="w-16 h-16 rounded-full border-2 border-yellow-400 object-cover shadow-lg"
                  />
                  <div
                    v-if="review.verified"
                    class="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                  >
                    <span class="text-xs">✓</span>
                  </div>
                </div>
                <div>
                  <h3 class="text-xl font-semibold">{{ review.name }}</h3>
                  <p class="text-sm text-gray-400">{{ review.date }}</p>
                  <p class="text-xs text-yellow-400 mt-1">
                    Purchased: {{ review.product }}
                  </p>
                </div>
              </div>

              <!-- Star Rating -->
              <div class="flex mt-4">
                <span v-for="star in 5" :key="star" class="text-2xl">
                  <span v-if="star <= review.rating" class="text-yellow-400"
                    >★</span
                  >
                  <span v-else class="text-gray-600">☆</span>
                </span>
              </div>

              <p class="mt-4 text-gray-300 text-lg leading-relaxed">
                "{{ review.text }}"
              </p>

              <div class="mt-6 flex justify-between items-center">
                <div class="flex gap-2">
                  <button
                    class="text-gray-400 hover:text-white transition-colors"
                  >
                    <span>👍</span> Helpful
                  </button>
                  <button
                    class="text-gray-400 hover:text-white transition-colors ml-4"
                  >
                    <span>💬</span> Comment
                  </button>
                </div>
                <p class="text-xs text-gray-500">Review #{{ review.id }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button
          v-if="filteredReviews.length > 1"
          @click="prevSlide"
          class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-r-lg shadow-md hover:bg-yellow-500 hover:text-black transition-all"
        >
          ❮
        </button>
        <button
          v-if="filteredReviews.length > 1"
          @click="nextSlide"
          class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 rounded-l-lg shadow-md hover:bg-yellow-500 hover:text-black transition-all"
        >
          ❯
        </button>
      </div>

      <!-- Indicator Dots -->
      <div v-if="filteredReviews.length > 1" class="flex justify-center mt-8">
        <span
          v-for="(review, index) in filteredReviews"
          :key="review.id"
          class="w-3 h-3 mx-1 rounded-full cursor-pointer transition-all"
          :class="
            currentIndex === index
              ? 'bg-yellow-400 scale-125'
              : 'bg-gray-600 hover:bg-gray-500'
          "
          @click="currentIndex = index"
        >
        </span>
      </div>

      <!-- Reviews Summary -->
      <div class="mt-12 bg-[#252525] p-6 rounded-lg max-w-lg mx-auto">
        <div class="flex items-center justify-center gap-4">
          <div class="text-center">
            <p class="text-4xl font-bold text-yellow-400">4.8</p>
            <p class="text-sm text-gray-400">Average Rating</p>
          </div>
          <div class="h-12 w-px bg-gray-700"></div>
          <div class="text-center">
            <p class="text-4xl font-bold text-yellow-400">
              {{ reviews.length }}
            </p>
            <p class="text-sm text-gray-400">Total Reviews</p>
          </div>
          <div class="h-12 w-px bg-gray-700"></div>
          <div class="text-center">
            <p class="text-4xl font-bold text-yellow-400">94%</p>
            <p class="text-sm text-gray-400">Recommend</p>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <button
        class="mt-10 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
      >
        See All Reviews
      </button>
    </div>
  </section>
</template>

<script>
import {
  reviews,
  getTopRatedReviews,
  getRecentReviews,
  getReviewsByRating,
} from "./reviews.js";

export default {
  data() {
    return {
      currentIndex: 0,
      reviews: reviews,
      filteredReviews: reviews,
      currentFilter: 0,
      autoplayInterval: null,
    };
  },
  mounted() {
    this.startAutoplay();

    // Add swipe gestures for mobile
    const carousel = this.$el.querySelector(".relative");
    let startX, moveX;

    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchmove", (e) => {
      moveX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", () => {
      if (startX + 100 < moveX) {
        this.prevSlide();
      } else if (startX - 100 > moveX) {
        this.nextSlide();
      }
    });
  },
  beforeUnmount() {
    this.stopAutoplay();
  },
  methods: {
    prevSlide() {
      this.resetAutoplay();
      this.currentIndex =
        (this.currentIndex - 1 + this.filteredReviews.length) %
        this.filteredReviews.length;
    },
    nextSlide() {
      this.resetAutoplay();
      this.currentIndex = (this.currentIndex + 1) % this.filteredReviews.length;
    },
    filterRating(rating) {
      this.currentFilter = rating;
      this.currentIndex = 0;

      if (rating === 0) {
        this.filteredReviews = this.reviews;
      } else {
        this.filteredReviews = getReviewsByRating(rating);
      }
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    },
    stopAutoplay() {
      clearInterval(this.autoplayInterval);
    },
    resetAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    },
  },
};
</script>

<style scoped>
/* Animations and transitions */
.rounded-full,
button {
  transition: all 0.3s ease;
}

/* Gradient background for section */
section {
  background-size: 100% 100%;
  position: relative;
}

section::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23333333' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

section > div {
  position: relative;
  z-index: 1;
}

/* Card hover effect */
.hover\:scale-\[1\.01\]:hover {
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}
</style>
