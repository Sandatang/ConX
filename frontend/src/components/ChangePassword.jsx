/* eslint-disable react/prop-types */
import { Password } from "@mui/icons-material"
import { Button, Stack, TextField } from "@mui/material"

const ChangePassword = (props) => {
    console.log(props)

    return (
        <>
            {
                props.passwordConfirm && (
                    <Stack className=" mt-2 gap-4">

                        <form action="">
                            <Stack className="gap-4">

                                <TextField
                                    InputProps={{
                                        startAdornment: <Password />
                                    }}
                                    label="New Password"
                                    type="passowrd"
                                    fullWidth

                                />

                                <TextField
                                    InputProps={{
                                        startAdornment: <Password />
                                    }}
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                />
                                <Button className="self-end mt-4 !px-8" variant="contained">Submit</Button>
                            </Stack>

                        </form>

                    </Stack>
                )
            }

        </>
    )
}

export default ChangePassword