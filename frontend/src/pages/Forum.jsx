import { AccountCircle, ArrowCircleRight } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import woman from "../assets/women.png";
import ForumAddTopic from "../components/Forum/ForumAddTopic";
import { useState } from "react";

const Forum = () => {
    const [addTopic, setAddTopic] = useState(false);

    return (
        <Stack className=" h-screen mx-8 my-4 !flex-row">
            {/* Empowering text and Picture Container*/}
            <Stack className="w-[65%]">
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
                    <Button variant="contained" className="!bg-pinkish !text-[10px] !text-white !capitalize">Topics</Button> {/*List the forums and set the button active*/}
                    <Button className="!bg-white !text-[11px] !text-slate-400 !font-semibold !capitalize">Following</Button>
                    <Button className="!bg-white !text-[11px] !text-slate-400 !font-semibold !capitalize">Threads</Button>
                    <Button className="!bg-white !text-[11px] !text-slate-400 !font-semibold !capitalize">Announcement</Button>
                </Stack>
                {/* End of Forum navigators */}

                {/* Navigations content  */}
                <Stack className="mt-2 gap-4 px-4">
                    <Stack>
                        <Typography className="!text-[16px] !font-semibold">How husband affects you?</Typography>
                        <Typography className="!text-[12px] !text-slate-500">description of the forum here put it here in order for the users to know</Typography>
                    </Stack>
                    <Stack>
                        <Typography className="!text-[16px] !font-semibold">How husband affects you?</Typography>
                        <Typography className="!text-[12px] !text-slate-500">description of the forum here put it here in order for the users to know</Typography>
                    </Stack>
                    <Stack>
                        <Typography className="!text-[16px] !font-semibold">How husband affects you?</Typography>
                        <Typography className="!text-[12px] !text-slate-500">description of the forum here put it here in order for the users to know</Typography>
                    </Stack>
                    <Stack>
                        <Typography className="!text-[16px] !font-semibold">How husband affects you?</Typography>
                        <Typography className="!text-[12px] !text-slate-500">description of the forum here put it here in order for the users to know</Typography>
                    </Stack>
                </Stack>
                {/* End Navigations content  */}


            </Stack>
            {/* End Empowering text and Picture */}

            {/* Threads right aside */}
            <Stack className="ml-8 mt-2">
                <Typography className="!text-[18px] pb-2 !font-semibold">Discussions</Typography>

                <Stack className="gap-3">
                    {/* Each discussions */}
                    <Stack className="!flex-row">
                        <AccountCircle className="!text-[2.5em] !text-slate-500" />
                        <Stack className="ml-2 justify-center">
                            <Typography className="!text-sm !font-semibold tracking-wider">Title of discussions here</Typography>
                            <Typography className="!text-[0.467rem]">Name of creator of the discussion</Typography>
                        </Stack>
                        <Button>
                            <ArrowCircleRight className="!text-pinkish" />
                        </Button>
                    </Stack>
                    {/* End Each discussions */}

                    {/* Each discussions */}
                    <Stack className="!flex-row">
                        <AccountCircle className="!text-[2.5em] !text-slate-500" />
                        <Stack className="ml-2 justify-center">
                            <Typography className="!text-sm !font-semibold tracking-wider">Title of discussions here</Typography>
                            <Typography className="!text-[0.467rem]">Name of creator of the discussion</Typography>
                        </Stack>
                        <Button>
                            <ArrowCircleRight className="!text-pinkish" />
                        </Button>
                    </Stack>
                    {/* End Each discussions */}

                    {/* Each discussions */}
                    <Stack className="!flex-row">
                        <AccountCircle className="!text-[2.5em] !text-slate-500" />
                        <Stack className="ml-2 justify-center">
                            <Typography className="!text-sm !font-semibold tracking-wider">Title of discussions here</Typography>
                            <Typography className="!text-[0.467rem]">Name of creator of the discussion</Typography>
                        </Stack>
                        <Button>
                            <ArrowCircleRight className="!text-pinkish" />
                        </Button>
                    </Stack>
                    {/* End Each discussions */}
                </Stack>

            </Stack>
            {/* End Threads right aside */}

            {addTopic && <ForumAddTopic onClose={() => setAddTopic(false)}/>}
        </Stack>
    )
}

export default Forum