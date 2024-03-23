import { Stack } from '@mui/material';
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import NavigationMapping from '../components/NavigationMapping';
import Footer from '../components/Footer';

const MainContent = () => {

    return (
        <>

            <Header />

            <Stack className="!flex-row h-dvh bg-gray-200 flex">
                {/* Side Navigation */}
                <Stack className="!flex-row !h-vh flex-none w-[250px] justify-start bg-white p-4 shadow-md">
                    <Stack spacing={2} className='w-full sticky top-0'>
                        <NavigationMapping />
                    </Stack>
                </Stack>
                {/* Contents */}
                <Stack className='w-full  bg-white border-x-2'>
                    <Outlet />
                </Stack >

            </Stack>
            <Footer/>
        </>
    )
}

export default MainContent