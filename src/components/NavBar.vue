<template>
  <header
    id="home"
    class="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md text-white shadow-lg z-50 transition-all duration-300"
    :class="{ 'py-1': scrolled, 'py-3': !scrolled }"
  >
    <nav class="container mx-auto flex justify-between items-center px-4">
      <!-- Logo -->
      <div class="flex items-center">
        <router-link to="/" class="text-2xl font-bold">
          <span class="text-teal-400">Shoe</span>
          <span class="text-white">Style</span>
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <ul class="hidden md:flex space-x-1">
        <li v-for="link in links" :key="link.name">
          <a
            @click.prevent="scrollToSection(link.href, link.name)"
            class="px-3 py-2 rounded-md inline-block relative transition-all duration-300 hover:bg-teal-400/10 group cursor-pointer"
            :class="{ 'text-teal-400': activeLink === link.name }"
          >
            {{ link.name }}
            <span
              class="absolute bottom-0 left-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"
              :class="{
                'w-full': activeLink === link.name,
                'w-0': activeLink !== link.name,
              }"
            ></span>
          </a>
        </li>
      </ul>

      <!-- Quick Actions (Desktop) -->
      <div class="hidden md:flex items-center space-x-4">
        <button
          @click="searchOpen = true"
          class="relative p-2 hover:text-teal-400 transition-colors duration-300"
        >
          <IconSearch size="20" />
        </button>
        <button
          class="relative p-2 hover:text-teal-400 transition-colors duration-300"
        >
          <IconHeart size="20" />
          <span
            class="absolute -top-1 -right-1 w-4 h-4 bg-teal-400 text-black text-xs rounded-full flex items-center justify-center"
          >
            2
          </span>
        </button>

        <!-- Cart button that toggles cart panel -->
        <button
          @click="toggleCart"
          class="relative p-2 hover:text-teal-400 transition-colors duration-300"
        >
          <IconShoppingBag size="20" />
          <span
            v-if="cartItems.length > 0"
            class="absolute -top-1 -right-1 w-4 h-4 bg-teal-400 text-black text-xs rounded-full flex items-center justify-center"
          >
            {{ cartItems.length }}
          </span>
        </button>

        <button
          class="ml-2 px-4 py-2 bg-teal-400 text-black font-semibold rounded hover:bg-teal-500 transition-colors duration-300"
        >
          Sign In
        </button>
      </div>

      <!-- Mobile Menu Button -->
      <div class="flex items-center md:hidden space-x-3">
        <button @click="toggleCart" class="relative p-2 text-white">
          <IconShoppingBag size="20" />
          <span
            v-if="cartItems.length > 0"
            class="absolute -top-1 -right-1 w-4 h-4 bg-teal-400 text-black text-xs rounded-full flex items-center justify-center"
          >
            {{ cartItems.length }}
          </span>
        </button>
        <button
          @click="toggleMenu"
          class="p-1 text-white rounded-md"
          :class="menuOpen ? 'bg-teal-400/20' : ''"
        >
          <IconMenu v-if="!menuOpen" size="24" />
          <IconX v-else size="24" />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div
      v-show="menuOpen"
      class="md:hidden absolute top-full left-0 w-full bg-black/95 shadow-lg overflow-hidden transition-all duration-300"
      :style="{ maxHeight: menuOpen ? `${links.length * 50 + 100}px` : '0px' }"
    >
      <ul class="px-4 py-2">
        <li
          v-for="link in links"
          :key="link.name"
          class="border-b border-gray-800 last:border-none"
        >
          <a
            @click.prevent="
              scrollToSection(link.href, link.name);
              toggleMenu();
            "
            :class="{ 'text-teal-400': activeLink === link.name }"
            class="block py-3 px-2 hover:bg-gray-900 transition-colors duration-200 cursor-pointer"
          >
            {{ link.name }}
          </a>
        </li>
      </ul>
      <div class="flex justify-between items-center p-4 bg-gray-900">
        <button
          class="flex items-center justify-center gap-2 px-4 py-2 bg-teal-400 text-black font-semibold rounded hover:bg-teal-500 transition-colors duration-300 w-full"
        >
          <IconUser size="16" />
          <span>Sign In</span>
        </button>
      </div>
    </div>

    <!-- Search Overlay -->
    <div
      v-if="searchOpen"
      class="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
    >
      <div class="w-full max-w-2xl bg-gray-900 rounded-lg p-6 relative">
        <button
          @click="searchOpen = false"
          class="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <IconX size="20" />
        </button>
        <h3 class="text-xl font-bold mb-4">Search Products</h3>
        <div class="flex">
          <input
            type="text"
            class="w-full bg-gray-800 border-0 rounded-l-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Search for shoes..."
            v-model="searchQuery"
          />
          <button
            class="bg-teal-400 text-black px-4 rounded-r-md hover:bg-teal-500 transition-colors duration-300"
          >
            <IconSearch size="20" />
          </button>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <span
            class="px-3 py-1 bg-gray-800 rounded-full text-sm cursor-pointer hover:bg-teal-400 hover:text-black transition-colors duration-300"
            >Running</span
          >
          <span
            class="px-3 py-1 bg-gray-800 rounded-full text-sm cursor-pointer hover:bg-teal-400 hover:text-black transition-colors duration-300"
            >Casual</span
          >
          <span
            class="px-3 py-1 bg-gray-800 rounded-full text-sm cursor-pointer hover:bg-teal-400 hover:text-black transition-colors duration-300"
            >Sports</span
          >
          <span
            class="px-3 py-1 bg-gray-800 rounded-full text-sm cursor-pointer hover:bg-teal-400 hover:text-black transition-colors duration-300"
            >Formal</span
          >
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <div
      v-if="showNotification"
      class="fixed top-20 right-4 bg-teal-400 text-black px-4 py-3 rounded shadow-lg z-50 transition-all duration-300"
      :class="
        showNotification
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      "
    >
      <p class="font-semibold">{{ notificationMessage }}</p>
    </div>

    <!-- CartPage Component - Changed from v-if to v-show for smooth transitions -->
    <CartPage
      v-show="true"
      @close="closeCart"
      class="fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-xl z-50 transition-transform duration-300 ease-in-out"
      :class="{ 'translate-x-0': cartOpen, 'translate-x-full': !cartOpen }"
    />

    <!-- Backdrop when cart is open -->
    <div
      v-show="cartOpen"
      class="fixed inset-0 bg-black/70 z-40 transition-opacity duration-300"
      :class="{
        'opacity-100': cartOpen,
        'opacity-0 pointer-events-none': !cartOpen,
      }"
      @click="closeCart"
    ></div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import {
  Menu as IconMenu,
  X as IconX,
  Search as IconSearch,
  Heart as IconHeart,
  ShoppingBag as IconShoppingBag,
  User as IconUser,
} from "lucide-vue-next";
import CartPage from "../components/CartPage.vue";

