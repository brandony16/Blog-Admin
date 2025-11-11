import { Pencil } from "lucide-react";

const DisplayName = ({ user, setEditing }) => {
  return (
    <div className="flex relative">
      <h2 className="text-3xl font-semibold text-gray-800">
        {user.firstName} {user.lastName}
      </h2>
      <button
        onClick={() => setEditing(true)}
        className="absolute left-[105%] h-full text-blue-600 hover:text-blue-800 cursor-pointer"
      >
        <Pencil size={24} />
      </button>
    </div>
  );
};

export default DisplayName;