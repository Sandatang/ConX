import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Login from "../pages/Login";

const IsLogged = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = () => {
            try {
                const isLoggedInValue = localStorage.getItem("token");
                if (isLoggedInValue) {
                    navigate("/settings");
                }
            } catch (error) {
                console.error(error);
            }
        };

        checkLoginStatus();
    }, [navigate])

    return (
        <>
            {!localStorage.getItem("token") && <Login />}

        </>
    )
}

export default IsLogged