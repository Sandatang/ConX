/* eslint-disable react-hooks/exhaustive-deps */
import { AccountCircle, ArrowBack, LocationOn } from "@mui/icons-material"
import { Button, Stack, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as JobApi from "../../network/job_api"
import BreadCrumb from "../BreadCrumb"
import EmergencyContacts from "../EmergencyContacts"
import JobListingRightAside from "./JobListingRightAside"
import conxlogo from "../../assets/secondlogo.png"

const JobDetails = () => {
    const back = <> <ArrowBack /> Back </>
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [job, setJob] = useState(null)
    const [moreJob, setMoreJob] = useState(null)
    const breadCrumbUrl = [
        { url: '../', name: back },
    ]


    useEffect(() => {
        const getOneJob = async () => {
            try {
                const response = await JobApi.viewOneJob(id)
                const moreJobResponse = await JobApi.viewAllJob()
                setJob(response)
                setMoreJob(moreJobResponse)

            } catch (error) {
                console.error(error)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
        }

        getOneJob()
    }, [])
    return (
        loading ? (
            <React.Fragment>
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
                                    <Button  >
                                        <div className="w-4 h-4 rounded-full bg-gray-300/90" />
                                    </Button>
                                </Stack>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>

            </React.Fragment >
        ) : (
            <Stack className=" h-full overflow-auto mx-4 pb-10 no-scrollbar overflow-y-auto !flex-row">
                <Stack className="h-auto w-full pt-2">
                    <Stack className="pb-4">
                        <Stack className="bg-pinkish px-4 py-2 mb-4 rounded-sm">
                            <BreadCrumb data={breadCrumbUrl} classes="!text-[12px] tracking-wider !text-white font-bold " />
                        </Stack>
                        <Stack>
                            <Typography>{job.jobTitle}</Typography>
                            <Stack className="!flex-row gap-2">
                                <AccountCircle fontSize="large" />
                                <Stack>
                                    <Stack className="!flex-row items-center justify-center gap-2">

                                        <Typography className="!text-blue-400 !font-semibold !text-md">{job.contactPerson}</Typography>
                                        <Typography className="!text-md capitalize"> <LocationOn className="!text-md" /> {job.location}</Typography>

                                    </Stack>
                                    <Stack className="!flex-row items-center gap-2">
                                        <Typography className="!text-sm !text-slate-600">Partime / Fulltime </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack className="my-2">
                        <Typography className="py-2 !font-semibold !text-md">About this role</Typography>
                        <Typography className="!text-md !text-slate-600">
                            {job.jobDescription}
                        </Typography>
                    </Stack>

                    <Stack className="my-2">
                        <Typography className="py-2 !font-semibold !text-md">Salary</Typography>
                        <Typography className="!text-md !text-slate-600">Per Day : <span className="font-bold text-black">{job.wage}</span></Typography>
                        <Typography className="!text-md !text-slate-600">Monthly : <span className="font-bold !text-black ">Php{(job.wage * 30).toLocaleString()}</span></Typography>
                    </Stack>

                    <Stack className="my-2">
                        <Typography className="py-2 !font-semibold !text-md">Contacts</Typography>
                        <Typography className="!text-md !text-slate-600">Look for : <span className="font-bold text-black">{job.contactPerson}</span></Typography>
                        <Typography className="!text-md !text-slate-600">If you have questions you may call <span className="font-bold !text-black underline underline-offset-2">{job.contactNumber}</span></Typography>
                    </Stack>

                    <Stack>
                        <img src={conxlogo} alt="logo" className="w-full h-3/4 aspect-video rounded-lg bg-[#E1BEE7] " />
                    </Stack>
                </Stack>
                <Stack className=" h-screen w-[400px] p-8 bg-white">
                    <Stack className="border-l-2 h-[500px] w-[300px] px-4  fixed top-[5rem] right-0 ">
                        <Stack className="h-1/2 overflow-y-auto  border-b-2">
                            <JobListingRightAside loading={loading} job={moreJob} />
                        </Stack>
                        <Stack className="h-1/2 overflow-y-auto">
                            <EmergencyContacts />
                        </Stack>

                    </Stack>
                </Stack>
            </Stack>
        )
    )
}

export default JobDetails