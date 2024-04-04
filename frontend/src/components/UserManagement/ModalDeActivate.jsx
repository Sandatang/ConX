/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as JobApi from "../../network/job_api";
import * as UserApi from "../../network/user_api";
import { useNavigate } from "react-router-dom";

const ModalDeActivate = (props) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const { handleSubmit } = useForm()

    const userDeActivation = async () => {
        const formData = {
            userId: props.userId,
        }
        const response = await UserApi.deActivateUser(formData);
        console.log(response)
        handleClose()
        navigate(0)

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
                    <span className='text-sm text-red-500 group-hover:!text-black/50 '>Close Job</span>
                </IconButton>
            ) : (

                <Button onClick={handleClickOpen} className={` ${!props.status ? "!text-green-500" : "!text-red-500"} !capitalize !text-[0.7em] !font-thin hover:!underline hover:!underline-offset-2 hover:!text-slate-600`}>
                    {!props.status ? "Activated" : "Deactivated"}
                </Button>
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

                        {props.job ? 'Closing this job means that this is no longer looking' : `${props.status ? 'Activating this user account will return their any associated services to normal' : 'Deactivating this user account will restrict  their access and disable  this action is reversible'}  .`}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <form action="" onSubmit={handleSubmit(props.job ? deActivateJob : userDeActivation)}>
                        <Button type="submit">Yes</Button>
                    </form>
                    <Button onClick={handleClose} autoFocus variant="contained">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalDeActivate