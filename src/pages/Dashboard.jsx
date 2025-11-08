import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Edit, Newspaper, Settings } from "lucide-react";
import { getUserArticleCounts, getUsersCount } from "../utils/counts.js";
import { NotificationContext } from "../context/NotificationContext.jsx";
import RecentActivity from "../components/dashboard/RecentActivity.jsx";

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  const [articleCounts, setArticleCounts] = useState({
    total: 0,
    published: 0,
    drafts: 0,
  });
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const getCounts = useCallback(async () => {
    setLoading(true);
    try {
      const [articleData, userData] = await Promise.all([
        getUserArticleCounts(user.id, token),
        getUsersCount(token),
      ]);
      setArticleCounts({ ...articleData });
      setUserCount(userData.total);
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [showNotification, user.id, token]);

  useEffect(() => {
    getCounts();
  }, [getCounts]);

  if (!user || loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-600">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Published Articles
        </h3>
        <p className="text-3xl font-bold text-blue-700">
          {articleCounts.published}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-orange-500">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Drafts in Progress
        </h3>
        <p className="text-3xl font-bold text-orange-600">
          {articleCounts.drafts}
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-400">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Registered Users
        </h3>
        <p className="text-3xl font-bold text-blue-500">{userCount}</p>
      </div>
      <RecentActivity />
    </section>
  );
};

export default Dashboard;
