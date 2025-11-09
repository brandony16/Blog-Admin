import { useCallback, useContext, useEffect, useState } from "react";
import UserTableHeader from "./UserTableHeader.jsx";
import UserRow from "./UserRow.jsx";
import PageInfo from "../PageInfo.jsx";
import { fetchUsers } from "../../utils/userApi.js";
import { NotificationContext } from "../../context/NotificationContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

const UserTable = () => {
  const { token } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  const [users, setUsers] = useState([]);
  const [sortColumn, setSortColumn] = useState("lastUpdated");
  const [sortDirection, setSortDirection] = useState("desc");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalArticles: 0,
    usersPerPage: 10,
  });

  const loadUsers = useCallback(async () => {
    try {
      const data = await fetchUsers({
        page,
        sort: sortColumn,
        order: sortDirection,
        token: token,
      });
      setUsers(data.users);
      setPagination({
        totalPages: data.totalPages,
        totalArticles: data.total,
        usersPerPage: data.limit,
      });
    } catch (err) {
      showNotification(err.message, "error");
    }
  }, [page, showNotification, sortColumn, sortDirection, token]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDelete = () => {
    return;
  };

  const handleSort = (column) => {
    setSortColumn((prev) => (prev === column ? column : column));
    setSortDirection((prev) =>
      sortColumn === column && prev === "asc" ? "desc" : "asc"
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full text-left border-collapse">
        <UserTableHeader
          handleSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
      <PageInfo
        page={page}
        totalPages={pagination.totalPages}
        totalEntries={pagination.totalArticles}
        entriesPerPage={pagination.usersPerPage}
        onPageChange={setPage}
      />
    </div>
  );
};

export default UserTable;
