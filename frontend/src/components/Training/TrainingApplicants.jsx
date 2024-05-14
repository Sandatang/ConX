import { ArrowBack, CancelOutlined, CheckBoxRounded } from "@mui/icons-material";
import { Button, MenuItem, Select, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as TrainingApi from "../../network/training_api";
import BreadCrumb from "../BreadCrumb";
import UpdateStatusModa from "./UpdateStatusModa";

const TrainingApplicants = () => {
    const [val, setVal] = useState('none')
    const [trainings, setTrainings] = useState(null)
    const [applicants, setApplicants] = useState(null)
    const [toUpdate, setToUpdate] = useState(null)
    const [update, setUpdate] = useState(false)
    const [certificate, setCertificate] = useState(false)
    const { handleSubmit, formState: { isSubmitting } } = useForm()
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

        setCertificate(false)
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
                <Stack className="!flex-row w-full justify-between items-center">
                    <Stack>
                        <Button onClick={() => {
                            setCertificate(true)
                        }} className="!underline justify-start !underline-offset-1 ">Certificate Grant</Button>
                    </Stack>

                    <Stack>
                        <form action="" onSubmit={handleSubmit(getApplicants)} className="w-full flex flex-row items-center gap-2">

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className='!w-full'
                                value={val}
                                onChange={handleChange}
                                size="small" // This makes the select smaller
                                sx={{
                                    minWidth: 120, // Adjust the minimum width
                                    height: '40px', // Adjust the height
                                    fontSize: '14px', // Adjust the font size
                                    '.MuiSelect-root': {
                                        padding: '8px 14px', // Adjust the padding inside the select
                                    }
                                }}

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
                                <Button type="submit" disabled={isSubmitting} variant="contained">View</Button>
                            </Stack>
                        </form>
                    </Stack>
                </Stack>

                <Stack className="w-full">
                    <table className="min-w-full divide-y divide-gray-200 relative">
                        <thead className="bg-gray-300 border border-solid sticky top-0 z-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                <th scope="col" className={`px-6 py-3 ${certificate ? 'text-center' : 'text-left'} text-xs font-medium uppercase tracking-wider`}>Civil Status</th>
                                <th scope="col" className={`px-6 py-3 ${certificate ? 'text-right' : 'text-left'} text-xs font-medium uppercase tracking-wider`}>Email</th>
                                {
                                    !certificate &&
                                    <>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Completer</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Action</th>
                                    </>

                                }
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y  divide-gray-200">
                            {
                                applicants && applicants.length > 0 &&
                                applicants.map((a) => (
                                    <tr key={a.trainingId}>
                                        {certificate && a.completer && (
                                            <>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {a.userFirstname} {a.userMiddlename} {a.userLastname}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center whitespace-nowrap">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {a.civilStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {a.email}
                                                    </span>
                                                </td>
                                                {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <span className={`text-sm font-medium ${a.completer ? '!text-green-500' : '!text-red-500'}`}>
                                                        {a.completer ? <CheckBoxRounded /> : <CancelOutlined />}
                                                    </span>
                                                </td> */}
                                            </>
                                        )}

                                        {!certificate && (
                                                <>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {a.userFirstname} {a.userMiddlename} {a.userLastname}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {a.civilStatus}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {a.email}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <span className={`text-sm font-medium ${a.completer ? '!text-green-500' : '!text-red-500'}`}>
                                                            {a.completer ? <CheckBoxRounded /> : <CancelOutlined />}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <Button onClick={() => {
                                                            setToUpdate(a)
                                                            setUpdate(true)
                                                        }} component={"span"} className={`!text-sm !font-medium !text-green-500 `}>
                                                            update status
                                                        </Button>
                                                    </td>
                                                </>
                                            )}


                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </Stack>
            </Stack>
            {update && <UpdateStatusModa applicant={toUpdate} onClose={() => setUpdate(false)} />}
        </Stack>
    )
}

export default TrainingApplicants