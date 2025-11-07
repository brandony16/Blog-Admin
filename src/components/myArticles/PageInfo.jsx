import { Triangle } from "lucide-react";

const PageInfo = ({
  page,
  totalPages,
  totalArticles,
  getPageRange,
  fetchArticles,
}) => {
  return (
    <div className="relative flex justify-center items-center py-3 px-6 border-t-2 border-t-orange-600">
      <div className="flex gap-2 items-center justify-center">
        <Triangle
          size={15}
          className={`rotate-270 cursor-pointer ${
            page === 1 ? "" : "fill-orange-400"
          }`}
          onClick={() => {
            if (page === 1) return;
            fetchArticles(page - 1);
          }}
        />
        <p className="font-medium">
          Page {page} of {totalPages}
        </p>
        <Triangle
          size={15}
          className={`rotate-90 cursor-pointer ${
            page === totalPages ? "" : "fill-orange-400"
          }`}
          onClick={() => {
            if (page === totalPages) return;
            fetchArticles(page + 1);
          }}
        />
      </div>

      <p className="absolute right-6 text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-800">{getPageRange()}</span> of{" "}
        <span className="font-semibold text-gray-800">{totalArticles}</span>
      </p>
    </div>
  );
};

export default PageInfo;
