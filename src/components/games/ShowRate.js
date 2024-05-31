import React from "react";
import axios from "axios";

const ShowRate = ({ reviews, userId, token, fetchGame }) => {
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleEdit = (review) => {
    // Implémentez ici la logique pour éditer l'évaluation
    // Cela pourrait impliquer de naviguer vers un formulaire de modification avec les données de l'évaluation
    console.log("Edit review:", review);
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:8000/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Appel à fetchGame pour rafraîchir les données du jeu après suppression de l'évaluation
      fetchGame();
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  return (
    <div className="reviews-container flex flex-col mt-2">
      <h2 className="text-xl font-bold mb-4">Avis</h2>
      {reviews.length === 0 ? (
        <p>Pas d'avis pour ce jeu.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            className="review-item p-4 border-b border-gray-700"
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
            {review.user_id === userId && ( // Vérifiez si l'utilisateur connecté est celui qui a laissé l'évaluation
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(review)}
                  className="mr-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ShowRate;
