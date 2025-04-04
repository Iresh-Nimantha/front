<template>
  <section
    id="home"
    class="relative w-full h-screen bg-cover bg-center overflow-hidden"
    style="background-color: #121212"
  >
    <!-- Abstract background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full opacity-20">
        <div
          class="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#14B8A6]/30 to-transparent"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[#0F172A]/40 to-transparent"
        ></div>
      </div>
    </div>

    <!-- Floating decorative elements -->
    <div
      class="absolute top-1/4 right-1/6 animate-float-slow opacity-80 hidden lg:block"
    >
      <div
        class="w-40 h-40 rounded-full bg-[#14B8A6]/10 backdrop-blur-lg border border-[#14B8A6]/20"
      ></div>
    </div>
    <div class="absolute bottom-1/4 left-1/6 animate-float hidden lg:block">
      <div
        class="w-32 h-32 rounded-full bg-[#0F172A]/30 backdrop-blur-lg border border-[#14B8A6]/10"
      ></div>
    </div>
    <div
      class="absolute top-2/3 right-1/3 animate-float-reverse hidden lg:block"
    >
      <div
        class="w-24 h-24 rounded-full bg-[#1E293B]/20 backdrop-blur-lg"
      ></div>
    </div>

    <!-- Main content container -->
    <div
      class="relative z-10 container mx-auto px-6 py-16 text-center flex flex-col items-center justify-center h-full"
    >
      <!-- Tag line with enhanced styling -->
      <span
        class="inline-block px-5 py-2 bg-[#14B8A6]/80 rounded-full text-sm font-medium tracking-wider mb-8 text-[#F1F5F9] backdrop-blur-sm shadow-glow"
      >
        EXCLUSIVE COLLECTION 2025
      </span>

      <!-- Hero Content with enhanced typography -->
      <h1
        class="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6 font-display text-[#F1F5F9]"
      >
        Step Into <span class="text-[#14B8A6]">Comfort</span> &
        <span class="italic">Style</span>
      </h1>

      <p
        class="text-lg sm:text-xl mb-10 max-w-2xl mx-auto text-[#94A3B8] leading-relaxed"
      >
        Discover the latest trends in footwear with our exclusive collection of
        shoes for every occasion. From casual sneakers to elegant formal
        options, find your perfect pair today!
      </p>

      <!-- Call to Action Buttons with improved styling -->
      <div class="flex flex-col sm:flex-row gap-5 mb-14">
        <router-link to="/shoes-page" class="hover:text-teal-400">
          <Motion
            :initial="{ opacity: 0, y: 50 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.7 }"
            class="bg-[#14B8A6] hover:bg-[#14B8A6]/90 text-[#F1F5F9] py-4 px-10 rounded-lg text-lg font-semibold transition duration-300 flex items-center justify-center shadow-lg shadow-[#14B8A6]/20"
          >
            <span>Shop Now</span>
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
            </svg> </Motion
        ></router-link>
      </div>

      <!-- Feature badges with improved styling -->
      <div class="flex flex-wrap justify-center gap-4 max-w-2xl">
        <div
          class="flex items-center bg-[#1E293B]/50 backdrop-blur-sm rounded-full px-5 py-3 border border-[#14B8A6]/20"
        >
          <span class="w-2 h-2 bg-[#14B8A6] rounded-full mr-3"></span>
          <span class="text-sm font-medium text-[#F1F5F9]">Free Shipping</span>
        </div>
        <div
          class="flex items-center bg-[#1E293B]/50 backdrop-blur-sm rounded-full px-5 py-3 border border-[#14B8A6]/20"
        >
          <span class="w-2 h-2 bg-[#14B8A6] rounded-full mr-3"></span>
          <span class="text-sm font-medium text-[#F1F5F9]">30-Day Returns</span>
        </div>
        <div
          class="flex items-center bg-[#1E293B]/50 backdrop-blur-sm rounded-full px-5 py-3 border border-[#14B8A6]/20"
        >
          <span class="w-2 h-2 bg-[#14B8A6] rounded-full mr-3"></span>
          <span class="text-sm font-medium text-[#F1F5F9]"
            >Secure Checkout</span
          >
        </div>
      </div>
    </div>

    <!-- Enhanced Scroll Indicator -->
    <!-- <div
      class="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
      <p class="text-[#14B8A6] font-semibold text-sm mt-3">Discover More</p>
      <div
        class="w-10 h-16 border-2 border-[#14B8A6]/70 rounded-full flex justify-center shadow-md shadow-[#14B8A6]/20"
      >
        <div
          class="w-3 h-3 bg-[#14B8A6] rounded-full animate-scroll-down mt-2"
        ></div>
      </div>
    </div> -->
  </section>
</template>

<script>
import { Motion } from "@motionone/vue";

export default {
  components: {
    Motion,
  },
};
</script>

<style scoped>
/* Hero Section Base Styles */
section {
  background-size: cover;
  background-position: center;
  height: 100vh;
}

h1 {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  letter-spacing: -0.02em;
}

/* Animations for the floating elements */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes float-slow {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}

@keyframes float-reverse {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(15px) rotate(-5deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float-reverse 7s ease-in-out infinite;
}

/* Scroll down animation */
@keyframes scroll-down {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  75% {
    transform: translateY(20px);
    opacity: 0;
  }
  76% {
    transform: translateY(0);
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-scroll-down {
  animation: scroll-down 2s ease-in-out infinite;
}

/* Button enhancements */
button,
.bg-[#14B8A6] {
  box-shadow: 0 4px 20px rgba(20, 184, 166, 0.3);
}

.bg-[#14B8A6]:hover,
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(20, 184, 166, 0.5);
  transition: all 0.3s ease-in-out;
}

/* Additional enhancements */
.shadow-glow {
  box-shadow: 0 0 15px rgba(20, 184, 166, 0.4);
}

.bg-gradient-radial {
  background-image: radial-gradient(var(--tw-gradient-stops));
}
</style>
