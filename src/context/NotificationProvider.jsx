import { useState } from "react";
import { NotificationContext } from "./NotificationContext.jsx";
import { CheckCircle, XCircle } from "lucide-react";

export const NotificationProvider = ({ children }) => {
  const [notif, setNotif] = useState(null);
  const [bgColor, setBgColor] = useState("");

  const showNotification = (message, type = "success", duration = 3000) => {
    setNotif({ message, type });
    setBgColor(
      type === "success"
        ? "bg-green-100 border-green-500 text-green-800"
        : "bg-red-100 border-red-500 text-red-800"
    );
    setTimeout(() => setNotif(null), duration);
  };

  return (
    <NotificationContext.Provider value={{ notif, showNotification }}>
      {children}
      {notif && (
        <div
          className={`fixed top-16 right-6 flex items-center gap-3 border-l-4 px-5 py-3 animate-slideIn rounded-xl shadow-md transition-all duration-300 ${
            notif.type === "success"
              ? "bg-green-100 border-green-500 text-green-800"
              : "bg-red-100 border-red-500 text-red-800"
          }`}
        >
          {notif.type === "error" ? (
            <XCircle size={22} className="text-red-500" />
          ) : (
            <CheckCircle size={22} className="text-green-500" />
          )}
          <span className="font-medium">{notif.message}</span>
        </div>
      )}
    </NotificationContext.Provider>
  );
};
