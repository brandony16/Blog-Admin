import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 flex items-center gap-3 border-l-4 px-5 py-3 rounded-xl shadow-md transition-all duration-300 bg-green-100 border-green-500 text-green-800`}
    >
      <CheckCircle size={22} />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Notification;
