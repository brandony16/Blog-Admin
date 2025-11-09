export const fetchUsers = async ({ page, sort, order, token }) => {
  const res = await fetch(
    `http://localhost:3000/api/users?page=${page}&sort=${sort}&order=${order}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch users");
  return data;
};

export const deleteUser = async (id, token) => {
  const res = await fetch(`http://localhost:3000/api/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Delete failed");
  return data;
};
