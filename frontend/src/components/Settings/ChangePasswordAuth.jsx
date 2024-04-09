/* eslint-disable react/prop-types */
import { Password } from "@mui/icons-material"
import { Alert, Button, Stack, TextField } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as UserApi from "../../network/user_api"
import Modal from "../Modal"
import ModalHeading from "../ModalHeading"
import ChangeUnConfirmed from "./ChangeUnConfirmed"

const ChangePasswordAuth = (props) => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const [error, setError] = useState(null)

    const authChangePassword = async (data) => {
        try {
            const formData = {
                ...data,
                userId: localStorage.getItem("userId")
            }
            const response = await UserApi.passwordConfirmation(formData);
            if (response.status === "Success") {
                props.isSet()
                localStorage.setItem("#021", "true")
                navigate("/settings/confirmation/change-password")
                navigate(0)
            } else {
                setError(response.message)
            }

        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <Modal
                heading={<ModalHeading title={`Enter Password`} desc={`for security purpose`} onDismiss={props.isSet}/>}
                width=" w-[35%]"
            >

                <form action="" onSubmit={handleSubmit(authChangePassword)}>
                    {error && <Alert severity="error">{error}</Alert>}
                    <Stack className="!flex-row items-center justify-center gap-2">
                        <TextField
                            type="password"
                            name="password"
                            InputProps={{
                                startAdornment: <Password />
                            }}
                            label="Password"
                            {...register("password", { required: true })}
                        />
                        <Button type="submit" disabled={isSubmitting} variant="outlined">Submit</Button>

                    </Stack>
                </form>
            </Modal>
            <ChangeUnConfirmed />
        </>

    )
}

export default ChangePasswordAuth