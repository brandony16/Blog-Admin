/**
 * Gets the total article count, published count, and draft count for a user
 * @param {number} id - the id of the user
 * @returns {{ drafts, published, total }}
 */
export const getUserArticleCounts = async (id, token) => {
  const res = await fetch(
    `http://localhost:3000/api/users/${id}/articles/counts`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to get article counts");

  return data;
};

export const getUsersCount = async (token) => {
  const res = await fetch(`http://localhost:3000/api/users/counts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to get user counts");

  return data;
};
