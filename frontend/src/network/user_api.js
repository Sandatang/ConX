export async function fetchData(path, header) {
  const response = await fetch(`https://localhost:44398${path}`, header);
  return response;
}


export async function registerWomen(data) {
  const response = await fetchData("/api/auth/register/women", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function addPersonnel(data) {
  const response = await fetchData("/api/auth/register/personnel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function authenticateUser(data) {
  const response = await fetchData("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function viewAllWomen() {
  const response = await fetchData("/api/auth/view/women", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function viewAllPersonnel() {
  const response = await fetchData("/api/auth/view/personnel", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

export async function getTotalOfUser() {
  const response = await fetchData("/api/auth/getTotalUser", { method: "GET" });
  return response.json();
}

export async function registerPersonnel(data) {
  const response = await fetchData("/api/auth/register/personnel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function specificUserData(data) {
  const response = await fetchData(`/api/auth/get/user/${data}`, {
    method: "GET",
  });
  return response.json();
}

export async function updateUser(data) {
  const response = await fetchData(`/api/auth/update/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteUser(id){
  const response = await fetchData(`/api/auth/user/delete/${id}`, { method: "DELETE"})
  return response.json()
}

export async function passwordConfirmation(data) {
  const response = await fetchData(`/api/auth/password-confirmation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function changePassword(data) {
  const response = await fetchData(`/api/auth/changepass`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deActivateUser(data) {
  const response = await fetchData("/api/auth/user/deActivate", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
