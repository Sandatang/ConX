import { Stack } from '@mui/material';
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import NavigationMapping from '../components/NavigationMapping';

const MainContent = () => {

    return (
        <>

            <Header />

            <Stack className="!flex-row h-dvh bg-gray-200 flex">
                {/* Side Navigation */}
                <Stack className="!flex-row !h-vh flex-none w-[250px] justify-start bg-white p-4 ">
                    <Stack spacing={2} className='w-full sticky top-10'>

                        <NavigationMapping />
                    </Stack>
                </Stack>
                {/* Contents */}
                <Stack className='w-full h-screen overflow-hidden no-scrollbar bg-white border-x-2'>
                    <Outlet />
                </Stack >

            </Stack>
        </>
    )
}

export default MainContent