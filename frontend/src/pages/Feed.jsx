import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ratings, setRatings] = useState({});
  const navigate = useNavigate();

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
      await api.post(`/post/${postId}/rate`, { value });

      setRatings((prev) => ({
        ...prev,
        [postId]: value,
      }));

      alert("Rating submitted successfully!");
    } catch (err) {
      alert("Rating failed");
    }
  };

  const handleReport = async (postId, reason) => {
    if (!reason) return;
    try {
      await api.post(`/post/${postId}/report`, { reason });
      alert("Reported successfully");
    } catch (err) {
      alert("Report failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        Loading Pokédex...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/bg2.png')" }}
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 p-6">

        {/* NAVBAR */}
        <div className="flex justify-between items-center mb-10 bg-black/50 backdrop-blur-md p-4 rounded-xl border border-yellow-400 shadow-lg">
          <h1 className="text-2xl font-bold text-yellow-400">
            Pokémon Discovery Network
          </h1>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/create")}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              + Add Post
            </button>

            <button
              onClick={() => navigate("/help")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Help
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* POSTS */}
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative rounded-2xl shadow-2xl mb-12 border-4 border-red-600 overflow-hidden"
          >
            {/* Card Background */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: "url('/card-bg.jpg')" }}
            ></div>

            {/* Content */}
            <div className="relative z-10 bg-white/90 backdrop-blur-sm p-8 text-black">
              <div className="flex flex-col md:flex-row gap-8">

                {/* LEFT */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-red-600 mb-2">
                    {post.pokemonName}
                  </h2>

                  <p className="text-sm text-gray-600 mb-4">
                    Discovered by:{" "}
                    <span className="font-semibold">
                      {post.author?.username}
                    </span>
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

                  {/* Rating */}
                  <div className="mt-6">
                    <p className="mb-2 font-semibold text-gray-800">
                      Rate:
                    </p>

                    <div className="flex gap-1 text-3xl cursor-pointer">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => handleRating(post._id, star)}
                          className={`transition-transform hover:scale-125 ${
                            ratings[post._id] >= star
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }`}
                        >
                          {ratings[post._id] >= star ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Report */}
                  <div className="mt-6">
                    <select
                      onChange={(e) =>
                        handleReport(post._id, e.target.value)
                      }
                      className="border-2 border-red-500 p-2 rounded bg-white"
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

                {/* RIGHT */}
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={post.imageUrl}
                    alt={post.pokemonName}
                    className="w-80 h-80 object-contain drop-shadow-2xl"
                  />
                </div>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Feed;