export default {
  components: {
    IconMenu,
    IconX,
    IconSearch,
    IconHeart,
    IconShoppingBag,
    IconUser,
    CartPage,
  },

  setup() {
    const menuOpen = ref(false);
    const searchOpen = ref(false);
    const cartOpen = ref(false);
    const scrolled = ref(false);
    const activeLink = ref("Home");
    const searchQuery = ref("");
    const showNotification = ref(false);
    const notificationMessage = ref("");

    // cartItems as a ref to make it reactive
    const cartItems = ref(JSON.parse(localStorage.getItem("cart")) || []);

    const links = ref([
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "New Arrivals", href: "#new-arrivals" },
      { name: "Categories", href: "#categories" },
      { name: "Discounts", href: "#discounts" },
      { name: "Reviews", href: "#reviews" },
      { name: "Contact", href: "#contact" },
    ]);

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
      if (menuOpen.value && cartOpen.value) cartOpen.value = false;
    };

    const toggleCart = () => {
      cartOpen.value = !cartOpen.value;
      if (cartOpen.value && menuOpen.value) menuOpen.value = false;
      if (cartOpen.value && searchOpen.value) searchOpen.value = false;
    };

    const closeCart = () => {
      cartOpen.value = false;
    };

    const updateCartItems = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart from localStorage
      cartItems.value = cart; // Update cartItems array
    };

    // Add the scrollToSection function
    const scrollToSection = (href, linkName) => {
      const sectionId = href.substring(1); // Remove the # from the href
      const section = document.getElementById(sectionId);

      if (section) {
        // Get header height to offset scroll position
        const headerHeight = document.querySelector("header").offsetHeight;

        // Scroll to the section with an offset for the header
        window.scrollTo({
          top: section.offsetTop - headerHeight,
          behavior: "smooth",
        });

        // Update active link
        activeLink.value = linkName;

        // Update URL without reloading the page
        history.pushState(null, null, href);
      }
    };

    // Handle scroll event to update header appearance
    const handleScroll = () => {
      scrolled.value = window.scrollY > 20;

      // Update active link based on scroll position
      updateActiveSection();
    };

    // Function to update active section based on scroll position
    const updateActiveSection = () => {
      // Get all sections
      const sections = links.value
        .map((link) => {
          const id = link.href.substring(1);
          const element = document.getElementById(id);
          return { name: link.name, element };
        })
        .filter((section) => section.element);

      // Check which section is in view
      const headerHeight = document.querySelector("header").offsetHeight;
      const scrollPosition = window.scrollY + headerHeight + 50; // Add some offset

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element.offsetTop <= scrollPosition) {
          if (activeLink.value !== section.name) {
            activeLink.value = section.name;
            // Update URL without reloading the page
            history.replaceState(null, null, `#${section.element.id}`);
          }
          break;
        }
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initialize scroll state

      // Check if URL has a hash and scroll to that section
      if (window.location.hash) {
        const linkName = links.value.find(
          (link) => link.href === window.location.hash
        )?.name;
        if (linkName) {
          setTimeout(() => {
            scrollToSection(window.location.hash, linkName);
          }, 500); // Small delay to ensure the page is fully loaded
        }
      }

      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && cartOpen.value) {
          closeCart();
        }
      });

      updateCartItems(); // Update cart on mount

      // Listen for storage changes (e.g., another tab updates the cart)
      window.addEventListener("storage", updateCartItems);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", (e) => {
        if (e.key === "Escape" && cartOpen.value) {
          closeCart();
        }
      });

      window.removeEventListener("storage", updateCartItems);
    });

    return {
      menuOpen,
      toggleMenu,
      cartOpen,
      toggleCart,
      closeCart,
      links,
      scrolled,
      activeLink,
      searchOpen,
      searchQuery,
      showNotification,
      notificationMessage,
      cartItems,
      scrollToSection, // Expose the scrollToSection function
    };
  },
};
</script>

<style scoped>
/* Smooth transitions for header height changes */
header {
  transition: all 0.3s ease-in-out;
}

/* This makes scrolling smooth for the entire page */
html {
  scroll-behavior: smooth;
}
</style>
