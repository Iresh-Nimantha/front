// discounts.js - Store all discount data

import Shoe1 from "@/assets/discount/s1.jpeg";
import Shoe2 from "@/assets/discount/s2.jpeg";
import Shoe3 from "@/assets/discount/s3.jpeg";
import Shoe4 from "@/assets/discount/s4.jpeg";
import Shoe5 from "@/assets/discount/s5.jpeg";

export const discountOffers = [
  {
    id: 1,
    title: "Summer Sale - 50% Off",
    discount: "Up to 50% off on all summer collections!",
    image: Shoe1, // Use imported Shoe1
    code: "SUMMER50",
    validUntil: "2025-06-30",
    categories: ["casual", "sports"],
  },
  {
    id: 2,
    title: "Buy 1 Get 1 Free",
    discount: "Exclusive offer on selected brands!",
    image: Shoe2, // Use imported Shoe2
    code: "BOGO2025",
    validUntil: "2025-05-15",
    categories: ["premium", "formal"],
  },
  {
    id: 3,
    title: "Weekend Special - 30% Off",
    discount: "Enjoy 30% off on all sports shoes this weekend!",
    image: Shoe3, // Use imported Shoe3
    code: "WEEKEND30",
    validUntil: "2025-04-30",
    categories: ["sports", "running"],
  },
  {
    id: 4,
    title: "Flash Sale - 40% Off",
    discount: "Limited time offer on exclusive collections!",
    image: Shoe4, // Use imported Shoe4
    code: "FLASH40",
    validUntil: "2025-04-10",
    categories: ["limited", "exclusive"],
  },
  {
    id: 5,
    title: "New Arrivals - 20% Off",
    discount: "Get 20% off on all new season arrivals!",
    image: Shoe5, // Use imported Shoe5
    code: "NEW20",
    validUntil: "2025-05-20",
    categories: ["new", "trending"],
  },
];

// Function to fetch all discounts
export const getAllDiscounts = () => {
  return discountOffers;
};

// Function to filter discounts by category
export const getDiscountsByCategory = (category) => {
  return discountOffers.filter((offer) =>
    offer.categories.includes(category.toLowerCase())
  );
};

// Function to get a discount by id
export const getDiscountById = (id) => {
  return discountOffers.find((offer) => offer.id === id);
};
