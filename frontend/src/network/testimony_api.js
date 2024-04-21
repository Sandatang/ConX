import { fetchData } from "./user_api";

export async function addTestimony(data) {
  const response = await fetchData("/testimony/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function getAllTestimony() {
  const response = await fetchData("/testimony/view", { method: "GET" });
  return response.json();
}
