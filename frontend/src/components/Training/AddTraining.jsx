/* eslint-disable react/prop-types */
import { Button, Stack, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as TrainingApi from "../../network/training_api"
import Modal from '../Modal'
import ModalDialogMessage from '../ModalDialogMessage'
import ModalHeading from '../ModalHeading'
import dayjs from 'dayjs'

const AddTraining = (props) => {
    const { register, reset, setValue, handleSubmit, formState: { isSubmitting } } = useForm()
    const [message, setMessage] = useState(null)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)


    const addAndUpdateJob = async (data) => {

        try {
            // let property = props.update ? { 'jobId': props.job.id } : { 'userId': localStorage.getItem('userId') }
            let response
            const formData = {
                ...data,
                ...(props.update && {"trainingId": props.training.id}),
            }
            if (props.update) {
                response = await TrainingApi.updateTraining(formData)
            }
             else {
                response = await TrainingApi.addTraining(formData)
            }

            if (response.status === "Success") {
                setError(false)
                reset()
                setMessage(response.message)
                setOpen(true)
                setTimeout(() => {
                    setMessage(null)
                    setOpen(false)
                }, 2000)
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

            heading={<ModalHeading title={props.update ? 'Update Training' : 'Create Training'} desc="" classname="!text-center " onDismiss={props.onClose} />}
            width=" md:w-[50%] lg:w-[40%]"
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
                                <Typography>Training Title <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    id="outline-idno"
                                    name="trainingName"
                                    size="small"
                                    defaultValue={props.update ? props.training.trainingName : ""}
                                    className="!w-full"
                                    {...register("trainingName", { required: true })}
                                />
                                <Typography>Training Description <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    multiline
                                    rows={4}
                                    id="outline-idno"
                                    name="trainingDescription"
                                    defaultValue={props.update ? props.training.trainingDescription : ""}
                                    size="small"
                                    className="!w-full"
                                    {...register("trainingDescription", { required: true })}

                                />
                                <Typography>Venue <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    id="outline-idno"
                                    name="venue"
                                    size="small"
                                    defaultValue={props.update ? props.training.venue : ""}
                                    className="!w-full"
                                    {...register("venue", { required: true })}

                                />
                                <Typography>Date Start <span className='text-red-500'>*</span></Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        value={props.update ? dayjs(props.training.dateStarted) : null}
                                        name="dateStarted"
                                        label="Date Start"
                                        disabledTime
                                        onChange={(date) => { setValue('dateStarted', date, { shouldValidate: true }); }}
                                        // {...(props.update && register("dateStarted"))} // Register the DatePicker with the form
                                    />

                                </LocalizationProvider>
                                <Typography>Date End <span className='text-red-500'>*</span></Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        value={props.update ? dayjs(props.training.dateEnd) : null}
                                        name="dateEnd"
                                        label="End Start"
                                        disabledTime
                                        onChange={(date) => { setValue('dateEnd', date, { shouldValidate: true }); }}
                                        // {...(props.update && register("dateEnd"))} // Register the DatePicker with the form
                                        // {...(props.update && )} // Register the DatePicker with the form
                                    />
                                </LocalizationProvider>
                                <Button type='submit' disabled={isSubmitting} variant='contained' className='!mt-2'>{props.update ? 'Update Training' : 'Add Training'}</Button>
                            </Stack>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default AddTraining
