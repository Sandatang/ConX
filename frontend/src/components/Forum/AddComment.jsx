import { Add, Remove } from "@mui/icons-material"
import { Avatar, Button, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"

const AddComment = () => {
    const [addComment, setAddComment] = useState(false)

    return (
        <>
            <Button variant="outlined" className=" self-end !mt-4 !text-sm " onClick={() => setAddComment(!addComment)}>

                {addComment ? <Remove className="!text-md" /> : <Add className="!text-md" />}
                {addComment ? "Cancel" : "Create comment"}
            </Button>
            <Stack Stack className={`!flex-row py-4 transition-opacity duration-500 ease-in-out ${addComment ? 'opacity-100' : 'opacity-0'} ${addComment ? 'h-auto' : 'h-0'}`
            }>
                <Stack className="!flex-row gap-2 w-full bg-gray-200/70 rounded-md">
                    <Stack className="w-1/4 gap-4 items-center bg-gray-300/50 p-4">
                        <Avatar className="!mr-2 !border-md"><Avatar /></Avatar>
                        <Typography variant="body1" component="span" className="!capitalize">{localStorage.getItem("username")}</Typography>
                    </Stack>
                    <Stack className="ml-4 !w-full py-4 pr-4">
                        <TextField
                            multiline
                            fullWidth
                            variant="outlined"
                            rows={4}
                            placeholder="Write your thoughts here..."
                            className="bg-white !rounded-sm !text-sm "
                        />

                        <Button className="!self-end !mt-2" variant="contained">Post</Button>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default AddComment