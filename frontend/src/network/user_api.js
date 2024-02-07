export async function fetchData(path, header){
    const response = await fetch(`https://localhost:44398${path}`, header);
    return response
}

export async function registerWomen(data){
    const response = await fetchData("/api/authentication/register/women", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    return response.json()
}

export async function addPersonnel(data){
    const response = await fetchData("/api/authentication/register/personnel", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    return response.json()
}


export async function authenticateUser(data){
    const response = await fetchData("/api/authentication/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    return response.json()
}