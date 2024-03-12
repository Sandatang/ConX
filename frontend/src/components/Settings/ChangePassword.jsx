/* eslint-disable react/prop-types */
import { Password } from "@mui/icons-material"
import { Alert, Button, Stack, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as UserApi from "../../network/user_api"
import { useState } from "react"

const ChangePassword = () => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const confirmation = localStorage.getItem("#021");
    const [message, setMessage] = useState(null)

    const changePassword = async (data) => {
        try {
            const formData = {
                ...data,
                userId: localStorage.getItem("userId")
            }
            const response = await UserApi.changePassword(formData)
            if (response.status === "Success") {
                setMessage(response.message)

                setTimeout(() => {
                    localStorage.removeItem("#021")
                    navigate(0)
                }, 2000)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {!confirmation && (navigate("/settings/password-confirmation"))}
            {confirmation && (
                <Stack className=" mt-2 gap-4">

                    <form action="" onSubmit={handleSubmit(changePassword)}>
                        <Stack className="gap-4">
                            {message && <Alert>{message}</Alert>}
                            <TextField
                                InputProps={{
                                    startAdornment: <Password />
                                }}
                                name="oldpassword"
                                label="Old Password"
                                type="password"
                                fullWidth
                                {...register("oldpassword", { required: true })}
                            />

                            <TextField
                                name="NewPassword"
                                InputProps={{
                                    startAdornment: <Password />
                                }}
                                label="New Password"
                                type="password"
                                fullWidth
                                {...register("NewPassword", { required: true })}

                            />

                            <TextField
                                name="ConfirNewPassword"
                                InputProps={{
                                    startAdornment: <Password />
                                }}
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                {...register("ConfirNewPassword", { required: true })}

                            />
                            <Button type="submit" disabled={isSubmitting} className="self-end mt-4 !px-8" variant="contained">Submit</Button>
                        </Stack>

                    </form>

                </Stack>
            )}

        </>
    )
}

export default ChangePassword