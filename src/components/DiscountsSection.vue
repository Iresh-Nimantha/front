<template>
  <section
    id="discounts"
    class="py-16 bg-gradient-to-b from-gray-900 to-black text-white"
  >
    <div class="container mx-auto text-center px-4">
      <h2 class="text-4xl font-bold text-yellow-400 mb-4">
        Exclusive Discounts & Offers
      </h2>
      <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
        Discover amazing deals on your favorite footwear. Limited time offers
        updated regularly!
      </p>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-2 mb-8">
        <button
          @click="selectedCategory = 'all'"
          class="px-4 py-2 rounded-full text-sm transition-all duration-300"
          :class="
            selectedCategory === 'all'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          "
        >
          All Offers
        </button>
        <button
          v-for="category in uniqueCategories"
          :key="category"
          @click="selectedCategory = category"
          class="px-4 py-2 rounded-full text-sm transition-all duration-300"
          :class="
            selectedCategory === category
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          "
        >
          {{ category.charAt(0).toUpperCase() + category.slice(1) }}
        </button>
      </div>

      <!-- Discounts Carousel -->
      <div
        class="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-2xl"
      >
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(offer, index) in filteredOffers"
            :key="offer.id"
            class="min-w-full px-4"
          >
            <div
              class="relative group p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden"
            >
              <div
                class="absolute top-0 right-0 bg-yellow-500 text-black font-bold py-1 px-3 rounded-bl-lg z-10"
              >
                {{ offer.code }}
              </div>

              <img
                :src="offer.image"
                :alt="offer.title"
                class="w-full h-64 object-cover rounded-lg opacity-90 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
              />

              <div class="mt-4 text-left">
                <h3 class="text-2xl font-semibold text-white">
                  {{ offer.title }}
                </h3>
                <p class="text-lg text-yellow-400 mt-2">{{ offer.discount }}</p>
                <div class="flex justify-between items-center mt-4">
                  <span class="text-sm text-gray-400"
                    >Valid until: {{ formatDate(offer.validUntil) }}</span
                  >
                  <button
                    @click="copyDiscountCode(offer.code)"
                    class="px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {{ copiedCode === offer.code ? "Copied!" : "Grab Offer" }}
                  </button>
                </div>
              </div>

              <div
                class="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span
                  class="px-4 py-1 bg-yellow-500 text-black font-bold rounded-full mb-4"
                  >{{ offer.code }}</span
                >
                <h3 class="text-2xl font-semibold text-white">
                  {{ offer.title }}
                </h3>
                <p class="text-lg text-yellow-400 mt-2">{{ offer.discount }}</p>
                <p class="text-sm text-gray-300 mt-2 max-w-xs">
                  Applies to {{ offer.categories.join(", ") }} shoes. Limited
                  time offer!
                </p>
                <button
                  @click="copyDiscountCode(offer.code)"
                  class="mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300"
                >
                  {{
                    copiedCode === offer.code ? "Copied!" : "Copy Code & Style"
                  }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button
          v-if="filteredOffers.length > 1"
          @click="prevSlide"
          class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-opacity-70 transition z-10"
        >
          ❮
        </button>
        <button
          v-if="filteredOffers.length > 1"
          @click="nextSlide"
          class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-opacity-70 transition z-10"
        >
          ❯
        </button>
      </div>

      <!-- Indicator Dots -->
      <div v-if="filteredOffers.length > 1" class="flex justify-center mt-6">
        <span
          v-for="(offer, index) in filteredOffers"
          :key="offer.id"
          class="w-3 h-3 mx-1 rounded-full cursor-pointer transition-all duration-300"
          :class="
            currentIndex === index
              ? 'bg-yellow-400 scale-125'
              : 'bg-gray-600 hover:bg-gray-500'
          "
          @click="currentIndex = index"
        >
        </span>
      </div>

      <!-- No Offers Message -->
      <div
        v-if="filteredOffers.length === 0"
        class="bg-gray-800 rounded-xl p-8 mt-4"
      >
        <p class="text-gray-300">
          No offers available in this category at the moment.
        </p>
        <button
          @click="selectedCategory = 'all'"
          class="mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300"
        >
          View All Offers
        </button>
      </div>

      <!-- Countdown Banner -->
      <div
        v-if="filteredOffers.length > 0"
        class="mt-12 bg-gradient-to-r from-yellow-600 to-yellow-500 p-4 rounded-lg max-w-2xl mx-auto"
      >
        <p class="text-black font-bold">
          Limited Time Offers! Next refresh in:
        </p>
        <div class="flex justify-center gap-4 mt-2 font-mono">
          <div class="bg-black text-white px-3 py-2 rounded">
            {{ countdown.days }}d
          </div>
          <div class="bg-black text-white px-3 py-2 rounded">
            {{ countdown.hours }}h
          </div>
          <div class="bg-black text-white px-3 py-2 rounded">
            {{ countdown.minutes }}m
          </div>
          <div class="bg-black text-white px-3 py-2 rounded">
            {{ countdown.seconds }}s
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <div
      v-if="showNotification"
      class="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300"
      :class="showNotification ? 'opacity-100' : 'opacity-0'"
    >
      <p>
        Discount code
        <span class="font-bold text-yellow-400">{{ notificationMessage }}</span>
        copied to clipboard!
      </p>
    </div>
  </section>
</template>

<script>
// Import discounts from the separate file
import { getAllDiscounts, getDiscountsByCategory } from "./discounts.js";

export default {
  data() {
    return {
      currentIndex: 0,
      discountOffers: [],
      selectedCategory: "all",
      copiedCode: "",
      showNotification: false,
      notificationMessage: "",
      countdown: {
        days: 3,
        hours: 8,
        minutes: 45,
        seconds: 30,
      },
      countdownInterval: null,
    };
  },
  computed: {
    filteredOffers() {
      if (this.selectedCategory === "all") {
        return this.discountOffers;
      }
      return this.discountOffers.filter((offer) =>
        offer.categories.includes(this.selectedCategory)
      );
    },
    uniqueCategories() {
      const allCategories = this.discountOffers.flatMap(
        (offer) => offer.categories
      );
      return [...new Set(allCategories)];
    },
  },
  methods: {
    prevSlide() {
      if (this.filteredOffers.length <= 1) return;
      this.currentIndex =
        (this.currentIndex - 1 + this.filteredOffers.length) %
        this.filteredOffers.length;
    },
    nextSlide() {
      if (this.filteredOffers.length <= 1) return;
      this.currentIndex = (this.currentIndex + 1) % this.filteredOffers.length;
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    copyDiscountCode(code) {
      navigator.clipboard.writeText(code).then(() => {
        this.copiedCode = code;
        this.showNotification = true;
        this.notificationMessage = code;

        setTimeout(() => {
          this.showNotification = false;
        }, 3000);

        setTimeout(() => {
          this.copiedCode = "";
        }, 2000);
      });
    },
    startCountdown() {
      this.countdownInterval = setInterval(() => {
        if (this.countdown.seconds > 0) {
          this.countdown.seconds--;
        } else {
          this.countdown.seconds = 59;

          if (this.countdown.minutes > 0) {
            this.countdown.minutes--;
          } else {
            this.countdown.minutes = 59;

            if (this.countdown.hours > 0) {
              this.countdown.hours--;
            } else {
              this.countdown.hours = 23;

              if (this.countdown.days > 0) {
                this.countdown.days--;
              } else {
                // Reset countdown or perform some action
                this.resetCountdown();
              }
            }
          }
        }
      }, 1000);
    },
    resetCountdown() {
      this.countdown = {
        days: 3,
        hours: 8,
        minutes: 45,
        seconds: 30,
      };
    },
    setupAutoSlide() {
      setInterval(() => {
        if (this.filteredOffers.length > 1) {
          this.nextSlide();
        }
      }, 5000); // Change slide every 5 seconds
    },
  },
  created() {
    // Fetch all discounts
    this.discountOffers = getAllDiscounts();
  },
  mounted() {
    this.startCountdown();
    this.setupAutoSlide();
  },
  beforeUnmount() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  },
  watch: {
    selectedCategory() {
      // Reset current index when category changes
      this.currentIndex = 0;
    },
  },
};
</script>

<style scoped>
/* Enhanced Styles */
button {
  transition: all 0.3s ease;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.countdown-pulse {
  animation: pulse 2s infinite;
}
</style>
