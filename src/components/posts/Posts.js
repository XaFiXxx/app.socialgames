function Posts({ posts }) {
  // Vérification améliorée pour s'assurer que posts est bien un tableau
  if (!Array.isArray(posts) || !posts.length) {
    return <p className="text-gray-300 text-center mt-4">Aucun post à afficher.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl text-gray-200 font-bold mb-4">Vos Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <p className="text-gray-300">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
