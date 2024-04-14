/* eslint-disable react/prop-types */
import { AccountCircle, Comment, Favorite } from "@mui/icons-material"
import { Button, Stack, Typography, Alert } from "@mui/material"

const Content = (props) => {

    return (
        <Stack className=" gap-10">
            {
                !props.bulletins ? (
                    <Alert severity="info">No data yet</Alert>
                ) : (
                    props.bulletins.map((bulletin) => (

                        <Stack key={bulletin.bulletinId} className="border-[1px] px-4 py-6 rounded-2xl bg-white shadow-xl">
                            <Stack className="!flex-row items-center gap-4">
                                <AccountCircle className="!text-[3rem]" />
                                <Stack>
                                    <Typography variant="h2" className="!text-md !font-bold">{bulletin.user != " " ? bulletin.user : "User name"}</Typography>
                                    <Typography variant="body2" className="!text-sm">Barangay Personnel</Typography>
                                </Stack>
                            </Stack>
                            <Stack className="py-4">
                                <Typography variant="h1" className="!text-lg capitalize !font-bold !text-black">
                                    {bulletin.title}
                                </Typography>
                                <Typography variant="body1">
                                    {bulletin.content}
                                </Typography>
                            </Stack>
                            <Stack className="p-4 border-[1px] rounded-xl">
                                <img src={`https://localhost:44398/api/image/name/${bulletin.imageName}`} className="w-full aspect-video" alt="Bulletin Image" />
                            </Stack>
                            <Stack className="my-2 !flex-row justify-evenly ">
                                <Button className="gap-2 items-center !text-slate-600 !text-sm cursor-pointer">
                                    <Favorite className="cursor-pointer" />
                                    Heart
                                </Button>
                                <Button className="gap-2  !text-slate-600 !text-sm items-center cursor-pointer">
                                    <Comment className="cursor-pointer" />
                                    Comment
                                </Button>
                            </Stack>
                        </Stack>
                    ))

                )
            }
        </Stack>
    )
}

export default Content