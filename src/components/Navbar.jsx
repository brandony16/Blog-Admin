import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1
        className="text-2xl font-bold cursor-pointer underline decoration-orange-400 underline-offset-3"
        onClick={() => navigate("/")}
      >
        Admin Dashboard
      </h1>
      <button
        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
