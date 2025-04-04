<template>
  <div
    class="fixed inset-y-0 right-0 w-full md:w-96 z-50 transform transition-transform duration-300 ease-in-out"
    style="height: 100vh; display: flex; flex-direction: column"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white/80 backdrop-blur-lg border-b border-gray-300 p-4"
      style="flex-shrink: 0"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-bold text-gray-800">
          Your Cart ({{ cartItems.length }})
        </h2>
        <button
          @click="$emit('close')"
          class="p-2 text-gray-600 hover:text-gray-900"
        >
          <IconX size="24" />
        </button>
      </div>
    </div>

    <div
      class="overflow-y-auto bg-white/70 backdrop-blur-lg"
      style="flex: 1 1 auto"
    >
      <div class="p-4">
        <div
          v-for="(item, index) in cartItems"
          :key="item.id"
          class="flex items-center gap-4 py-4 border-b border-gray-300 last:border-b-0"
        >
          <div
            class="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center"
          >
            <img
              :src="item.image"
              alt="Product Image"
              class="w-full h-full object-cover rounded-md"
            />
          </div>
          <div class="flex-1">
            <h3 class="font-medium text-gray-800">{{ item.name }}</h3>
            <p class="text-sm text-gray-600">
              Size: {{ item.selectedSize }} | Color: {{ item.selectedColor }}
            </p>
            <div class="flex justify-between items-center mt-2">
              <div class="flex items-center gap-2">
                <button
                  @click="updateQuantity(item, 'decrease')"
                  class="w-6 h-6 bg-gray-300 rounded flex items-center justify-center text-gray-800 hover:bg-gray-400"
                >
                  -
                </button>
                <span class="text-gray-800">{{ item.quantity }}</span>
                <button
                  @click="updateQuantity(item, 'increase')"
                  class="w-6 h-6 bg-gray-300 rounded flex items-center justify-center text-gray-800 hover:bg-gray-400"
                >
                  +
                </button>
              </div>
              <span class="font-medium text-teal-600"
                >Per Price: $ {{ item.price }}</span
              >
              <button
                @click="removeItem(item)"
                class="text-red-600 hover:text-red-800"
              >
                <IconTrash size="20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-white/80 backdrop-blur-lg border-t border-gray-300 p-4"
      style="flex-shrink: 0"
    >
      <div class="flex justify-between py-2 text-gray-800">
        <span>Subtotal</span>
        <span class="font-medium">{{ "$" + subtotal.toFixed(2) }}</span>
      </div>

      <div class="flex justify-between py-2 font-bold text-gray-900">
        <span>Total</span>
        <span class="text-teal-600">{{ "$" + subtotal.toFixed(2) }}</span>
      </div>

      <button
        @click="checkout"
        class="w-full mt-4 py-3 bg-teal-500 text-white font-semibold rounded hover:bg-teal-600 transition-colors duration-300"
      >
        Checkout
      </button>
      <button
        @click="$emit('close')"
        class="w-full mt-2 py-3 bg-transparent border border-gray-400 text-gray-800 font-medium rounded hover:bg-gray-200 transition-colors duration-300"
      >
        Continue Shopping
      </button>
    </div>
  </div>
</template>
<script>
import { loadStripe } from "@stripe/stripe-js";
import { X as IconX, Trash as IconTrash } from "lucide-vue-next";

export default {
  name: "CartPage",
  components: {
    IconX,
    IconTrash,
  },
  data() {
    return {
      cartItems: JSON.parse(localStorage.getItem("cart")) || [],
      stripe: null,
      apiUrl: "http://localhost:5000", // Ensure this matches the backend URL
    };
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((total, item) => {
        const price =
          typeof item.price === "string"
            ? parseFloat(item.price.replace("$", ""))
            : item.price;
        return total + price * item.quantity;
      }, 0);
    },
  },
  methods: {
    async checkout() {
      // Get the current frontend URL with port
      const frontendUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
      console.log(`Frontend URL: ${frontendUrl}`);

      this.stripe = await loadStripe(
        "pk_test_51R9YqDIWllXti4K70ZuANS0aCAG3SMyJuTkvhjE1CsSpp27b18VQeZaV9j8WrKdmURVaKmexnJw60XifmBgpLEau00oBhMkZa9"
      );

      try {
        console.log(
          `Sending POST request to: ${this.apiUrl}/create-checkout-session`
        );
        const response = await fetch(`${this.apiUrl}/create-checkout-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems: this.cartItems,
            subtotal: this.subtotal + 9.99, // Adding shipping/taxes here
            success_url: `${frontendUrl}/success`, // Dynamically set the success URL based on frontend URL
            cancel_url: `${frontendUrl}/cancel`, // Optionally set cancel URL if needed
          }),
        });

        if (!response.ok) {
          console.error("HTTP error:", response.statusText);
          return;
        }

        const session = await response.json();

        if (session.error) {
          console.error("Stripe Session Error:", session.error);
          return;
        }

        // Redirect to Stripe Checkout
        const result = await this.stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error("Error during checkout:", result.error);
        }
      } catch (error) {
        console.error("Error with checkout session:", error);
      }
    },
    updateQuantity(item, action) {
      const index = this.cartItems.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        if (action === "increase") {
          this.cartItems[index].quantity++;
        } else if (
          action === "decrease" &&
          this.cartItems[index].quantity > 1
        ) {
          this.cartItems[index].quantity--;
        }
        localStorage.setItem("cart", JSON.stringify(this.cartItems));
      }
    },
    removeItem(item) {
      this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
  },
};
</script>
