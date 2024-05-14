/* eslint-disable react/prop-types */
import { Button, MenuItem, Select, Stack } from "@mui/material"
import Modal from "../Modal"
// import ModalDialogMessage from "../ModalDialogMessage"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as TrainingApi from "../../network/training_api"
import ModalDialogMessage from "../ModalDialogMessage"
import ModalHeading from "../ModalHeading"

const UpdateStatusModa = (props) => {

    const [val, setVal] = useState('none')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [open, setOpen] = useState(false)
    const { handleSubmit, formState: { isSubmitting } } = useForm()

    const regTraining = async () => {
        try {
            const formData = {
                "status": val,
                "userId": props.applicant.userId
            }
            const response = await TrainingApi.updateApplicantStatus(formData)
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


    const handleChange = (event) => {

        setVal(event.target.value);
    };
    return (
        <Modal
            heading={<ModalHeading title={'Update Trainee Status'} desc="" classname="!text-center " onDismiss={props.onClose} />}
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
                            {/* <Alert severity="info" className="mb-4">Since you are logged-in information will be automatically fill</Alert> */}
                            <Stack className="w-full gap-1">
                                {/* <Typography>Status <span className='text-red-500'>*</span></Typography>
                                <TextField
                                    id="outline-idno"
                                    name="trainingName"
                                    size="small"
                                    className="!w-full"
                                /> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className='!w-full'
                                    value={val}
                                    onChange={handleChange}

                                >
                                    <MenuItem value="none" disabled>Completion Status</MenuItem>

                                    <MenuItem value="1">Completer</MenuItem>
                                    <MenuItem value="0">Not Completer</MenuItem>


                                </Select>
                                <Button type='submit' disabled={isSubmitting} variant='contained' className='!mt-2'>{'Update Status'}</Button>
                            </Stack>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default UpdateStatusModa