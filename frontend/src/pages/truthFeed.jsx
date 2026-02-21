import { useEffect, useState } from "react";
import api from "../utils/api";

function TruthFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchTruth = async () => {
      try {
        const res = await api.get("/feed?access=musibat-ke-liye-tayar-ho-jao");
        setPosts(res.data);
      } catch (err) {
        alert("Truth access failed");
      }
    };

    fetchTruth();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl text-red-500 mb-6">
        🔥 Team Rocket Truth Mode 🔥
      </h1>

      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-gray-900 rounded-xl p-4 mb-6"
        >
          <img
            src={post.imageUrl}
            alt=""
            className="w-full h-64 object-cover rounded-lg mb-4"
          />

          <h2 className="text-xl font-bold">{post.pokemonName}</h2>
          <p>Type: {post.type}</p>
          <p>Location: {post.location}</p>
          <p>Size: {post.size}</p>
          <p>Health: {post.health}</p>
          <p>Hold Item: {post.holdItem}</p>
          <p>Level: {post.level}</p>
          <p>{post.description}</p>
       
        </div>
      ))}
    </div>
  );
}

export default TruthFeed;