import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Edit, Newspaper, Settings } from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-600">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Published Articles
        </h3>
        <p className="text-3xl font-bold text-blue-700">42</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-orange-500">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Drafts in Progress
        </h3>
        <p className="text-3xl font-bold text-orange-600">5</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-400">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Registered Users
        </h3>
        <p className="text-3xl font-bold text-blue-500">128</p>
      </div>

      {/* Recent Activity */}
      <div className="col-span-full bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          Recent Activity
        </h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex gap-3">
            <Newspaper className="text-blue-500" /> <strong>You</strong>{" "}
            published “Debugging Async in React”
          </li>
          <li className="flex gap-3">
            <Edit className="text-orange-600" /> <strong>Sarah</strong> created
            a new draft: “Understanding Promises”
          </li>
          <li className="flex gap-3">
            <Settings className="text-gray-600" /> <strong>John</strong> updated
            site settings
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Dashboard;
