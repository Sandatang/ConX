import { Button, Stack } from "@mui/material"
import { NavLink, Outlet } from "react-router-dom"
import { category } from "../constants"
import { useState } from "react"
import ModalAddWorkshop from "../components/Workshop/ModalAddWorkshop"

const Workshop = () => {
    const [open, setOpen] = useState(false);
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
                <Outlet />
            </Stack>

            {open && <ModalAddWorkshop onClose={() => setOpen(false)}/>}
        </Stack>
    )
}

export default Workshop