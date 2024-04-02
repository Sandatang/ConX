import { fetchData } from "./user_api";

export async function addThread(data) {
  const response = await fetchData("/api/forum/thread/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getAllThread(data) {
  const response = await fetchData(`/api/forum/thread/getAll/${data}`, {
    method: "GET",
  });
  return response.json();
}

export async function updateThread(data) {
  const response = await fetchData(`/api/forum/thread/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
