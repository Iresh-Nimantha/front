<template>
  <section
    id="new-arrivals"
    class="py-16 bg-gradient-to-b from-[#121212] to-[#1d1d1d] text-white"
  >
    <div class="container mx-auto px-4 text-center">
      <!-- Header with animated underline -->
      <div class="mb-12 relative inline-block">
        <h2 class="text-4xl md:text-5xl font-bold mb-3 text-white">
          New <span class="text-teal-400">Arrivals</span>
        </h2>
        <div class="h-1 w-24 bg-teal-400 mx-auto rounded-full"></div>
        <p class="mt-4 text-gray-300 max-w-2xl mx-auto">
          Discover our latest collection of premium footwear designed for style
          and comfort
        </p>
      </div>

      <!-- Filter buttons -->
      <div class="flex flex-wrap justify-center gap-2 mb-10">
        <button
          @click="filter = 'all'"
          :class="[
            'px-4 py-2 rounded-full transition-all duration-300',
            filter === 'all'
              ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
          ]"
        >
          All
        </button>
        <button
          @click="filter = 'bestseller'"
          :class="[
            'px-4 py-2 rounded-full transition-all duration-300',
            filter === 'bestseller'
              ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
          ]"
        >
          Bestsellers
        </button>
      </div>

      <!-- Products Grid with staggered animation -->
      <transition-group
        name="staggered-fade"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
      >
        <div
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          :style="{ transitionDelay: `${index * 100}ms` }"
          class="group relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm shadow-xl transition-all duration-500 hover:shadow-teal-500/20 transform hover:-translate-y-2"
        >
          <!-- Sale badge -->
          <div
            v-if="product.discount"
            class="absolute top-4 left-4 z-10 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full"
          >
            -{{ product.discount }}
          </div>

          <!-- Bestseller badge -->
          <div
            v-if="product.isBestseller"
            class="absolute top-4 right-4 z-10 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full"
          >
            BESTSELLER
          </div>

          <!-- Product Image -->
          <div class="overflow-hidden h-64 lg:h-72">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          <!-- Quick actions overlay -->
          <div
            class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div class="text-center p-4">
              <div class="flex items-center justify-center mb-3">
                <!-- Star Rating -->
                <div class="flex items-center">
                  <span v-for="i in 5" :key="i" class="text-amber-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      :class="
                        i <= Math.floor(product.rating)
                          ? 'fill-current'
                          : 'text-gray-400'
                      "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </span>
                  <span class="ml-1 text-white text-xs"
                    >{{ product.rating }} ({{ product.reviews }})</span
                  >
                </div>
              </div>
              <button
                @click="showProductDetails(product)"
                class="w-full px-4 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-all duration-300 mb-2"
              >
                Quick View
              </button>
            </div>
          </div>

          <!-- Product info -->
          <div class="p-4">
            <h3 class="text-lg font-semibold text-white mb-1 truncate">
              {{ product.name }}
            </h3>
            <div class="flex justify-between items-center">
              <div>
                <span class="text-teal-400 font-bold">{{ product.price }}</span>
                <span
                  v-if="product.originalPrice"
                  class="text-gray-400 text-sm line-through ml-2"
                  >{{ product.originalPrice }}</span
                >
              </div>
              <div class="text-xs text-gray-400">
                {{ product.colors.length }} colors
              </div>
            </div>
          </div>
        </div>
      </transition-group>

      <!-- View all button with hover effect -->
      <div class="mt-12">
        <button
          class="inline-flex items-center gap-2 bg-teal-500/10 hover:bg-teal-500 border border-teal-500/30 text-teal-400 hover:text-white px-6 py-3 rounded-lg transition-all duration-300 group"
        >
          View All New Arrivals
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Enhanced Product Details Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/80 flex justify-center items-center z-50 backdrop-blur-sm p-4"
      @click.self="closeModal"
    >
      <div
        class="bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-500 scale-100 opacity-100"
        :class="{ 'scale-90 opacity-0': !modalReady }"
      >
        <div class="relative">
          <!-- Close button -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white rounded-full p-2 transition-all duration-300 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
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

          <div class="grid grid-cols-1 md:grid-cols-2">
            <!-- Image side -->
            <div
              class="relative overflow-hidden h-64 md:h-full bg-gradient-to-br from-gray-800 to-gray-900"
            >
              <img
                :src="selectedProduct?.image"
                :alt="selectedProduct?.name"
                class="w-full h-full object-cover object-center"
              />
              <div class="absolute bottom-4 left-4">
                <span
                  v-if="selectedProduct?.discount"
                  class="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full mr-2"
                >
                  -{{ selectedProduct?.discount }}
                </span>
                <span
                  v-if="selectedProduct?.isBestseller"
                  class="bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full"
                >
                  BESTSELLER
                </span>
              </div>
            </div>

            <!-- Content side -->
            <div class="p-6 md:p-8 flex flex-col h-full">
              <div>
                <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">
                  {{ selectedProduct?.name }}
                </h3>

                <!-- Rating -->
                <div class="flex items-center mb-4">
                  <div class="flex items-center">
                    <span v-for="i in 5" :key="i" class="text-amber-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        :class="
                          selectedProduct &&
                          i <= Math.floor(selectedProduct.rating)
                            ? 'fill-current'
                            : 'text-gray-500'
                        "
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </span>
                    <span class="ml-2 text-white">{{
                      selectedProduct?.rating
                    }}</span>
                    <span class="mx-2 text-gray-400">•</span>
                    <span class="text-gray-400"
                      >{{ selectedProduct?.reviews }} reviews</span
                    >
                  </div>
                </div>

                <!-- Price -->
                <div class="mb-6">
                  <span class="text-2xl font-bold text-teal-400">{{
                    selectedProduct?.price
                  }}</span>
                  <span
                    v-if="selectedProduct?.originalPrice"
                    class="text-gray-400 text-lg line-through ml-3"
                    >{{ selectedProduct?.originalPrice }}</span
                  >
                </div>

                <!-- Description -->
                <p class="text-gray-300 mb-6">
                  {{ selectedProduct?.description }}
                </p>

                <!-- Color options with validation -->
                <div class="mb-6">
                  <h4 class="text-sm uppercase text-gray-400 font-medium mb-2">
                    Colors <span class="text-red-500">*</span>
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="color in selectedProduct?.colors"
                      :key="color"
                      class="px-3 py-1 border rounded-full text-sm transition-colors duration-200"
                      :class="
                        selectedColor === color
                          ? 'bg-gray-700 text-white border-teal-400'
                          : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                      "
                      @click="updateColor(color)"
                    >
                      {{ color }}
                    </button>
                  </div>
                  <!-- Color validation message -->
                  <p
                    v-if="showColorValidation"
                    class="text-red-500 text-sm mt-2"
                  >
                    Please select a color
                  </p>
                </div>

                <!-- Size options with validation -->
                <div class="mb-8">
                  <h4 class="text-sm uppercase text-gray-400 font-medium mb-2">
                    Size <span class="text-red-500">*</span>
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="size in selectedProduct?.sizes"
                      :key="size"
                      class="w-10 h-10 flex items-center justify-center border rounded-full text-sm transition-colors duration-200"
                      :class="
                        selectedSize === size
                          ? 'bg-teal-500 border-teal-500 text-white'
                          : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                      "
                      @click="updateSize(size)"
                    >
                      {{ size }}
                    </button>
                  </div>
                  <!-- Size validation message -->
                  <p
                    v-if="showSizeValidation"
                    class="text-red-500 text-sm mt-2"
                  >
                    Please select a size
                  </p>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="mt-auto flex gap-4">
                <button
                  @click="addToCart(selectedProduct)"
                  class="flex-1 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  Add to Cart
                </button>
                <button
                  class="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Related products section -->
          <div
            v-if="relatedProducts.length > 0"
            class="p-6 border-t border-gray-800"
          >
            <h4 class="text-lg font-semibold text-white mb-4">
              You May Also Like
            </h4>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="product in relatedProducts"
                :key="product.id"
                class="group cursor-pointer"
                @click="showProductDetails(product)"
              >
                <div class="relative overflow-hidden rounded-lg h-32">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h5 class="mt-2 text-sm font-medium text-white truncate">
                  {{ product.name }}
                </h5>
                <p class="text-teal-400 text-sm">{{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  newArrivalsData,
  getBestsellers,
  getRelatedProducts,
} from "./newArrivalsData.js";

export default {
  data() {
    return {
      filter: "all",
      showModal: false,
      modalReady: false,
      selectedProduct: null,
      selectedColor: null,
      selectedSize: null,
      showColorValidation: false,
      showSizeValidation: false,
      relatedProducts: [],
      cart: JSON.parse(localStorage.getItem("cart")) || [], // Load cart from localStorage
      newArrivals: newArrivalsData,
    };
  },
  computed: {
    filteredProducts() {
      if (this.filter === "bestseller") {
        return getBestsellers();
      }
      return this.newArrivals;
    },
    totalPrice() {
      return this.cart.reduce(
        (sum, item) =>
          sum + parseFloat(item.price.replace(/[^\d.]/g, "")) * item.quantity,
        0
      );
    },
  },
  methods: {
    showProductDetails(product) {
      this.selectedProduct = product;
      this.selectedColor = null; // Reset color selection
      this.selectedSize = null; // Reset size selection
      this.showColorValidation = false;
      this.showSizeValidation = false;
      this.relatedProducts = getRelatedProducts(product.id, 3);
      this.showModal = true;

      // Add a small delay for entrance animation
      setTimeout(() => {
        this.modalReady = true;
      }, 50);
    },
    closeModal() {
      this.modalReady = false;
      setTimeout(() => {
        this.showModal = false;
        this.selectedProduct = null;
      }, 300);
    },
    // Updated addToCart function with proper validation and data capture
    addToCart(product) {
      // Reset validation flags
      this.showColorValidation = false;
      this.showSizeValidation = false;

      // Validate color selection
      if (!this.selectedColor) {
        this.showColorValidation = true;
      }

      // Validate size selection
      if (!this.selectedSize) {
        this.showSizeValidation = true;
      }

      // If either validation failed, stop execution
      if (!this.selectedColor || !this.selectedSize) {
        return;
      }

      // If we reach here, all validations have passed
      const cartItem = {
        id: product.id,
        name: product.name,
        image: product.image,
        brand: product.brand || "Unknown", // In case brand is not available
        price: product.price,
        selectedColor: this.selectedColor,
        selectedSize: this.selectedSize,
        quantity: 1,
      };

      // Check if this exact product (same ID, color, and size) already exists in cart
      const existingItemIndex = this.cart.findIndex(
        (item) =>
          item.id === cartItem.id &&
          item.selectedColor === cartItem.selectedColor &&
          item.selectedSize === cartItem.selectedSize
      );

      if (existingItemIndex > -1) {
        // If item exists, increase quantity
        this.cart[existingItemIndex].quantity += 1;
      } else {
        // Otherwise add new item to cart
        this.cart.push(cartItem);
      }

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(this.cart));

      // Notify user
      alert(
        `Added to cart: ${product.name} - Color: ${this.selectedColor}, Size: ${this.selectedSize}`
      );
    },
    removeFromCart(itemIndex) {
      this.cart.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    loadCart() {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      if (storedCart) {
        this.cart = storedCart;
      }
    },
    // Update color selection
    updateColor(color) {
      this.selectedColor = color;
      this.showColorValidation = false;
    },
    // Update size selection
    updateSize(size) {
      this.selectedSize = size;
      this.showSizeValidation = false;
    },
  },
  mounted() {
    this.loadCart();
  },
};
</script>

<style scoped>
/* Staggered animation for products */
.staggered-fade-enter-active,
.staggered-fade-leave-active {
  transition: all 0.5s ease;
}
.staggered-fade-enter-from,
.staggered-fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Add hover effect for product cards */
.group {
  transition: all 0.3s ease;
}

/* Improved transitions */
.transform {
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth background transitions */
button {
  transition: all 0.3s ease;
}

/* Modal animation */
.scale-90 {
  transform: scale(0.9);
}

/* Header underline animation */
.h-1 {
  position: relative;
  overflow: hidden;
}

.h-1::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(45, 212, 191, 0.7),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
