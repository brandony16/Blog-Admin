import MyArticlesHeader from "../components/myArticles/MyArticlesHeader.jsx";
import MyArticlesTable from "../components/myArticles/MyArticlesTable.jsx";

const MyArticles = () => {
  return (
    <div className="p-6 bg-linear-to-br from-blue-50 to-orange-50 h-1/1">
      <MyArticlesHeader />
      <MyArticlesTable />
    </div>
  );
};

export default MyArticles;
