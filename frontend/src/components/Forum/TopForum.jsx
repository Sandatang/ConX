import { AccountCircle, ArrowCircleRight } from "@mui/icons-material"
import { Button, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as ForumApi from "../../network/forum_api"


const TopForum = () => {
    const [topForum, setTopForum] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function viewTopForum() {
            try {
                const response = await ForumApi.getTopForum()
                setTopForum(response)

            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }

        }
        viewTopForum()
    }, [])
    return (
        <>
            <Typography className="!text-[18px] pb-2 !font-semibold">Top Forums</Typography>

            <Stack className="gap-3">
                {
                    loading ? (
                        // Loading skeleton
                        Array.from({ length: 4 }).map((_, index) => (

                            <Stack key={index} className="!flex-row animate-pulse">

                                <Stack className="ml-2 !flex-row w-3/4 gap-1 items-center">
                                    <div className="bg-gray-300/90 h-8 w-8 rounded-full" />
                                    <Stack className="gap-2">
                                        <div className=" rounded-lg bg-gray-300/90 h-2 w-28 "></div>
                                        <div className=" rounded-lg bg-gray-300/90 h-2 w-20 "></div>
                                    </Stack>
                                </Stack>
                                <Button  >
                                    <div className="w-4 h-4 rounded-full bg-gray-300/90" />
                                </Button>
                            </Stack>
                        ))
                    ) : (
                        topForum && (
                            topForum.map((tf) => (
                                <Stack key={tf.id} className="!flex-row">
                                    <Stack className="ml-2 !flex-row w-3/4 gap-1 items-center">
                                        <AccountCircle className="!text-[2.5em] !text-slate-500" />
                                        <Stack className="">
                                            <Typography className="!text-sm !font-semibold tracking-wider capitalize">{tf.title}</Typography>
                                            <Typography className="!text-[0.467rem] capitalize">{tf.creator.firstname} {tf.creator.lastname}</Typography>
                                        </Stack>
                                    </Stack>

                                    <Button
                                        onClick={() => {
                                            navigate(`/forum/topic/${tf.title.toLowerCase().replace(/ /g, "-")}/${tf.id}`)
                                            window.location.reload()
                                        }}
                                    >
                                        <ArrowCircleRight className="!text-pinkish" />
                                    </Button>
                                </Stack>
                            ))
                        )
                    )
                }
            </Stack>
        </>
    )
}

export default TopForum