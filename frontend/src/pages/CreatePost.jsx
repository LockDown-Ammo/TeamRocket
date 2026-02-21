import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function CreatePost() {
  const [form, setForm] = useState({
    pokemonName: "",
    type: "",
    location: "",
    size: "",
    imageUrl: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/posts", form);
      navigate("/feed");
    } catch (err) {
      alert("Failed to create post");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl mb-4 text-purple-500">Create Pokemon Post</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="pokemonName"
            placeholder="Pokemon Name"
            className="w-full mb-3 p-2 rounded bg-gray-800"
            onChange={handleChange}
            required
          />

          <input
            name="type"
            placeholder="Type"
            className="w-full mb-3 p-2 rounded bg-gray-800"
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location Found"
            className="w-full mb-3 p-2 rounded bg-gray-800"
            onChange={handleChange}
            required
          />

          <input
            name="size"
            placeholder="Size"
            className="w-full mb-3 p-2 rounded bg-gray-800"
            onChange={handleChange}
            required
          />

          <input
            name="imageUrl"
            placeholder="Image URL"
            className="w-full mb-3 p-2 rounded bg-gray-800"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full mb-3 p-2 rounded bg-gray-800"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-purple-600 p-2 rounded">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;