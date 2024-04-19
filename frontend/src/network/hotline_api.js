import { fetchData } from "./user_api";

export async function addHotline(data) {
  const response = await fetchData("/api/connectivity/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function updateHotline(data) {
  const response = await fetchData("/api/connectivity/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function viewHotlines() {
  const response = await fetchData("/api/connectivity/view", {
    method: "GET",
  });

  return response.json();
}
