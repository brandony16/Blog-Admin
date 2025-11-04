import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ArticleTableHeaders from "./ArticlesTableHeaders.jsx";

const MyArticlesTable = () => {
  const [articles, setArticles] = useState([]);
  const [sortColumn, setSortColumn] = useState("lastUpdated");
  const [sortDirection, setSortDirection] = useState("desc");

  // Simulated fetch — replace with API call
  useEffect(() => {
    setArticles([
      {
        id: 1,
        title: "Understanding React Context",
        body: "lorem ipsum",
        createdAt: new Date("Oct 17, 2025"),
        publishedAt: new Date("Oct 20, 2025"),
        editedAt: null,
      },
      {
        id: 2,
        title: "Building a Node API with Prisma",
        body: "lorem ipsum",
        createdAt: new Date("Oct 18, 2025"),
        publishedAt: null,
        editedAt: null,
      },
      {
        id: 3,
        title: "Introduction to Git for version control",
        body: "lorem ipsum",
        createdAt: new Date("Oct 18, 2025"),
        publishedAt: new Date("Oct 26, 2025"),
        editedAt: new Date("Nov 1 2025"),
      },
      {
        id: 4,
        title: "How to set up a React app with Vite",
        body: "lorem ipsum",
        createdAt: new Date("Nov 2 2025"),
        publishedAt: new Date("Nov 2, 2025"),
        editedAt: null,
      },
    ]);
  }, []);

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
    return mostRecentDate.toLocaleDateString();
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
    </div>
  );
};

export default MyArticlesTable;
