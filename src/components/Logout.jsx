const Logout = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="p-4 bg-blue-700 text-white rounded-xl cursor-pointer"
    >
      Log Out
    </button>
  );
};

export default Logout;
