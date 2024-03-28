import { AccountCircle } from "@mui/icons-material"
import { Stack, TextField, Typography } from "@mui/material"

const Comments = () => {
    return (
        <Stack>
            <Stack>
                <AccountCircle />
                <Stack>
                    <Typography className="!text-md">Bgry user name</Typography>
                    <TextField
                        placeholder="What's happening?"
                        multiline
                        rows={4}
                        InputProps={{
                            style: { borderRadius: '20px' }
                        }}
                        size="small"
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Comments