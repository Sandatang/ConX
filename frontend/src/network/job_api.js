import { fetchData } from "./user_api";

export async function addJob(data) {
  const response = await fetchData("/api/job/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateJob(data) {
  const response = await fetchData("/api/job/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function viewAllJob() {
  const response = await fetchData("/api/job/view-all", {
    method: "GET",
  });
  return response.json();
}

export async function viewOneJob(data) {
  const response = await fetchData(`/api/job/view/${data}`, {
    method: "POST",
  });

  return response.json();
}

export async function closeJob(data) {
  const response = await fetchData(`/api/job/deactivate/${data}`, {
    method: "PUT",
  });
  return response.json()
}
