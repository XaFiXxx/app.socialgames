import React from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { FaUser } from "react-icons/fa"; // Import an icon for user indication

const ShowRate = ({ reviews, userId, token, fetchGame }) => {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleEdit = (review) => {
    console.log("Edit review:", review);
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
              await axios.post(
                `http://localhost:8000/api/games/${gameId}/rate/delete`,
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
                  Edit
                </button>
                <button
                  onClick={() =>
                    handleDelete(userReview.game_id, userReview.id)
                  }
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
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
