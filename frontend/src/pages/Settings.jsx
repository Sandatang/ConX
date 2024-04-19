import SettingsIcon from '@mui/icons-material/Settings'
import { Button, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import ChangePasswordAuth from "../components/Settings/ChangePasswordAuth"
import { settingLinks } from "../constants"

const Settings = () => {
    const navigate = useNavigate()
    const [changePasswordClick, setChangePasswordClick] = useState(false);

    const changeLink = (link) => {
        navigate(`../settings${link}`)
        if (link === "/confirmation") {

            setChangePasswordClick(true)
        }
    }
    return (
        <>

            <Typography className="p-4 !text-[2em] font-bold">
                Settings
                <SettingsIcon fontSize="large" className="ml-2" />
            </Typography>

            {/* <Divider /> */}
            <Stack className="border-t-2 !flex-row">
                <Stack className=" w-[25%] h-screen">
                    <Stack className="border-r-2 h-full gap-5 pt-4">

                        {
                            settingLinks.map((data) => (
                                <Button
                                    onClick={() => changeLink(data.link)}
                                    key={data.id}
                                    className="!w-full !font-semibold !tracking-tighter px-2 gap-4 !justify-start items-center !text-slate-800 hover:!text-slate-700">
                                    {data.icon}
                                    <span className="!capitalize !text-[1em]   tracking-wide">{data.title}</span>
                                </Button>
                            ))
                        }
                    </Stack>
                </Stack>
                <Stack className=" w-9/12 px-16 pt-8">
                    <Outlet />
                </Stack>
            </Stack>
            {changePasswordClick && <ChangePasswordAuth isSet={() => setChangePasswordClick(false)} />}
        </>
    )
}

export default Settings