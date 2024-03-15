/* eslint-disable react/prop-types */
import { Button, Stack, TextField, Typography } from "@mui/material"
import Modal from "../Modal"
import ModalHeading from "../ModalHeading"

const ForumAddTopic = (props) => {
    return (
        <Modal
            onDismiss={props.onClose}
            heading={<ModalHeading title={`Add Forum`} class="!text-pinkish font-bold !text-[1.5rem]" desc="" />}
            width=" w-[35%]"
        >
            <div className="w-full ">
                <div className="p-2">
                    <form action="" >
                        <Stack className="gap-2">
                            <Typography> Title </Typography>
                            <TextField
                                name="employeeNumber"
                                label="Ex. Go beyond"
                                size="small"
                                className="!w-full"
                                InputLabelProps={{style: { fontSize: "0.775rem"}}}
                            />
                        </Stack>
                        <Stack className="gap-2">
                            <Typography> Keywords </Typography>
                            <TextField
                                name="employeeNumber"
                                label="Ex. growth,happiness,career"
                                size="small"
                                className="!w-full"
                                InputLabelProps={{style: { fontSize: "0.775rem"}}}
                            />
                        </Stack>
                        <Button variant="contained" className="!bg-pinkish w-full !mt-2"> Add </Button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default ForumAddTopic