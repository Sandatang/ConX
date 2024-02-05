export async function fetchData(path, header){
    const response = await fetch(`https://localhost:44313${path}`, header);
    if(response.status === 200){
        return response;
    }else{
        const errorBody = response.json();
        const errorMessage = errorBody.error;

        return errorMessage;
    }
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