/* eslint-disable react/prop-types */
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
                    <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    topic ? (
                        topic.map((tp) => (
                            <Stack key={tp.id}>
                                <Link className="!text-[16px] hover:!text-slate-600 hover:underline underline-offset-2 !justify-start !font-semibold">{tp.title}</Link>
                                <Typography className="!text-[12px] !text-slate-500">description of the forum here put it here in order for the users to know</Typography>
                            </Stack >
                        ))
                    ) : (
                        <Typography>No data yet</Typography>
                    )
                )
            }

        </>
    )
}

export default Topics