import {
  BarChart3,
  FileText,
  LogOut,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <aside className="w-64 bg-linear-to-b from-blue-600 to-blue-900 text-white flex flex-col">
      <div className="px-6 py-4 text-2xl font-bold border-b border-blue-600">
        Admin Panel
      </div>
      <nav className="flex flex-col gap-2 p-4 text-sm font-medium">
        <Link
          to="#"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-800 transition"
        >
          <BarChart3 size={18} /> Dashboard
        </Link>
        <Link
          to="#"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-800 transition"
        >
          <FileText size={18} /> My Articles
        </Link>
        <Link
          to="#"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-800 transition"
        >
          <PlusCircle size={18} /> Create Article
        </Link>
        <Link
          to="#"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-800 transition"
        >
          <Users size={18} /> Manage Users
        </Link>
        <Link
          to="#"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-800 transition"
        >
          <Settings size={18} /> Settings
        </Link>
        <button
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-800 transition cursor-pointer"
          onClick={logout}
        >
          <LogOut size={18} /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
