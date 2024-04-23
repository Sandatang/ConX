/* eslint-disable react/prop-types */
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as JobApi from "../../network/job_api";
import * as UserApi from "../../network/user_api";
import { useNavigate } from "react-router-dom";

const ModalDeActivate = (props) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(null);
    const { register, handleSubmit } = useForm()

    const userDeActivation = async (data) => {
        try {

            const formData = {
                userId: props.userId,
                "deactivationReason": data.reason,
                "deactivatorId": localStorage.getItem('userId'),
            }
            const response = await UserApi.deActivateUser(formData);
            console.log(response)
            if (response.status === "Success") {
                setMessage(response.message)

                setTimeout(() => {
                    handleClose()
                }, 1000)
            }
            if (response.status === "Error") {
                setError(true)
                setMessage(response.message)
            }
            // navigate(0)
        } catch (error) {
            console.error(error)
        }

    }

    const deActivateJob = async () => {

        const response = await JobApi.closeJob(props.jobId)
        console.log(response)
        handleClose()
        navigate(0)

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            {props.job ? (
                <IconButton onClick={handleClickOpen} className="!rounded-md hover:!bg-transparent group">
                    <span className='text-sm text-red-500 group-hover:!text-black/50 '>Delete Job</span>
                </IconButton>
            ) : (
                props.active5 ? (
                    <Button className="!text-sm !font-medium" variant='text' disabled={true}>Deleted</Button>

                ) : (

                    <Button onClick={handleClickOpen} className={` ${!props.status ? "!text-green-500" : "!text-red-500"} !capitalize !text-[0.7em] !font-thin hover:!underline hover:!underline-offset-2 hover:!text-slate-600`}>
                        {!props.status ? "Activated" : "Deactivated"}
                    </Button>
                )
            )}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className="!text-lg" id="alert-dialog-title">
                    Do you want to {props.job ? 'close this job' : `${props.status ? 'activate this user account' : 'deactivate this user account'}`}?

                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {!error && message && <Alert seveirty="success">{message}</Alert>}
                        {props.job ? 'Closing this job means that this is no longer looking' : `${props.status ? 'Activating this user account will return their any associated services to normal' : 'Deactivating this user account will restrict their access to the system, this action is reversible. Please provide reason for de-activating this account'}  .`}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        !error && !message &&
                        <form action="" onSubmit={handleSubmit(props.job ? deActivateJob : userDeActivation)} className={` ${props.status ? "w-full flex flex-row justify-end" : "w-full flex flex-row pl-4 justify-between"} `}>
                            {
                                props.status &&
                                <TextField
                                    id="outline-idno"
                                    name="reason"
                                    placeholder="Reason... "
                                    size="small"
                                    defaultValue={props.update ? props.user.user.userName : ""}
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                    {...register('reason', { required: true })}
                                />
                            }
                            <Button type="submit">Yes</Button>
                        </form>
                    }
                    <Button onClick={handleClose} autoFocus variant="contained">

                        {
                            !error && !message ? "No" : "Close"
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalDeActivate