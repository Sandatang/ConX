/* eslint-disable react/prop-types */
import { Alert, Button, Stack, TextField, Typography } from "@mui/material"
import Modal from "../Modal"
// import ModalDialogMessage from "../ModalDialogMessage"
import ModalHeading from "../ModalHeading"
import { useForm } from "react-hook-form"
import * as TrainingApi from "../../network/training_api"
import { useState } from "react"
import ModalDialogMessage from "../ModalDialogMessage"

const TrainingRegistrationModal = (props) => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const regTraining = async (data) => {
        try {
            const formData = {
                ...data,
                "userId": localStorage.getItem('userId'),
                "trainingId": props.training.id
            }
            const response = await TrainingApi.registerTraining(formData)
            if (response.status === "Error") {
                setError(response.message)
            } else {
                setOpen(true)
                setSuccess(response.message)
                setTimeout(() => {
                    setSuccess(null)
                    setOpen(false)
                }, 2000)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Modal
            heading={<ModalHeading title={'Training Registration Form'} desc="" classname="!text-center " onDismiss={props.onClose} />}
            width=" md:w-[50%] lg:w-[40%]"
            // height="h-[550px]"
            abs="right-[25rem]"
        >


            {/* {message && <Alert severity='success' className=''>{message}</Alert>} */}
            <ModalDialogMessage open={open} close={() => setOpen(close)} message={success} error={error} />
            <div className="w-full ">
                <div className="p-2">
                    <form action="" onSubmit={handleSubmit(regTraining)}>
                        <div className="w-full sm:gap-1" >
                            <Alert severity="info" className="mb-4">Since you are logged-in information will be automatically fill</Alert>
                            <Stack className="w-full gap-1">
                                <Typography>Training Title <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    id="outline-idno"
                                    name="trainingName"
                                    size="small"
                                    defaultValue={props.training ? props.training.trainingName : ""}
                                    className="!w-full"
                                />
                                <Typography> Email <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    id="outline-idno"
                                    name="email"
                                    size="small"
                                    type="email"
                                    // defaultValue={props.update ? props.training.trainingName : ""}
                                    className="!w-full"
                                    {...register("email", { required: true })}
                                />
                                <Typography>Contact No. <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    id="outline-idno"
                                    name="contactNo"
                                    size="small"
                                    // defaultValue={props.update ? props.training.trainingName : ""}
                                    className="!w-full"
                                    {...register("contactNo", { required: true })}

                                />
                                <Button type='submit' disabled={isSubmitting} variant='contained' className='!mt-2'>{props.update ? 'Update Training' : 'Add Training'}</Button>
                            </Stack>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default TrainingRegistrationModal