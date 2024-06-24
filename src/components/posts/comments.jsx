import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importer Link de react-router-dom

export function CommentInput({ onSubmit }) {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment("");
    }
  };

  return (
    <div className="flex flex-col mt-4">
      <textarea
        className="w-full p-2 border border-gray-300 text-gray-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-300"
        placeholder="Ajouter un commentaire..."
        value={comment}
        onChange={handleCommentChange}
      ></textarea>
      <button
        className="mt-2 px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={handleCommentSubmit}
      >
        Poster
      </button>
    </div>
  );
}

export function CommentList({ comments }) {
  return (
    <div className="mt-4 space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="border-t border-gray-300 pt-2">
          <p className="text-gray-600">
            <Link to={`/profile/${comment.user.id}/${comment.user.username}`}>
              <strong className="text-blue-500 hover:underline">{comment.user.username}</strong>
            </Link>
            : {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}
