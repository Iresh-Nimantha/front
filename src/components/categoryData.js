// categoryData.js - Store all shoe category data
import Shoe1 from "@/assets/category/s1.jpeg";
import Shoe2 from "@/assets/category/s2.jpeg";
import Shoe3 from "@/assets/category/s3.jpeg";

export const categories = [
  {
    name: "Men's Shoes",
    products: [
      {
        id: 1,
        name: "Running Shoes",
        image: Shoe1, // Use imported Shoe1
        price: "$129.99",
        sale: true,
      },
      {
        id: 2,
        name: "Casual Sneakers",
        image: Shoe2, // Use imported Shoe2
        price: "$89.99",
        sale: false,
      },
      {
        id: 3,
        name: "Formal Shoes",
        image: Shoe3, // Use imported Shoe3
        price: "$149.99",
        sale: false,
      },
      {
        id: 4,
        name: "Hiking Boots",
        image: Shoe1, // Use imported Shoe1 again (or change to another image if needed)
        price: "$179.99",
        sale: true,
      },
    ],
  },
  {
    name: "Women's Shoes",
    products: [
      {
        id: 1,
        name: "High Heels",
        image: Shoe2, // Use imported Shoe2
        price: "$119.99",
        sale: false,
      },
      {
        id: 2,
        name: "Boots",
        image: Shoe3, // Use imported Shoe3
        price: "$159.99",
        sale: true,
      },
      {
        id: 3,
        name: "Sandals",
        image: Shoe1, // Use imported Shoe1
        price: "$69.99",
        sale: false,
      },
      {
        id: 4,
        name: "Ballet Flats",
        image: Shoe2, // Use imported Shoe2
        price: "$79.99",
        sale: false,
      },
    ],
  },
  {
    name: "Kids' Shoes",
    products: [
      {
        id: 1,
        name: "Sneakers",
        image: Shoe3, // Use imported Shoe3
        price: "$59.99",
        sale: false,
      },
      {
        id: 2,
        name: "Slippers",
        image: Shoe1, // Use imported Shoe1
        price: "$39.99",
        sale: true,
      },
      {
        id: 3,
        name: "Boots",
        image: Shoe2, // Use imported Shoe2
        price: "$69.99",
        sale: false,
      },
      {
        id: 4,
        name: "School Shoes",
        image: Shoe3, // Use imported Shoe3
        price: "$49.99",
        sale: false,
      },
    ],
  },
  {
    name: "Sport Shoes",
    products: [
      {
        id: 1,
        name: "Basketball",
        image: Shoe1, // Use imported Shoe1
        price: "$129.99",
        sale: true,
      },
      {
        id: 2,
        name: "Soccer",
        image: Shoe2, // Use imported Shoe2
        price: "$109.99",
        sale: false,
      },
      {
        id: 3,
        name: "Tennis",
        image: Shoe3, // Use imported Shoe3
        price: "$99.99",
        sale: false,
      },
      {
        id: 4,
        name: "Training",
        image: Shoe1, // Use imported Shoe1
        price: "$119.99",
        sale: true,
      },
    ],
  },
];

// Optional: Add helper functions if needed
export const getDefaultCategory = () => categories[0].name;

export const getCategoryByName = (categoryName) => {
  return categories.find((cat) => cat.name === categoryName);
};

export const getAllCategoryNames = () => {
  return categories.map((cat) => cat.name);
};
