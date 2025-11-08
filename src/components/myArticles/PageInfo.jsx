import { Triangle } from "lucide-react";

const PageInfo = ({
  page,
  totalPages,
  totalArticles,
  articlesPerPage,
  onPageChange,
}) => {
  const start = articlesPerPage * (page - 1) + 1;
  const end = page === totalPages ? totalArticles : start + articlesPerPage - 1;

  return (
    <div className="flex justify-center items-center p-4 border-t-orange-600 border-t-2 relative">
      <div className="flex gap-2 justify-center items-center">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 border rounded-lg disabled:opacity-50 cursor-pointer"
        >
          <Triangle
            size={15}
            className={`rotate-270 ${page === 1 ? "" : "fill-orange-600"}`}
          />
        </button>
        <span className="text-gray-700 text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 border rounded-lg disabled:opacity-50 cursor-pointer"
        >
          <Triangle
            size={15}
            className={`rotate-90 ${
              page === totalPages ? "" : "fill-orange-600"
            }`}
          />
        </button>
      </div>
      <p className="absolute right-6 text-gray-600 text-sm">
        Showing {start}-{end} of {totalArticles}
      </p>
    </div>
  );
};

export default PageInfo;
