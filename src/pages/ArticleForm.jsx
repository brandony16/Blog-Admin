import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { NotificationContext } from "../context/NotificationContext.jsx";
import { getArticleById, saveArticle } from "../utils/articleApi.js";
import ArticleInputs from "../components/articleForm/ArticleInputs.jsx";
import ErrorList from "../components/articleForm/ErrorList.jsx";
import SaveControls from "../components/articleForm/SaveControls.jsx";
import { addActivity, ACTIVITY_TYPES } from "../utils/activity.js";

const ArticleForm = ({ mode = "create" }) => {
  const { id } = useParams();
  const { showNotification } = useContext(NotificationContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [article, setArticle] = useState({ title: "", body: "" });
  const [saveType, setSaveType] = useState("Draft");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setArticle((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setErrors([]);
    try {
      const data = await saveArticle({
        mode,
        id,
        token,
        article,
        publish: saveType === "Publish",
      });

      if (data.errors) return setErrors(data.errors);
      showNotification(data.message, "success");
      setArticle({ title: "", body: "" });
      if (mode === "edit") {
        addActivity(`Edited article: ${article.title}`, ACTIVITY_TYPES.EDIT);
        navigate("/my-articles");
      } else {
        addActivity(`Created article: ${article.title}`, ACTIVITY_TYPES.CREATE);
      }
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const fetchArticle = useCallback(async () => {
    if (mode !== "edit" || !id) return;
    setLoading(true);
    try {
      const data = await getArticleById(id);
      setArticle(data.article);
      setSaveType(data.article.publishedAt ? "Publish" : "Draft");
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, [id, mode, showNotification]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  return (
    <div className="p-8 flex flex-col gap-6 max-w-[1200px]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-800">
          {mode === "create" ? "Create New Article" : "Edit Article"}
        </h1>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
          <ArticleInputs article={article} onChange={handleChange} />
          <p className="italic text-gray-600 self-end">
            Characters: {article.body.length}
          </p>
          <ErrorList errors={errors} />
          <SaveControls
            saveType={saveType}
            onSaveTypeChange={setSaveType}
            onSave={handleSave}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleForm;
