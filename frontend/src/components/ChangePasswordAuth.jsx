/* eslint-disable react/prop-types */
import { Password } from "@mui/icons-material"
import { Button, Stack, TextField } from "@mui/material"
import ChangePassword from "./ChangePassword"
import Modal from "./Modal"
import ModalHeading from "./ModalHeading"
import { useState } from "react"

const ChangePasswordAuth = (props) => {

    const [passwordConfirm, setPasswordConfirm] = useState(false)

    const confirmedPassword = () => {
        setPasswordConfirm(true)
    }

    return (
        <Modal
            onDismiss={props.onClose}
            heading={<ModalHeading title={`${passwordConfirm ? 'Change Password':'Enter Password'}`} desc={`${passwordConfirm ? 'security credential will be change':'for security purpose'}`} />}
            width=" w-[35%]"
        >
            {
                !passwordConfirm && (

                    <form action="" onSubmit={confirmedPassword}>
                        <Stack className="!flex-row items-center justify-center gap-2">

                            <TextField
                                InputProps={{
                                    startAdornment: <Password />
                                }}
                                label="Password"
                            />
                            <Button type="submit" variant="outlined">Submit</Button>

                        </Stack>
                    </form>
                )
            }
            {passwordConfirm && <ChangePassword passwordConfirm={passwordConfirm}/>}
        </Modal>
    )
}

export default ChangePasswordAuth