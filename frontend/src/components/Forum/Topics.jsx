/* eslint-disable react/prop-types */
import { Bookmark, ForumOutlined, RemoveCircleOutline } from "@mui/icons-material"
import { IconButton, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import * as ForumApi from "../../network/forum_api"

const Topics = () => {
    const navigate = useNavigate()
    const [topic, setTopic] = useState(null)
    const [followedForum, setFollowedForum] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const viewAllForum = async () => {
            try {
                const response = await ForumApi.getAllForum()
                const userForum = await ForumApi.followedForum(localStorage.getItem('userId'))

                setTopic(response)
                setFollowedForum(userForum)

            } catch (error) {
                console.error(error)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
        }
        viewAllForum()
    }, [])



    const followForum = async (forumId, userId) => {
        const formData = {
            "forumId": forumId,
            "userId": userId
        }
        await ForumApi.followForum(formData)
        navigate(0)
    }
    const unFollowForum = async (forumId, userId) => {
        const formData = {
            "forumId": forumId,
            "userId": userId
        }
        await ForumApi.unfollowForum(formData)
        navigate(0)
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
                    topic ? (

                        <Stack className=' w-full'>
                            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {topic.map((tp) => (
                                    // Populate data of forum
                                    <Stack key={tp.title} className="!flex-row relative gap-4 bg-gray-200/90 rounded-md p-4 !items-center">
                                        <ForumOutlined fontSize="large" />
                                        <Stack >
                                            <Link to={`/forum/topic/${tp.title.toLowerCase().replace(/ /g, "-")}/${tp.id}`} className="!text-[16px] text-black hover:!text-slate-600 hover:underline underline-offset-2 !justify-start !font-semibold">{tp.title}</Link>
                                            <Typography className="!text-[12px] !text-slate-700 line-clamp-2">{tp.description}</Typography>
                                        </Stack>
                                        <Stack className="!flex-row gap-1 absolute top-0 right-0 z-10 ">

                                            {/* <DeleteConfirmation forumToRemove={tp.id} removeForum={true} /> */}
                                            <IconButton >
                                                {
                                                    followedForum.some(ff => ff.forumId === tp.id)
                                                        ?

                                                        <RemoveCircleOutline onClick={() => unFollowForum(tp.id, localStorage.getItem('userId'))} className="!text-pinkish !text-lg" />
                                                        :
                                                        <Bookmark onClick={() => followForum(tp.id, localStorage.getItem('userId'))} className="!text-pinkish !text-lg" />

                                                }

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

export default Topics