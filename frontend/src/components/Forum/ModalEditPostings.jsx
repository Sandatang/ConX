/* eslint-disable react/prop-types */
import { Image } from "@mui/icons-material"
import { Alert, Avatar, Button, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as ThreadApi from "../../network/thread_api"
import Modal from "../Modal"
import ModalHeading from "../ModalHeading"

const  ModalEditPostings = (props) => {
    const [message, setMessage] = useState(null)
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()


    const modalEditPostings = async (data) => {
        console.log(data)
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("threadId", props.thread.threadId);
            formData.append("content", data.content);
            if (data.file.length > 0) {
                formData.append("Image", data.file[0]);
            } else {
                // Handle the case where no file is selected
                formData.append("Image", null)
            }
            // formData.append("Image", {data.file.length > 0 ?  data.file[0] : ""});
            formData.append("userId", localStorage.getItem('userId'));
            const response = await ThreadApi.updateThread(formData)
            if (response.status === "Success") {
                setMessage(response.message)
                setTimeout(() => {
                    props.onClose()
                }, 1000)
                return
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Modal

            heading={<ModalHeading title={`Update Postings`} desc="" onDismiss={props.onClose} />}
            width=" w-[50%]"
        >
            {message && <Alert severity='success'>{message}</Alert>}
            <Stack className={`!flex-row py-4 transition-opacity duration-500 ease-in-out`}>
                <Stack className="!flex-row gap-2 w-full bg-gray-200/70 rounded-md">
                    <Stack className="w-1/4 gap-4 items-center bg-gray-300/50 p-4">
                        <Avatar className="!mr-2 !border-md"><Avatar /></Avatar>
                        <Typography variant="body1" component="span" className="!capitalize">{localStorage.getItem("username")}</Typography>
                    </Stack>
                    <Stack className="ml-4 !w-full py-4 pr-4 gap-4">
                        <form action="" onSubmit={handleSubmit(modalEditPostings)}>
                            <Stack className="gap-2">

                                <TextField
                                    fullWidth
                                    name="title"
                                    variant="outlined"
                                    // placeholder="Write your thoughts here..."
                                    defaultValue={props.thread ? props.thread.title : ""}
                                    className="bg-white !rounded-sm !text-sm "
                                    {...register('title', { required: true })}
                                />

                                <TextField
                                    multiline
                                    fullWidth
                                    name="content"
                                    variant="outlined"
                                    rows={4}
                                    // placeholder="Write your thoughts here..."
                                    defaultValue={props.thread ? props.thread.content : ""}
                                    className="bg-white !rounded-sm !text-sm "
                                    {...register('content', { required: true })}

                                />
                            </Stack>
                            {props.thread.imgUrl && (
                                <>
                                    <Typography variant="span" className="!text-sm !text-slate-700"><span className="!text-md font-bold">Image : </span> {props.thread.imgUrl}</Typography>
                                </>
                            )}
                            <div className="flex w-full justify-between my-2 gap-10">
                                <Button component="label" variant="contained" startIcon={<Image className="!text-green-500" />}  >

                                    <input type="file" {...register('file')} />
                                </Button>

                                <Button type="submit" disabled={isSubmitting} className="!self-end !mt-2" variant="contained">Post</Button>

                            </div>

                        </form>
                    </Stack>
                </Stack>
            </Stack>
        </Modal>
    )
}

export default ModalEditPostings