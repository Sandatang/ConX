/* eslint-disable react/prop-types */
import { ForumOutlined } from "@mui/icons-material"
import { Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as ForumApi from "../../network/forum_api"

const Topics = () => {

    const [topic, setTopic] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const viewAllForum = async () => {
            try {
                const response = await ForumApi.getAllForum()
                setTopic(response)

            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        viewAllForum()
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
                    topic ? (

                        <Stack className=' w-full'>
                            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                                {topic.map((tp) => (
                                    // Populate data of forum
                                    <Stack key={tp.title} className="!flex-row gap-4 bg-gray-300/90 rounded-md p-4 !items-center">
                                        <ForumOutlined fontSize="large" />
                                        <Stack >
                                            <Link to={`/forum/topics/${tp.title.toLowerCase().replace(/ /g, "-")}`} className="!text-[16px] text-black hover:!text-slate-600 hover:underline underline-offset-2 !justify-start !font-semibold">{tp.title}</Link>
                                            <Typography className="!text-[12px] !text-slate-700">description of the forum here put it here in order for the users to know</Typography>
                                        </Stack>
                                    </Stack>
                                ))}

                            </div>
                        </Stack>
                    ) : (
                        <Typography>No data yet</Typography>
                    ))
            }

        </>
    )
}

export default Topics