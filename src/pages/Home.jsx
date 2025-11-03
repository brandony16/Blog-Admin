import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import Dashboard from "../components/Dashboard.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Home = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;
