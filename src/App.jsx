import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyArticles from "./pages/MyArticles.jsx";
import ArticleForm from "./pages/ArticleForm.jsx";
import { NotificationProvider } from "./context/NotificationProvider.jsx";
import ManageUsers from "./pages/ManageUsers.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <NotificationProvider>
              <AdminLayout />
            </NotificationProvider>
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="my-articles" element={<MyArticles />} />
        <Route path="create-article" element={<ArticleForm mode="create" />} />
        <Route path="edit-article/:id" element={<ArticleForm mode="edit" />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="settings" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
