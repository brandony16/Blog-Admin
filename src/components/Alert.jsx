import { CheckCircle, XCircle } from "lucide-react";
import { useEffect } from "react";

const Alert = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-100 border-green-500 text-green-800"
      : "bg-red-100 border-red-500 text-red-800";

  const Icon = type === "error" ? XCircle : CheckCircle;

  return (
    <div
      className={`fixed top-16 right-6 flex items-center gap-3 border-l-4 px-5 py-3 animate-slideIn rounded-xl shadow-md transition-all duration-300 ${bgColor}`}
    >
      <Icon size={22} />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Alert;
