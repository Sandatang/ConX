import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import woman from "../assets/women.png";
import ForumAddTopic from "../components/Forum/ForumAddTopic";
import ForumContentContainer from "../components/Forum/ForumContentContainer";
import TopForum from "../components/Forum/TopForum";
import { topics } from "../constants";
import EmergencyContacts from "../components/EmergencyContacts";


const Forum = () => {
    const [addTopic, setAddTopic] = useState(false);


    return (
        <Stack className=" h-full overflow-auto mx-4 !flex-row">
            {/* Empowering text and Picture Container*/}
            <Stack className="h-auto w-[650px] pt-2">
                <Stack className=" bg-pinkish !flex-row rounded-xl mb-2 ">
                    <Stack className="w-[55%] mx-4 gap-4 p-4">
                        <Stack className="!text-white h-3/4 ">
                            <Typography className="!text-[34px] !font-semibold">Empowering Women</Typography>
                            <span className="text-sm text-blue-800">Join the community</span>
                        </Stack>
                        <Stack className="!flex-row gap-4">
                            <Button onClick={() => setAddTopic(true)} variant="contained" size="small" className="!bg-white !text-[12px] !text-pinkish !capitalize">Start new discussion</Button>
                            <Button size="small" className="!bg-white !text-[12px] !text-pinkis !capitalize" >Learn more</Button>
                        </Stack>
                    </Stack>
                    <Stack className="w-[45%]">
                        <img src={woman} className="rounded-r-lg" />
                    </Stack>

                </Stack>
                {/* Forum navigations */}
                <Stack className="!flex-row my-4">
                    <>
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
                    </>
                </Stack>
                {/* End of Forum navigators */}

                {/* Navigations content  */}
                <ForumContentContainer />
                {/* End Navigations content  */}


            </Stack>
            {/* End Empowering text and Picture */}

            {/* Threads right aside */}
            <Stack className="border-l-2 w-[300px] px-4 mx-4 sticky top-0">
                <Stack className="h-1/2 border-b-2">
                    <TopForum />
                </Stack>
                <Stack>
                    <EmergencyContacts/>
                </Stack>

            </Stack>
            {/* End Threads right aside */}

            {addTopic && <ForumAddTopic onClose={() => setAddTopic(false)} />}
        </Stack>
    )
}

export default Forum