import { Stack, Typography } from "@mui/material"
import OfficialsHotline from "./Contacts/OfficialsHotline"

const EmergencyContacts = () => {
    return (
        <>
            <Stack>
                <Typography className="!text-[18px] pb-2 !font-semibold">Official Hotlines</Typography>
            </Stack>
            <Stack className="!text-md !p-0 !m-0">

                <OfficialsHotline />
            </Stack>

        </>
    )
}

export default EmergencyContacts