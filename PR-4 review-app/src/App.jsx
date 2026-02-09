import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [stars, setStars] = useState("");
  const [reviewList, setReviewList] = useState([]);

  // error state
  const [errors, setErrors] = useState({});

  const submitReview = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!text) newErrors.text = "Review is required";
    if (!stars) newErrors.stars = "Rating is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const reviewData = {
      id: Date.now(),
      user: name,
      message: text,
      rating: stars,
    };

    setReviewList([...reviewList, reviewData]);

    setName("");
    setText("");
    setStars("");
  };

  return (
    <div className="main">
      {/* Form Section */}
      <div className="box">
        <h1 className="title">User Reviews</h1>

        <form className="reviewForm" onSubmit={submitReview}>
          <div className="inputBox">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
            />
            <label>Your Name</label>
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="inputBox">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder=" "
            />
            <label>Your Review</label>
            {errors.text && <p className="error">{errors.text}</p>}
          </div>

          <div className="inputBox">
            <select value={stars} onChange={(e) => setStars(e.target.value)}>
              <option value=""></option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
            <label>Rating</label>
            {errors.stars && <p className="error">{errors.stars}</p>}
          </div>

          <button type="submit">Submit Review</button>
        </form>
      </div>

      {/* Cards Section – full width */}
      <div className="reviewSection">
        {reviewList.map((item) => (
          <div key={item.id} className="card">
            <h3>{item.user}</h3>
            <p>{item.message}</p>
            <span>{item.rating} ⭐</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
