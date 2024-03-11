import { Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

const SettingLayout = () => {
    return (
        <Stack className=" w-9/12 px-16 pt-8">
            {/* <ChangePassword /> */}
            <Outlet />
        </Stack>
    )
}

export default SettingLayout