import { CopyAll } from "@mui/icons-material"
import { Divider, IconButton, Stack, Typography } from "@mui/material"

const EmergencyContacts = () => {
    return (
        <>
            <Typography className="!text-[18px] pb-2 !font-semibold">Emergency Hotlines</Typography>
            <Stack className="!text-sm !p-0 !m-0">
                <Stack className="!flex-row items-center ">
                    <span className="self-start capitalize">landline:</span>
                    <Stack className="self-end w-full items-end">
                        <span className="font-bold underline underline-offset-2">
                            262-9424
                            <IconButton><CopyAll fontSize="small" /></IconButton>
                        </span>
                        <span className="font-bold underline underline-offset-2">
                            166
                            <IconButton><CopyAll fontSize="small" /></IconButton>

                        </span>
                    </Stack>
                </Stack>
                <Divider />
                <Stack className="!flex-row items-center  ">
                    <span className="self-start capitalize">sun:</span>
                    <Stack className="self-end w-full items-end">
                        <span className="font-bold underline underline-offset-2">
                            09325377770
                            <IconButton><CopyAll fontSize="small" /></IconButton>
                        </span>
                        <span className="font-bold underline underline-offset-2">
                            09235248222
                            <IconButton><CopyAll fontSize="small" /></IconButton>

                        </span>
                    </Stack>
                </Stack>

                <Divider />
                <Stack className="!flex-row items-center  ">
                    <span className="self-start capitalize">Smart:</span>
                    <Stack className="self-end w-full items-end ">
                        <span className=" font-bold underline underline-offset-2">
                            09471780000
                            <IconButton><CopyAll fontSize="small" /></IconButton>
                        </span>
                        <span className="font-bold underline underline-offset-2">
                            09471789999
                            <IconButton><CopyAll fontSize="small" /></IconButton>

                        </span>
                    </Stack>
                </Stack>
                <Divider />
                <Stack className="!flex-row items-center ">
                    <span className="self-start capitalize">Globe:</span>
                    <Stack className="self-end w-full items-end">
                        <span className="font-bold underline underline-offset-2">
                            09567900377
                            <IconButton><CopyAll fontSize="small" /></IconButton>
                        </span>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default EmergencyContacts