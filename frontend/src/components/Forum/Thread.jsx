import { Reply, Report, ThumbUp } from "@mui/icons-material"
import { Avatar, Divider, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as ForumApi from "../../network/forum_api"
import BreadCrumb from "../BreadCrumb"
import EmergencyContacts from "../EmergencyContacts"
import AddComment from "./AddComment"
import TopForum from "./TopForum"



const Thread = () => {
    const { forumTitle, id } = useParams()
    const [forum, setForum] = useState(null)
    const [loading, setLoading] = useState(true)
    const breadCrumbUrl = [
        { url: '../forum/topics', name: "Forum" },
        { name: forumTitle.split("-").join(" ") }
    ]

    useEffect(() => {
        const getForum = async () => {
            try {
                const response = await ForumApi.getOneForum(id)
                setForum(response)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        getForum()
    }, [id])
    return (
        <Stack className="h-full no-scrollbar overflow-y-auto mx-4 !flex-row">
            <Stack className="h-auto  w-[650px] gap-4 pt-2">
                {
                    loading ? (
                        // Loading skeleton
                        <Stack className=" bg-gray-200/70 rounded-md animate-pulse">
                            <Stack className="py-14 px-8 gap-2">
                                <div className=" rounded-lg bg-gray-300/90 h-2 w-3/4 "></div>
                                <div className=" rounded-lg bg-gray-300/90 h-2 w-1/2 "></div>
                                <div className=" rounded-lg bg-gray-300/90 h-2 w-3/4 "></div>

                            </Stack>
                        </Stack>
                        // ))
                    ) : (

                        <Stack className=" bg-gray-200/70 rounded-md">
                            <Stack className="p-4">

                                <Typography className="!text-lg !font-semibold !tracking-thin capitalize">{forumTitle.split("-").join(" ")}</Typography>
                                <Typography className="!text-md line-clamp-5 lowercase">
                                    {forum.description}
                                </Typography>
                            </Stack>
                        </Stack>
                    )
                }

                <Stack className=" border-t-[2px] border-gray-300">

                    {/* BreadCrumb */}
                    <Stack className="bg-pinkish px-4 py-2 rounded-sm">
                        <Typography className="!tracking-wider">
                            <BreadCrumb data={breadCrumbUrl} classes="!text-[12px] tracking-wider !text-white font-bold " />
                        </Typography>
                    </Stack>
                    {/* End of BreadCrumb */}


                    {/* Add Comment */}
                    <AddComment />
                    {/* End of Add Comment */}



                    {/* Postings comment content */}
                    <Stack className="pb-6">
                        <Stack className="!flex-row py-4">
                            <Stack className="!flex-row gap-2 w-full bg-gray-200/70 rounded-md">
                                <Stack className="w-1/4 gap-4 items-center bg-gray-300/50 p-4">
                                    <Avatar className="!mr-2 !border-md"><Avatar /></Avatar>
                                    <Typography variant="body1" component="span" className="!capitalize">{localStorage.getItem("username")}</Typography>
                                </Stack>
                                <Stack className="ml-4 min-h-46 !w-full py-4 pr-4">

                                    <Typography className="!text-sm">
                                        Content of the post here of each users
                                    </Typography>
                                    <Divider className="!my-4" />
                                    <Typography className="!text-sm">Image here if the user uploaded image</Typography>

                                    <Stack className="!flex-row mt-4">
                                        <Stack className=" !flex-row w-[70%] gap-4">
                                            <Typography variant="body1" component="span" className="!text-sm  group cursor-pointer">
                                                <button>
                                                    <ThumbUp className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Like
                                                </button>
                                            </Typography>

                                            <Typography variant="body1" component="span" className="!text-sm  group cursor-pointer">
                                                <button>
                                                    <Reply className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Reply
                                                </button>
                                            </Typography>
                                        </Stack>

                                        <Stack className="justify-end w-1/4">
                                            <Typography variant="body1" component="span" className="!text-sm self-end group cursor-pointer">
                                                <button>
                                                    <Report className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Report
                                                </button>
                                            </Typography>
                                        </Stack>

                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack className="pb-6">
                        <Stack className="!flex-row py-4">
                            <Stack className="!flex-row gap-2 w-full bg-gray-200/70 rounded-md">
                                <Stack className="w-1/4 gap-4 items-center bg-gray-300/50 p-4">
                                    <Avatar className="!mr-2 !border-md"><Avatar /></Avatar>
                                    <Typography variant="body1" component="span" className="!capitalize">{localStorage.getItem("username")}</Typography>
                                </Stack>
                                <Stack className="ml-4 min-h-46 !w-full py-4 pr-4">

                                    <Typography className="!text-sm">
                                        Content of the post here of each users
                                    </Typography>
                                    <Divider className="!my-4" />
                                    <Typography className="!text-sm">Image here if the user uploaded image</Typography>

                                    <Stack className="!flex-row mt-4">
                                        <Stack className=" !flex-row w-[70%] gap-4">
                                            <Typography variant="body1" component="span" className="!text-sm  group cursor-pointer">
                                                <button>
                                                    <ThumbUp className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Like
                                                </button>
                                            </Typography>

                                            <Typography variant="body1" component="span" className="!text-sm  group cursor-pointer">
                                                <button>
                                                    <Reply className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Reply
                                                </button>
                                            </Typography>
                                        </Stack>

                                        <Stack className="justify-end w-1/4">
                                            <Typography variant="body1" component="span" className="!text-sm self-end group cursor-pointer">
                                                <button>
                                                    <Report className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Report
                                                </button>
                                            </Typography>
                                        </Stack>

                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack className="pb-6">
                        <Stack className="!flex-row py-4">
                            <Stack className="!flex-row gap-2 w-full bg-gray-200/70 rounded-md">
                                <Stack className="w-1/4 gap-4 items-center bg-gray-300/50 p-4">
                                    <Avatar className="!mr-2 !border-md"><Avatar /></Avatar>
                                    <Typography variant="body1" component="span" className="!capitalize">{localStorage.getItem("username")}</Typography>
                                </Stack>
                                <Stack className="ml-4 min-h-46 !w-full py-4 pr-4">

                                    <Typography className="!text-sm">
                                        Content of the post here of each users
                                    </Typography>
                                    <Divider className="!my-4" />
                                    <Typography className="!text-sm">Image here if the user uploaded image</Typography>

                                    <Stack className="!flex-row mt-4">
                                        <Stack className=" !flex-row w-[70%] gap-4">
                                            <Typography variant="body1" component="span" className="!text-sm  group cursor-pointer">
                                                <button>
                                                    <ThumbUp className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Like
                                                </button>
                                            </Typography>

                                            <Typography variant="body1" component="span" className="!text-sm  group cursor-pointer">
                                                <button>
                                                    <Reply className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Reply
                                                </button>
                                            </Typography>
                                        </Stack>

                                        <Stack className="justify-end w-1/4">
                                            <Typography variant="body1" component="span" className="!text-sm self-end group cursor-pointer">
                                                <button>
                                                    <Report className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Report
                                                </button>
                                            </Typography>
                                        </Stack>

                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack className="pb-6">
                        <Stack className="!flex-row py-4">
                            <Stack className="!flex-row gap-2 w-full bg-gray-200/70 rounded-md">
                                <Stack className="w-1/4 gap-4 items-center bg-gray-300/50 p-4">
                                    <Avatar className="!mr-2 !border-md"><Avatar /></Avatar>
                                    <Typography variant="body1" component="span" className="!capitalize">{localStorage.getItem("username")}</Typography>
                                </Stack>
                                <Stack className="ml-4 min-h-46 !w-full py-4 pr-4">

                                    <Typography className="!text-sm">
                                        Content of the post here of each users
                                    </Typography>
                                    <Divider className="!my-4" />
                                    <Typography className="!text-sm">Image here if the user uploaded image</Typography>

                                    <Stack className="!flex-row mt-4">
                                        <Stack className=" !flex-row w-[70%] gap-4">
                                            <Typography variant="body1" component="span" className="!text-sm  group cursor-pointer">
                                                <button>
                                                    <ThumbUp className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Like
                                                </button>
                                            </Typography>

                                            <Typography variant="body1" component="span" className="!text-sm  group cursor-pointer">
                                                <button>
                                                    <Reply className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Reply
                                                </button>
                                            </Typography>
                                        </Stack>

                                        <Stack className="justify-end w-1/4">
                                            <Typography variant="body1" component="span" className="!text-sm self-end group cursor-pointer">
                                                <button>
                                                    <Report className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Report
                                                </button>
                                            </Typography>
                                        </Stack>

                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack className="pb-6">
                        <Stack className="!flex-row py-4">
                            <Stack className="!flex-row gap-2 w-full bg-gray-200/70 rounded-md">
                                <Stack className="w-1/4 gap-4 items-center bg-gray-300/50 p-4">
                                    <Avatar className="!mr-2 !border-md"><Avatar /></Avatar>
                                    <Typography variant="body1" component="span" className="!capitalize">{localStorage.getItem("username")}</Typography>
                                </Stack>
                                <Stack className="ml-4 min-h-46 !w-full py-4 pr-4">

                                    <Typography className="!text-sm">
                                        Content of the post here of each users
                                    </Typography>
                                    <Divider className="!my-4" />
                                    <Typography className="!text-sm">Image here if the user uploaded image</Typography>

                                    <Stack className="!flex-row mt-4">
                                        <Stack className=" !flex-row w-[70%] gap-4">
                                            <Typography variant="body1" component="span" className="!text-sm  group cursor-pointer">
                                                <button>
                                                    <ThumbUp className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Like
                                                </button>
                                            </Typography>

                                            <Typography variant="body1" component="span" className="!text-sm  group cursor-pointer">
                                                <button>
                                                    <Reply className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Reply
                                                </button>
                                            </Typography>
                                        </Stack>

                                        <Stack className="justify-end w-1/4">
                                            <Typography variant="body1" component="span" className="!text-sm self-end group cursor-pointer">
                                                <button>
                                                    <Report className="!text-md mr-2 group-hover:text-slate-400" />
                                                    Report
                                                </button>
                                            </Typography>
                                        </Stack>

                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    {/* End Postings comment content */}

                </Stack>

            </Stack>

            {/* Forum right aside */}
            <Stack className="border-l-2 w-[300px] px-4 mx-4 sticky top-0">
                <Stack className="h-[45%] border-b-2">
                    <TopForum />
                </Stack>
                <Stack>
                    <EmergencyContacts />
                </Stack>

            </Stack>
            {/* End Forum right aside */}
        </Stack >
    )
}

export default Thread