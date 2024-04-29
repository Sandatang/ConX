import { useEffect, useState } from "react"
import * as TestimonyApi from "../../network/testimony_api"
import { Alert, Avatar, Button, Stack, Typography } from "@mui/material"
import { civilStatus } from "../../constants"
import { ArrowBack, PlayArrow } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import ReactPlayer from "react-player"
import ModalPlayVideo from "./ModalPlayVideo"
const AllTestimonial = () => {
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate()
    const [playVideo, setPlayVideo] = useState(false)
    const [testimonies, setTestimonies] = useState(null)
    const [videoToPlay, setVideoToPlay] = useState(null)
    const [active, setActive] = useState(null)

    useEffect(() => {

        const getAllTestimonys = async () => {
            try {
                const response = await TestimonyApi.getAllTestimony();
                setTestimonies(response)
            } catch (error) {
                console.error(error)
            }
        }
        getAllTestimonys()
    }, [])
    return (
        <Stack className="p-8">
            <Stack className="!flex-row justify-center items-center">
                <ArrowBack onClick={() => {
                    navigate(-1)
                }} className="!text-slate-500 cursor-pointer hover:!text-slate-800" />
                <Stack className="!w-3/4 !flex-row justify-evenly items-center">
                    {
                        civilStatus.map((cs) => (
                            <Button
                                key={cs.link}
                                className={`!capitalize !text-slate-600 hover:!text-slate-900 ${active === cs.link ? '!bg-pinkish !text-white' : ''}`}
                                onClick={() => setActive(cs.link)}
                            >
                                {cs.title}
                            </Button>
                        ))
                    }
                </Stack>
            </Stack>
            <Stack className="p-16">
                <div className="mt-4 grid grid-cols-1 gap-4">

                    {
                        testimonies !== null && testimonies.filter((a) => active && a.civilStatus === active).length > 0 ?
                            testimonies.filter((a) => active && a.civilStatus === active).map((t, index) => (
                                <Stack className="w-[350px] p-2 border-[1px] rounded-md shadow-sm" key={index}>
                                    <Stack>
                                        <Stack className="!flex-row gap-2">
                                            <Avatar />
                                            <Stack>
                                                <Typography variant='h6' className="!text-slate-800 !capitalize">{t.fullName}</Typography>
                                                <Typography variant='caption' className="!text-slate-700">
                                                    {new Date(t.created).toDateString().split(" ").splice(1).join(" ")}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack className="my-4">
                                            <DynamicText text={t.content} maxHeight={100} />
                                        </Stack>
                                    </Stack>
                                    <Stack className="shadow-lg">
                                        <Button
                                            component={"div"}
                                            variant="contained"
                                            className="!w-full relative !flex !flex-row justify-start !p-0 gap-2 hover:!bg-slate-700 !bg-slate-600 !py-1"
                                        >
                                            <ReactPlayer
                                                className='react-player'
                                                url={`https://localhost:44398/api/video/name/${t.videoUrl}`}
                                                width='100%'
                                                height='100%'
                                                light={false}
                                                onClick={() => {
                                                    setVideoToPlay(t.videoUrl)
                                                    setPlayVideo(true)
                                                }}
                                            />
                                            <PlayArrow className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black" style={{ fontSize: 40 }} />
                                        </Button>
                                    </Stack>
                                </Stack>
                            )) : (
                                <Alert severity="info">No data yet.</Alert>
                            )
                    }
                </div>
            </Stack >
            {playVideo && <ModalPlayVideo videoToPlay={videoToPlay} onClose={() => setPlayVideo(false)} />}
        </Stack >
    )
}

export default AllTestimonial

// eslint-disable-next-line react/prop-types
export const DynamicText = ({ text, maxHeight }) => {
    const [fontSize, setFontSize] = useState(12);

    useEffect(() => {
        const container = document.createElement("div");
        container.style.visibility = "hidden";
        container.style.position = "absolute";
        container.style.width = "auto";
        container.style.height = "auto";
        container.style.fontSize = `${fontSize}px`;
        container.textContent = text;
        document.body.appendChild(container);
        const { height } = container.getBoundingClientRect();
        document.body.removeChild(container);

        if (height > maxHeight && fontSize > 10) {
            setFontSize((prevSize) => prevSize - 1);
        }
    }, [text, maxHeight, fontSize]);

    return <Typography variant="body2" style={{ fontSize }}>{text}</Typography>;
};