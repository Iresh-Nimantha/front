// reviews.js - Separate file for storing review data
export const reviews = [
  {
    id: 1,
    name: "John Doe",
    date: "March 20, 2025",
    text: "Amazing quality shoes! Super comfortable and stylish. Highly recommend!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    verified: true,
    product: "Ultra Boost Pro Running Shoes",
  },
  {
    id: 2,
    name: "Jane Smith",
    date: "April 5, 2025",
    text: "Great collection and fast delivery. Will definitely buy again!",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    verified: true,
    product: "Everyday Comfort Sneakers",
  },
  {
    id: 3,
    name: "David Brown",
    date: "April 15, 2025",
    text: "The best sneakers I've ever owned. Worth every penny!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    verified: true,
    product: "Air Max Deluxe",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    date: "March 28, 2025",
    text: "These shoes provide exceptional support for my daily workouts. The materials are high-quality and they look fantastic!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    verified: true,
    product: "TrailBlazer Hiking Shoes",
  },
  {
    id: 5,
    name: "Michael Chen",
    date: "April 1, 2025",
    text: "Perfect fit and amazing design. Received many compliments already!",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    verified: true,
    product: "Classic Canvas Low-tops",
  },
];

// You can add filtering/sorting helper functions here
export const getTopRatedReviews = () => {
  return [...reviews].sort((a, b) => b.rating - a.rating);
};

export const getRecentReviews = () => {
  return [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getReviewsByRating = (rating) => {
  return reviews.filter((review) => review.rating === rating);
};
