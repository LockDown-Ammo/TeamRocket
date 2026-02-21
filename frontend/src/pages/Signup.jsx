import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signup", {
        username,
        email,
        password,
      });

      login(res.data.token);
      navigate("/feed");
    } catch (err) {
      alert("Trainer Registration Failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Signup Card */}
      <div className="relative z-10 bg-white/90 text-black p-8 rounded-2xl w-96 shadow-2xl border-4 border-red-600">

        {/* Pokeball Icon */}
        <div className="flex justify-center mb-4">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="pokeball"
            className="w-16 h-16"
          />
        </div>

        <h1 className="text-2xl font-bold text-center text-red-600 mb-2">
          Become a Pokémon Trainer
        </h1>

        <p className="text-center text-gray-600 text-sm mb-6">
          Join the Discovery Network
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Trainer Name"
            className="w-full mb-4 p-3 rounded-lg border-2 border-red-400 focus:outline-none focus:border-red-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Trainer Email"
            className="w-full mb-4 p-3 rounded-lg border-2 border-red-400 focus:outline-none focus:border-red-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Trainer Passcode"
            className="w-full mb-6 p-3 rounded-lg border-2 border-red-400 focus:outline-none focus:border-red-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-red-600 hover:bg-red-700 transition-all text-white p-3 rounded-lg font-bold shadow-md">
            Start Your Journey
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already a Trainer?{" "}
          <Link to="/" className="text-red-600 font-semibold hover:underline">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;