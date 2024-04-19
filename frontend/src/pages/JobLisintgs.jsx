import { Add, Search } from "@mui/icons-material"
import { Button, LinearProgress, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import * as JobApi from "../network/job_api"
import AddJob from "../components/Job/AddJob"
import JobCard from "../components/Job/JobCard"
import { useForm } from "react-hook-form"


const JobLisintgs = () => {
    const userRole = localStorage.getItem("role")
    const [add, setAdd] = useState(false)
    const [loading, setLoading] = useState(true)
    const [job, setJob] = useState([])
    const { register, watch } = useForm()
    const searchedValue = watch('searched')
    const [pollingInterval, setPollingInterval] = useState(5000); // Initial polling interval

    useEffect(() => {
        const getAllJob = async () => {

            try {
                const response = await JobApi.viewAllJob()
                setJob(response)

            } catch (error) {
                console.error(error)
                setPollingInterval(interval => Math.min(interval * 2, 60000)); // Exponential backoff with max interval of 1 minute

            } finally {

                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }
        }
        const intervalId = setInterval(getAllJob, pollingInterval);
        return () => clearInterval(intervalId);

    }, [pollingInterval])

    const filteredData = job && job.filter(item => {
        // Replace propertyName with the actual property name you want to check against
        return Object.values(item).some(value => {
            if (typeof value === 'string') {
                return value.includes(searchedValue);
            }
            return false; // You can handle other types if needed
        });
    });
    return (
        !loading ?
            <Stack className="overflow-y-auto no-scrollbar px-8 py-4">
                <Stack className="!flex-row gap-3 w-full  justify-between items-center mb-2">
                    <Stack className="!flex-row gap-2">
                        <Typography className="!text-2xl !font-semibold tracking-wider ! capitalize" >Jobs available</Typography>
                        <Typography className="!text-md bg-gray-100/70 px-6 py-2 rounded-full shadow-sm !font-medium">{job.filter(jb => jb.isActive).length}</Typography>
                    </Stack>
                    <form className="flex flex-row items-center justify-center mb-4" >
                        <input
                            type="text"
                            placeholder="Search..."
                            className="p-2 border-2 rounded-md w-full"
                            {...register('searched')}
                        />
                        <Stack className="!relative">
                            <Button variant='text' className=" " type='submit' >
                                <Search />
                                {/* <Typography>Search...</Typography> */}
                            </Button>
                        </Stack>
                    </form>
                    {
                        userRole !== "Women" && userRole !== "Admin" &&
                        <>
                            <Stack className="mr-4">
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
                        <JobCard job={job} filteredData={filteredData} />
                    </div>
                </Stack>
            </Stack>
            : <LinearProgress />
    )
}

export default JobLisintgs