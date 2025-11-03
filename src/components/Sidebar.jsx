const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r p-6 space-y-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Navigation</h2>
      <ul className="space-y-3">
        <li className="hover:text-blue-600 cursor-pointer">🏠 Dashboard</li>
        <li className="hover:text-blue-600 cursor-pointer">📝 Posts</li>
        <li className="hover:text-blue-600 cursor-pointer">👥 Users</li>
        <li className="hover:text-blue-600 cursor-pointer">⚙️ Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
