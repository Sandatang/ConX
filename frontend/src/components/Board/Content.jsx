/* eslint-disable react/prop-types */
import { AccountCircle, Comment, Favorite } from "@mui/icons-material"
import { Alert, Button, Stack, Typography } from "@mui/material"
import { useState } from "react"
import BulletinComments from "./BulletinComments"

const Content = (props) => {
    const [bulletinToOPen, setBulletinToOPen] = useState(null)
    const [open, setOpen] = useState(false)

    return (
        <Stack className=" gap-10">
            {
                !props.bulletins ? (
                    <Alert severity="info">No data yet</Alert>
                ) : (
                    props.bulletins.map((bulletin) => (

                        <Stack key={bulletin.bulletinPost.bulletinId} className="border-[1px] px-4 py-6 rounded-2xl bg-white shadow-xl">
                            <Stack className="!flex-row items-center gap-4">
                                <AccountCircle className="!text-[3rem]" />
                                <Stack>
                                    <Typography variant="h2" className="!text-md !font-bold">{bulletin.bulletinPost.user != " " ? bulletin.bulletinPost.user : "User name"}</Typography>
                                    <Typography variant="body2" className="!text-sm">Barangay Personnel</Typography>
                                </Stack>
                            </Stack>
                            <Stack className="py-4">
                                <Typography variant="h1" className="!text-lg capitalize !font-bold !text-black">
                                    {bulletin.bulletinPost.title}
                                </Typography>
                                <Typography variant="body1">
                                    {bulletin.bulletinPost.content}
                                </Typography>
                            </Stack>
                            <Stack className="p-4 border-[1px] rounded-xl">
                                <img src={`https://localhost:44398/api/image/name/${bulletin.bulletinPost.imageName}`} className="w-full aspect-video" alt="Bulletin Image" />
                            </Stack>
                            <Stack className="my-2 !flex-row justify-evenly ">
                                <Button className="gap-2 items-center !text-slate-600 !text-sm cursor-pointer">
                                    <Favorite className="cursor-pointer" />
                                    Heart
                                </Button>
                                <Button onClick={() => {
                                    setBulletinToOPen(bulletin)
                                    setOpen(true)
                                }} className="gap-2  !text-slate-600 !text-sm items-center cursor-pointer">
                                    <Comment className="cursor-pointer" />
                                    Comment
                                </Button>

                            </Stack>

                        </Stack>
                    ))

                )
            }
            {open && <BulletinComments open={open} bulletin={bulletinToOPen} close={() => setBulletinToOPen(false)}/>}
        </Stack>
    )
}

export default Content