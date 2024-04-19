import { ForumOutlined, RemoveCircleOutline } from "@mui/icons-material"
import { IconButton, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as ForumApi from "../../network/forum_api"

const FollowedForum = () => {
    const [loading, setLoading] = useState(true)
    const [forum, setForum] = useState(null)
    useEffect(() => {
        const forumFollowed = async () => {
            try {
                const response = await ForumApi.followedForum(localStorage.getItem('userId'))
                setForum(response)
                console.log(response)
            } catch (error) {
                console.error(error)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
        }
        forumFollowed()
    }, [])

    const unFollowForum = async (forumId, userId) => {
        const formData = {
            "forumId": forumId,
            "userId": userId
        }
        await ForumApi.unfollowForum(formData)
    }
    return (
        <>

            {
                loading ? (
                    // Loading skeleton
                    <Stack className="border w-full border-gray-200 rounded-lg p-4 animate-pulse">

                        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <Stack className="!flex-row gap-4 bg-gray-300/90 rounded-md p-10 !items-center"></Stack>
                            <Stack className="!flex-row gap-4 bg-gray-300/90 rounded-md p-10 !items-center"></Stack>
                            <Stack className="!flex-row gap-4 bg-gray-300/90 rounded-md p-10 !items-center"></Stack>
                            <Stack className="!flex-row gap-4 bg-gray-300/90 rounded-md p-10 !items-center"></Stack>
                            <Stack className="!flex-row gap-4 bg-gray-300/90 rounded-md p-10 !items-center"></Stack>
                            <Stack className="!flex-row gap-4 bg-gray-300/90 rounded-md p-10 !items-center"></Stack>
                        </div>
                    </Stack>
                ) : (
                    forum ? (

                        <Stack className=' w-full'>
                            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {forum.map((tp) => (
                                    // Populate data of forum
                                    <Stack key={tp.forum.title} className="!flex-row relative gap-4 bg-gray-200/90 rounded-md p-4 !items-center">
                                        <ForumOutlined fontSize="large" />
                                        <Stack >
                                            <Link to={`/forum/topic/${tp.forum.title.toLowerCase().replace(/ /g, "-")}/${tp.forumId}`} className="!text-[16px] text-black hover:!text-slate-600 hover:underline underline-offset-2 !justify-start !font-semibold">{tp.forum.title}</Link>
                                            <Typography className="!text-[12px] !text-slate-700 line-clamp-2">{tp.forum.description}</Typography>
                                        </Stack>
                                        <Stack className="!flex-row gap-1 absolute top-0 right-0 z-10 ">

                                            {/* <DeleteConfirmation forumToRemove={tp.id} removeForum={true} /> */}
                                            <IconButton>
                                                <RemoveCircleOutline onClick={() => unFollowForum(tp.id, localStorage.getItem('userId'))} className="!text-pinkish !text-lg" />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                ))}

                            </div >
                        </Stack >
                    ) : (
                        <Typography>No data yet</Typography>
                    ))
            }
        </>
    )
}

export default FollowedForum