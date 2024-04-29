import { fetchData } from "./user_api";

export async function addReport(data) {
  const response = await fetchData("/bugReport/add", {
    method: "POST",
    body: data,
  });
  return response.json();
}

export async function viewAllReport() {
  const response = await fetchData("/bugReport/view", { method: "GET" });
  return response.json();
}

export async function deleteReport(data) {
  const response = await fetchData(`/bugReport/delete/${data}`, {
    method: "DELETE",
  });
  return response.json();
}
