/* eslint-disable react/prop-types */
import { Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as JobApi from "../../network/job_api"
import Modal from '../Modal'
import ModalDialogMessage from '../ModalDialogMessage'
import ModalHeading from '../ModalHeading'

const AddJob = (props) => {
    const navigate = useNavigate()
    const { register, reset, handleSubmit, formState: { isSubmitting } } = useForm()
    const [message, setMessage] = useState(null)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)

    const addAndUpdateJob = async (data) => {

        try {
            let property = props.update ? { 'jobId': props.job.id } : { 'userId': localStorage.getItem('userId') }
            let response
            const formData = {
                ...data,
                ...property,
                'isActive': true
            }
            if (props.update) {
                response = await JobApi.updateJob(formData)
            } else {
                response = await JobApi.addJob(formData)
            }

            if (response.status === "Success") {
                setError(false)
                reset()
                setMessage(response.message)
                setOpen(true)
                setTimeout(() => {
                    navigate(0)
                }, 1000)
            }
            else {
                setMessage(response.message)
                setError(true)

                setTimeout(() => {
                    // navigate(0)
                    setMessage(null)
                    setOpen(false)
                }, 2000)
            }
        } catch (error) {
            console.error(error)
            setMessage('An error occurred while adding the job. Please try again later.');
            setError(true)
            setTimeout(() => {
                // navigate(0)
                setMessage(null)
                setOpen(false)
            }, 2000)
        }
    }
    return (
        <Modal

            heading={<ModalHeading title={props.update ? 'Update Job' : 'Create Job'} desc="" classname="!text-center " onDismiss={props.onClose} />}
            width=" w-[40%]"
            height="h-[550px]"
            abs="right-[25rem]"
        >


            {/* {message && <Alert severity='success' className=''>{message}</Alert>} */}
            <ModalDialogMessage open={open} close={() => setOpen(close)} message={message} error={error} />
            <div className="w-full ">
                <div className="p-2">
                    <form action="" onSubmit={handleSubmit(addAndUpdateJob)}>
                        <div className="w-full sm:gap-1" >
                            <Stack className="w-full gap-1">
                                <Typography>Job Title <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    id="outline-idno"
                                    name="jobTitle"
                                    placeholder="Job Title "
                                    size="small"
                                    defaultValue={props.update ? props.job.jobTitle : ""}
                                    className="!w-full"
                                    {...register("jobTitle", { required: true })}
                                // InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                />
                                <Typography>Wage <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    type='number'
                                    id="outline-idno"
                                    name="jobWage"
                                    placeholder="Wage per day"
                                    size="small"
                                    defaultValue={props.update ? props.job.wage : ""}
                                    className="!w-full"
                                    {...register("jobWage", { required: true })}
                                // InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                />
                                <Typography>Location <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    id="outline-idno"
                                    name="location"
                                    placeholder="Location "
                                    size="small"
                                    defaultValue={props.update ? props.job.location : ""}
                                    className="!w-full"
                                    {...register("location", { required: true })}

                                // InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                />
                                <Typography>Job Description <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    multiline
                                    rows={4}
                                    id="outline-idno"
                                    name="jobDescription"
                                    placeholder="Description of the job "
                                    defaultValue={props.update ? props.job.jobDescription : ""}
                                    size="small"
                                    className="!w-full"
                                    {...register("jobDescription", { required: true })}

                                // InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                />
                                <Typography>Contact Person <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    id="outline-idno"
                                    name="contactPerson"
                                    placeholder="Ex. Juan Luna "
                                    size="small"
                                    defaultValue={props.update ? props.job.contactPerson : ""}
                                    className="!w-full"
                                    {...register("contactPerson", { required: true })}

                                // InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                />
                                <Typography>Contact Number <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    type='number'
                                    id="outline-idno"
                                    name="contactNumber"
                                    placeholder="09XXXXXXXXX "
                                    size="small"
                                    defaultValue={props.update ? props.job.contactNumber : ""}
                                    className="!w-full"
                                    {...register("contactNumber", { required: true })}

                                // InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                />
                                <Button type='submit' disabled={isSubmitting} variant='contained' className='!mt-2'>{props.update ? 'Update Job' : 'Add Job'}</Button>
                            </Stack>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default AddJob