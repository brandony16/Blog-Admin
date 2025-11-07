import { Pencil, Trash2 } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import ArticleTableHeaders from "./ArticlesTableHeaders.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import PageInfo from "./PageInfo.jsx";

const MyArticlesTable = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [sortColumn, setSortColumn] = useState("lastUpdated");
  const [sortDirection, setSortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(10);
  const [totalArticles, setTotalArticles] = useState(0);

  const fetchArticles = useCallback(
    async (page, sort, sortOrder) => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/users/${user.id}/articles?page=${page}&sort=${sort}&order=${sortOrder}`
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
    },
    [user.id]
  );

  useEffect(() => {
    fetchArticles(page, sortColumn, sortDirection);
  }, [fetchArticles, page, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getDateStringFromArticle = (article) => {
    const mostRecentDate = Math.max(
      new Date(article.editedAt || 0).getTime(),
      new Date(article.publishedAt || 0).getTime(),
      new Date(article.createdAt || 0).getTime()
    );
    const date = new Date(mostRecentDate);
    return date.toLocaleDateString();
  };

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
          {articles.map((article) => (
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
        <PageInfo
          page={page}
          totalPages={totalPages}
          totalArticles={totalArticles}
          getPageRange={getPageRange}
          fetchArticles={fetchArticles}
        />
      )}
    </div>
  );
};

export default MyArticlesTable;
