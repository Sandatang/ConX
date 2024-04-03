import { Add } from "@mui/icons-material"
import { Button, LinearProgress, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import * as JobApi from "../network/job_api"
import AddJob from "../components/Job/AddJob"
import JobCard from "../components/Job/JobCard"


const JobLisintgs = () => {
    const userRole = localStorage.getItem("role")
    const [add, setAdd] = useState(false)
    const [loading, setLoading] = useState(true)
    const [job, setJob] = useState(null)



    useEffect(() => {
        const getAllJob = async () => {

            try {
                const response = await JobApi.viewAllJob()
                setJob(response)

            } catch (error) {
                console.error(error)
            } finally {

                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
        }
        getAllJob()
    }, [])
    return (
        !loading ?
            <Stack className="overflow-y-auto no-scrollbar px-8 py-4">
                <Stack className="!flex-row gap-3 w-full items-center mb-2">
                    <Stack className="!flex-row w-3/4  gap-2">
                        <Typography className="!text-2xl !font-semibold tracking-wider ! capitalize" >Jobs available</Typography>
                        <Typography className="!text-md bg-gray-100/70 px-6 py-2 rounded-full shadow-sm !font-medium">{job.filter(jb => jb.isActive).length}</Typography>
                    </Stack>
                    {
                        userRole === "Personnel" &&
                        <>
                            <Stack className="w-1/4 mr-4">
                                <Button onClick={() => setAdd(true)} className="self-end" variant="contained">
                                    <Add />
                                    Job
                                </Button>
                            </Stack>

                            {add && <AddJob onClose={() => setAdd(false)} />}
                        </>
                    }
                </Stack>

                <Stack className="w-full">
                    <div className=" mt-4 grid grid-cols-3 gap-y-8">
                        <JobCard job={job} />
                    </div>
                </Stack>
            </Stack>
            : <LinearProgress />
    )
}

export default JobLisintgs