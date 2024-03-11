import { LinearProgress } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import * as UserApi from "../network/user_api";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        loading: false,
        user: null,
        userId: null,
        userRole: null,
        error: null,
        expiration: null,
    });

    useEffect(() => {
        const storedError = localStorage.getItem('authError');
        if (storedError) {
            setAuthState((prev) => ({ ...prev, error: storedError }));
            localStorage.removeItem('authError');
        }

    }, []);

    const loginUser = async (userInfo) => {
        try {
            setAuthState((prev) => ({ ...prev, loading: true }));
            const response = await UserApi.authenticateUser(userInfo)

            if (response.statusCode === 200) {
                const decodedToken = jwtDecode(response.token);
                localStorage.setItem("token", response.token);
                localStorage.setItem("expiration", decodedToken.exp);
                localStorage.setItem("userId", decodedToken.id)
                setAuthState((prev) => ({
                    ...prev,
                    userId: decodedToken["id"],
                    userRole: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"],
                    error: null,
                }));
                return true;

            } else {
                setAuthState((prev) => ({ ...prev, error: response.message }));
                localStorage.setItem('authError', response.message);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setAuthState((prev) => ({ ...prev, loading: false }));
        }
    }

    const logOutUser = (data) => {

        try {
            if (data) {

                setAuthState((prev) => ({ ...prev, loading: true }));

                localStorage.removeItem("token");
                localStorage.removeItem("expiration");

                setAuthState({
                    loading: false,
                    user: null,
                    userId: null,
                    userRole: null,
                    error: null,
                    expiration: null,
                });
                return true;
            }
            return false;


        } catch (error) {
            console.error(error);
        } finally {
            setAuthState((prev) => ({ ...prev, loading: false }));
        }
    }

    const isTokenValid = () => {
        const tokenExpiration = localStorage.getItem("expiration");

        if (tokenExpiration) {
            const expirationDate = new Date(tokenExpiration * 100);
            const tokenIsValid = expirationDate > new Date();

            if (tokenIsValid) {
                localStorage.removeItem("token");
                localStorage.removeItem("expiration");

                return tokenIsValid;
            }
        }

        return false;
    }

    const isLoggedIn = () => {
        if (localStorage.getItem("token")) {
            return true;
        }
        return false
    }

    const contextData = {
        ...authState,
        setError: (error) => setAuthState((prev) => ({ ...prev, error })),
        loginUser,
        logOutUser,
        isTokenValid,
        isLoggedIn
    }

    return (
        <AuthContext.Provider value={contextData}>
            {authState.loading ? <LinearProgress /> : children}
        </AuthContext.Provider>
    )
}

//Custom Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export default AuthContext;