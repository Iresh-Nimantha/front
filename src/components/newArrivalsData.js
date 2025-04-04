import Shoe1 from "@/assets/about/shoe1.jpeg";
import Shoe2 from "@/assets/about/shoe2.jpeg";
import Shoe3 from "@/assets/about/shoe3.jpeg";

// newArrivalsData.js - Store all new arrivals data

export const newArrivalsData = [
  {
    id: 1,
    name: "Ultra Boost Running Shoes",
    image: Shoe1, // Imported Shoe1 image
    price: "$149.99",
    originalPrice: "$179.99",
    discount: "17%",
    description:
      "Lightweight and responsive running shoes with enhanced cushioning for maximum comfort during long-distance runs. Features breathable mesh upper and energy-returning boost midsole.",
    colors: ["Black", "White", "Blue"],
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.8,
    reviews: 128,
    isNew: true,
    isBestseller: true,
  },
  {
    id: 2,
    name: "Urban Street Sneakers",
    image: Shoe2, // Imported Shoe2 image
    price: "$89.99",
    originalPrice: "$109.99",
    discount: "18%",
    description:
      "Stylish urban sneakers perfect for everyday wear. Features premium leather upper, cushioned insole, and durable rubber outsole for all-day comfort and trendy street Shop.",
    colors: ["Gray", "Black", "Red"],
    sizes: [6, 7, 8, 9, 10, 11],
    rating: 4.5,
    reviews: 94,
    isNew: true,
    isBestseller: false,
  },
  {
    id: 3,
    name: "Executive Oxford Shoes",
    image: Shoe3, // Imported Shoe3 image
    price: "$129.99",
    originalPrice: "$149.99",
    discount: "13%",
    description:
      "Elegant formal oxford shoes for professional settings. Hand-crafted with genuine leather, featuring classic cap-toe design, comfortable cushioned footbed, and durable leather sole.",
    colors: ["Brown", "Black", "Tan"],
    sizes: [8, 9, 10, 11, 12],
    rating: 4.9,
    reviews: 76,
    isNew: true,
    isBestseller: true,
  },
  {
    id: 4,
    name: "Pro Performance Basketball Shoes",
    image: Shoe1,
    price: "$159.99",
    originalPrice: "$189.99",
    discount: "16%",
    description:
      "High-performance basketball shoes designed for serious players. Features advanced ankle support, responsive cushioning, and superior traction pattern for quick cuts and jumps.",
    colors: ["Red/Black", "Blue/White", "All Black"],
    sizes: [8, 9, 10, 11, 12, 13],
    rating: 4.7,
    reviews: 112,
    isNew: true,
    isBestseller: false,
  },
  {
    id: 5,
    name: "Classic Canvas Low Tops",
    image: Shoe2,
    price: "$59.99",
    originalPrice: "$69.99",
    discount: "14%",
    description:
      "Timeless canvas sneakers for casual everyday Shop. Features durable canvas upper, classic rubber toe cap, and comfortable insole perfect for all-day wear.",
    colors: ["White", "Black", "Navy", "Red"],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    rating: 4.6,
    reviews: 205,
    isNew: true,
    isBestseller: true,
  },
  {
    id: 6,
    name: "All-Terrain Hiking Boots",
    image: Shoe3,
    price: "$139.99",
    originalPrice: "$169.99",
    discount: "18%",
    description:
      "Durable hiking boots designed for challenging terrain. Features waterproof construction, superior ankle support, aggressive traction outsole, and cushioned midsole for trail comfort.",
    colors: ["Brown/Green", "Gray/Orange", "Black"],
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.9,
    reviews: 89,
    isNew: true,
    isBestseller: false,
  },
  {
    id: 7,
    name: "Slip-On Comfort Loafers",
    image: Shoe1,
    price: "$79.99",
    originalPrice: "$99.99",
    discount: "20%",
    description:
      "Comfortable slip-on loafers perfect for casual and semi-formal occasions. Features soft leather upper, memory foam insole, and flexible construction for ultimate walking comfort.",
    colors: ["Brown", "Black", "Navy"],
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.7,
    reviews: 142,
    isNew: true,
    isBestseller: true,
  },
  {
    id: 8,
    name: "Lightweight Training Shoes",
    image: Shoe2,
    price: "$119.99",
    originalPrice: "$139.99",
    discount: "14%",
    description:
      "Versatile training shoes ideal for gym workouts and fitness classes. Features breathable knit upper, responsive cushioning, and stable platform for varied training activities.",
    colors: ["Black/White", "Gray/Blue", "All Black"],
    sizes: [7, 8, 9, 10, 11, 12],
    rating: 4.6,
    reviews: 98,
    isNew: true,
    isBestseller: false,
  },
];

// Helper functions
export const getNewArrivalsCount = () => newArrivalsData.length;

export const getFeaturedArrivals = (count = 4) => {
  return newArrivalsData.slice(0, count);
};

export const getBestsellers = () => {
  return newArrivalsData.filter((product) => product.isBestseller);
};

export const getProductById = (id) => {
  return newArrivalsData.find((product) => product.id === id);
};

export const getRelatedProducts = (id, count = 3) => {
  const currentProduct = getProductById(id);
  if (!currentProduct) return [];

  // Filter out current product and return similar items
  return newArrivalsData
    .filter((product) => product.id !== id)
    .sort(() => 0.5 - Math.random()) // Simple random shuffle
    .slice(0, count);
};
