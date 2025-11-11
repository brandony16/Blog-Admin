import { Check, X } from "lucide-react";

const EditName = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  onSave,
  isLoading,
  onCancel,
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-400 text-lg"
        placeholder="First name"
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="border rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-400 text-lg"
        placeholder="Last name"
      />
      <div className="flex gap-3 mt-2">
        <button
          onClick={onSave}
          disabled={isLoading}
          className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 cursor-pointer"
        >
          <Check size={18} /> Save
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1 px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer"
        >
          <X size={18} /> Cancel
        </button>
      </div>
    </div>
  );
};

export default EditName;
