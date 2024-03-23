/* eslint-disable react/prop-types */
import { Alert, Button, Stack, TextField, Typography } from "@mui/material"
import Modal from "../Modal"
import ModalHeading from "../ModalHeading"
import { useForm } from "react-hook-form"
import * as ForumApi from "../../network/forum_api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ForumAddTopic = (props) => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const [message, setMessage] = useState(null)
    
    const forumCreation = async (data) => {
        try {
            const formData = {
                ...data,
                userId: localStorage.getItem("userId")
            }
            const response = await ForumApi.createForum(formData)
            if(response.status === "Success"){
                setMessage(response.message)
                setTimeout(() => {
                    navigate(0)
                }, [2000])
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Modal
            onDismiss={props.onClose}
            heading={<ModalHeading title={`Add Forum`} class="!text-pinkish font-bold !text-[1.5rem]" desc="" />}
            width=" w-[35%]"
        >
            <div className="w-full ">
                <div className="p-2">
                    <form action="" onSubmit={handleSubmit(forumCreation)} >
                        {message && <Alert severity="success">{message}</Alert>}
                        <Stack className="gap-2">
                            <Typography> Title </Typography>
                            <TextField
                                name="title"
                                label="Ex. Go beyond"
                                size="small"
                                className="!w-full"
                                InputLabelProps={{ style: { fontSize: "0.775rem" } }}
                                {...register("title", { required: true })}
                            />
                        </Stack>
                        <Stack className="gap-2">
                            <Typography> Keywords </Typography>
                            <TextField
                                name="keywords"
                                label="Ex. growth,happiness,career"
                                size="small"
                                className="!w-full"
                                InputLabelProps={{ style: { fontSize: "0.775rem" } }}
                                {...register("keywords", { required: true })}

                            />
                        </Stack>
                        <Button type="submit" disabled={isSubmitting} variant="contained" className="!bg-pinkish w-full !mt-2"> Add </Button>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default ForumAddTopic