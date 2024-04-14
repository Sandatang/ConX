/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as UserApi from "../../network/user_api";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const ModalDeletion = (props) => {
    const navigate = useNavigate()
    const { handleSubmit } = useForm()
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)

    const userDeletion = async () => {
        try {
            const response = await UserApi.deleteUser(props.userId);
            console.log(response)
            // navigate(0)

            if (response.status === "Success") {
                setMessage(response.message)

                setTimeout(() => {
                    props.onclose()
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

    return (
        <>
            <Dialog
                open={props.open}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className="!text-lg" id="alert-dialog-title">
                    {message ? 'Message' : 'Do you want to delete this user?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {!error && message && <Alert seveirty="success">{message}</Alert>}
                        {error && message && message}
                        {!error && !message && 'Account can no longer be used and retrieve if deleted!!!'}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        !error && !message &&
                        <>
                            <form action="" onSubmit={handleSubmit(userDeletion)}>
                                <Button type="submit">Yes</Button>
                            </form>
                            <Button onClick={props.close} autoFocus variant="contained">
                                No
                            </Button>
                        </>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalDeletion