import { Trash2 } from "lucide-react";

const UserRow = ({ user, onDelete }) => {
  return (
    <tr className="border-t hover:bg-blue-50 transition">
      <td className="p-4 font-medium">{`${user.firstName} ${user.lastName}`}</td>
      <td className="p-4">{user.email}</td>
      <td className="p-4 text-gray-600">{user.role}</td>
      <td className="p-4 text-gray-600">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="p-4 text-center">
        <button
          onClick={() => onDelete(user.id)}
          className="text-red-600 hover:text-red-800 cursor-pointer"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
