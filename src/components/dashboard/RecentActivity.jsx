import { useEffect, useState } from "react";
import { getActivities } from "../../utils/activity.js";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const stored = getActivities();
    setActivities(stored);
  }, []);

  return (
    <div className="col-span-full bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
        Recent Activity
      </h3>
      <ul className="space-y-3 text-gray-700">
        {activities.map((a) => (
          <li key={a.id}>
            {a.action} — <span className="text-gray-500">{a.time}</span>
          </li>
        ))}
        {activities.length === 0 && (
          <div>No recent activity. Go create something!</div>
        )}
      </ul>
    </div>
  );
};

export default RecentActivity;
