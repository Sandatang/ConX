import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import conxlogo from "../assets/secondlogo.png";

const EmailConfirmationMessage = () => {
    const navigate = useNavigate()
    return (
        <div className="h-dvh w-dvw flex items-center justify-center">
            <div className="absolute flex flex-col gap-2 justify-center items-center top-32">
                <Typography variant="h4">Congratulations!!!</Typography>
                <Typography>
                    Your email is now <span className="font-bold ">verified</span> click
                    <Button onClick={() => navigate("/login", {replace: true})} variant="contained">Login</Button>

                </Typography>
            </div>
            <img src={conxlogo} alt="ConX Logo" className="w-1/2 aspect-video" />
        </div>
    )
}

export default EmailConfirmationMessage