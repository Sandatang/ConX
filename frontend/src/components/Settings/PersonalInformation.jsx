import { Button, LinearProgress, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import * as UserApi from "../../network/user_api"
import UpdateModalUser from "./UpdateModalUser"

const PersonalInformation = () => {
    const userId = localStorage.getItem("userId")
    const [userInfo, setUserInfo] = useState(null)
    const [error, setError] = useState(null)
    const [openUpdateModal, setOpenUpdateModal] = useState(null)
    const [loading, setLoading] = useState(true)

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
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
        }
        userData()
    }, [userId])
    return (
        <>
            {loading ? <LinearProgress />


                : !error && userInfo !== null && (
                    <div key={userInfo}>
                        <Typography className="!text-lg !font-semibold tracking-wider"> My Profile </Typography>
                        {/* <Divider className="!mb-2" /> */}
                        <div className="border px-2 py-4 rounded-md shadow-sm ">
                            <Stack className="!flex-row gap-4 items-center">
                                <div className="border-2 border-pinkish w-14 aspect-square rounded-full p-1">
                                    {/* <img src={dog} alt="user img" className="bg-cover" /> */}
                                </div>
                                <Stack>
                                    <Stack className=" !flex-row">
                                        <Typography className="!capitalize">
                                            <span>{userInfo.firstname}</span> {" "}
                                            <span>{userInfo.middlename}</span>{" "}
                                            <span>{userInfo.lastname}</span>{" "}
                                        </Typography>
                                    </Stack>
                                    <Typography className="!text-slate-400 !text-sm">{userInfo.email}</Typography>
                                </Stack>
                            </Stack>
                            <Stack>
                                <Button onClick={() => setOpenUpdateModal(true)} className="self-end" variant="outlined">Update Details</Button>
                            </Stack>
                        </div>
                        <Stack className="mt-2 gap-4 border px-2 py-4 rounded-md">
                            <Typography className="!text-lg !font-semibold tracking-wider"> Personal Information</Typography>

                            <Stack className="!flex-row gap-2 justify-between">
                                <Stack className="w-[33%] gap-1">
                                    <Typography className="capitalize !text-md !text-slate-500">Firstname</Typography>
                                    <Typography className="capitalize !text-md pb-1 w-full !text-slate-800">
                                        {userInfo.firstname}
                                    </Typography>
                                </Stack>
                                <Stack className="w-[33%] gap-1">
                                    <Typography className="capitalize !text-md !text-slate-500">middlename</Typography>
                                    <Typography className="capitalize !text-md  pb-1 w-full !text-slate-800">
                                        {userInfo.middlename}
                                    </Typography>
                                </Stack>
                                <Stack className="w-[33%] gap-1">
                                    <Typography className="capitalize !text-md !text-slate-500">Lastname</Typography>
                                    <Typography className="capitalize !text-md  pb-1 w-full !text-slate-800">
                                        {userInfo.lastname}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Stack className="!flex-row gap-2 justify-between">
                                <Stack className="w-[33%] gap-1">
                                    <Typography className="capitalize !text-md !text-slate-500">Username</Typography>
                                    <Typography className="!text-md pb-1 w-full !text-slate-800">
                                        {userInfo.username}
                                    </Typography>
                                </Stack>
                                <Stack className="w-[33%] gap-1">
                                    <Typography className="capitalize !text-md !text-slate-500">Email Address</Typography>
                                    <Typography className="!text-md pb-1 w-full !text-slate-800">
                                        {userInfo.email}
                                    </Typography>
                                </Stack>
                                <Stack className="w-[33%] gap-1">
                                    <Typography className="capitalize !text-md !text-slate-500">Birthday</Typography>
                                    <Typography className="capitalize !text-md  pb-1 w-full !text-slate-800">
                                        {new Date(userInfo.birthdate).toDateString().split(" ").splice(1).join(" ")}
                                    </Typography>
                                </Stack>
                            </Stack>



                        </Stack>

                    </div>

                )}


            {openUpdateModal && <UpdateModalUser user={userInfo} onClose={() => setOpenUpdateModal(false)} />}
        </>
    )
}

export default PersonalInformation