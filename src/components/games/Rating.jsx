import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const Rating = ({
  gameId,
  userId,
  initialRating,
  initialReview,
  token,
  fetchGame,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [review, setReview] = useState(initialReview);
  const [hover, setHover] = useState(null);

  const submitRatingAndReview = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/games/${gameId}/rate`,
        { game_id: gameId, user_id: userId, rating, review },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Rating response:", response.data);
      fetchGame(); // Fetch the game data again to update the reviews
    } catch (error) {
      console.error("Failed to submit rating and review:", error);
    }
  };

  return (
    <div className="flex flex-col mt-2">
      <div className="flex items-center">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                className="hidden"
              />
              <FaStar
                className={`cursor-pointer text-2xl ${
                  ratingValue <= (hover || rating)
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <textarea
        className="mt-4 p-2 w-full bg-gray-800 text-white rounded"
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>
      <button
        onClick={submitRatingAndReview}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        Submit
      </button>
    </div>
  );
};

export default Rating;
