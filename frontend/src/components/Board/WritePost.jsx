/* eslint-disable react/prop-types */
import { Cancel, Image } from '@mui/icons-material'
import { Button, Stack, TextField, Typography, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as BulletinApi from "../../network/bulletin_api"
import { useState } from 'react'

const WritePost = (props) => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const [message, setMessage] = useState(null)

    const createBulletinPost = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("content", data.content);
            formData.append("Image", data.file[0]);
            formData.append("userId", localStorage.getItem('userId'));
            console.log(formData)
            const response = await BulletinApi.addBulletinPost(formData)
            if (response.status == "Success") {
                props.toPostFalse()
            } else {
                setMessage(response.message)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className={`${props.classes} bg-white shadow-lg px-2 pt-4 rounded-md top-0 w-[655px] z-50`} >
            {message && <Alert severity="error">{message}</Alert>}
            <Stack className='relative w-full !flex-row py-2'>
                <Typography variant='h5'>Update the citizens</Typography>
                <div className='absolute right-0 top-0'>
                    <Button component="span" className='!text-red-500 ' onClick={() => props.toPostFalse()}><Cancel /></Button>
                </div>
            </Stack>
            <form className="gap-2 w-full" onSubmit={handleSubmit(createBulletinPost)}>
                <Stack className='gap-2'>
                    <TextField
                        placeholder="Title"
                        name='title'
                        InputProps={{
                            style: { borderRadius: '20px' }
                        }}
                        size="small"
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
                        {...register("content", { required: true })}

                    />

                    <Stack className="!flex-row justify-between items-center gap-2 py-2">
                        <Button component="label" variant="ghost" startIcon={<Image className="!text-green-500" />}  >
                            <input type="file" {...register('file')} />
                        </Button>

                        {/* <IconButton><Image className="!text-green-600 !text-[2rem]" /></IconButton> */}
                        {/* <IconButton><VideoFile className="!text-red-500 !text-[2rem]" /></IconButton> */}

                        <Button type='submit' disabled={isSubmitting} variant="contained" className='!text-sm' >Post</Button>
                    </Stack>

                </Stack>
            </form>
        </div >
    )
}

export default WritePost