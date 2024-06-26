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
  const response = await fetchData(`/api/forum/specific/${data}`, {
    method: "GET",
  });
  return response.json();
}

export async function getAllForum() {
  const response = await fetchData("/api/forum/view", { method: "GET" });
  return response.json();
}

export async function getTopForum() {
  const response = await fetchData("/api/forum/popular", { method: "GET" });
  return response.json();
}

export async function deleteForum(data) {
  const response = await fetchData(`/api/forum/delete/${data}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function followForum(data) {
  const response = await fetchData(`/api/forum/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function unfollowForum(data) {
  const response = await fetchData(`/api/forum/unfollow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function followedForum(data) {
  const response = await fetchData(`/api/forum/view/following/${data}`, {
    method: "POST",
  });
  return response.json();
}

export async function getForumCreated(data) {
  const response = await fetchData(`/api/forum/view/myForums/${data}`, {
    method: "POST",
  });
  return response.json();
}
