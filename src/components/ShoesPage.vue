<template>
  <div class="container mx-auto p-4 bg-gray-900 text-gray-100 min-h-screen">
    <h1 class="text-4xl font-bold text-center mb-6 text-teal-400">
      Shop Shoes
    </h1>

    <!-- Advanced Filters Section -->
    <div class="mb-8 bg-gray-800 rounded-xl p-6 shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-teal-400">Filters</h2>
        <button
          @click="expandFilters = !expandFilters"
          class="flex items-center text-gray-300 hover:text-teal-400 transition-colors duration-300"
        >
          {{ expandFilters ? "Hide Filters" : "Show All Filters" }}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 ml-1 transition-transform duration-300"
            :class="expandFilters ? 'rotate-180' : ''"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <!-- Basic Category Filters -->
      <div class="flex flex-wrap justify-center gap-3 mb-6">
        <button
          v-for="filter in categoryFilters"
          :key="filter.value"
          @click="toggleCategory(filter.value)"
          class="px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
          :class="
            activeCategories.includes(filter.value)
              ? 'bg-teal-500 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          "
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Advanced Filters (Expandable) -->
      <transition
        enter-active-class="transition-all duration-500 ease-out"
        leave-active-class="transition-all duration-300 ease-in"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-screen"
        leave-from-class="opacity-100 max-h-screen"
        leave-to-class="opacity-0 max-h-0"
      >
        <div v-if="expandFilters" class="overflow-hidden">
          <!-- Brand Filter -->
          <div class="mb-6">
            <h3 class="text-sm uppercase text-gray-400 font-medium mb-3">
              Brand
            </h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="brand in brandFilters"
                :key="brand"
                @click="toggleBrand(brand)"
                class="px-3 py-1 rounded-full text-sm transition-all duration-300"
                :class="
                  activeBrands.includes(brand)
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                "
              >
                {{ brand }}
              </button>
            </div>
          </div>

          <!-- Price Range Filter -->
          <div class="mb-6">
            <h3 class="text-sm uppercase text-gray-400 font-medium mb-3">
              Price Range: ${{ priceRange[0] }} - ${{ priceRange[1] }}
            </h3>
            <div class="px-2">
              <div class="relative">
                <div class="h-2 bg-gray-700 rounded-full">
                  <div
                    class="absolute h-2 bg-teal-500 rounded-full"
                    :style="{
                      left: `${((priceRange[0] - 50) / 250) * 100}%`,
                      width: `${
                        ((priceRange[1] - priceRange[0]) / 250) * 100
                      }%`,
                    }"
                  ></div>
                </div>
                <input
                  type="range"
                  v-model.number="priceRange[0]"
                  :min="50"
                  :max="300"
                  :step="10"
                  class="absolute w-full h-2 opacity-0 cursor-pointer"
                />
                <input
                  type="range"
                  v-model.number="priceRange[1]"
                  :min="50"
                  :max="300"
                  :step="10"
                  class="absolute w-full h-2 opacity-0 cursor-pointer"
                />
              </div>
              <div class="flex justify-between mt-2 text-sm text-gray-400">
                <span>$50</span>
                <span>$300</span>
              </div>
            </div>
          </div>

          <!-- Color Filter -->
          <div class="mb-6">
            <h3 class="text-sm uppercase text-gray-400 font-medium mb-3">
              Color
            </h3>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="color in colorFilters"
                :key="color.value"
                @click="toggleColor(color.value)"
                class="w-8 h-8 rounded-full border-2 transition-transform duration-300 hover:scale-110"
                :style="{
                  backgroundColor: color.hex,
                  borderColor: activeColors.includes(color.value)
                    ? '#14B8A6'
                    : 'transparent',
                }"
                :title="color.name"
              ></button>
            </div>
          </div>

          <!-- Style Filter -->
          <div class="mb-6">
            <h3 class="text-sm uppercase text-gray-400 font-medium mb-3">
              Style
            </h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="style in styleFilters"
                :key="style"
                @click="toggleStyle(style)"
                class="px-3 py-1 rounded-full text-sm transition-all duration-300"
                :class="
                  activeStyles.includes(style)
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                "
              >
                {{ style }}
              </button>
            </div>
          </div>
        </div>
      </transition>

      <!-- Clear/Apply Filter Buttons -->
      <div class="flex justify-between mt-6">
        <button
          @click="clearAllFilters"
          class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors duration-300"
        >
          Clear All
        </button>
        <button
          @click="applyFilters"
          class="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors duration-300"
        >
          Apply Filters
        </button>
      </div>
    </div>

    <!-- Sort Controls and Results Count -->
    <div class="flex justify-between items-center mb-6">
      <p class="text-gray-300">{{ filteredShoes.length }} products found</p>
      <div class="flex items-center gap-2">
        <label for="sort" class="text-gray-300">Sort by:</label>
        <select
          id="sort"
          v-model="sortOption"
          class="bg-gray-800 text-gray-300 border border-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="relevance">Relevance</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
          <option value="newest">Newest Arrivals</option>
        </select>
      </div>
    </div>

    <!-- Loader Animation -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"
      ></div>
    </div>

    <!-- No Results Message -->
    <div v-else-if="filteredShoes.length === 0" class="text-center py-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 mx-auto text-gray-500 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 class="text-xl font-semibold text-gray-300 mb-2">No Shoes Found</h3>
      <p class="text-gray-400">Try adjusting your filters or search criteria</p>
      <button
        @click="clearAllFilters"
        class="mt-4 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors duration-300"
      >
        Clear Filters
      </button>
    </div>

    <!-- Shoes Grid -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
    >
      <transition-group name="product-list" tag="div" class="w-full contents">
        <div
          v-for="shoe in visibleSortedShoes"
          :key="shoe.id"
          class="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full"
        >
          <!-- Badge for new or sale items -->
          <div class="relative">
            <span
              v-if="shoe.isNew"
              class="absolute top-2 left-2 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-lg z-10"
            >
              NEW
            </span>
            <span
              v-if="shoe.discount"
              class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg z-10"
            >
              -{{ shoe.discount }}%
            </span>

            <!-- Image with hover effect -->
            <div class="relative w-full h-64 overflow-hidden group">
              <img
                :src="shoe.image"
                :alt="shoe.name"
                class="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
              />

              <!-- Quick action overlay -->
              <div
                class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <button
                  @click="openQuickView(shoe)"
                  class="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4 py-2 mr-2 transition-colors duration-300"
                >
                  Quick View
                </button>
              </div>
            </div>
          </div>

          <!-- Product details -->
          <div class="p-6 flex-grow flex flex-col justify-between">
            <div>
              <!-- Brand -->
              <p class="text-gray-400 text-sm">{{ shoe.brand }}</p>

              <!-- Name -->
              <h2
                class="mt-2 text-xl font-bold text-gray-100 hover:text-teal-400 transition-colors duration-300"
              >
                {{ shoe.name }}
              </h2>

              <!-- Rating -->
              <div class="flex items-center mt-2">
                <div class="flex">
                  <span v-for="i in 5" :key="i" class="text-amber-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      :class="
                        i <= Math.floor(shoe.rating)
                          ? 'fill-current'
                          : 'text-gray-600'
                      "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 000-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  </span>
                </div>
                <span class="ml-2 text-xs text-gray-400"
                  >({{ shoe.reviewCount }})</span
                >
              </div>
            </div>

            <div>
              <!-- Price -->
              <div class="mt-4 flex items-center">
                <span
                  v-if="shoe.discount"
                  class="text-gray-500 line-through mr-2"
                >
                  ${{ (shoe.price / (1 - shoe.discount / 100)).toFixed(2) }}
                </span>
                <span class="text-2xl font-bold text-teal-400">
                  ${{ shoe.price }}
                </span>
              </div>

              <!-- Color options dots -->
              <div class="flex mt-3 space-x-2">
                <div
                  v-for="color in shoe.colors.slice(0, 4)"
                  :key="color.value"
                  class="w-5 h-5 rounded-full"
                  :style="{ backgroundColor: color.hex }"
                  :title="color.name"
                ></div>
                <div
                  v-if="shoe.colors.length > 4"
                  class="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white"
                  :title="'+ ' + (shoe.colors.length - 4) + ' more colors'"
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Load More Button -->
    <div
      v-if="filteredShoes.length > visibleShoes"
      class="flex justify-center mt-8"
    >
      <button
        @click="loadMoreShoes"
        class="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors duration-300 flex items-center"
      >
        <span>Load More</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>

    <!-- Quick View Modal with improved design and transitions -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
        >
          <!-- Background overlay -->
          <div
            class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            @click="closeModal"
            aria-hidden="true"
          ></div>

          <!-- Modal panel -->
          <div
            class="inline-block align-bottom bg-gray-900 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full"
          >
            <div class="relative">
              <!-- Close Button -->
              <button
                @click="closeModal"
                class="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white rounded-full p-2 transition-colors duration-300"
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
                <!-- Image Section with gallery -->
                <div class="bg-gradient-to-br from-gray-800 to-gray-900">
                  <!-- Main image -->
                  <div class="relative h-64 md:h-96">
                    <img
                      :src="activeImage || selectedShoe.image"
                      :alt="selectedShoe.name"
                      class="w-full h-full object-cover object-center"
                    />

                    <!-- Image navigation arrows -->
                    <button
                      v-if="
                        selectedShoe.gallery && selectedShoe.gallery.length > 1
                      "
                      @click="prevImage"
                      class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      v-if="
                        selectedShoe.gallery && selectedShoe.gallery.length > 1
                      "
                      @click="nextImage"
                      class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Thumbnail gallery -->
                  <div
                    v-if="selectedShoe.gallery && selectedShoe.gallery.length"
                    class="flex p-2 overflow-x-auto"
                  >
                    <button
                      @click="activeImage = selectedShoe.image"
                      class="flex-shrink-0 w-16 h-16 mx-1 border-2 rounded overflow-hidden"
                      :class="
                        !activeImage
                          ? 'border-teal-500'
                          : 'border-transparent hover:border-gray-600'
                      "
                    >
                      <img
                        :src="selectedShoe.image"
                        :alt="selectedShoe.name"
                        class="w-full h-full object-cover"
                      />
                    </button>
                    <button
                      v-for="(img, index) in selectedShoe.gallery"
                      :key="index"
                      @click="activeImage = img"
                      class="flex-shrink-0 w-16 h-16 mx-1 border-2 rounded overflow-hidden"
                      :class="
                        activeImage === img
                          ? 'border-teal-500'
                          : 'border-transparent hover:border-gray-600'
                      "
                    >
                      <img
                        :src="img"
                        :alt="`${selectedShoe.name} view ${index + 1}`"
                        class="w-full h-full object-cover"
                      />
                    </button>
                  </div>
                </div>

                <!-- Content Section with enhanced UX -->
                <div class="p-6 md:p-8 flex flex-col h-full">
                  <!-- Breadcrumb -->
                  <div class="flex text-sm text-gray-400 mb-2">
                    <span>{{ selectedShoe.category }}</span>
                    <span class="mx-2">/</span>
                    <span>{{ selectedShoe.brand }}</span>
                  </div>

                  <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">
                    {{ selectedShoe.name }}
                  </h3>

                  <!-- Brand with logo -->
                  <div class="flex items-center mb-4">
                    <span class="text-gray-400">{{ selectedShoe.brand }}</span>
                  </div>

                  <!-- Rating -->
                  <div class="flex items-center mb-4">
                    <div class="flex">
                      <span v-for="i in 5" :key="i" class="text-amber-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          :class="
                            i <= Math.floor(selectedShoe.rating)
                              ? 'fill-current'
                              : 'text-gray-600'
                          "
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          />
                        </svg>
                      </span>
                    </div>
                    <span class="ml-2 text-white">{{
                      selectedShoe.rating
                    }}</span>
                    <span class="ml-2 text-gray-400"
                      >({{ selectedShoe.reviewCount || 0 }} reviews)</span
                    >
                  </div>

                  <!-- Price with potential discount -->
                  <div class="mb-6 flex items-center">
                    <span
                      v-if="selectedShoe.discount"
                      class="text-gray-500 line-through mr-3"
                    >
                      ${{
                        (
                          selectedShoe.price /
                          (1 - selectedShoe.discount / 100)
                        ).toFixed(2)
                      }}
                    </span>
                    <span class="text-2xl font-bold text-teal-400"
                      >${{ selectedShoe.price }}</span
                    >
                    <span
                      v-if="selectedShoe.discount"
                      class="ml-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"
                    >
                      -{{ selectedShoe.discount }}%
                    </span>
                  </div>

                  <!-- Brief description -->
                  <p v-if="selectedShoe.description" class="text-gray-300 mb-6">
                    {{ selectedShoe.description }}
                  </p>

                  <!-- Color Options with names -->
                  <div class="mb-6">
                    <div class="flex justify-between items-center mb-3">
                      <h4 class="text-sm uppercase text-gray-400 font-medium">
                        Color
                      </h4>
                      <span
                        v-if="selectedColor"
                        class="text-sm text-teal-400"
                        >{{ getColorName(selectedColor) }}</span
                      >
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="color in selectedShoe.colors"
                        :key="color.value"
                        class="w-10 h-10 rounded-full border-2 transition-all duration-300 hover:scale-110"
                        :style="{
                          backgroundColor: color.hex,
                          borderColor:
                            selectedColor === color.value
                              ? '#14B8A6'
                              : 'transparent',
                        }"
                        :title="color.name"
                        @click="selectedColor = color.value"
                      ></button>
                    </div>
                    <p
                      v-if="showColorError"
                      class="text-red-500 text-sm mt-2 animate-pulse"
                    >
                      Please select a color
                    </p>
                  </div>

                  <!-- Size Options with improved UI -->
                  <div class="mb-6">
                    <div class="flex justify-between items-center mb-3">
                      <h4 class="text-sm uppercase text-gray-400 font-medium">
                        Size
                      </h4>
                      <button
                        class="text-sm text-teal-400 hover:underline"
                        @click="showSizeGuide = true"
                      >
                        Size Guide
                      </button>
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="size in selectedShoe.sizes"
                        :key="size"
                        class="w-12 h-12 flex items-center justify-center border rounded-lg text-sm transition-all duration-300"
                        :class="
                          selectedSize === size
                            ? 'bg-teal-500 text-white border-teal-500'
                            : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                        "
                        @click="selectedSize = size"
                      >
                        {{ size }}
                      </button>
                    </div>
                    <p
                      v-if="showSizeError"
                      class="text-red-500 text-sm mt-2 animate-pulse"
                    >
                      Please select a size
                    </p>
                  </div>

                  <!-- Quantity Selector -->
                  <div class="mb-6">
                    <h4
                      class="text-sm uppercase text-gray-400 font-medium mb-3"
                    >
                      Quantity
                    </h4>
                    <div class="flex items-center">
                      <button
                        @click="decrementQuantity"
                        class="w-10 h-10 bg-gray-800 rounded-l-lg flex items-center justify-center text-gray-300 hover:bg-gray-700 transition-colors duration-300"
                        :disabled="quantity <= 1"
                        :class="{
                          'opacity-50 cursor-not-allowed': quantity <= 1,
                        }"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <input
                        type="number"
                        v-model.number="quantity"
                        min="1"
                        max="10"
                        class="w-16 h-10 bg-gray-800 text-center text-gray-100 focus:outline-none"
                      />
                      <button
                        @click="incrementQuantity"
                        class="w-10 h-10 bg-gray-800 rounded-r-lg flex items-center justify-center text-gray-300 hover:bg-gray-700 transition-colors duration-300"
                        :disabled="quantity >= 10"
                        :class="{
                          'opacity-50 cursor-not-allowed': quantity >= 10,
                        }"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="mt-auto flex gap-4">
                    <button
                      @click="addToCart(selectedShoe)"
                      class="flex-1 flex items-center justify-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                      :class="{
                        'opacity-75 cursor-not-allowed':
                          !selectedSize || !selectedColor,
                      }"
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
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      Add to Cart
                    </button>
                    <button
                      class="px-4 py-3 border border-gray-700 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
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

                  <!-- Additional Features - Accordion -->
                  <div class="mt-8 border-t border-gray-800 pt-4">
                    <div class="mb-3">
                      <button
                        @click="shippingOpen = !shippingOpen"
                        class="flex justify-between items-center w-full py-2 text-gray-300 hover:text-teal-400 transition-colors duration-300"
                      >
                        <span>Shipping & Returns</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 transition-transform duration-300"
                          :class="shippingOpen ? 'rotate-180' : ''"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div
                        v-show="shippingOpen"
                        class="text-gray-400 text-sm mt-2 pl-2"
                      >
                        Free shipping on all orders over $100. 30-day return
                        policy.
                      </div>
                    </div>
                    <div>
                      <button
                        @click="featuresOpen = !featuresOpen"
                        class="flex justify-between items-center w-full py-2 text-gray-300 hover:text-teal-400 transition-colors duration-300"
                      >
                        <span>Features & Details</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 transition-transform duration-300"
                          :class="featuresOpen ? 'rotate-180' : ''"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div
                        v-show="featuresOpen"
                        class="text-gray-400 text-sm mt-2 pl-2"
                      >
                        <ul class="list-disc list-inside space-y-1">
                          <li
                            v-for="(
                              feature, index
                            ) in selectedShoe.features || [
                              'Cushioned insole',
                              'Rubber outsole',
                              'Breathable mesh',
                            ]"
                            :key="index"
                          >
                            {{ feature }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Related Products Section -->
              <div
                v-if="relatedProducts.length > 0"
                class="p-6 border-t border-gray-800"
              >
                <h4 class="text-lg font-semibold text-white mb-4">
                  You May Also Like
                </h4>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div
                    v-for="product in relatedProducts"
                    :key="product.id"
                    class="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 shadow-md text-white cursor-pointer transition-all duration-300 transform hover:scale-105"
                    @click="openQuickView(product)"
                  >
                    <img
                      :src="product.image"
                      :alt="product.name"
                      class="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h5 class="text-lg font-bold">{{ product.name }}</h5>
                    <p class="text-sm">${{ product.price }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Size Guide Modal -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="showSizeGuide"
        class="fixed inset-0 z-50 overflow-y-auto"
        aria-labelledby="size-guide-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
        >
          <!-- Background overlay -->
          <div
            class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            @click="showSizeGuide = false"
          ></div>

          <!-- Modal panel -->
          <div
            class="inline-block align-bottom bg-gray-900 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full"
          >
            <div class="relative p-6">
              <!-- Close Button -->
              <button
                @click="showSizeGuide = false"
                class="absolute top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white rounded-full p-2 transition-colors duration-300"
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

              <h3 class="text-xl font-bold text-white mb-4">Size Guide</h3>

              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-gray-800">
                      <th class="p-3 border border-gray-700">US Size</th>
                      <th class="p-3 border border-gray-700">EU Size</th>
                      <th class="p-3 border border-gray-700">UK Size</th>
                      <th class="p-3 border border-gray-700">Inches</th>
                      <th class="p-3 border border-gray-700">CM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(row, index) in sizeGuideData"
                      :key="index"
                      class="border-b border-gray-700 hover:bg-gray-800"
                    >
                      <td class="p-3 border border-gray-700">{{ row.us }}</td>
                      <td class="p-3 border border-gray-700">{{ row.eu }}</td>
                      <td class="p-3 border border-gray-700">{{ row.uk }}</td>
                      <td class="p-3 border border-gray-700">
                        {{ row.inches }}
                      </td>
                      <td class="p-3 border border-gray-700">{{ row.cm }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="mt-6 text-sm text-gray-400">
                <p>To find your perfect fit:</p>
                <ol class="list-decimal list-inside mt-2 space-y-1">
                  <li>Measure your foot length from heel to toe</li>
                  <li>Add 0.2-0.5 inches (0.5-1.2 cm) for toe room</li>
                  <li>Find your measurement in the chart above</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Success Toast Notification -->
    <transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transform transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-if="showToast"
        class="fixed bottom-4 right-4 bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50"
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
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span>{{ toastMessage }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
// Import the shoe data from shoesData.js
import { shoesData } from "./shoesData.js";

export default {
  data() {
    return {
      shoes: shoesData, // Use the imported data
      categoryFilters: [
        { label: "All", value: "all" },
        { label: "Men's", value: "mens" },
        { label: "Women's", value: "womens" },
        { label: "Kids'", value: "kids" },
        { label: "Sport", value: "sport" },
        { label: "Casual", value: "casual" },
        { label: "Running", value: "running" },
      ],
      brandFilters: [
        "Nike",
        "Adidas",
        "Puma",
        "New Balance",
        "Reebok",
        "Converse",
        "Under Armour",
        "Vans",
      ],
      colorFilters: [
        { name: "Black", value: "black", hex: "#000000" },
        { name: "White", value: "white", hex: "#FFFFFF" },
        { name: "Red", value: "red", hex: "#FF0000" },
        { name: "Blue", value: "blue", hex: "#0000FF" },
        { name: "Green", value: "green", hex: "#00FF00" },
        { name: "Yellow", value: "yellow", hex: "#FFFF00" },
        { name: "Purple", value: "purple", hex: "#800080" },
        { name: "Grey", value: "grey", hex: "#808080" },
      ],
      styleFilters: [
        "Athletic",
        "Casual",
        "Formal",
        "Outdoor",
        "Sandals",
        "Boots",
        "Slip-On",
      ],
      priceRange: [50, 300],
      activeCategories: ["all"],
      activeBrands: [],
      activeColors: [],
      activeStyles: [],
      selectedCategory: "all",
      expandFilters: false,
      loading: false,
      sortOption: "relevance",
      visibleShoes: 8, // Initial number of shoes to display

      // Modal and selection state
      showModal: false,
      selectedShoe: {},
      selectedSize: null,
      selectedColor: null,
      showSizeError: false,
      showColorError: false,
      activeImage: null,
      currentImageIndex: 0,
      quantity: 1,
      showSizeGuide: false,
      shippingOpen: false,
      featuresOpen: false,

      // Toast notification
      showToast: false,
      toastMessage: "",

      // Size guide data
      sizeGuideData: [
        { us: "6", eu: "39", uk: "5.5", inches: "9.25", cm: "23.5" },
        { us: "7", eu: "40", uk: "6.5", inches: "9.5", cm: "24.1" },
        { us: "8", eu: "41", uk: "7.5", inches: "9.75", cm: "24.8" },
        { us: "9", eu: "42", uk: "8.5", inches: "10", cm: "25.4" },
        { us: "10", eu: "43", uk: "9.5", inches: "10.25", cm: "26" },
        { us: "11", eu: "44", uk: "10.5", inches: "10.5", cm: "26.7" },
        { us: "12", eu: "45", uk: "11.5", inches: "10.75", cm: "27.3" },
      ],

      // Related products
      relatedProducts: [
        {
          id: 13,
          name: "Nike Air Zoom",
          price: 130,
          image: "https://example.com/nike-air-zoom.jpg",
          category: "mens",
          brand: "Nike",
          rating: 4.7,
          reviewCount: 124,
          colors: [
            { name: "White", value: "white", hex: "#FFFFFF" },
            { name: "Black", value: "black", hex: "#000000" },
          ],
          sizes: [7, 8, 9, 10, 11],
        },
        {
          id: 14,
          name: "Adidas NMD",
          price: 150,
          image: "https://example.com/adidas-nmd.jpg",
          category: "mens",
          brand: "Adidas",
          rating: 4.5,
          reviewCount: 89,
          colors: [
            { name: "Blue", value: "blue", hex: "#0000FF" },
            { name: "Red", value: "red", hex: "#FF0000" },
          ],
          sizes: [7, 8, 9, 10, 11],
        },
        {
          id: 15,
          name: "Puma Cali",
          price: 110,
          image: "https://example.com/puma-cali.jpg",
          category: "womens",
          brand: "Puma",
          rating: 4.2,
          reviewCount: 67,
          colors: [
            { name: "White", value: "white", hex: "#FFFFFF" },
            { name: "Black", value: "black", hex: "#000000" },
          ],
          sizes: [6, 7, 8, 9],
        },
        {
          id: 16,
          name: "Nike Revolution",
          price: 115,
          image: "https://example.com/nike-revolution.jpg",
          category: "mens",
          brand: "Nike",
          rating: 4.0,
          reviewCount: 54,
          colors: [
            { name: "Grey", value: "grey", hex: "#808080" },
            { name: "Black", value: "black", hex: "#000000" },
          ],
          sizes: [8, 9, 10, 11, 12],
        },
      ],
    };
  },
  computed: {
    filteredShoes() {
      // Start with all shoes
      let result = [...this.shoes];

      // Apply category filter
      if (!this.activeCategories.includes("all")) {
        result = result.filter((shoe) =>
          this.activeCategories.includes(shoe.category)
        );
      }

      // Apply brand filter
      if (this.activeBrands.length > 0) {
        result = result.filter((shoe) =>
          this.activeBrands.includes(shoe.brand)
        );
      }

      // Apply color filter
      if (this.activeColors.length > 0) {
        result = result.filter((shoe) => {
          return shoe.colors.some((color) =>
            this.activeColors.includes(color.value)
          );
        });
      }

      // Apply style filter
      if (this.activeStyles.length > 0) {
        result = result.filter((shoe) => {
          return (
            shoe.styles &&
            shoe.styles.some((style) => this.activeStyles.includes(style))
          );
        });
      }

      // Apply price range filter
      result = result.filter((shoe) => {
        return (
          shoe.price >= this.priceRange[0] && shoe.price <= this.priceRange[1]
        );
      });

      return result;
    },

    sortedShoes() {
      // Create a copy of filtered shoes to sort
      const shoes = [...this.filteredShoes];

      // Apply sorting
      switch (this.sortOption) {
        case "price-low":
          return shoes.sort((a, b) => a.price - b.price);
        case "price-high":
          return shoes.sort((a, b) => b.price - a.price);
        case "rating":
          return shoes.sort((a, b) => b.rating - a.rating);
        case "newest":
          return shoes.sort((a, b) => {
            return a.isNew && !b.isNew ? -1 : !a.isNew && b.isNew ? 1 : 0;
          });
        default: // relevance or fallback
          return shoes;
      }
    },

    // Display only the number of visible shoes
    visibleSortedShoes() {
      return this.sortedShoes.slice(0, this.visibleShoes);
    },
  },
  methods: {
    // Filter methods
    toggleCategory(category) {
      if (category === "all") {
        this.activeCategories = ["all"];
        return;
      }

      // Remove "all" from active categories
      const allIndex = this.activeCategories.indexOf("all");
      if (allIndex !== -1) {
        this.activeCategories.splice(allIndex, 1);
      }

      // Toggle the selected category
      const index = this.activeCategories.indexOf(category);
      if (index === -1) {
        this.activeCategories.push(category);
      } else {
        this.activeCategories.splice(index, 1);

        // If no categories selected, default to "all"
        if (this.activeCategories.length === 0) {
          this.activeCategories = ["all"];
        }
      }
    },

    toggleBrand(brand) {
      const index = this.activeBrands.indexOf(brand);
      if (index === -1) {
        this.activeBrands.push(brand);
      } else {
        this.activeBrands.splice(index, 1);
      }
    },

    toggleColor(color) {
      const index = this.activeColors.indexOf(color);
      if (index === -1) {
        this.activeColors.push(color);
      } else {
        this.activeColors.splice(index, 1);
      }
    },

    toggleStyle(style) {
      const index = this.activeStyles.indexOf(style);
      if (index === -1) {
        this.activeStyles.push(style);
      } else {
        this.activeStyles.splice(index, 1);
      }
    },

    clearAllFilters() {
      this.activeCategories = ["all"];
      this.activeBrands = [];
      this.activeColors = [];
      this.activeStyles = [];
      this.priceRange = [50, 300];
      this.sortOption = "relevance";
      this.applyFilters();
    },

    applyFilters() {
      // Simulate loading state
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        // Reset visible shoes count when filters change
        this.visibleShoes = 8;
      }, 500);
    },

    // Load more products
    loadMoreShoes() {
      this.visibleShoes += 8;
    },

    // Modal and product selection methods
    openQuickView(shoe) {
      // Reset selections
      this.selectedShoe = shoe;
      this.selectedSize = null;
      this.selectedColor = null;
      this.showSizeError = false;
      this.showColorError = false;
      this.activeImage = null;
      this.currentImageIndex = 0;
      this.quantity = 1;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    prevImage() {
      if (!this.selectedShoe.gallery || this.selectedShoe.gallery.length === 0)
        return;

      if (this.activeImage === null) {
        // We're on the main image, go to the last gallery image
        this.activeImage =
          this.selectedShoe.gallery[this.selectedShoe.gallery.length - 1];
      } else {
        // Find current index in gallery
        const currentIndex = this.selectedShoe.gallery.indexOf(
          this.activeImage
        );
        if (currentIndex === 0) {
          // If at first gallery image, go to main image
          this.activeImage = null;
        } else {
          // Go to previous gallery image
          this.activeImage = this.selectedShoe.gallery[currentIndex - 1];
        }
      }
    },

    nextImage() {
      if (!this.selectedShoe.gallery || this.selectedShoe.gallery.length === 0)
        return;

      if (this.activeImage === null) {
        // We're on the main image, go to the first gallery image
        this.activeImage = this.selectedShoe.gallery[0];
      } else {
        // Find current index in gallery
        const currentIndex = this.selectedShoe.gallery.indexOf(
          this.activeImage
        );
        if (currentIndex === this.selectedShoe.gallery.length - 1) {
          // If at last gallery image, go to main image
          this.activeImage = null;
        } else {
          // Go to next gallery image
          this.activeImage = this.selectedShoe.gallery[currentIndex + 1];
        }
      }
    },

    incrementQuantity() {
      if (this.quantity < 10) {
        this.quantity++;
      }
    },

    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    getColorName(colorValue) {
      const color = this.selectedShoe.colors.find(
        (c) => c.value === colorValue
      );
      return color ? color.name : "";
    },

    addToCart(shoe) {
      // Reset error messages
      this.showSizeError = false;
      this.showColorError = false;

      // Check if a size is selected
      if (!this.selectedSize) {
        this.showSizeError = true;
      }

      // Check if a color is selected
      if (!this.selectedColor) {
        this.showColorError = true;
      }

      // Return if either size or color is not selected
      if (!this.selectedSize || !this.selectedColor) {
        return;
      }

      // Get the color object based on the selected color value
      const selectedColorObj = shoe.colors.find(
        (color) => color.value === this.selectedColor
      );

      // Get the cart from localStorage, or initialize it if it doesn't exist
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the shoe is already in the cart with the same size and color
      const existingItemIndex = cart.findIndex(
        (item) =>
          item.id === shoe.id &&
          item.selectedSize === this.selectedSize &&
          item.selectedColor === this.selectedColor
      );

      if (existingItemIndex >= 0) {
        // If the shoe is already in the cart with the same size and color, update the quantity
        cart[existingItemIndex].quantity += this.quantity;
      } else {
        // Otherwise, add the shoe with the selected size and color to the cart
        cart.push({
          id: shoe.id,
          name: shoe.name,
          brand: shoe.brand,
          image: shoe.image,
          price: shoe.price,
          selectedSize: this.selectedSize,
          selectedColor: this.selectedColor,
          selectedColorName: selectedColorObj ? selectedColorObj.name : "",
          selectedColorHex: selectedColorObj ? selectedColorObj.hex : "",
          quantity: this.quantity,
        });
      }

      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Show toast notification
      this.toastMessage = `${shoe.name} added to your cart`;
      this.showToast = true;

      // Hide toast after 3 seconds
      setTimeout(() => {
        this.showToast = false;
      }, 3000);

      // Close the modal after adding to cart
      this.closeModal();
    },
  },
  // When component is first loaded, simulate loading state
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
};
</script>

<style>
/* Additional global styles */
.product-list-enter-active,
.product-list-leave-active {
  transition: all 0.5s ease;
}
.product-list-enter-from,
.product-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Staggered animation for product items */
.product-list-move {
  transition: transform 0.5s ease;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #1e293b;
}

::-webkit-scrollbar-thumb {
  background: #14b8a6;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0e9488;
}

/* Disable number input spinner */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
