import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !review || !rating) {
      alert("Please fill all fields");
      return;
    }

    const newReview = {
      id: Date.now(),
      username,
      review,
      rating,
    };

    setReviews([...reviews, newReview]);

    // clear form
    setUsername("");
    setReview("");
    setRating("");
  };

  return (
    <div className="container">
      <h1>Review App</h1>

      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <textarea
          placeholder="Write your review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Select Rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>

        <button type="submit">Submit Review</button>
      </form>

      <div className="reviews">
        {reviews.map((item) => (
          <div key={item.id} className="review-card">
            <h3>{item.username}</h3>
            <p>{item.review}</p>
            <span>Rating: {item.rating} ⭐</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
