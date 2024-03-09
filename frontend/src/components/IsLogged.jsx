import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Login from "../pages/Login";
import { useAuth } from "../utils/AuthContext";

const IsLogged = () => {
    const navigate = useNavigate();
    const { loading, setLoading } = useAuth()
    setLoading(true)

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("token");
        try {
            if (isLoggedIn) {
                navigate("/newsfeed");
            }

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [navigate, setLoading])

    return ( loading && <Login />)
}

export default IsLogged