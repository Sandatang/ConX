import { fetchData } from "./user_api";

export async function addWorkShop(data) {
  const response = await fetchData("/api/workshop/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function getWorkshops(data) {
  const response = await fetchData(`/api/workshop/view/${data}`, {
    method: "GET",
  });
  return response.json();
}
