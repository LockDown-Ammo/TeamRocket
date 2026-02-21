import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-black border-b border-red-600 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-red-600">
          Team Rocket Feed
        </Link>

        <div className="space-x-4">
          <Link to="/create" className="hover:text-red-500">
            Create Post
          </Link>
          <Link to="/login" className="hover:text-red-500">
            Login
          </Link>
          <Link to="/signup" className="hover:text-red-500">
            Signup
          </Link>
          <Link to="/help" className="hover:text-red-500">
            Help
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;