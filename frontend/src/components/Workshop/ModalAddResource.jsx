/* eslint-disable react/prop-types */
import { Button, TextField } from "@mui/material"
import Modal from "../Modal"
import ModalHeading from "../ModalHeading"
import { VideoFile } from "@mui/icons-material"
import { useForm } from "react-hook-form"
import * as WorkshopApi from "../../network/workshop_api"
import { useParams } from "react-router-dom"

const ModalAddResource = (props) => {
    const { id } = useParams()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const addVideoResource = async (data) => {
        try {
            const formData = new FormData();
            formData.append("VideoTitle", data.videoTitle);
            formData.append("VideoDescription", data.videoDescription);
            formData.append("Video", data.file[0]);
            formData.append("UploaderId", localStorage.getItem('userId'));
            formData.append("WorkshopId", id);
            console.log(formData)
            const response = await WorkshopApi.addVideoResource(formData)
            console.log(response)
            if (response.status == "Success") {
                props.onClose()
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Modal
            heading={<ModalHeading title={`Add Resource Video`} desc="" onDismiss={() => {
                props.onClose()
            }} />}
            width=" w-[35%]"
        >
            <div className="w-full " >
                <div className="p-2">
                    <form action="" onSubmit={handleSubmit(addVideoResource)}>
                        <div className="w-full sm:gap-1">
                            <div className="w-full flex-col flex gap-3">
                                <TextField
                                    id="outline-idno"
                                    name="videoTitle"
                                    label="Title "
                                    size="small"
                                    className="!w-full"
                                    {...register("videoTitle", { required: true })}
                                />

                                <TextField
                                    id="outline-firstname"
                                    name="videoDescription"
                                    label="Description"
                                    size="small"
                                    {...register("videoDescription", { required: true })}

                                />

                                <Button component="label" variant="ghost" startIcon={<VideoFile className="!text-red-500" />}  >
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
                                    Add
                                </Button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default ModalAddResource