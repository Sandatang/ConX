import { Stack, Typography } from "@mui/material"
import { useState } from "react";
import ReactPlayer from "react-player"

const Resources = () => {
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

    const handleVideoClick = (videoUrl) => {
        setSelectedVideoUrl(videoUrl);
    };
    return (
        <Stack className="!flex-row p-8 w-full h-dvh ">
            <Stack className="!flex-row p-8 w-full h-dvh">
                {selectedVideoUrl && (
                    <ReactPlayer
                        className='react-player'
                        url={selectedVideoUrl}
                        width='100%'
                        height='100%'
                    />
                )}

                <Stack className="bg-black h-[80%] w-[30%] p-2 ">
                    <Stack className="!flex-row h-[80px] gap-2 border-[1px] p-2 border-b-white">
                        <ReactPlayer
                            className='react-player'
                            url='https://www.youtube.com/watch?v=f4YWrr2gmAs&t=3s'
                            width='40%'
                            height='100%'
                            onClick={() => handleVideoClick('https://www.youtube.com/watch?v=f4YWrr2gmAs&t=3s')}
                        />
                        <Typography className="!text-white">Episode 1</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default Resources