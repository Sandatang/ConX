/* eslint-disable react/prop-types */
import { Password } from "@mui/icons-material"
import { Button, Stack, TextField } from "@mui/material"
import Modal from "./Modal"
import ModalHeading from "./ModalHeading"

const ChangePasswordAuth = (props) => {

    console.log(props.onCancel)
    return (
        <Modal
            onDismiss={props.onCancel}
            heading={<ModalHeading title={`Enter Password`} desc={`for security purpose`} />}
            width=" w-[35%]"
        >

            <form action="">
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
        </Modal>
    )
}

export default ChangePasswordAuth