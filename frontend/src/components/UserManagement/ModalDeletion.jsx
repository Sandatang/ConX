/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as UserApi from "../../network/user_api";
import { useNavigate } from 'react-router-dom';


const ModalDeletion = (props) => {
    const navigate = useNavigate()
    const { handleSubmit } = useForm()

    const userDeletion = async () => {
        const response = await UserApi.deleteUser(props.userId);
        console.log(response)
        props.onclose
        navigate(0)

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
                    Do you want to delete this user?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        Account can no longer be used and retrieve if deleted!!!

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <form action="" onSubmit={handleSubmit(userDeletion)}>
                        <Button type="submit">Yes</Button>
                    </form>
                    <Button onClick={props.close} autoFocus variant="contained">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalDeletion