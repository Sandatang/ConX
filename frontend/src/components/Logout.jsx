import { KeyboardArrowDown, KeyboardArrowUp, LogoutOutlined, Notifications, NotificationsSharp } from "@mui/icons-material";
import { Badge, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dog from "../assets/dog.jpg";
import { useAuth } from "../utils/AuthContext";


const Logout = () => {
    const navigate = useNavigate()
    const { logOutUser } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = async () => {
        const result = await logOutUser(true);
        if (result) {
            navigate("/login")
            setAnchorEl(!anchorEl);
        }
    };
    return (
        <Stack className="!flex-row items-center">
            <section>
                <div onClick={handleClick} className="cursor-pointer">
                    <Stack className="gap-2 !flex-row items-center relative">

                        <Badge color="error">
                            <NotificationsSharp />
                        </Badge>
                        <Typography fontSize="small" className="!mr-2 !text-slate-900 capitalize !font-semibold">{localStorage.getItem("username")}</Typography>
                        <IconButton>
                            <div className="border-2 border-pinkish !absolute h-8 w-8 rounded-full p-1">
                                <img src={dog} alt="user img" className="bg-cover"/>
                            </div>
                        </IconButton>
                        {anchorEl ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" />}
                    </Stack>
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