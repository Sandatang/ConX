import { Image, VideoFile } from '@mui/icons-material'
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material'

const WritePost = () => {
    return (
        <div className='sticky top-0 bg-white z-50'>
            <Stack>
                <Typography className="!text-sm">Write a post</Typography>
            </Stack>
            <Stack className="gap-2">
                <TextField
                    placeholder="What's happening?"
                    multiline
                    rows={4}
                    InputProps={{
                        style: { borderRadius: '20px' }
                    }}
                    size="small"
                />

                <Stack className="!flex-row justify-end items-center gap-2">
                    <IconButton><Image className="!text-green-600 !text-[2rem]" /></IconButton>
                    <IconButton><VideoFile className="!text-red-500 !text-[2rem]" /></IconButton>

                    <Button variant="contained" className='!text-sm' >Post</Button>
                </Stack>

            </Stack>
        </div>
    )
}

export default WritePost