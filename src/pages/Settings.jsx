import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import { LoaderCircle, Trash2 } from "lucide-react";
import EditName from "../components/settings/EditName.jsx";
import DisplayName from "../components/settings/DisplayName.jsx";
import { deleteUser } from "../utils/userApi.js";
import { addActivity } from "../utils/activity.js";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, token, setUser, logout } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      setUser((prev) => ({ ...prev, firstName, lastName }));
      showNotification("Name updated successfully", "success");
      setEditing(false);
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(`Delete user? This is not reversible.`);
    if (!confirm) return;

    try {
      const data = await deleteUser(user.id, token);
      addActivity(`Deleted user: ${data.user.firstName} ${data.user.lastName}`);
      logout();
      navigate("/login");
    } catch (err) {
      showNotification(err.message, "error");
    }
  };
  const handleCancel = () => {
    setEditing(false);
    setFirstName(user.firstName);
    setLastName(user.lastName);
  };

  if (!user) return <LoaderCircle />;

  return (
    <div className="p-8 bg-linear-to-br from-blue-50 to-orange-50 flex flex-col gap-8 h-1/1">
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
          {editing ? (
            <EditName
              firstName={firstName}
              lastName={lastName}
              setFirstName={setFirstName}
              setLastName={setLastName}
              onSave={handleSave}
              onCancel={handleCancel}
              isLoading={loading}
            />
          ) : (
            <DisplayName user={user} setEditing={setEditing} />
          )}
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

        <button
          className="flex items-center gap-2 text-lg border-2 border-red-400 rounded-xl px-4 py-2 text-red-700 bg-red-100 hover:bg-red-200 transition cursor-pointer"
          onClick={() => handleDelete()}
        >
          <Trash2 className="w-5 h-5" />
          <span>Delete Account</span>
        </button>
      </section>
    </div>
  );
};

export default Settings;
