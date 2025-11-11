import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-1 min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex flex-1 flex-col min-h-screen">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
