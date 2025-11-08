const SaveControls = ({ saveType, onSaveTypeChange, onSave }) => {
  return (
    <div className="flex gap-3 w-full">
      <select
        name="saveType"
        className="border border-gray-200 rounded-lg px-3 py-2 w-40 focus:border-blue-500 outline-none"
        onChange={(e) => onSaveTypeChange(e.target.value)}
        value={saveType}
      >
        <option>Draft</option>
        <option>Publish</option>
      </select>
      <button
        onClick={onSave}
        className="bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition w-full cursor-pointer"
      >
        Save Article
      </button>
    </div>
  );
};

export default SaveControls;
