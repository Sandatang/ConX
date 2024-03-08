import { NotificationsSharp } from "@mui/icons-material";
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
                <IconButton
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleClick}
                >
                    {/* <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span> */}
                    <span className="relative">
                        <img
                            className="h-4 w-4 rounded-full"
                            src={conxlogo}
                        />
                        <Badge color="error" badgeContent={2} className="!absolute top-5">
                            <NotificationsSharp />
                        </Badge>
                    </span>
                </IconButton>

                <Stack className="shadow-md">
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(!anchorEl)}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MenuItem>
                            <Typography className="!text-md uppercase ">Notifications</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <Typography className="!text-md uppercase !font-bold">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Stack>

            </section>
        </Stack>
    );
};

export default Logout;