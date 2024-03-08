import { LogoutOutlined, Notifications, NotificationsSharp } from "@mui/icons-material";
import { Badge, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import conxlogo from "../assets/logo.png";
import { useAuth } from "../utils/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Logout = () => {
    const navigate = useNavigate()
    const { logOutUser } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        const result = logOutUser(true);
        if (result) {
            navigate("/login")
            setAnchorEl(!anchorEl);
        }
    };
    return (
        <Stack className="!flex-row items-center">
            <Typography fontSize="small" className="!mr-2">Name of the user here</Typography>
            <section>
                <div onClick={handleClick} className="cursor-pointer">

                    <Badge color="error">
                        <NotificationsSharp />
                    </Badge>
                    <IconButton
                        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                    >
                        <img className="h-4 w-4 rounded-full" src={conxlogo} />
                    </IconButton>
                </div>


                <Stack className="shadow-md">
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(!anchorEl)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MenuItem className="!text-slate-600 hover:!text-black">
                            <Notifications fontSize="small" />
                            <Typography className="!text-[0.9em] !tracking-wider ">Notifications</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleLogout} className="!text-slate-600 hover:!text-black">
                            <LogoutOutlined fontSize="small" />
                            <Typography className="!text-[0.9em] !tracking-wider ">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Stack>

            </section>
        </Stack >
    );
};

export default Logout;