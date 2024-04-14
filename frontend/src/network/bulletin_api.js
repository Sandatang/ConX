import { fetchData } from "./user_api";

export async function addBulletinPost(data) {
  const response = await fetchData("/api/bulletin/add", {
    method: "POST",
    body: data,
  });
  return response.json();
}
export async function viewAllBUlletinPost() {
  const response = await fetchData("/api/bulletin/view/all", {
    method: "GET",
  });
  return response.json();
}
