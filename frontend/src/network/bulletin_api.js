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

export async function updateBulletin(data) {
  const response = await fetchData("/api/bulletin/update", {
    method: "PUT",
    body: data,
  });
  return response.json();
}

export async function deleteBulletin(data) {
  const response = await fetchData(`/api/bulletin/delete/${data}`, {
    method: "DELETE",
  });

  return response.json();
}
