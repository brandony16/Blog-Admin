export const getArticleById = async (id, token) => {
  const res = await fetch(`http://localhost:3000/api/articles/admin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Error fetching article");
  return data;
};

export const saveArticle = async ({ mode, id, token, article, publish }) => {
  const link = `http://localhost:3000/api/articles/${
    mode === "edit" ? id : ""
  }`;
  const method = mode === "create" ? "POST" : "PUT";

  const res = await fetch(link, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: article.title,
      body: article.body,
      publishArticle: publish,
    }),
  });

  return res.json();
};

export const fetchUserArticles = async ({ userId, page, sort, order }) => {
  const res = await fetch(
    `http://localhost:3000/api/users/${userId}/articles?page=${page}&sort=${sort}&order=${order}`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch articles");
  return data;
};

export const deleteArticle = async (id, token) => {
  const res = await fetch(`http://localhost:3000/api/articles/${id}`, {
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
