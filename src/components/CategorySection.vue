<template>
  <section
    id="categories"
    class="py-20 bg-gradient-to-b from-[#121212] to-[#1d1d1d] text-white"
  >
    <div class="container mx-auto px-6">
      <!-- Header Section - Left aligned for modern look -->
      <div class="mb-16 text-left max-w-3xl">
        <span
          class="inline-block px-4 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-medium tracking-wide mb-3"
          >EXPLORE OUR COLLECTION</span
        >
        <h2
          class="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight"
        >
          Style by <span class="text-teal-400">Category</span>
        </h2>
        <p class="text-gray-400 text-lg">
          Find the perfect pair for any occasion with our handpicked selection
          of premium footwear
        </p>
      </div>

      <!-- Category Navigation - Horizontal scroll on mobile, fixed on desktop -->
      <div class="relative mb-12">
        <div class="flex overflow-x-auto pb-4 scrollbar-hide -mx-2">
          <button
            v-for="category in categoryNames"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'mx-2 whitespace-nowrap px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300',
              selectedCategory === category
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Products Grid - Cleaner layout with consistent spacing -->
      <div>
        <transition name="fade" mode="out-in">
          <div :key="selectedCategory" class="category-content">
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <div
                v-for="product in getCategoryProducts(selectedCategory)"
                :key="product.id"
                class="group"
              >
                <!-- Card with cleaner design -->
                <div class="relative rounded-xl overflow-hidden bg-gray-800">
                  <!-- Image container with fixed aspect ratio -->
                  <div class="aspect-[3/4] w-full overflow-hidden">
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                  </div>

                  <!-- Sale badge -->
                  <div
                    v-if="product.sale"
                    class="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-4 py-1 rounded-md"
                  >
                    SALE
                  </div>

                  <!-- New badge -->
                  <div
                    v-if="product.isNew"
                    class="absolute top-4 left-4 bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-md"
                  >
                    NEW
                  </div>

                  <!-- Rating stars -->
                  <div
                    class="absolute bottom-4 left-4 flex items-center bg-black/50 rounded-md px-2 py-1"
                  >
                    <div class="flex">
                      <svg
                        v-for="i in 5"
                        :key="i"
                        xmlns="http://www.w3.org/2000/svg"
                        :class="[
                          'h-4 w-4',
                          i <= product.rating
                            ? 'text-yellow-400'
                            : 'text-gray-400',
                        ]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </div>
                    <span class="text-white text-xs ml-1"
                      >{{ product.reviewCount }} reviews</span
                    >
                  </div>

                  <!-- Quick view icon - now opens preview modal -->
                  <div class="absolute top-4 right-4">
                    <button
                      @click="openPreview(product)"
                      class="bg-black/50 hover:bg-black/70 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Wishlist button -->
                  <!-- <div class="absolute top-16 right-4">
                    <button
                      @click="toggleWishlist(product)"
                      class="bg-black/50 hover:bg-black/70 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        :class="
                          isInWishlist(product.id)
                            ? 'text-red-500'
                            : 'text-white'
                        "
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div> -->
                </div>

                <!-- Product name and price below image for cleaner look -->
                <div class="mt-4 text-left">
                  <h3 class="text-xl font-medium text-white">
                    {{ product.name }}
                  </h3>
                  <div class="mt-2 flex items-center">
                    <span class="text-lg font-bold text-teal-400">{{
                      product.price
                    }}</span>
                    <span
                      v-if="product.originalPrice"
                      class="ml-2 text-sm text-gray-400 line-through"
                      >{{ product.originalPrice }}</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom navigation with consistent styling -->
            <div class="mt-16 flex justify-center">
              <router-link
                to="/shoes-page"
                class="inline-flex items-center border-b-2 border-teal-400 text-teal-400 hover:text-teal-300 hover:border-teal-300 text-lg font-medium transition-colors duration-300"
              >
                View all Categories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </router-link>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Product Preview Modal -->
    <transition name="modal">
      <div
        v-if="previewProduct"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/80 backdrop-blur-sm"
          @click="closePreview"
        ></div>

        <!-- Modal Content -->
        <div
          class="relative bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
        >
          <!-- Close Button -->
          <button
            @click="closePreview"
            class="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <!-- Product Image (Left Side) -->
          <div class="w-full md:w-1/2 h-64 md:h-auto">
            <img
              :src="previewProduct.image"
              :alt="previewProduct.name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Product Details (Right Side) -->
          <div class="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col">
            <div class="mb-2 flex items-center">
              <h3 class="text-2xl font-bold text-white">
                {{ previewProduct.name }}
              </h3>
              <span
                v-if="previewProduct.sale"
                class="ml-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md"
                >SALE</span
              >
              <span
                v-if="previewProduct.isNew"
                class="ml-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md"
                >NEW</span
              >
            </div>

            <!-- Price information -->
            <div class="mt-2 flex items-center">
              <span class="text-2xl font-bold text-teal-400">{{
                previewProduct.price
              }}</span>
              <span
                v-if="previewProduct.originalPrice"
                class="ml-2 text-gray-400 line-through"
                >{{ previewProduct.originalPrice }}</span
              >
              <span
                v-if="previewProduct.discountPercentage"
                class="ml-3 bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm"
                >{{ previewProduct.discountPercentage }}% OFF</span
              >
            </div>

            <!-- Rating -->
            <div class="mt-4 flex items-center">
              <div class="flex">
                <svg
                  v-for="i in 5"
                  :key="i"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="[
                    'h-5 w-5',
                    i <= previewProduct.rating
                      ? 'text-yellow-400'
                      : 'text-gray-400',
                  ]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <span class="text-gray-300 ml-2"
                >{{ previewProduct.rating }} ({{
                  previewProduct.reviewCount
                }}
                reviews)</span
              >
            </div>

            <div class="mt-4 space-y-4">
              <!-- Product details -->
              <div>
                <h4 class="text-lg font-medium text-teal-400 mb-2">
                  Product Details
                </h4>
                <p class="text-gray-300">
                  {{
                    previewProduct.description ||
                    "Experience unparalleled comfort and style with these premium shoes designed for the modern lifestyle."
                  }}
                </p>
              </div>

              <!-- Available Sizes -->
              <div>
                <h4 class="text-lg font-medium text-teal-400 mb-2">
                  Available Sizes
                </h4>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="size in previewProduct.availableSizes || [
                      '7',
                      '8',
                      '9',
                      '10',
                      '11',
                      '12',
                    ]"
                    :key="size"
                    class="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-white hover:border-teal-400 focus:border-teal-400 transition-colors"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <!-- Available Colors -->
              <div>
                <h4 class="text-lg font-medium text-teal-400 mb-2">
                  Available Colors
                </h4>
                <div class="flex gap-2">
                  <button
                    v-for="color in previewProduct.availableColors || [
                      'black',
                      'white',
                      'red',
                      'blue',
                    ]"
                    :key="color"
                    :style="{ backgroundColor: color }"
                    class="w-8 h-8 rounded-full border-2 border-gray-700 hover:border-white focus:border-white transition-colors"
                  ></button>
                </div>
              </div>

              <!-- Features -->
              <div>
                <h4 class="text-lg font-medium text-teal-400 mb-2">Features</h4>
                <ul class="list-disc list-inside text-gray-300 space-y-1">
                  <li
                    v-for="(feature, index) in previewProduct.features || [
                      'Premium materials',
                      'Breathable design',
                      'Cushioned insole',
                      'Durable outsole',
                    ]"
                    :key="index"
                  >
                    {{ feature }}
                  </li>
                </ul>
              </div>

              <!-- Action buttons -->
              <div class="mt-6 flex gap-4">
                <!-- <button
                  class="flex-1 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add to Cart
                </button> -->

                <!-- <button
                  @click="toggleWishlist(previewProduct)"
                  class="px-4 py-3 border border-gray-600 hover:border-teal-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    :class="
                      isInWishlist(previewProduct.id)
                        ? 'text-red-500'
                        : 'text-white'
                    "
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
// Import categories from the external file
import {
  categories,
  getDefaultCategory,
  getCategoryByName,
} from "./categoryData.js";

