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

                <Stack className=" !h-screen w-[250px] justify-start bg-white p-4 ">
                    <Stack className="!flex-row fixed top-18 left-0 z-10 !h-screen flex-none w-[200px] justify-start p-4 ">
                        <Stack spacing={2}

                            className='w-full '>

                            <NavigationMapping />
                        </Stack>
                    </Stack>
                </Stack>
                {/* Contents */}
                <Stack className='w-full h-screen pt-5 overflow-hidden no-scrollbar bg-white border-x-2'>
                    <Outlet />
                </Stack >

            </Stack>


        </>
    )
}

export default MainContent