import React, { useState } from "react";
import api from '../../axiosConfig'; // Assurez-vous que le chemin est correct
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaUser, FaStar } from "react-icons/fa"; // Import an icon for user indication

const ShowRate = ({ reviews, userId, token, fetchGame }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(0);
  const [editReview, setEditReview] = useState("");
  const [hover, setHover] = useState(null);
  const [editReviewId, setEditReviewId] = useState(null);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleEdit = (review) => {
    setIsEditing(true);
    setEditRating(review.rating);
    setEditReview(review.review);
    setEditReviewId(review.id);
  };

  const handleUpdate = async (gameId) => {
    try {
      await api.post(
        `/api/games/${gameId}/rate/update`,
        {
          review_id: editReviewId,
          rating: editRating,
          review: editReview,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsEditing(false);
      fetchGame(); // Fetch the game data again to update the reviews
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };

  const handleDelete = async (gameId, reviewId) => {
    confirmAlert({
      title: "Confirmer la suppression",
      message: "Êtes-vous sûr de vouloir supprimer cet avis ?",
      buttons: [
        {
          label: "Oui",
          onClick: async () => {
            try {
              await api.post(
                `/api/games/${gameId}/rate/delete`,
                { review_id: reviewId },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              fetchGame(); // Fetch the game data again to update the reviews
            } catch (error) {
              console.error("Failed to delete review:", error);
            }
          },
        },
        {
          label: "Non",
          onClick: () => {},
        },
      ],
    });
  };

  // Séparer l'avis de l'utilisateur connecté des autres avis
  const userReview = reviews.find((review) => review.user_id === userId);
  const otherReviews = reviews.filter((review) => review.user_id !== userId);

  return (
    <div className="reviews-container flex flex-col mt-2">
      <h2 className="text-xl font-bold mb-4">Avis</h2>
      {reviews.length === 0 ? (
        <p>Pas d'avis pour ce jeu.</p>
      ) : (
        <>
          {userReview && (
            <div
              key={userReview.id}
              className="review-item p-4 border-b border-gray-700 bg-gray-800 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-2">
                <FaUser className="text-blue-500 mr-2" />
                <p className="text-lg font-semibold">Votre avis</p>
              </div>
              {isEditing ? (
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((star, index) => {
                      const ratingValue = index + 1;
                      return (
                        <label key={index}>
                          <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setEditRating(ratingValue)}
                            className="hidden"
                          />
                          <FaStar
                            className={`cursor-pointer text-2xl ${
                              ratingValue <= (hover || editRating)
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
                    value={editReview}
                    onChange={(e) => setEditReview(e.target.value)}
                  ></textarea>
                  <div className="mt-2">
                    <button
                      onClick={() => handleUpdate(userReview.game_id)}
                      className="mr-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p>
                    <strong>Date :</strong> {formatDate(userReview.created_at)}
                  </p>
                  <p>
                    <strong>Note :</strong> {userReview.rating} / 5
                  </p>
                  <p>
                    <strong>Commentaire :</strong> {userReview.review}
                  </p>
                  <div className="mt-2">
                    <button
                      onClick={() => handleEdit(userReview)}
                      className="mr-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(userReview.game_id, userReview.id)
                      }
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                      Supprimer
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
          {otherReviews.map((review) => (
            <div
              key={review.id}
              className="review-item p-4 border-b border-gray-700 rounded-lg"
            >
              <p>
                <strong>User :</strong>{" "}
                {review.user ? review.user.username : "Anonymous"}
              </p>
              <p>
                <strong>Date :</strong> {formatDate(review.created_at)}
              </p>
              <p>
                <strong>Note :</strong> {review.rating} / 5
              </p>
              <p>
                <strong>Commentaire :</strong> {review.review}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ShowRate;
