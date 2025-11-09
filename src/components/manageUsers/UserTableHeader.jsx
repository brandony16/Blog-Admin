import SortingArrows from "../SortingArrows.jsx";

const UserTableHeader = ({ handleSort, sortColumn, sortDirection }) => {
  return (
    <thead className="bg-blue-100 text-blue-800">
      <tr>
        <th>
          <div
            onClick={() => handleSort("name")}
            className="p-4 flex gap-2 items-center cursor-pointer w-fit select-none"
          >
            Name{" "}
            <SortingArrows
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              columnName={"name"}
            />
          </div>
        </th>
        <th>
          <div
            onClick={() => handleSort("email")}
            className="p-4 flex gap-2 items-center cursor-pointer w-fit select-none"
          >
            Email{" "}
            <SortingArrows
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              columnName={"email"}
            />
          </div>
        </th>
        <th>
          <div
            onClick={() => handleSort("role")}
            className="p-4 flex gap-2 items-center cursor-pointer w-fit select-none"
          >
            Role{" "}
            <SortingArrows
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              columnName={"role"}
            />
          </div>
        </th>
        <th>
          <div
            onClick={() => handleSort("created")}
            className="p-4 flex gap-2 items-center cursor-pointer w-fit select-none"
          >
            Created{" "}
            <SortingArrows
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              columnName={"created"}
            />
          </div>
        </th>
        <th className="p-4 text-center">Actions</th>
      </tr>
    </thead>
  );
};

export default UserTableHeader;
