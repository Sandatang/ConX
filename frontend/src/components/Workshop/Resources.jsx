import { PlayArrow } from "@mui/icons-material";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import * as WorkshopApi from "../../network/workshop_api";
import ModalAddResource from "./ModalAddResource";
import BreadCrumb from "../BreadCrumb";
import ResourcesActionDropDown from "./ResourcesActionDropDown";
import ResourcesUpdateModal from "./ResourcesUpdateModal";

const Resources = () => {
    const { categoryId, categoryTitle, workshopTitle, id } = useParams()
    const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
    const [open, setOpen] = useState(false)
    const [updateResources, setUpdateResources] = useState(false)
    const [resources, setResources] = useState(null)
    const [resourceToUpdate, setResourceToUpdate] = useState(null)
    const [pollingInterval, setPollingInterval] = useState(5000); // Initial polling interval
    const breadCrumbUrl = [
        { url: `../workshop/${categoryTitle}/${categoryId}`, name: categoryTitle },
        { name: workshopTitle.split("-").join(" ") }
    ]

    useEffect(() => {
        const viewResource = async () => {
            try {
                const response = await WorkshopApi.getWorkshopResource(id)
                setResources(response)
            } catch (error) {
                console.error(error)
                setPollingInterval(interval => Math.min(interval * 2, 60000)); // Exponential backoff with max interval of 1 minute

            }
        }
        const intervalId = setInterval(viewResource, pollingInterval);
        return () => clearInterval(intervalId);
    }, [id, pollingInterval])

    const handleVideoClick = (videoUrl) => {
        setSelectedVideoUrl(videoUrl);
        console.log(videoUrl)
    };
    return (
        <Stack className="mt-4 px-8">
            <Stack className="!flex-row justify-between">
                <BreadCrumb data={breadCrumbUrl} classes="!text-[12px] hover:!text-slate-600 tracking-wider !text-black font-bold " />
                {
                    localStorage.getItem('role') !== "Women" &&
                    <Button
                        onClick={() => {
                            setOpen(true)
                        }}
                        variant="contained">
                        Add Video
                    </Button>
                }
            </Stack>
            <Stack className="!flex-row pb-8 w-full h-dvh ">

                <Stack className="!flex-row py-4 w-full h-dvh">
                    <Stack className="w-[70%] h-[80%] bg-black relative border-[2px] mr-1 rounded-md">
                        {selectedVideoUrl ? (
                            <ReactPlayer
                                className='react-player'
                                url={`https://localhost:44398/api/video/name/${selectedVideoUrl}`}
                                width='100%'
                                height='100%'
                                controls
                                playing
                            />
                        ) : (
                            <CircularProgress className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
                        )}
                    </Stack>

                    <Stack className="bg-black h-[80%] w-[30%] rounded-md p-2 ">
                        {
                            resources && resources.length > 0 && resources.map((r, index) => (
                                <Stack key={index} className="!flex-row h-[80px] border-b-[1px] py-2 gap-2 border-b-white">

                                    <Button
                                        onClick={() => handleVideoClick(r.videoUrl)}
                                        component={"div"}
                                        variant="contained"
                                        className="!w-full relative !flex !flex-row justify-start !p-0 gap-2 hover:!bg-slate-700 !bg-slate-600 !py-1"
                                    >

                                        <ReactPlayer
                                            className='react-player'
                                            url={`https://localhost:44398/api/video/name/${r.videoUrl}`}
                                            width='80%'
                                            height='100%'
                                            light={false}
                                        />
                                        {
                                            selectedVideoUrl !== r.videoUrl &&
                                            <PlayArrow className="absolute top-1/2 left-[25%] transform -translate-x-1/2 -translate-y-1/2 text-black" style={{ fontSize: 40 }} />
                                        }
                                        <Stack className="w-3/4 !p-0">
                                            <Typography variant="body1" className="!text-white !capitalize">{r.videoTtile}</Typography>
                                            <Typography variant="body2" className="!text-slate-300 !normal-case !line-clamp-2">{r.videoDescription}</Typography>
                                        </Stack>
                            {/* <ShopActionDropDown toDelete={w.workshopId} setUpdatePost={() => setUpdateShop(true)} setPostToUpdate={() => setShopToUpdate(w)} /> */}

                                        <ResourcesActionDropDown toDelete={r.resourceId} setUpdatePost={() => setUpdateResources(true)} setPostToUpdate={() => setResourceToUpdate(r)}  />
                                    </Button>

                                </Stack>
                            ))
                        }
                    </Stack>
                </Stack>
            </Stack>

            {open && <ModalAddResource onClose={() => setOpen(false)} />}
            {updateResources && <ResourcesUpdateModal onClose={() => setUpdateResources(false)} resource={resourceToUpdate} />}

        </Stack>
    )
}

export default Resources