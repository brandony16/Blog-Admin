import {
  BarChart3,
  FileText,
  LogOut,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  const getLinkClasses = (isActive) => {
    return `flex items-center gap-3 p-2 pl-3 rounded-lg relative transition-all duration-300 
        ${
          isActive
            ? "bg-blue-800 text-white before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-orange-500 before:rounded-l"
            : "text-gray-100 hover:bg-blue-700 hover:pl-4"
        }`;
  };

  return (
    <aside className="w-64 bg-linear-to-b from-blue-600 to-blue-900 text-white flex flex-col">
      <div className="px-6 py-4 text-2xl font-bold border-b border-blue-600 flex gap-2 items-center justify-start">
        Admin Panel
      </div>
      <nav className="flex flex-col gap-2 p-4 text-sm font-medium">
        <NavLink to="/" className={({ isActive }) => getLinkClasses(isActive)}>
          <BarChart3 size={18} /> Dashboard
        </NavLink>
        <NavLink
          to="/my-articles"
          className={({ isActive }) => getLinkClasses(isActive)}
        >
          <FileText size={18} /> My Articles
        </NavLink>
        <NavLink
          to="/create-article"
          className={({ isActive }) => getLinkClasses(isActive)}
        >
          <PlusCircle size={18} /> Create Article
        </NavLink>
        <NavLink
          to="/manage-users"
          className={({ isActive }) => getLinkClasses(isActive)}
        >
          <Users size={18} /> Manage Users
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => getLinkClasses(isActive)}
        >
          <Settings size={18} /> Settings
        </NavLink>
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
