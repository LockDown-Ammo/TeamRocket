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
      setPosts(res.data.posts);
    } catch (err) {
      setError("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (postId, value) => {
    try {
      await api.post(`/posts/${postId}/rate`, { value });
      fetchFeed();
    } catch (err) {
      alert("Rating failed");
    }
  };

  const handleReport = async (postId, reason) => {
    if (!reason) return;
    try {
      await api.post(`/posts/${postId}/report`, { reason });
      alert("Reported successfully");
    } catch (err) {
      alert("Report failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-700 via-black to-red-900 text-white">
        Loading Pokédex...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-700 via-black to-red-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-10 text-center text-yellow-400">
        Pokémon Discovery Network
      </h1>

      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white text-black rounded-2xl shadow-2xl mb-10 p-6 border-4 border-red-600"
        >
          <div className="flex flex-col md:flex-row gap-6">

            {/* LEFT SIDE - DATA */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-red-600 mb-2">
                {post.pokemonName}
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                Discovered by: <span className="font-semibold">{post.author?.username}</span>
              </p>

              <div className="space-y-1">
                <p><strong>Type:</strong> {post.type}</p>
                <p><strong>Location:</strong> {post.location}</p>
                <p><strong>Size:</strong> {post.size}</p>
                <p><strong>Health:</strong> {post.health}</p>
                <p><strong>Level:</strong> {post.level}</p>
                <p><strong>Held Item:</strong> {post.heldItem}</p>
              </div>

              <p className="mt-4 text-gray-700">
                {post.description}
              </p>

              {/* ⭐ Star Rating */}
              <div className="mt-6">
                <p className="mb-2 font-semibold">Rate this Pokémon:</p>
                <div className="flex gap-1 text-2xl cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRating(post._id, star)}
                      className="text-yellow-400 hover:scale-110 transition-transform"
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Report */}
              <div className="mt-6">
                <select
                  onChange={(e) => handleReport(post._id, e.target.value)}
                  className="border border-red-500 p-2 rounded"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Report Post
                  </option>
                  <option value="misinformation">Misinformation</option>
                  <option value="profanity">Profanity</option>
                  <option value="spam">Spam</option>
                </select>
              </div>
            </div>

            {/* RIGHT SIDE - IMAGE */}
            <div className="flex-1 flex items-center justify-center">
              <img
                src={post.imageURL}
                alt={post.pokemonName}
                className="w-72 h-72 object-contain drop-shadow-2xl"
              />
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;