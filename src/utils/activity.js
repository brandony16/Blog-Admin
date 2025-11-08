export const ACTIVITY_TYPES = {
  EDIT: "edit",
  CREATE: "create",
  DELETE: "delete",
};

export const getActivities = () => {
  return JSON.parse(localStorage.getItem("recentActivity")) || [];
};

export const addActivity = (action, actionType) => {
  const activities = getActivities();
  const newActivity = {
    id: Date.now(),
    action,
    actionType,
    time: new Date().toLocaleString(),
  };

  const updated = [newActivity, ...activities].slice(0, 10); // keep last 10
  localStorage.setItem("recentActivity", JSON.stringify(updated));
};
