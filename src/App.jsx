import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="my-articles" element={<Dashboard />} />
        <Route path="create-article" element={<Dashboard />} />
        <Route path="manage-users" element={<Dashboard />} />
        <Route path="settings" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
