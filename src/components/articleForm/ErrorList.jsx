const ErrorList = ({ errors }) => {
  if (!errors || errors.length === 0) return null;
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-left">
      <ul className="list-disc list-inside space-y-1">
        {errors.map((err, i) => (
          <li key={i}>{err.msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorList;