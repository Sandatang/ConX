import { SentimentDissatisfied } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import conxlogo from "../assets/secondlogo.png";

const EmailUnSuccessfullMessage = () => {
    const navigate = useNavigate()
    return (
        <div className="h-dvh w-dvw flex items-center justify-center">
            <div className="absolute flex flex-col gap-2 justify-center items-center top-32">
                <Typography variant="h4">Something went wrong, Verification not push through <SentimentDissatisfied /></Typography>
                <Typography>
                    Have an existing account? click
                    <Button onClick={() => navigate("/login", {replace: true})} variant="contained">Login</Button>
                    to sign in
                </Typography>
            </div>
            <img src={conxlogo} alt="ConX Logo" className="w-1/2 aspect-video" />
        </div>
    )
}

export default EmailUnSuccessfullMessage