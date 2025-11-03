import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-1 p-8">
      <h2 className="text-3xl font-semibold mb-6">
        Welcome Back, {user.firstName} 👋
      </h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm">Published Articles</h3>
          <p className="text-2xl font-bold mt-2">18</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm">Users</h3>
          <p className="text-2xl font-bold mt-2">35</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm">Comments</h3>
          <p className="text-2xl font-bold mt-2">310</p>
        </div>
      </div>

      {/* Recent Activity / Content */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Recent Articles</h3>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-500 italic">No recent posts yet. Get Writing!</p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
