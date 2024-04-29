/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import * as ThreadApi from "../../network/thread_api"
import { useState } from 'react';


const ClosedThreadDialog = ({ threadId }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(null)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const closeThread = async () => {
        try {
            const formData = {
                "threadId": threadId
            }
            const response = await ThreadApi.closeThread(formData)
            if (response.status === "Success") {
                setMessage(response.message)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <Button component="span" variant="ghost" className="!text-sm group !capitalize" onClick={handleClickOpen}>
                Close
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Close Thread"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {!message && 'Cannot re-open this thread once it closed. Do you want to proceed?'}
                        {message && message}
                    </DialogContentText>
                </DialogContent>
                {!message &&
                    <DialogActions DialogActions >
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={closeThread} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                }
            </Dialog >
        </>
    )
}

export default ClosedThreadDialog