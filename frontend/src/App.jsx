import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import TruthFeed from "./pages/truthfeed";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Help from "./pages/help";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Secret Route */}
        <Route path="/prepare-for-trouble" element={<TruthFeed />} />

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/help" element={<Help />} />

        {/* Protected Routes */}
        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />

        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;