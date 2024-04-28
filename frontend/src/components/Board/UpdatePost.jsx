/* eslint-disable react/prop-types */
import { Image } from '@mui/icons-material'
import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as BulletinApi from "../../network/bulletin_api"
import Modal from '../Modal'
import ModalHeading from '../ModalHeading'

const UpdatePost = (props) => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const [message, setMessage] = useState(null)

    const updateBulletinPost = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("bulletinId", props.post.bulletinPost.bulletinId);
            formData.append("content", data.content);
            if (data.file.length > 0 && data.file[0] !== null) {
                formData.append("Image", data.file[0]);
            }
            formData.append("userId", localStorage.getItem('userId'));
            console.log(formData)
            const response = await BulletinApi.updateBulletin(formData)
            if (response.status == "Success") {
                props.setUpdateClose()
            } else {
                setMessage(response.message)
            }
        } catch (error) {
            console.error(error)
        }
    }
    console.log(props.post)
    return (

        <Modal

            heading={<ModalHeading title={`Update Postings`} desc="" onDismiss={props.setUpdateClose} />}
            width=" w-[50%]"
            height="h-[500px]"
        >
            {message && <Alert severity="error">{message}</Alert>}
            <form className="gap-2 w-full" onSubmit={handleSubmit(updateBulletinPost)}>
                <Stack className='gap-2'>
                    <TextField
                        placeholder="Title"
                        name='title'
                        InputProps={{
                            style: { borderRadius: '20px' }
                        }}
                        size="small"
                        defaultValue={props.post.bulletinPost.title}

                        {...register("title", { required: true })}
                    />
                    <TextField
                        placeholder="What's happening?"
                        multiline
                        rows={4}
                        name='content'
                        InputProps={{
                            style: { borderRadius: '20px' }
                        }}
                        size="small"
                        defaultValue={props.post.bulletinPost.content}
                        {...register("content", { required: true })}

                    />

                    <Stack className=" justify-between items-center gap-2 py-2">
                        <Stack className=" border-[1px] rounded-xl">
                            <img src={`https://localhost:44398/api/image/name/${props.post.bulletinPost.imageName}`} className="w-full aspect-video" alt="Bulletin Image" />
                        </Stack>
                        <Stack className='!flex-row items-center'>
                            <Typography variant='caption' className='!text-slate-600'>upload new file to change image</Typography>
                            <Button component="label" variant="ghost" startIcon={<Image className="!text-green-500" />}  >
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

export default UpdatePost