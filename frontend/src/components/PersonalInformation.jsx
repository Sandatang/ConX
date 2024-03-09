import { AccountCircle } from "@mui/icons-material"
import { Button, Stack, Typography } from "@mui/material"

const PersonalInformation = () => {
    return (
        <>
            <Button className="self-end" variant="outlined">Update Details</Button>
            <Stack className="!flex-row mt-2 gap-4">
                <Stack className="w-1/4 gap-6 justify-center">
                    <Typography className="!text-slate-700 !tracking-wider !text-[15px]">Firstname</Typography>
                    <Typography className="!text-slate-700 !tracking-wider !text-[15px]">Middlename</Typography>
                    <Typography className="!text-slate-700 !tracking-wider !text-[15px]">Lastname</Typography>
                    <Typography className="!text-slate-700 !tracking-wider !text-[15px]">Birthday</Typography>

                </Stack>

                <Stack className="w-3/4 gap-4 items-center">
                    <Typography className="border-b border-slate-400 pb-1 w-full !text-slate-700">
                        <AccountCircle fontSize="small" className="!text-slate-600 mr-2" />
                        Firstname here
                    </Typography>

                    <Typography className="border-b border-slate-400 pb-1 w-full !text-slate-700">
                        <AccountCircle fontSize="small" className="!text-slate-600 mr-2" />
                        Firstname here
                    </Typography>

                    <Typography className="border-b border-slate-400 pb-1 w-full !text-slate-700">
                        <AccountCircle fontSize="small" className="!text-slate-600 mr-2" />
                        Firstname here
                    </Typography>

                    <Typography className="border-b border-slate-400 pb-1 w-full !text-slate-700">
                        <AccountCircle fontSize="small" className="!text-slate-600 mr-2" />
                        Firstname here
                    </Typography>
                </Stack>
            </Stack>
        </>
    )
}

export default PersonalInformation