/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Search } from "@mui/icons-material";
import { Button, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import OfficialsHotline from "../Contacts/OfficialsHotline";
import woman from "../assets/women.png";
import ForumAddTopic from "../components/Forum/ForumAddTopic";
import TopForum from "../components/Forum/TopForum";
import { topics } from "../constants";
import AddHotline from "../Contacts/AddHotline";


const Forum = () => {
    const [addTopic, setAddTopic] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        try {
            if (!initialized) {
                navigate("/forum/topics")
                setInitialized(true)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, [1000])
        }
    }, [])




    return (
        !loading ?

            <Stack className=" h-full no-scrollbar overflow-y-auto !flex-row" >
                {/* Empowering text and Picture Container*/}
                < Stack className="h-auto mx-4 w-full pt-2" >
                    <Stack className=" bg-pinkish !flex-row rounded-xl mb-2 ">
                        <Stack className="w-[55%] mx-4 gap-4 p-4">
                            <Stack className="!text-white h-3/4 ">
                                <Typography className="!text-[34px] !font-semibold">Empowering Women</Typography>
                                <span className="text-sm text-blue-800">Join the community</span>
                            </Stack>
                            <Stack className="!flex-row gap-4">
                                <Button onClick={() => setAddTopic(true)} variant="contained" size="small" className="!bg-white !text-[12px] !text-pinkish !capitalize">Start new discussion</Button>
                                {/* <Button size="small" className="!bg-white !text-[12px] !text-pinkis !capitalize" >Learn more</Button> */}
                            </Stack>
                        </Stack>
                        <Stack className="w-[45%]">
                            <img src={woman} className="rounded-r-lg" />
                        </Stack>

                    </Stack>
                    {/* Forum navigations */}
                    <Stack >
                        <Stack className="!flex-row justify-start gap-4 my-4" >
                            {topics.map((topic) => (
                                <Button
                                    key={topic.link}
                                    component={NavLink} // Pass NavLink directly here
                                    to={`../forum${topic.link}`}
                                    variant="text"
                                    sx={{
                                        '&.active': {
                                            background: '#EB80D9',
                                            color: '#fff',

                                        },
                                        color: 'rgb(148 163 184 )',
                                    }}
                                    className=" !text-[11px] !font-semibold !capitalize"
                                >
                                    <span className=" !text-[11px] !font-semibold !capitalize">{topic.title}</span>
                                </Button>
                            ))}
                        </Stack>

                        <form className="flex flex-row mb-4" >
                            <input
                                type="text"
                                placeholder="Search..."
                                className="p-2 border-2 rounded-md w-full mr-4"
                            // {...register('searched')}
                            />
                            <Stack className="!relative">
                                <Button variant='outlined' size="small" type='submit' >
                                    <Search />
                                    <Typography>Search...</Typography>
                                </Button>
                            </Stack>
                        </form>
                    </Stack >
                    {/* End of Forum navigators */}

                    {/* Navigations content  */}
                    <Outlet />
                    {/* End Navigations content  */}


                </Stack >
                {/* End Empowering text and Picture */}

                {/* Threads right aside */}
                <Stack className=" h-screen w-[400px] p-8 bg-white">
                    <Stack className="border-l-2 h-[500px] w-[300px] px-4  fixed top-[5rem] right-0 ">
                        <Stack className="h-1/2 overflow-y-auto  border-b-2">
                            <TopForum />
                        </Stack>
                        <Stack className="h-1/2 overflow-y-auto">
                            <Stack className="!flex-row items-center">
                                <Typography className="!text-[18px] pb-2 !font-semibold">Official Hotlines</Typography>
                                {
                                    localStorage.getItem('role') === 'Personnel' &&
                                    <Button onClick={() => setOpen(true)}><Add /> hotline</Button>
                                }
                            </Stack>
                            <OfficialsHotline />
                        </Stack>

                    </Stack>
                </Stack>
                {/* End Threads right aside */}

                {addTopic && <ForumAddTopic onClose={() => setAddTopic(false)} />}
                {open && <AddHotline onClose={() => setOpen(false)} />}
            </Stack >
            :
            <LinearProgress />
    )
}

export default Forum