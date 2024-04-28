/* eslint-disable react/prop-types */
import { PlayArrow, VideoFile } from '@mui/icons-material'
import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactPlayer from 'react-player'
import * as WorkshopApi from "../../network/workshop_api"
import Modal from '../Modal'
import ModalHeading from '../ModalHeading'

const ResourcesUpdateModal = (props) => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const [message, setMessage] = useState(null)

    const updateBulletinPost = async (data) => {
        try {
            const formData = new FormData();
            formData.append("videoTitle", data.title);
            formData.append("resourceId", props.resource.resourceId);
            formData.append("videoDescription", data.content);
            if (data.file.length > 0 && data.file[0] !== null) {
                formData.append("Video", data.file[0]);
            }
            formData.append("uploaderId", localStorage.getItem('userId'));
            console.log(formData)
            const response = await WorkshopApi.updateVideoResource(formData)
            if (response.status == "Success") {
                props.onClose()
            } else {
                setMessage(response.message)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (

        <Modal

            heading={<ModalHeading title={`Update Resource`} desc="" onDismiss={props.onClose} />}
            width=" w-[50%]"
            height="h-[500px]"
        >
            {message && <Alert severity="error">{message}</Alert>}
            <form className="gap-2 w-full" onSubmit={handleSubmit(updateBulletinPost)}>
                <Stack className='gap-2'>
                    <TextField
                        placeholder="Title"
                        name='title'
                        size="small"
                        defaultValue={props.resource.videoTtile}

                        {...register("title", { required: true })}
                    />
                    <TextField
                        placeholder="What's happening?"
                        name='content'
                        size="small"
                        defaultValue={props.resource.videoDescription}
                        {...register("content", { required: true })}

                    />

                    <Stack className=" justify-between items-center gap-2 py-2">
                        <Stack className=" relative border-[1px] rounded-xl">
                            <ReactPlayer
                                className='react-player'
                                url={`https://localhost:44398/api/video/name/${props.resource.videoUrl}`}
                                width='100%'
                                height='100%'
                                light={false}
                            />
                            <PlayArrow className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black" style={{ fontSize: 40 }} />
                        </Stack>
                        <Stack className='!flex-row items-center'>
                            <Typography variant='caption' className='!text-slate-600'>upload new file to change video</Typography>
                            <Button component="label" variant="ghost" startIcon={<VideoFile className="!text-red-500" />}  >
                                <input type="file" {...register('file')} />
                            </Button>
                        </Stack>


                    </Stack>
                    <Button type='submit' disabled={isSubmitting} variant="contained" className='!text-sm' >Update</Button>

                </Stack>
            </form>
        </Modal>

    )
}

export default ResourcesUpdateModal