import { AccountCircle, LogoutOutlined, Notifications, NotificationsSharp } from "@mui/icons-material";
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

    const  handleLogout = async () => {
        const result = await logOutUser(true);
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
                        className=" relative !w-10 !h-10 flex rounded-full bg-black text-sm focus:outline-none ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                    >
                        <AccountCircle fontSize="large" className="!absolute "/>
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