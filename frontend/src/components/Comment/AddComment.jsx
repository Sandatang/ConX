/* eslint-disable react/prop-types */
import { Avatar, Button, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import * as CommentApi from "../../network/comment_api"
import { useState } from "react"

const AddComment = (props) => {
    const { register,reset, handleSubmit, formState: { isSubmitting } } = useForm()
    const [comments, setComments] = useState(props.thread.comment)
    const [toComment, setToComment] = useState(false)

    const createComment = async (data) => {
        const formData = {
            ...data,
            "threadId": props.threadId,
            "userId": localStorage.getItem('userId')
        }
        const response = await CommentApi.addComment(formData)
        console.log(response)
        setComments([...comments, response[0]])
        console.log(props)
        reset()
    }
    return (
        <>
            {
                comments.map((t) => (

                    <Stack key={t.commentId} className="!flex-row border-[1px] p-2 rounded-md bg-slate-200/50">
                        <Avatar className="!mr-2 !border-md" />
                        <Stack className=" w-full p-2 rounded-md border-[1px] ">
                            <span className="font-bold capitalize">{t.user}</span>

                            <Typography className="lowercase">{t.content}</Typography>
                        </Stack>
                    </Stack>
                ))
            }
            <Stack className={` border-[1px] rounded-md py-4 px-2 sticky ${toComment ? 'bg-slate-200/50' : 'bg-transparent'} bottom-0 gap-2`} onClick={() => setToComment(true)}>
                <form action="" onSubmit={handleSubmit(createComment)}>

                    <Stack className="">
                        <Stack className="!flex-row">
                            <Avatar className="!mr-2 !border-md" />
                            <TextField
                                multiline
                                fullWidth
                                name="content"
                                variant="outlined"
                                rows={toComment ? 2 : 1}
                                placeholder="Write your thoughts here..."
                                className="bg-white !rounded-sm !text-sm "
                                {...register("content", { required: true })}
                            />
                        </Stack>
                        <div className="flex w-full justify-end">
                            <Button type="submit" disabled={isSubmitting} className="!self-end !mt-2" variant="contained">Post</Button>
                        </div>
                    </Stack>
                </form>
            </Stack>
        </>

    )
}

export default AddComment