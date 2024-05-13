import { Button, MenuItem, Select, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import * as TrainingApi from "../../network/training_api";
import { ArrowBack } from "@mui/icons-material";
import BreadCrumb from "../BreadCrumb";

const TrainingApplicants = () => {
    const [val, setVal] = useState('none')
    const [trainings, setTrainings] = useState(null)
    const [applicants, setApplicants] = useState(null)
    const back = <> <ArrowBack /> Back </>
    const breadCrumbUrl = [
        { url: '../', name: back },
    ]

    useEffect(() => {
        const getAllTrainings = async () => {
            const response = await TrainingApi.getAllTraining();
            setTrainings(response)
        }
        getAllTrainings()
    }, [])

    const getApplicants = async () => {
        try {
            const response = await TrainingApi.getApplicants(val)
            setApplicants(response)
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (event) => {

        setVal(event.target.value);
    };
    return (
        <Stack className=" my-10 px-10">
            <Stack className="bg-pinkish px-4 py-2 mb-4 rounded-sm">
                <BreadCrumb data={breadCrumbUrl} classes="!text-[12px] tracking-wider !text-white font-bold " />
            </Stack>
            <Stack className="justify-center items-center">

                <Stack className="w-1/2 ">
                    <form action="" className="w-full">

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className='!w-full'
                            value={val}
                            onChange={handleChange}

                        >
                            <MenuItem value="none" disabled>Training Name</MenuItem>
                            {
                                trainings && trainings.length > 0 &&
                                trainings.map((t) => (

                                    <MenuItem key={t.id} value={t.id}>{t.trainingName}</MenuItem>
                                ))
                            }

                        </Select>
                        <Stack className="my-2">
                            <Button variant="contained">View</Button>
                        </Stack>
                    </form>
                </Stack>

                <Stack className="w-full">
                    <table className="min-w-full divide-y divide-gray-200 relative">
                        <thead className="bg-gray-300 border border-solid sticky top-0 z-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Civil Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Attended</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y  divide-gray-200">
                            {
                                applicants && applicants.length > 0 &&
                                applicants.map((a) => (
                                    <tr key={a.trainingId}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="flex items-center">
                                                <span className="flex-shrink-0 h-10 w-10">
                                                </span>
                                                <span className="ml-4 flex flex-col">
                                                </span>
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default TrainingApplicants