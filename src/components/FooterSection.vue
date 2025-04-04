<template>
  <footer class="bg-gray-900 text-white py-10">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <!-- Store Information -->
        <motion.div
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8 }"
          class="space-y-6"
        >
          <h3 class="text-2xl font-semibold text-yellow-400">ShoeStyle</h3>
          <p class="text-gray-300">
            Your go-to destination for stylish and comfortable shoes. Explore
            our collection and step into a world of fashion and quality!
          </p>
          <div class="flex gap-6 text-xl">
            <a href="#" class="hover:text-yellow-400">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="hover:text-yellow-400">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="hover:text-yellow-400">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" class="hover:text-yellow-400">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </motion.div>

        <!-- Policies Section -->
        <motion.div
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.3 }"
          class="space-y-4"
        >
          <h4 class="text-xl font-semibold text-yellow-400">Policies</h4>
          <ul class="space-y-2 text-gray-300">
            <li>
              <a href="#" class="hover:text-yellow-400">Privacy Policy</a>
            </li>
            <li>
              <a href="#" class="hover:text-yellow-400">Terms & Conditions</a>
            </li>
            <li><a href="#" class="hover:text-yellow-400">Return Policy</a></li>
            <li>
              <a href="#" class="hover:text-yellow-400">Shipping Policy</a>
            </li>
          </ul>
        </motion.div>

        <!-- Quick Links Section -->
        <motion.div
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.5 }"
          class="space-y-4"
        >
          <h4 class="text-xl font-semibold text-yellow-400">Quick Links</h4>
          <ul class="space-y-2 text-gray-300">
            <li><a href="#" class="hover:text-yellow-400">New Arrivals</a></li>
            <li><a href="#" class="hover:text-yellow-400">Best Sellers</a></li>
            <li><a href="#" class="hover:text-yellow-400">Contact Us</a></li>
            <li><a href="#" class="hover:text-yellow-400">About Us</a></li>
          </ul>
        </motion.div>

        <!-- Newsletter Section -->
        <motion.div
          :initial="{ opacity: 0, y: 50 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.7 }"
          class="space-y-4"
        >
          <h4 class="text-xl font-semibold text-yellow-400">
            Subscribe to Our Newsletter
          </h4>
          <p class="text-gray-300">
            Get the latest updates on new arrivals, discounts, and more directly
            to your inbox.
          </p>
          <form @submit.prevent="subscribe" class="flex">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <motion.button
              :while-hover="{ scale: 1.05 }"
              :while-tap="{ scale: 0.95 }"
              type="submit"
              class="ml-4 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:bg-yellow-500 transition"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>

      <!-- Footer Bottom Section -->
      <div class="mt-12 text-center text-gray-400 text-sm">
        <p>&copy; 2025 ShoeStyle. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { Motion } from "@motionone/vue";

export default {
  components: {
    Motion,
  },
  data() {
    return {
      email: "",
    };
  },
  methods: {
    subscribe() {
      if (this.email) {
        alert(`Thank you for subscribing with email: ${this.email}`);
        this.email = "";
      } else {
        alert("Please enter a valid email.");
      }
    },
  },
};
</script>

<style scoped>
/* Custom Styles */
footer {
  background-color: #111;
}

footer a {
  transition: color 0.3s;
}

footer a:hover {
  color: #fbbf24;
}
</style>
