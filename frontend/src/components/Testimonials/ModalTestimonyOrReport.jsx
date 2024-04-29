/* eslint-disable react/prop-types */
import { Alert, Button, TextField, Typography } from "@mui/material";
import Modal from "../Modal";
import ModalHeading from "../ModalHeading";
import * as TestimonyApi from "../../network/testimony_api";
import * as ReportApi from "../../network/report_api";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Image, VideoFile } from "@mui/icons-material";

const ModalTestimonyOrReport = (props) => {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()
    const [message, setMessage] = useState(null);

    const createTestimony = async (data) => {
        try {
            const formData = new FormData()
            formData.append("Content", data.content);
            formData.append("Video", data.file[0]);
            formData.append("UserId", localStorage.getItem('userId'));

            const response = await TestimonyApi.addTestimony(formData);
            if (response.status === "Success") {
                setMessage(response.message)
                reset()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const createReportBug = async (data) => {
        try {
            const formData = new FormData()
            formData.append("Content", data.content);
            formData.append("Image", data.file[0]);
            formData.append("UserId", localStorage.getItem('userId'));

            const response = await ReportApi.addReport(formData);
            if (response.status === "Success") {
                setMessage(response.message)
                reset()
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Modal
            heading={<ModalHeading title={`${props.report ? "Report a bug" : "Add Testimony"}`} desc="" onDismiss={() => {
                props.onClose()
            }} />}
            width=" w-[35%]"
        >
            {message && <Alert severity="success">{message}</Alert>}
            <div className="w-full ">
                <div className="p-2">
                    <form action="" onSubmit={handleSubmit( props.report ? createReportBug : createTestimony)}>
                        <div className="w-full sm:gap-1">
                            <div className="w-full flex-col flex gap-3">
                                <Typography>{props.report ? 'Report what you find out' : 'Share a testimony'}</Typography>
                                <TextField
                                    multiline
                                    rows={4}
                                    id="outline-idno"
                                    name="content"
                                    placeholder="Write here..."
                                    size="small"
                                    className="!w-full"
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                    {...register("content")}
                                />

                                <Typography variant="caption" className="!text-slate-500">Upload {props.report ? 'image' : 'video' } for evidence</Typography>
                                <Button component="label" variant="ghost" startIcon={props.report ? <Image className="!text-green-500"/>:<VideoFile className="!text-red-500" />}  >
                                    <input type="file" {...register('file')} />
                                </Button>

                                <Button
                                    disabled={isSubmitting}
                                    type="submit"
                                    variant="contained"
                                    size="small"
                                    className="text-white font-bold
                                            w-full md:w-full flex place-self-end justify-end  rounded-lg
                                            py-4 !mt-2 tracking-wider md:py-2"
                                >
                                    {props.report ? "Report" : "Add"}
                                </Button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default ModalTestimonyOrReport