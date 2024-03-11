import { Lock } from "@mui/icons-material"
import { Stack, Typography } from "@mui/material"
import ChangePassword from "./ChangePassword"

const ChangeUnConfirmed = () => {
    return (
        <>
            {localStorage.getItem("#021") === "true" && (<ChangePassword />)}
            {localStorage.getItem("#021") === null && (

                <Stack className="h-1/2 !justify-center items-center">
                    <Lock fontSize="large" className="!text-gray-600" />
                    <Typography className="!text-sm !text-slate-600">Password confirmation needed. Click <span className="italic">Change Password</span></Typography>
                </Stack>
            )
            }
        </>
    )
}

export default ChangeUnConfirmed