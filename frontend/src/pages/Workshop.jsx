import { Button, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import ModalAddWorkshop from "../components/Workshop/ModalAddWorkshop"
import { category } from "../constants"
import conxlogo from "../assets/secondlogo.png"

const Workshop = () => {
    const [open, setOpen] = useState(false);
    let location = useLocation();

    return (
        <Stack className=" overflow-y-auto no-scrollbar">
            <Stack className="!flex-row fixed p-8 w-full bg-white gap-20">
                <Stack className="!flex-row gap-20 w-[60%]">

                    {category.map((ct) => (
                        <Button
                            key={ct.link}
                            component={NavLink} // Pass NavLink directly here
                            to={`../workshop${ct.link}`}
                            variant="text"
                            sx={{
                                '&.active': {
                                    background: '#EB80D9',
                                    color: '#fff',

                                },
                                color: 'rgb(148 163 184 )',
                            }}
                            className=" !text-[11px] !font-semibold !capitalize"
                        >
                            <span className=" !text-[11px] !font-semibold !capitalize">{ct.title}</span>
                        </Button>
                    ))}
                </Stack>
                {
                    localStorage.getItem("role") !== "Women" &&
                    <Button
                        onClick={() => {
                            setOpen(true)
                        }}
                        variant="contained">Create workshop</Button>
                }
            </Stack>
            <Stack className="!flex-row p-8 w-full bg-white justify-center gap-20" />
            <Stack className="my-10 gap-10 px-16 ">
                {location.pathname === "/workshop" ? (
                    <Stack className="items-center gap-6">
                        <Typography variant="h4">Welcome to Our Empowerment Workshop!</Typography>
                        <Typography variant="body1">Explore our collection of empowerment videos to learn and grow.</Typography>
                        <img src={conxlogo} alt="logo" className="w-[60%] aspect-video" />

                    </Stack>
                ) : (
                    <Outlet />
                )}
            </Stack>

            {open && <ModalAddWorkshop onClose={() => setOpen(false)} />}
        </Stack>
    )
}

export default Workshop