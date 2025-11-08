import { Pencil, Trash2 } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import ArticleTableHeaders from "./ArticlesTableHeaders.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import PageInfo from "./PageInfo.jsx";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../context/NotificationContext.jsx";
import { deleteArticle, fetchUserArticles } from "../../utils/articleApi.jsx";
import ArticleRow from "./ArticleRow.jsx";

const MyArticlesTable = () => {
  const { user, token } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [sortColumn, setSortColumn] = useState("lastUpdated");
  const [sortDirection, setSortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalArticles: 0,
    articlesPerPage: 10,
  });

  const loadArticles = useCallback(async () => {
    try {
      const data = await fetchUserArticles({
        userId: user.id,
        page,
        sort: sortColumn,
        order: sortDirection,
      });
      setArticles(data.articles);
      setPagination({
        totalPages: data.totalPages,
        totalArticles: data.total,
        articlesPerPage: data.limit,
      });
    } catch (err) {
      showNotification(err.message, "error");
    }
  }, [user.id, page, sortColumn, sortDirection, showNotification]);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const handleDelete = async (id, title) => {
    const confirm = window.confirm(`Delete article: "${title}"?`);
    if (!confirm) return;

    try {
      const data = await deleteArticle(id, token);
      showNotification(data.message, "success");
      loadArticles();
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const handleEdit = (id) => navigate(`/edit-article/${id}`);

  const handleSort = (column) => {
    setSortColumn((prev) => (prev === column ? column : column));
    setSortDirection((prev) =>
      sortColumn === column && prev === "asc" ? "desc" : "asc"
    );
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
            <ArticleRow
              key={article.id}
              article={article}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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
          totalPages={pagination.totalPages}
          totalArticles={pagination.totalArticles}
          articlesPerPage={pagination.articlesPerPage}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default MyArticlesTable;
