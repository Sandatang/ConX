import { Group } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Header } from "../components/Header";

const MainContent = () => {
    const [activeSection, setActiveSection] = useState("Community");

    const handleSectionClick = (section) => {
        setActiveSection(section);
    }
    useEffect(() => {
        setActiveSection(location.pathname)
    }, [])
    return (
        <>

            <Header />
            <Stack className="!flex-row min-h-screen bg-gray-200 flex pt-2">
                <Stack className="!flex-row flex-none w-1/7 bg-white p-4 rounded-lg shadow-md mr-4">

                    <Stack spacing={2}>

                        <Button
                            onClick={() => handleSectionClick('/newsfeed')}
                            className={` !text-[12px] tracking-wider !rounded-xl !py-3 ${activeSection === '/newsfeed' ? '' : '!text-black'}`}
                            variant={activeSection === '/newsfeed' ? 'contained' : 'outlined'}
                        >
                            <NavLink to={"/newsfeed"} className=" !flex !justify-start gap-4 w-full">
                                <Group fontSize="medium" />
                                Feed
                            </NavLink>
                        </Button>

                        <Button
                            onClick={() => handleSectionClick('/bulletin-board')}
                            className={`!flex !justify-start gap-2 !text-[12px] tracking-wider !rounded-xl !py-3 ${activeSection === '/bulletin-board' ? '' : '!text-black'}`}
                            variant={activeSection === '/bulletin-board' ? 'contained' : 'outlined'}
                        >
                            <NavLink to={"/bulletin-board"} className=" !flex !justify-start gap-4 w-full">
                                <Group fontSize="medium" /> Bulletin Board
                            </NavLink>
                        </Button>

                        <Button
                            onClick={() => handleSectionClick('/manageusers')}
                            className={`!flex !justify-start gap-2 !text-[12px] tracking-wider !rounded-xl !py-3 ${activeSection === '/manageusers' ? '' : '!text-black'}`}
                            variant={activeSection === '/manageusers' ? 'contained' : 'outlined'}
                        >
                            <NavLink to={"/manageusers"} className=" !flex !justify-start gap-4 w-full">
                                <Group fontSize="medium" />
                                Manage Users
                            </NavLink>
                        </Button>

                        <Button
                            onClick={() => handleSectionClick('/forum')}
                            className={`!flex !justify-start gap-2 !text-[12px] tracking-wider !rounded-xl !py-3 ${activeSection === '/forum' ? '' : '!text-black'}`}
                            variant={activeSection === '/forum' ? 'contained' : 'outlined'}
                        >
                            <NavLink to={"/forum"} className=" !flex !justify-start gap-4 w-full">
                                <Group fontSize="medium" /> Forum
                            </NavLink>
                        </Button>

                        <Button
                            onClick={() => handleSectionClick('/statistics')}
                            className={`!flex !justify-start gap-2 !text-[12px] tracking-wider !rounded-xl !py-3 ${activeSection === '/statistics' ? '' : '!text-black'}`}
                            variant={activeSection === '/statistics' ? 'contained' : 'outlined'}
                        >
                            <NavLink to={"/statistics"} className=" !flex !justify-start gap-4 w-full">
                                <Group fontSize="medium" /> Statistics
                            </NavLink>
                        </Button>


                    </Stack>

                </Stack >
                <Stack>
                    <Outlet />
                </Stack >
            </Stack>
        </>
    )
}

export default MainContent