import { ArrowBack } from "@mui/icons-material"
import { Alert, Button, Stack, Typography } from "@mui/material"
import conxlogo from "../../assets/secondlogo.png"
import BreadCrumb from "../BreadCrumb"
import { useEffect, useState } from "react"
import * as TrainingApi from "../../network/training_api"
import { useParams } from "react-router-dom"
import TrainingRegistrationModal from "./TrainingRegistrationModal"

const TrainingDetails = () => {
    const back = <> <ArrowBack /> Back </>
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [register, setRegister] = useState(false)
    const [error, setError] = useState(null)
    const [training, setTraining] = useState(null)
    const breadCrumbUrl = [
        { url: '../', name: back },
    ]

    useEffect(() => {
        const viewOneTraining = async () => {
            try {
                const response = await TrainingApi.getOneTraining(id);
                if (response.status === "Error") {
                    setError(response.message)
                } else {
                    setTraining(response)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        viewOneTraining()
    }, [])
    return (
        loading ? (
            <>
                <Stack className="w-full">

                    <Stack className="h-auto w-[70%] pt-2">
                        <Stack className="p-4 gap-4">
                            <Stack className=" bg-gray-200/70 rounded-md animate-pulse">
                                <Stack className="py-14 px-8 gap-2">
                                    <div className=" rounded-lg bg-gray-300/90 h-2 w-3/4 "></div>
                                    <div className=" rounded-lg bg-gray-300/90 h-2 w-1/2 "></div>
                                    <div className=" rounded-lg bg-gray-300/90 h-2 w-3/4 "></div>

                                </Stack>
                            </Stack>
                            <Stack className="bg-gray-200/90 h-8 w-full" />
                            <div className="flex w-full justify-end">
                                <Stack className="bg-gray-200/90 h-8 w-1/4 justify-end" />
                            </div>
                            <Stack className="bg-gray-200/90 h-48 w-full" />

                        </Stack>
                    </Stack>

                    <Stack className=" h-screen w-[400px] p-8 bg-white">
                        <Stack className="border-l-2 h-[500px] w-[300px] px-4  fixed top-[5rem] right-0 ">
                            {Array.from({ length: 4 }).map((_, index) => (

                                <Stack key={index} className="!flex-row animate-pulse">

                                    <Stack className="ml-2 !flex-row w-3/4 gap-1 items-center">
                                        <div className="bg-gray-300/90 h-8 w-8 rounded-full" />
                                        <Stack className="gap-2">
                                            <div className=" rounded-lg bg-gray-300/90 h-2 w-28 "></div>
                                            <div className=" rounded-lg bg-gray-300/90 h-2 w-20 "></div>
                                        </Stack>
                                    </Stack>
                                    <Button >
                                        <div className="w-4 h-4 rounded-full bg-gray-300/90" />
                                    </Button>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>

            </ >
        ) : (
            error ? (
                <Alert>{error}</Alert>
            ) : (
                <Stack className=" h-full overflow-auto pb-10 no-scrollbar overflow-y-auto !flex-row">
                    <Stack className="h-auto w-full px-20 pt-2">
                        <Stack className="pb-4">
                            <Stack className="bg-pinkish px-4 py-2 mb-4 rounded-sm">
                                <BreadCrumb data={breadCrumbUrl} classes="!text-[12px] tracking-wider !text-white font-bold " />
                            </Stack>
                        </Stack>

                        <Stack className="my-2">
                            <Typography className="py-2 !text-md"><span className="!font-bold">Training Title: </span> {training.trainingName}</Typography>
                        </Stack>

                        <Stack className="my-2">
                            <Typography className="py-2 !font-semibold !text-md">About this training</Typography>
                            <Typography className="!text-md !text-slate-600">
                                {training.trainingDescription}
                            </Typography>
                        </Stack>

                        <Stack className="my-2">
                            <Typography className=" !font-semibold !text-md">Venue and Date</Typography>
                            <Typography className="!text-md !text-slate-600">Location : <span className="font-bold text-black">{training.venue}</span></Typography>
                            <Typography className="!text-md !text-slate-600">Start of training : <span className="font-bold text-black">{new Date(training.dateStarted).toDateString().split(" ").splice(1).join(" ")}</span></Typography>
                            <Typography className="!text-md !text-slate-600">End of training : <span className="font-bold text-black">{new Date(training.dateEnd).toDateString().split(" ").splice(1).join(" ")}</span></Typography>
                        </Stack>
                        <Typography className="!text-md !text-slate-600">If you are interested, do not hesitate to join. Equip yourself with skills to further your growth. Click <Typography component={"button"} onClick={() => setRegister(true)} className="!text-md !font-bold !text-blue-500 underline underline-offset-2">here</Typography> to register.</Typography>

                        <Stack className="my-10">
                            <img src={conxlogo} alt="logo" className="w-full h-3/4 aspect-video rounded-lg border-[1px] border-pinkish shadow-lg " />
                        </Stack>
                    </Stack>

                    {register && <TrainingRegistrationModal onClose={() => setRegister(false)} training={training}/>}
                </Stack>
            )
        )
    )
}

export default TrainingDetails