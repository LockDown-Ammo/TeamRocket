import { useEffect, useState } from "react";
import api from "../utils/api";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const res = await api.get("/feed");
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load feed");
      setLoading(false);
    }
  };

  const handleRating = async (postId, value) => {
    try {
      await api.post(`/posts/${postId}/rate`, { value });
      fetchFeed(); // refresh after rating
    } catch (err) {
      alert("Rating failed");
    }
  };

  const handleReport = async (postId, reason) => {
    try {
      await api.post(`/posts/${postId}/report`, { reason });
      alert("Reported successfully");
    } catch (err) {
      alert("Report failed");
    }
  };

  if (loading)
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="bg-black text-red-500 min-h-screen flex items-center justify-center">
        {error}
      </div>
    );

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl mb-6 text-purple-500">Pokemon Discoveries</h1>

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-gray-900 rounded-xl p-4 mb-6 shadow-lg"
        >
          <img
            src={post.imageUrl}
            alt="pokemon"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />

          <h2 className="text-xl font-bold">{post.pokemonName}</h2>
          <p className="text-gray-400">Type: {post.type}</p>
          <p className="text-gray-400">Location: {post.location}</p>
          <p className="text-gray-400">Size: {post.size}</p>
          <p className="mt-2">{post.description}</p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleRating(post._id, 1)}
              className="bg-red-600 px-3 py-1 rounded"
            >
              1⭐
            </button>
            <button
              onClick={() => handleRating(post._id, 5)}
              className="bg-green-600 px-3 py-1 rounded"
            >
              5⭐
            </button>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => handleReport(post._id, "misinformation")}
              className="bg-yellow-600 px-3 py-1 rounded"
            >
              Report Misinformation
            </button>
            <button
              onClick={() => handleReport(post._id, "profanity")}
              className="bg-gray-700 px-3 py-1 rounded"
            >
              Report Profanity
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;