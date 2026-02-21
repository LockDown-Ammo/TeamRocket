import { useState } from "react";

function PostCard({ post }) {
  const [rating, setRating] = useState(0);
  const [showReport, setShowReport] = useState(false);

  const reportOptions = [
    "Profane Language",
    "Misinformation",
    "Suspicious Behavior",
    "Other"
  ];

  return (
    <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-800 overflow-hidden hover:scale-[1.02] transition duration-300">
      <img
        src={post.image}
        alt={post.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-6">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          {post.name}
        </h2>

        <p><span className="font-semibold">Location:</span> {post.location}</p>
        <p><span className="font-semibold">Type:</span> {post.type}</p>
        <p><span className="font-semibold">Size:</span> {post.size}</p>

        {/* ⭐ Rating Section */}
        <div className="flex items-center mt-4 space-x-2">
          {[1,2,3,4,5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-2xl ${
                star <= rating ? "text-yellow-400" : "text-gray-600"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Report Button */}
        <div className="relative mt-4">
          <button
            onClick={() => setShowReport(!showReport)}
            className="bg-gray-800 px-3 py-1 rounded hover:bg-gray-700"
          >
            Report
          </button>

          {showReport && (
            <div className="absolute bg-black border border-gray-700 mt-2 rounded p-2 w-48 z-10">
              {reportOptions.map((option, index) => (
                <div
                  key={index}
                  className="hover:bg-red-600 p-2 rounded cursor-pointer text-sm"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;