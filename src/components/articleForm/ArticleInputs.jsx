const ArticleInputs = ({ article, onChange }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Article Title"
        className="text-2xl font-semibold border-b-2 border-gray-200 focus:border-blue-500 outline-none p-2"
        onChange={(e) => onChange("title", e.target.value)}
        value={article.title}
        name="title"
        required
        minLength={1}
        maxLength={50}
      />

      <textarea
        placeholder="Write your article content here..."
        className="min-h-[400px] border border-gray-200 rounded-lg p-4 focus:border-blue-500 outline-none resize-y"
        onChange={(e) => onChange("body", e.target.value)}
        value={article.body}
        name="body"
        required
        minLength={10}
      />
    </>
  );
};

export default ArticleInputs;
