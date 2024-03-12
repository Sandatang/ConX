import { Stack } from '@mui/material';
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import NavigationMapping from '../components/NavigationMapping';

const MainContent = () => {

    return (
        <>

            <Header />
            <Stack className="!flex-row min-h-screen bg-gray-200 flex pt-2">

                <Stack className="!flex-row flex-none w-[250px] justify-start bg-white p-4 rounded-lg shadow-md mr-4">
                    <Stack spacing={2} className='w-full'>
                        <NavigationMapping />
                    </Stack>
                </Stack>
                <Stack className='w-full bg-white rounded-lg'>
                    <Outlet />
                </Stack >
            </Stack>
        </>
    )
}

export default MainContent