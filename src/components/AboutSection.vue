<template>
  <section
    id="about"
    class="relative py-24 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden"
  >
    <!-- Animated Particle Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        v-for="i in 20"
        :key="i"
        class="absolute rounded-full bg-yellow-400 opacity-20"
        :style="{
          width: `${Math.random() * 12 + 4}px`,
          height: `${Math.random() * 12 + 4}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 15 + 10}s`,
          animationDelay: `${Math.random() * 5}s`,
        }"
        :class="`animate-float-${Math.floor(Math.random() * 3) + 1}`"
      ></div>
    </div>

    <div
      class="container mx-auto flex flex-col lg:flex-row items-center gap-16 px-6 relative z-10"
    >
      <!-- Left: Enhanced Animated Image with Gallery Preview -->
      <m-div
        :initial="{ opacity: 0, x: -50 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8 }"
        class="lg:w-1/2 relative"
      >
        <div
          class="absolute -top-8 -left-8 w-40 h-40 bg-yellow-400 rounded-full blur-3xl opacity-30"
        ></div>

        <!-- Main Image -->
        <div
          class="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-gray-800 group"
        >
          <img
            src="../assets/about/ShoeStyleAbout.jpeg"
            alt="Shoe Style"
            class="w-full transition-transform duration-700 hover:scale-105"
          />

          <!-- Image Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"
          ></div>

          <!-- Image Caption -->
          <div
            class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
          >
            <p class="text-white font-medium">
              Our flagship store in downtown - where style meets comfort
            </p>
          </div>
        </div>

        <!-- Small Image Gallery -->
        <div class="flex mt-4 gap-3 justify-center">
          <m-div
            v-for="(image, index) in shoeImages"
            :key="index"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: 0.8 + index * 0.2 }"
            class="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-700 hover:border-yellow-400 transition-all cursor-pointer"
          >
            <img
              :src="image"
              alt="Shoe Thumbnail"
              class="w-full h-full object-cover"
            />
          </m-div>
        </div>
      </m-div>

      <!-- Right: Enhanced About Us Content -->
      <m-div
        :initial="{ opacity: 0, x: 50 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8, delay: 0.3 }"
        class="lg:w-1/2 text-center lg:text-left"
      >
        <div
          class="bg-gray-800 bg-opacity-40 p-8 rounded-3xl backdrop-blur-lg shadow-xl border border-gray-700"
        >
          <h2 class="text-5xl font-extrabold mb-4">
            <span class="text-yellow-400">About </span>
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200"
              >ShoeStyle</span
            >
          </h2>

          <p class="text-lg text-gray-300 leading-relaxed">
            Welcome to <span class="font-bold text-white">ShoeStyle</span>, your
            go-to destination for the latest, high-quality footwear. We blend
            <span class="text-yellow-400"
              >style, comfort, and affordability</span
            >, ensuring every step you take is bold and confident.
          </p>

          <!-- Brand Story with Icon -->
          <div class="mt-8 flex items-start">
            <div class="bg-yellow-400 p-2 rounded-lg mr-4 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">Our Story</h3>
              <p class="text-gray-300 mt-2">
                Founded with a passion for
                <span class="text-yellow-400">fashion and functionality</span>,
                ShoeStyle began with a simple mission: to provide
                <span class="text-white"
                  >premium footwear that feels as good as it looks</span
                >. From humble beginnings to a well-loved brand, our journey is
                fueled by our customers' love for stylish and comfortable shoes.
              </p>
            </div>
          </div>

          <!-- Mission with Icon -->
          <div class="mt-8 flex items-start">
            <div class="bg-yellow-400 p-2 rounded-lg mr-4 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">Our Mission</h3>
              <p class="text-gray-300 mt-2">
                Our mission is to
                <span class="text-yellow-400">redefine footwear trends</span> by
                offering
                <span class="text-white"
                  >premium quality, trendy designs, and ultimate comfort</span
                >. We believe in making every step count by delivering
                exceptional craftsmanship and value to our customers worldwide.
              </p>
            </div>
          </div>

          <!-- Enhanced Feature Badges -->
          <div
            class="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start"
          >
            <m-div
              v-for="(badge, index) in [
                'Quality Craftsmanship',
                'Affordable Prices',
                'Fashion-Forward',
                'Sustainable',
              ]"
              :key="badge"
              :initial="{ opacity: 0, y: 20 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.5, delay: 1 + index * 0.1 }"
              :class="`px-4 py-2 font-medium rounded-full shadow-lg ${
                index % 2 === 0
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-700 text-white'
              } flex items-center space-x-2`"
            >
              <span class="w-2 h-2 rounded-full bg-white"></span>
              <span>{{ badge }}</span>
            </m-div>
          </div>

          <!-- Call to Action Button -->
          <m-button
            :initial="{ opacity: 0, scale: 0.8 }"
            :animate="{ opacity: 1, scale: 1 }"
            :transition="{ type: 'spring', stiffness: 200, delay: 1.5 }"
            class="mt-8 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full transition-all duration-300 transform hover:scale-105 flex items-center mx-auto lg:mx-0"
          >
            <span>Discover Our Collection</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </m-button>
        </div>

        <!-- Stats Counter -->
        <div class="grid grid-cols-3 gap-4 mt-8">
          <m-div
            v-for="(stat, index) in [
              { value: '10+', label: 'Years' },
              { value: '50k+', label: 'Happy Customers' },
              { value: '100+', label: 'Shoe Styles' },
            ]"
            :key="index"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.5, delay: 1.5 + index * 0.2 }"
            class="text-center p-4 rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-sm"
          >
            <p class="text-2xl lg:text-3xl font-bold text-yellow-400">
              {{ stat.value }}
            </p>
            <p class="text-sm text-gray-400">{{ stat.label }}</p>
          </m-div>
        </div>
      </m-div>
    </div>

    <!-- Enhanced Background Effects -->
    <div
      class="absolute bottom-0 right-0 w-64 h-64 bg-yellow-400 rounded-full blur-3xl opacity-20"
    ></div>
    <div
      class="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-400 rounded-full blur-2xl opacity-10"
    ></div>
  </section>
</template>

<script>
import { Motion } from "@motionone/vue";
// Import images
import Shoe1 from "@/assets/about/shoe1.jpeg";
import Shoe2 from "@/assets/about/shoe2.jpeg";
import Shoe3 from "@/assets/about/shoe3.jpeg";

export default {
  components: {
    "m-div": Motion.div,
    "m-button": Motion.button,
  },
  data() {
    return {
      shoeImages: [Shoe1, Shoe2, Shoe3],
    };
  },
};
</script>

<style>
@keyframes float-1 {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(10deg);
  }
}
@keyframes float-2 {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(30px) rotate(-10deg);
  }
}
@keyframes float-3 {
  0%,
  100% {
    transform: translateX(0) rotate(0deg);
  }
  50% {
    transform: translateX(30px) rotate(10deg);
  }
}

.animate-float-1 {
  animation: float-1 linear infinite;
}
.animate-float-2 {
  animation: float-2 linear infinite;
}
.animate-float-3 {
  animation: float-3 linear infinite;
}
</style>
