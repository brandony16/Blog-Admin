import SortingArrows from "./SortingArrows.jsx";

const ArticleTableHeaders = ({ handleSort, sortColumn, sortDirection }) => {
  return (
    <thead className="bg-blue-100 text-blue-800">
      <tr>
        <th>
          <div
            onClick={() => handleSort("title")}
            className="p-4 flex gap-2 items-center cursor-pointer w-fit select-none"
          >
            Title{" "}
            <SortingArrows
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              columnName={"title"}
            />
          </div>
        </th>
        <th>
          <div
            onClick={() => handleSort("status")}
            className="p-4 flex gap-2 items-center cursor-pointer w-fit select-none"
          >
            Status{" "}
            <SortingArrows
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              columnName={"status"}
            />
          </div>
        </th>
        <th>
          <div
            onClick={() => handleSort("lastUpdated")}
            className="p-4 flex gap-2 items-center cursor-pointer w-fit select-none"
          >
            Last Updated{" "}
            <SortingArrows
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              columnName={"lastUpdated"}
            />
          </div>
        </th>
        <th className="p-4 text-center">Actions</th>
      </tr>
    </thead>
  );
};

export default ArticleTableHeaders;
