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
