import { Stack, Typography } from "@mui/material"
import { FaLeaf } from "react-icons/fa";

const Livelihood = () => {
    return (
        <>
            <Stack className='!flex-row gap-10'>
                {/* <ReactPlayer
                    className='react-player'
                    url='https://www.youtube.com/watch?v=lZz-CUW5ap8'
                    width='35%'
                    height='160px'
                /> */}
                <Stack >
                    <FaLeaf className="!text-[50px] !text-slate-600"/>
                </Stack>

                <Stack>
                    <Typography variant="h5">Backyard Gardening</Typography>
                    <Typography variant="body2" className="!text-slate-600">Source</Typography>

                </Stack>
            </Stack>
        </>
    )
}

export default Livelihood