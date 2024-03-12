/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import * as UserApi from "../../network/user_api"

const ModalDeActivate = (props) => {
    const [open, setOpen] = useState(false);

    const userDeActivation = async () => {
        const formData = {
            userId: props.userId,
        }
        const response = await UserApi.deActivateUser(formData);
        console.log(response)
        handleClose()
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button onClick={handleClickOpen} className={` ${props.status ? "!text-green-500" : "!text-red-500"} !capitalize !text-[0.7em] !font-thin hover:!underline hover:!underline-offset-2 hover:!text-slate-600`}>
                {props.status ? "Activate" : "Deactivate"}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className="!text-lg" id="alert-dialog-title">
                    Do you want to Deactivate this user?

                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deactivating this user account will restrict their access and disable any associated services.
                        This action is irreversible and is typically used when a user no longer requires access to the system or services.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <form action="" onSubmit={userDeActivation}>
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