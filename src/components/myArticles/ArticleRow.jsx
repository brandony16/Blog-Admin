import { Pencil, Trash2 } from "lucide-react";

const ArticleRow = ({ article, onEdit, onDelete }) => {
  const date = getRecentDate(article);

  return (
    <tr className="border-t hover:bg-blue-50 transition">
      <td className="p-4 font-medium w-3/5">{article.title}</td>
      <td className="p-4 w-2/15">
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            article.publishedAt
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {article.publishedAt ? "Published" : "Draft"}
        </span>
      </td>
      <td className="p-4 text-gray-600 w-2/15">{date}</td>
      <td className="p-4 text-center w-2/15">
        <button
          onClick={() => onEdit(article.id)}
          className="text-blue-600 hover:text-blue-800 mr-3 cursor-pointer"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => onDelete(article.id, article.title)}
          className="text-red-600 hover:text-red-800 cursor-pointer"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

const getRecentDate = (article) => {
  const mostRecent = Math.max(
    new Date(article.editedAt || 0),
    new Date(article.publishedAt || 0),
    new Date(article.createdAt || 0)
  );
  return new Date(mostRecent).toLocaleDateString();
};

export default ArticleRow;
