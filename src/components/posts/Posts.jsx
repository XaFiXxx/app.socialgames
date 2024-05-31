import React, { useState } from "react";
import axios from "axios";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import { CommentInput, CommentList } from "./comments";

// Post Component
function Post({ post }) {
  const [isLiked, setIsLiked] = useState(post.is_liked || false);
  const [likes, setLikes] = useState(post.likes_count || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [showMoreComments, setShowMoreComments] = useState(false);

  const addComment = async (text) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/post/${post.id}/comment`,
        { content: text },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setComments([response.data.comment, ...comments]); // Ajouter le nouveau commentaire en haut
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/post/${post.id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.message === "Post liked") {
        setIsLiked(true);
        setLikes(likes + 1);
      } else {
        setIsLiked(false);
        setLikes(likes - 1);
      }
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  const handleShowMoreComments = () => {
    setShowMoreComments(true);
  };

  // Inverser les commentaires avant de les passer à CommentList
  const displayedComments = comments.slice().reverse().slice(0, showMoreComments ? comments.length : 3);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <p className="text-gray-600">{post.content}</p>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleLike}
          className={`flex items-center ${
            isLiked ? "text-blue-500" : "text-gray-500"
          } hover:text-blue-600 transition-colors duration-300`}
        >
          <FaThumbsUp className="mr-2" />
          <span>{likes}</span>
        </button>
        <button className="flex items-center text-green-500 hover:text-green-600 transition-colors duration-300">
          <FaComment className="mr-2" />
          <span>{comments.length}</span>
        </button>
      </div>
      <CommentInput onSubmit={addComment} />
      <CommentList comments={displayedComments} />
      {comments.length > 3 && !showMoreComments && (
        <button
          className="text-blue-500 hover:text-blue-700 mt-2"
          onClick={handleShowMoreComments}
        >
          Voir plus de commentaires
        </button>
      )}
    </div>
  );
}

// Posts Component
function Posts({ posts }) {
  if (!Array.isArray(posts) || !posts.length) {
    return (
      <p className="text-gray-300 text-center mt-4">Aucun post à afficher.</p>
    );
  }

  return (
    <div className="container mx-auto mt-8 max-w-4xl">
      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
