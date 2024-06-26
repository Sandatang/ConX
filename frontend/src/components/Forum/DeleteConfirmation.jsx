/* eslint-disable react/prop-types */
import { Delete } from "@mui/icons-material";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import * as ForumApi from "../../network/forum_api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const DeleteConfirmation = (props) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null)
    const { handleSubmit } = useForm()

    const removeForum = async () => {
        try {
            const response = await ForumApi.deleteForum(props.forumToRemove)
            if (response.status === "Error") {
                setError(response.message)
            }
            navigate(0)
        } catch (error) {
            console.error(error)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <IconButton onClick={handleClickOpen} className={` !capitalize !text-[0.7em] !font-thin hover:!underline hover:!underline-offset-2 hover:!text-slate-600`}>
                <Delete className="!text-red-500 !text-lg" />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className="!text-lg" id="alert-dialog-title">
                    Deletion

                    {error && <Alert severity="error">{error}</Alert>}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to proceed with deletion?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <form action="" onSubmit={handleSubmit(removeForum)}>
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

export default DeleteConfirmation