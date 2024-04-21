import { Add, Image, Remove } from "@mui/icons-material"
import { Avatar, Button, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"
import * as ThreadApi from "../../network/thread_api"

const CreatePostings = () => {
    const [addComment, setAddComment] = useState(false)
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const { id } = useParams()


    const createPostings = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("forumId", id);
        formData.append("Image", data.file[0]);
        formData.append("userId", localStorage.getItem('userId'));
        await ThreadApi.addThread(formData)
        setAddComment(false)
    }

    return (
        <>
            <Button variant="outlined" className=" self-end !mt-4 !text-sm shadow-md " onClick={() => setAddComment(!addComment)}>

                {addComment ? <Remove className="!text-md" /> : <Add className="!text-md" />}
                {addComment ? "Cancel" : "Create Post"}
            </Button>
            <Stack className={`!flex-row py-4 transition-opacity duration-500 ease-in-out ${addComment ? 'opacity-100' : 'opacity-0'} ${addComment ? 'h-auto' : 'h-0'}`
            }>
                <Stack className="!flex-row gap-2 w-full border-[1px] shadow-md rounded-md">
                    <Stack className="w-1/4 gap-4 items-center bg-slate-200/50 p-4">
                        <Avatar className="!mr-2 !border-md"><Avatar /></Avatar>
                        <Typography variant="body1" component="span" className="!capitalize">{localStorage.getItem("username")}</Typography>
                    </Stack>
                    <Stack className="ml-4 !w-full py-4 pr-4 gap-2">
                        <form action="" onSubmit={handleSubmit(createPostings)} className="flex flex-col gap-2">

                            <TextField
                                fullWidth
                                name="title"
                                label="Title"
                                variant="outlined"
                                // placeholder="Write your thoughts here..."
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
                                label="Content"
                                className="bg-white !rounded-sm !text-sm "
                                {...register('content', { required: true })}

                            />

                            <div className="flex flex-row gap-2 w-full justify-between !mt-2">
                                {/* <input type="file" {...register('file')} /> */}
                                <Button component="label" variant="ghost" startIcon={<Image className="!text-green-500" />}  >
                                    <input type="file" {...register('file')} />
                                </Button>

                                <Button type="submit" disabled={isSubmitting} className="!self-end" variant="contained">Post</Button>
                            </div>
                        </form>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default CreatePostings