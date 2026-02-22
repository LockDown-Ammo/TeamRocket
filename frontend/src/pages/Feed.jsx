import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ratings, setRatings] = useState({});
  const [expandedPostId, setExpandedPostId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const res = await api.get("/feed");
      setPosts(res.data.posts);
    } catch {
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
    } catch {
      alert("Rating failed");
    }
  };

  const handleReport = async (postId, reason) => {
    if (!reason) return;
    try {
      await api.post(`/post/${postId}/report`, { reason });
      alert("Reported successfully");
    } catch {
      alert("Report failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const togglePost = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black text-2xl">
        Loading Pokédex...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500 text-2xl">
        {error}
      </div>
    );

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">

      {/* Background */}
      <div
        className="absolute inset-0 bg-repeat-y bg-center opacity-40"
        style={{
          backgroundImage: "url('/bg2.jpg')",
          backgroundSize: "100% auto"
        }}
      ></div>
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 p-6 max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-6">

          <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-300 drop-shadow-lg">
            Pokémon Discovery Network
          </h1>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => navigate("/create")}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-full font-bold shadow-md transition"
            >
              ➕ Add Entry
            </button>

            <button
              onClick={() => navigate("/help")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-bold shadow-md transition"
            >
              ❓ Help
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-bold shadow-md transition"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* POSTS */}
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative rounded-2xl shadow-xl mb-8 border-4 border-red-400 overflow-hidden transition-all duration-300"
          >
            {/* Card Background */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: "url('/card-bg.jpg')" }}
            ></div>

            <div className="relative z-10 bg-white/70 backdrop-blur-sm text-black">

              {/* Title Row (Always Visible) */}
              <div
                onClick={() => togglePost(post._id)}
                className="cursor-pointer p-5 flex justify-between items-center hover:bg-white/80 transition"
              >
                <h2 className="text-2xl font-bold text-black-600">
                  {post.pokemonName}
                </h2>

                <span className="text-xl font-bold text-gray-700">
                  {expandedPostId === post._id ? "−" : "+"}
                </span>
              </div>

              {/* Collapsible Section */}
              {expandedPostId === post._id && (
                <div className="px-6 pb-6">

                  <div className="flex flex-col md:flex-row gap-8 mt-4">

                    {/* LEFT DETAILS */}
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 mb-4 italic">
                        Discovered by {post.author?.username}
                      </p>

                      <div className="grid grid-cols-2 gap-y-2 text-sm font-medium">
                        <p>Type: <span className="text-red-600">{post.type}</span></p>
                        <p>Location: {post.location}</p>
                        <p>Size: {post.size}</p>
                        <p>Health: {post.health}</p>
                        <p>Level: {post.level}</p>
                        <p>Held Item: {post.heldItem}</p>
                      </div>

                      <p className="mt-4 text-gray-700">
                        {post.description}
                      </p>

                      {/* Rating */}
                      <div className="mt-6">
                        <p className="font-bold text-gray-800 mb-2">
                          Rate this Pokémon:
                        </p>

                        <div className="flex gap-2 text-3xl cursor-pointer">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              onClick={() => handleRating(post._id, star)}
                              className={`transition ${
                                ratings[post._id] >= star
                                  ? "text-yellow-500"
                                  : "text-white-300"
                              } hover:scale-125`}
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
                          className="border-2 border-red-600 p-2 rounded-lg bg-white text-black font-medium"
                          defaultValue=""
                        >
                          <option value="" disabled>
                            Report Entry
                          </option>
                          <option value="misinformation">Misinformation</option>
                          <option value="profanity">Profanity</option>
                          <option value="spam">Spam</option>
                        </select>
                      </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="flex-1 flex items-center justify-center">
                      <img
                        src={post.imageURL}
                        alt={post.pokemonName}
                        className="w-64 h-64 object-contain drop-shadow-2xl"
                      />
                    </div>

                  </div>
                </div>
              )}

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Feed;