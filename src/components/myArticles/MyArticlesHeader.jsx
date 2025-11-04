import { Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

const MyArticlesHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-blue-700">My Articles</h1>
      <NavLink
        to="/create-article"
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        <Plus size={18} />
        New Article
      </NavLink>
    </div>
  );
};

export default MyArticlesHeader;
