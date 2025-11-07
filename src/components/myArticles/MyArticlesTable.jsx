import { Pencil, Trash2 } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import ArticleTableHeaders from "./ArticlesTableHeaders.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

const MyArticlesTable = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [sortColumn, setSortColumn] = useState("lastUpdated");
  const [sortDirection, setSortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(10);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/users/${user.id}/articles`
        );

        const data = await res.json();
        if (!res.ok) {
          console.error(res);
        }
        setArticles(data.articles);
        setPage(data.page);
        setTotalPages(data.totalPages);
        setArticlesPerPage(data.limit);
        setTotalArticles(data.total);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticles();
  }, [user.id]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getDateStringFromArticle = (article) => {
    const mostRecentDate =
      article.editedAt || article.publishedAt || article.createdAt;
    const date = new Date(mostRecentDate);
    return date.toLocaleDateString();
  };

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => {
      if (sortColumn === "status") {
        const aStatus = a.publishedAt === null ? 0 : 1;
        const bStatus = b.publishedAt === null ? 0 : 1;

        return sortDirection === "asc" ? aStatus - bStatus : bStatus - aStatus;
      }

      let aVal, bVal;
      if (sortColumn === "title") {
        aVal = a[sortColumn];
        bVal = b[sortColumn];
      } else {
        aVal = a.editedAt || a.publishedAt || a.createdAt;
        bVal = b.editedAt || b.publishedAt || b.createdAt;
      }

      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [articles, sortColumn, sortDirection]);

  const getPageRange = () => {
    const start = articlesPerPage * (page - 1) + 1;
    const end =
      page === totalPages ? totalArticles : start + articlesPerPage - 1;
    return `${start}-${end}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <ArticleTableHeaders
          handleSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
        <tbody>
          {sortedArticles.map((article) => (
            <tr
              key={article.id}
              className="border-t hover:bg-blue-50 transition"
            >
              <td className="p-4 font-medium">{article.title}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    article.publishedAt !== null
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {article.publishedAt === null ? "Draft" : "Published"}
                </span>
              </td>
              <td className="p-4 text-gray-600">
                {getDateStringFromArticle(article)}
              </td>
              <td className="p-4 text-center">
                <button className="text-blue-600 hover:text-blue-800 mr-3 cursor-pointer">
                  <Pencil size={18} />
                </button>
                <button className="text-red-600 hover:text-red-800 cursor-pointer">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {articles.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No articles yet. Create one above!
        </div>
      )}
      {articles.length !== 0 && (
        <div className="relative flex justify-center items-center py-3 px-6 border-t-2 border-t-orange-600">
          <p className="font-medium">
            Page {page} of {totalPages}
          </p>

          <p className="absolute right-6 text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {getPageRange()}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">{totalArticles}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MyArticlesTable;
