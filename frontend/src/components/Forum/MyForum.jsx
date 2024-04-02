import { ForumOutlined } from "@mui/icons-material"
import { Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as ForumApi from "../../network/forum_api"
import DeleteConfirmation from "./DeleteConfirmation"


const MyForum = () => {
    const [loading, setLoading] = useState(true)
    const [forum, setForum] = useState(null)

    useEffect(() => {
        const getUserCreatedForum = async () => {
            try {
                const response = await ForumApi.getForumCreated(localStorage.getItem('userId'))
                setForum(response)
            } catch (error) {
                console.error(error)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            }
        }
        getUserCreatedForum()
    }, [])


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
                                    <Stack key={tp.title} className="!flex-row relative gap-4 bg-gray-200/90 rounded-md p-4 !items-center">
                                        <ForumOutlined fontSize="large" />
                                        <Stack >
                                            <Link to={`/forum/topic/${tp.title.toLowerCase().replace(/ /g, "-")}/${tp.id}`} className="!text-[16px] text-black hover:!text-slate-600 hover:underline underline-offset-2 !justify-start !font-semibold">{tp.title}</Link>
                                            <Typography className="!text-[12px] !text-slate-700 line-clamp-2">{tp.description}</Typography>
                                        </Stack>
                                        <Stack className="!flex-row gap-1 absolute top-0 right-0 z-10 ">

                                            <DeleteConfirmation forumToRemove={tp.id} removeForum={true} />
                                            {/* <IconButton>
                                                <RemoveCircleOutline className="!text-pinkish !text-lg" />
                                            </IconButton> */}
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

export default MyForum