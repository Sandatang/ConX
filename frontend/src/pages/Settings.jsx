import { Button, Divider, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import ChangePasswordAuth from "../components/ChangePasswordAuth"
import { settingLinks } from "../constants"

const Settings = () => {
    const location = useLocation()
    const currentLocation = location.pathname.split("/")[2]
    const addSlashLocation = "/" + currentLocation
    const [changePasswordClick, setChangePasswordClick] = useState(addSlashLocation === "/change-password");
    return (
        <>

            <Typography className="p-4 !text-[2em] font-bold"> Settings </Typography>

            <Divider />
            <Stack className="!flex-row">
                <Stack className=" w-[25%] h-screen">
                    <Stack className="border-r gap-5 pt-4">

                        {
                            settingLinks.map((data) => (
                                <Button onClick={data.id === "changepassword" ?  () => setChangePasswordClick(true): false} key={data.id} className="!w-full !font-semibold !tracking-tighter">
                                    <Link to={`../settings${data.link}`} className="flex px-2 gap-4 items-center w-full !text-slate-700 hover:!text-slate-500">
                                        {data.icon}
                                        <span className="!capitalize !text-[1em]  tracking-wide">{data.title}</span>
                                    </Link>
                                </Button>
                            ))
                        }
                    </Stack>
                </Stack>
                <Stack className=" w-9/12 px-16 pt-8">
                    <Outlet />
                </Stack>
            </Stack>

            {
                changePasswordClick && <ChangePasswordAuth isConfirmed={changePasswordClick}  onClose={() => setChangePasswordClick(false)} />
            }
        </>
    )
}

export default Settings