export default {
  data() {
    return {
      selectedCategory: getDefaultCategory(), // Default selected category
      categoryNames: categories.map((cat) => cat.name),
      previewProduct: null, // Store the product being previewed
      wishlist: [], // Array to store wishlist product ids
    };
  },
  methods: {
    // Helper method to get products for the selected category
    getCategoryProducts(categoryName) {
      const category = getCategoryByName(categoryName);
      return category ? category.products : [];
    },

    // Open preview modal with product details
    openPreview(product) {
      this.previewProduct = product;
      document.body.classList.add("overflow-hidden"); // Prevent background scrolling
    },

    // Close preview modal
    closePreview() {
      this.previewProduct = null;
      document.body.classList.remove("overflow-hidden");
    },

    // Toggle product in wishlist
    toggleWishlist(product) {
      const index = this.wishlist.indexOf(product.id);
      if (index === -1) {
        this.wishlist.push(product.id);
      } else {
        this.wishlist.splice(index, 1);
      }
      // Save to localStorage if needed
      localStorage.setItem("wishlist", JSON.stringify(this.wishlist));
    },

    // Check if product is in wishlist
    isInWishlist(productId) {
      return this.wishlist.includes(productId);
    },
  },
  // Load wishlist from localStorage on component mount
  mounted() {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      this.wishlist = JSON.parse(savedWishlist);
    }
  },
  // Ensure we clean up when component is destroyed
  beforeUnmount() {
    document.body.classList.remove("overflow-hidden");
  },
};
</script>

<style scoped>
/* Hide scrollbar for clean look */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* Smooth transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-gray-900 {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .bg-gray-900,
.modal-leave-to .bg-gray-900 {
  transform: scale(0.95);
  opacity: 0;
}

/* Smooth transitions for all interactive elements */
button,
a,
img {
  transition: all 0.3s ease;
}

/* Consistent aspect ratio for images */
.aspect-\[3\/4\] {
  aspect-ratio: 3/4;
}

/* Larger click targets for mobile */
@media (max-width: 640px) {
  button {
    min-height: 44px;
    min-width: 44px;
  }

  .grid {
    gap: 20px;
  }
}
</style>
