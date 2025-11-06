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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/users/${user.id}/articles`
        );

        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          console.error(res);
        }
        setArticles(data.articles);
        setPage(data.page);
        setTotalPages(data.totalPages);
        setArticlesPerPage(data.limit);
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
        <div className="flex justify-center items-center p-2 border-t-2 border-t-orange-600">
          <p>
            Page {page} of {totalPages}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyArticlesTable;
