import { fetchData } from "./user_api";

export async function addTraining(data) {
  const response = await fetchData("/training/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function registerTraining(data) {
  const response = await fetchData("/training/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function getOneTraining(data) {
  const response = await fetchData(`/training/getOne/${data}`, {
    method: "GET",
  });

  return response.json();
}

export async function updateTraining(data) {
  const response = await fetchData("/training/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function getAllTraining() {
  const response = await fetchData("/training/getAll", { method: "GET" });
  return response.json();
}
