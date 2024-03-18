import { Stack } from '@mui/material';
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import NavigationMapping from '../components/NavigationMapping';

const MainContent = () => {

    return (
        <>

            <Header />
            <Stack className="!flex-row !h-screen overflow-x-hidden bg-gray-200 flex">

                <Stack className="!flex-row  flex-none w-[250px] justify-start bg-white p-4 shadow-md">
                    <Stack spacing={2} className='w-full'>
                        <NavigationMapping />
                    </Stack>
                </Stack>
                <Stack className='w-full bg-white border-x-2'>
                    <Outlet />
                </Stack >
            </Stack>
        </>
    )
}

export default MainContent