import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
        username: username,
        email: email,
        password: password,
      });
      console.log(res.data)
      login(res.data.token);   // auto-login after signup
      navigate("/feed");
    } catch (err) {
      console.log(err);
      alert("Signup failed. Try different email/username.");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-xl w-80">
        <h2 className="text-xl mb-4 text-purple-500">Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 p-2 rounded bg-gray-800"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 rounded bg-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 rounded bg-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-purple-600 p-2 rounded">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;