/* eslint-disable react/prop-types */
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as WorkshopApi from "../../network/workshop_api"
import { useState } from 'react'


const ResourceModalDeletionMssg = (props) => {

    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)
    const { handleSubmit, formState: { isSubmitting } } = useForm()


    const workshopDeletion = async () => {
        try {
            const response = await WorkshopApi.deleteWorkshop(props.postToDelete)
            if (response.status === "Success") {
                setMessage(response.message)

                setTimeout(() => {
                    props.handleClose()
                    setMessage(null)

                }, 1000)
            }
            if (response.status === "Error") {
                setError(true)
                setMessage(response.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleClose = () => {
        setError(false)
        setMessage(null)
        props.close()
    }

    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className="!text-lg" id="alert-dialog-title">
                    Do you want to delete this video?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {!error && message && <Alert severity="success">{message}</Alert>}
                        {error && message && <Alert severity="error">{message}</Alert>}
                        {!error && !message && 'Video will be permanently deleted!!!'}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        !error && !message &&
                        <>
                            <form action="" onSubmit={handleSubmit(workshopDeletion)}>
                                <Button disabled={isSubmitting} type="submit">Yes</Button>
                            </form>
                            <Button disabled={isSubmitting} onClick={handleClose} autoFocus variant="contained">
                                No
                            </Button>
                        </>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ResourceModalDeletionMssg