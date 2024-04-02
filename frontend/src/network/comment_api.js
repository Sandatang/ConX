import { fetchData } from "./user_api";

export async function addComment(data){
    const response = await fetchData("/api/comment/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json()
}