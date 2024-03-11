import { AccountCircle, Cake } from "@mui/icons-material"
import { Button, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import * as UserApi from "../../network/user_api"
import UpdateModalUser from "./UpdateModalUser"

const PersonalInformation = () => {
    const userId = localStorage.getItem("userId")
    const [userInfo, setUserInfo] = useState(null)
    const [error, setError] = useState(null)
    const [openUpdateModal, setOpenUpdateModal] = useState(null)

    useEffect(() => {

        async function userData() {
            try {
                const response = await UserApi.specificUserData(userId);
                if (response.status) {
                    setError(response.message)

                } else {
                    setUserInfo(response)
                }
            } catch (error) {
                console.error(error)
            }
        }
        userData()
    }, [userId])
    return (
        <>
            <Button onClick={() => setOpenUpdateModal(true)} className="self-end" variant="outlined">Update Details</Button>
            <Stack className="!flex-row mt-2 gap-4">
                <Stack className="w-1/4 gap-6 justify-center">
                    <Typography className="!text-slate-700 !tracking-wider !text-md">Firstname</Typography>
                    <Typography className="!text-slate-700 !tracking-wider !text-md">Middlename</Typography>
                    <Typography className="!text-slate-700 !tracking-wider !text-md">Lastname</Typography>
                    <Typography className="!text-slate-700 !tracking-wider !text-md">Email</Typography>
                    <Typography className="!text-slate-700 !tracking-wider !text-md">Birthday</Typography>

                </Stack>
                {!error && userInfo !== null && (

                    <Stack key={userInfo} className="w-3/4 gap-4 items-center">
                        <Typography className="capitalize !text-md border-b border-slate-400 pb-1 w-full !text-slate-500">
                            <AccountCircle fontSize="small" className="!text-slate-600 mr-2" />
                            {userInfo.firstname}
                        </Typography>
                        <Typography className="capitalize !text-md border-b border-slate-400 pb-1 w-full !text-slate-500">
                            <AccountCircle fontSize="small" className="!text-slate-600 mr-2" />
                            {userInfo.middlename}
                        </Typography>
                        <Typography className="capitalize !text-md border-b border-slate-400 pb-1 w-full !text-slate-500">
                            <AccountCircle fontSize="small" className="!text-slate-600 mr-2" />
                            {userInfo.lastname}
                        </Typography>
                        <Typography className=" border-b !text-md border-slate-400 pb-1 w-full !text-slate-500">
                            <AccountCircle fontSize="small" className="!text-slate-600 mr-2" />
                            {userInfo.email}
                        </Typography>
                        <Typography className="capitalize !text-md border-b border-slate-400 pb-1 w-full !text-slate-500">
                            <Cake fontSize="small" className="!text-slate-600 mr-2" />
                            {new Date(userInfo.birthdate).toDateString().split(" ").splice(1).join(" ")}
                        </Typography>
                    </Stack>
                )}

            </Stack>

            {openUpdateModal && <UpdateModalUser user={userInfo} onClose={() => setOpenUpdateModal(false)}/>}
        </>
    )
}

export default PersonalInformation