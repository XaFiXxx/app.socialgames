import React, { useState, useEffect, useRef } from "react";

export function CommentModal({ show, onClose, onSubmit }) {
  const [comment, setComment] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("keydown", handleKeyDown);
      modalRef.current?.querySelector("textarea").focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, onClose]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    onSubmit(comment);
    setComment("");
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      >
        <div className="text-right">
          <button
            className="text-gray-600 hover:text-gray-700"
            onClick={onClose}
          >
            [X]
          </button>
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Ajouter un commentaire
          </h3>
          <div className="mt-2 px-7 py-3">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Votre commentaire..."
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </div>
          <div className="items-center px-4 py-3">
            <button
              className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              onClick={handleCommentSubmit}
            >
              Poster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommentList({ comments }) {
  return (
    <div className="mt-4">
      {comments.map((comment) => (
        <div key={comment.id} className="border-t border-gray-300 pt-2">
          <p className="text-gray-600">
            <strong>{comment.user.username}</strong>: {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}
