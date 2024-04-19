/* eslint-disable react/prop-types */
import { Alert, DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import * as React from 'react';

export default function ModalDialogMessage(props) {


    return (
        <React.Fragment>
            <Dialog
                open={props.open}
                onClose={props.close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Alert Message
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {/* Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running. */}

                        <Alert severity={props.error ? 'error':'success'}>{props.message}</Alert>
                    </DialogContentText>
                </DialogContent>
                {/* <DialogActions> */}
                {/* <Button onClick={props.close}>Disagree</Button> */}
                {/* <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button> */}
                {/* </DialogActions> */}
            </Dialog>
        </React.Fragment>
    );
}
