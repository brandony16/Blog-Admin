import UserTable from "../components/manageUsers/UserTable.jsx";

const ManageUsers = () => {
  return (
    <div className="p-6 bg-linear-to-br from-blue-50 to-orange-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Manage Users</h1>
      </div>
      <UserTable />
    </div>
  );
};

export default ManageUsers;
