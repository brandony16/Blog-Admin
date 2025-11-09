import { Triangle } from "lucide-react";

const SortingArrows = ({ sortColumn, sortDirection, columnName }) => {
  const isActive = sortColumn === columnName;
  return (
    <div className="flex flex-col">
      <Triangle
        size={10}
        className={
          isActive && sortDirection === "asc"
            ? "fill-blue-800"
            : "text-blue-800"
        }
      />
      <Triangle
        size={10}
        className={`rotate-180 ${
          isActive && sortDirection === "desc"
            ? "fill-blue-800"
            : "text-blue-800"
        }`}
      />
    </div>
  );
};

export default SortingArrows;
