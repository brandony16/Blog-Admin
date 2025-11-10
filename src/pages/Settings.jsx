import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import { Trash, Trash2 } from "lucide-react";

const Settings = () => {
  const { user, token, setUser } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const [name, setName] = useState(user.name);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      setUser((prev) => ({ ...prev, name }));
      showNotification("Name updated successfully", "success");
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-linear-to-br from-blue-50 to-orange-50 flex flex-col gap-8">
      <header className="text-start">
        <h1 className="text-4xl font-bold text-blue-700">Settings</h1>
      </header>

      <section className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <img
            src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.id}&faceOffsetX=0,0`}
            alt={`${user.firstName} ${user.lastName} avatar`}
            className="w-28 h-28 rounded-full border-2 border-blue-500 shadow-md"
          />
          <h2 className="text-3xl font-semibold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>
        </div>

        <dl className="flex flex-col gap-5 text-lg text-gray-700">
          <div className="flex flex-col items-center">
            <dt className="font-medium text-gray-500">Email</dt>
            <dd className="font-semibold">{user.email}</dd>
          </div>

          <div className="flex flex-col items-center">
            <dt className="font-medium text-gray-500">Role</dt>
            <dd className="font-semibold capitalize">{user.role}</dd>
          </div>

          <div className="flex flex-col items-center">
            <dt className="font-medium text-gray-500">Member Since</dt>
            <dd className="font-semibold">
              {new Date(user.createdAt).toLocaleDateString()}
            </dd>
          </div>
        </dl>

        <button className="flex items-center gap-2 text-lg border-2 border-red-400 rounded-xl px-4 py-2 text-red-700 bg-red-100 hover:bg-red-200 transition">
          <Trash2 className="w-5 h-5" />
          <span>Delete Account</span>
        </button>
      </section>
    </div>
  );
};

export default Settings;
