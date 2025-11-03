import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import Dashboard from "../components/Dashboard.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";

const Home = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-1 min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex flex-1 flex-col">
        <Header />
        <Dashboard />
      </main>
    </div>
  );
};

export default Home;
