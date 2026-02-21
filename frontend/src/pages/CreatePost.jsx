import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Select from "react-select";

function CreatePost() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pokemonName: "",
    type: "",
    location: "",
    size: "",
    health: "",
    level: "",
    heldItem: "",
    imageURL: "",
    description: ""
  });

  const [types, setTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typesRes, locationsRes, itemsRes] = await Promise.all([
          api.get("/utils/types"),
          api.get("/utils/locations"),
          api.get("/utils/items")
        ]);

        if (typesRes.data.success) {
          setTypes(
            typesRes.data.types.map((t) => ({
              value: t,
              label: t
            }))
          );
        }

        if (locationsRes.data.success) {
          setLocations(
            locationsRes.data.locations.map((l) => ({
              value: l,
              label: l
            }))
          );
        }

        if (itemsRes.data.success) {
          setItems(
            itemsRes.data.items.map((i) => ({
              value: i,
              label: i
            }))
          );
        }

      } catch (err) {
        console.error("Failed to fetch dropdown data");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/post", form);
      navigate("/feed");
    } catch (err) {
      alert("Failed to create post");
    }
  };

  // Pokémon themed dropdown styles
  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "white",
      borderColor: "white",
      color: "white",
    }),
    singleValue: (base) => ({
      ...base,
      color: "black",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#111827",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#dc2626" : "#111827",
      color: "white",
    }),
  };

  return (
  <div
    className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center relative"
    style={{
      backgroundImage:
        "url('bg1.jpg')"
    }}
  >
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

    <div className="relative bg-white/90 text-black p-8 rounded-2xl shadow-2xl border-1 border-red-600 w-full max-w-4xl">

      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
        Create Pokémon Entry
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* LEFT COLUMN */}

        <div className="space-y-4">

          <input
            name="pokemonName"
            placeholder="Pokémon Name"
            className="w-full p-3 rounded border-1 border-red-400"
            onChange={handleChange}
            required
          />

          <Select
            options={types}
            placeholder="Select Pokémon Type"
            isSearchable
            onChange={(selected) =>
              setForm({ ...form, type: selected.value })
            }
            styles={customStyles}
          />

          <Select
            options={locations}
            placeholder="Select Location"
            isSearchable
            onChange={(selected) =>
              setForm({ ...form, location: selected.value })
            }
            styles={customStyles}
          />

          <input
            name="size"
            placeholder="Size"
            className="w-full p-3 rounded border-1 border-red-400"
            onChange={handleChange}
            required
          />

          <input
            name="health"
            placeholder="Health"
            className="w-full p-3 rounded border-1 border-red-400"
            onChange={handleChange}
            required
          />

        </div>

        {/* RIGHT COLUMN */}

        <div className="space-y-4">

          <input
            name="level"
            placeholder="Level"
            className="w-full p-3 rounded border-1 border-red-400"
            onChange={handleChange}
            required
          />

          <Select
            options={items}
            placeholder="Select Held Item"
            isSearchable
            onChange={(selected) =>
              setForm({ ...form, heldItem: selected.value })
            }
            styles={customStyles}
          />

          <input
            name="imageURL"
            placeholder="Image URL"
            className="w-full p-3 rounded border-1 border-red-400"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-3 rounded border-1 border-red-400 h-28 resize-none"
            onChange={handleChange}
            required
          />

        </div>

        {/* FULL WIDTH BUTTON */}
        <div className="md:col-span-2 mt-4">
          <button className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg font-bold text-lg transition-all shadow-lg">
            Add to Pokédex
          </button>
        </div>

      </form>
    </div>
  </div>
);
}

export default CreatePost;