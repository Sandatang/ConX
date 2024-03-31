import { fetchData } from "./user_api";

export async function createForum(data) {
  const response = await fetchData("/api/forum/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getOneForum(data) {
  const response = await fetchData(`/api/forum/view/${data}`, { method: "GET" });
  return response.json()
}

export async function getAllForum() {
  const response = await fetchData("/api/forum/view", { method: "GET" });
  return response.json();
}

export async function getTopForum() {
  const response = await fetchData("/api/forum/popular", { method: "GET" });
  return response.json();
}
