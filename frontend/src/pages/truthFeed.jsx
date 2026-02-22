import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function TruthFeed() {
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTruth();
  }, []);

  const fetchTruth = async () => {
    try {
      const res = await api.get(
        "/feed?access=musibat-ke-liye-tayar-ho-jao"
      );
      setPosts(res.data.posts);
    } catch {
      setError("Truth access failed");
    } finally {
      setLoading(false);
    }
  };

  const togglePost = (postId) => {
    setExpandedPostId(
      expandedPostId === postId ? null : postId
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl">
        Accessing Team Rocket Archives...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500 text-2xl">
        {error}
      </div>
    );

  return (
    <div className="relative min-h-screen overflow-hidden font-sans bg-black">

      {/* Dark Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-95"></div>

      <div className="relative z-10 p-6 max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-500 drop-shadow-lg">
          Team Rocket Truth Archive
          </h1>

          <button
            onClick={() => navigate("/feed")}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-bold shadow-md transition"
          >
            ← Back to Public Feed
          </button>
        </div>

        {/* POSTS */}
        {posts.map((post) => (
          <div
            key={post._id}
            className="relative rounded-2xl shadow-xl mb-8 border-4 border-red-600 overflow-hidden transition-all duration-300"
          >
            {/* Dark Card Background */}
            <div className="absolute inset-0 bg-gray-900 opacity-80"></div>

            <div className="relative z-10 bg-black/60 backdrop-blur-sm text-white">

              {/* Title Row */}
              <div
                onClick={() => togglePost(post._id)}
                className="cursor-pointer p-5 flex justify-between items-center hover:bg-black/40 transition"
              >
                <h2 className="text-2xl font-bold text-red-400">
                  {post.pokemonName}
                </h2>

                <span className="text-xl font-bold text-gray-300">
                  {expandedPostId === post._id ? "−" : "+"}
                </span>
              </div>

              {/* Expanded Section */}
              {expandedPostId === post._id && (
                <div className="px-6 pb-6">

                  <div className="flex flex-col md:flex-row gap-8 mt-4">

                    {/* LEFT DETAILS */}
                    <div className="flex-1">
                      <p className="text-sm text-gray-400 mb-4 italic">
                        Original report by {post.author?.username}
                      </p>

                      <div className="grid grid-cols-2 gap-y-2 text-sm font-medium">
                        <p>Type: <span className="text-red-400">{post.type}</span></p>
                        <p>Location: {post.location}</p>
                        <p>Size: {post.size}</p>
                        <p>Health: {post.health}</p>
                        <p>Level: {post.level}</p>
                        <p>Held Item: {post.heldItem}</p>
                      </div>

                      <p className="mt-4 text-gray-300">
                        {post.description}
                      </p>
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

export default TruthFeed;