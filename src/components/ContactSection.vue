<template>
  <section
    id="contact"
    class="relative py-16 bg-[#121212] text-[#F1F5F9] overflow-hidden min-h-screen flex items-center"
  >
    <!-- Subtle background accent -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-[#14B8A6]/20 to-transparent"
      ></div>
      <div
        class="absolute top-0 left-0 w-1/4 h-1/4 bg-gradient-radial from-[#0F172A]/30 to-transparent"
      ></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-2xl mx-auto">
        <!-- Simple Header -->
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-[#F1F5F9] mb-3">Get in Touch</h2>
          <p class="text-[#94A3B8]">
            Have questions about our products? Send us a message.
          </p>
        </div>

        <!-- Simplified Form -->
        <Motion
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          class="p-8 rounded-xl bg-[#1E293B]/60 backdrop-blur-sm border border-[#14B8A6]/10 shadow-lg"
        >
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-[#94A3B8] text-sm mb-2">Name</label>
                <input
                  type="text"
                  v-model="form.name"
                  placeholder="Your name"
                  class="w-full p-3 bg-[#0F172A]/80 text-[#F1F5F9] rounded-md border border-[#14B8A6]/20 focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all"
                />
              </div>

              <div>
                <label class="block text-[#94A3B8] text-sm mb-2">Email</label>
                <input
                  type="email"
                  v-model="form.email"
                  placeholder="your@email.com"
                  class="w-full p-3 bg-[#0F172A]/80 text-[#F1F5F9] rounded-md border border-[#14B8A6]/20 focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all"
                />
              </div>
            </div>

            <div>
              <label class="block text-[#94A3B8] text-sm mb-2">Message</label>
              <textarea
                v-model="form.message"
                rows="4"
                placeholder="Your message here..."
                class="w-full p-3 bg-[#0F172A]/80 text-[#F1F5F9] rounded-md border border-[#14B8A6]/20 focus:outline-none focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6] transition-all"
              ></textarea>
            </div>

            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id="consent"
                v-model="form.consent"
                class="w-4 h-4 checkbox-custom"
              />
              <label for="consent" class="text-sm text-[#94A3B8]">
                I agree to receive email communications
              </label>
            </div>

            <button
              type="submit"
              class="submit-button w-full py-3 bg-[#14B8A6] text-[#F1F5F9] font-medium rounded-md hover:bg-[#14B8A6]/90 transition-all flex items-center justify-center"
            >
              <span>Send Message</span>
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>

            <!-- Simple contact info -->
            <div
              class="flex justify-center pt-4 border-t border-[#14B8A6]/10 mt-6"
            >
              <a
                href="mailto:contact@example.com"
                class="text-[#14B8A6] text-sm hover:underline mx-3"
                >contact@example.com</a
              >
              <span class="text-[#94A3B8]">|</span>
              <a
                href="tel:+1234567890"
                class="text-[#14B8A6] text-sm hover:underline mx-3"
                >+1 (234) 567-890</a
              >
            </div>
          </form>
        </Motion>
      </div>
    </div>
  </section>
</template>

<script>
import { Motion } from "@motionone/vue";

export default {
  components: {
    Motion,
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
        consent: false,
      },
    };
  },
  methods: {
    submitForm() {
      alert(`Thank you, ${this.form.name}! Your message has been sent.`);
      this.form.name = "";
      this.form.email = "";
      this.form.message = "";
      this.form.consent = false;
    },
  },
};
</script>

<style scoped>
/* Background gradient effect */
.bg-gradient-radial {
  background-image: radial-gradient(var(--tw-gradient-stops));
}

/* Input focus effect */
input:focus,
textarea:focus {
  box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.2);
}

/* Fixed submit button shadow */
.submit-button {
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.2);
}

/* Custom checkbox styling */
.checkbox-custom {
  accent-color: #14b8a6;
}

/* For browsers that don't support accent-color */
.checkbox-custom:checked {
  background-color: #14b8a6;
  border-color: #14b8a6;
}
</style>
