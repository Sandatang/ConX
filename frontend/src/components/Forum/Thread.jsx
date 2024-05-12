import { Add, Comment, Report, ThumbUp } from "@mui/icons-material"
import { Alert, Avatar, Badge, Button, Divider, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import OfficialsHotline from "../../Contacts/OfficialsHotline"
// import ThreadCommentModa from "../../Thread/ThreadCommentModa"
import * as ForumApi from "../../network/forum_api"
import * as ThreadApi from "../../network/thread_api"
import BreadCrumb from "../BreadCrumb"
import OfficialsHotline from "../Contacts/OfficialsHotline"
import ThreadCommentModa from "../Thread/ThreadCommentModa"
import ClosedThreadDialog from "./ClosedThreadDialog"
import CreatePostings from "./CreatePostings"
import ModalEditPostings from "./ModalEditPostings"
import TopForum from "./TopForum"



const Thread = () => {
    const { forumTitle, id } = useParams()
    const [forum, setForum] = useState(null)
    const [threadToOpen, setThreadToOpen] = useState(null)
    const [threadToUpdate, setThreadToUpdate] = useState(null)
    const [threads, setThreads] = useState(null)
    const [error, setError] = useState(false)
    const [updatePostings, setUpdatePostings] = useState(false)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [pollingInterval, setPollingInterval] = useState(5000); // Initial polling interval
    const breadCrumbUrl = [
        { url: '../forum/topics', name: "Forum" },
        { name: forumTitle.split("-").join(" ") }
    ]

    useEffect(() => {
        const getForum = async () => {
            try {
                const response = await ForumApi.getOneForum(id)
                const thread = await ThreadApi.getAllThread(id)

                setForum(response)
                setThreads(thread)
                if (thread.status === "Error") {
                    setError(true)
                    return
                }
            } catch (error) {
                console.error(error)
                setPollingInterval(interval => Math.min(interval * 2, 5000)); // Exponential backoff with max interval of 1 minute

            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }
        }
        const intervalId = setInterval(getForum, pollingInterval);
        return () => clearInterval(intervalId);
    }, [pollingInterval])

    return (
        <Stack className="h-full no-scrollbar overflow-y-auto !flex-row">
            <Stack className="h-auto w-full px-2 md:px-20 gap-4 pt-2">
                {
                    loading ? (
                        // Loading skeleton
                        <>
                            <Stack className=" bg-gray-200/70 rounded-md animate-pulse">
                                <Stack className="py-14 px-8 gap-2">
                                    <div className=" rounded-lg bg-gray-300/90 h-2 w-3/4 "></div>
                                    <div className=" rounded-lg bg-gray-300/90 h-2 w-1/2 "></div>
                                    <div className=" rounded-lg bg-gray-300/90 h-2 w-3/4 "></div>

                                </Stack>
                            </Stack>
                            <Stack className="bg-gray-200/90 h-8 w-full" />
                            <div className="flex w-full justify-end">
                                <Stack className="bg-gray-200/90 h-8 w-1/4 justify-end" />
                            </div>
                            <Stack className="bg-gray-200/90 h-48 w-full" />

                        </>
                        // ))
                    ) : (
                        <>
                            <Stack className=" bg-gray-200/70 rounded-md">
                                <Stack className="p-4">

                                    <Typography className="!text-lg !font-semibold !tracking-thin capitalize">{forumTitle.split("-").join(" ")}</Typography>
                                    <Typography className="!text-md line-clamp-5 lowercase">
                                        {forum.description}
                                    </Typography>
                                </Stack>
                            </Stack>


                            <Stack className=" border-t-[2px] border-gray-300">

                                {/* BreadCrumb */}
                                <Stack className="bg-pinkish px-4 py-2 rounded-sm">
                                    {/* <Typography className="!tracking-wider"> */}
                                    <BreadCrumb data={breadCrumbUrl} classes="!text-[12px] tracking-wider !text-white font-bold " />
                                    {/* </Typography> */}
                                </Stack>
                                {/* End of BreadCrumb */}


                                {/* Add Postings */}
                                <CreatePostings add={true} />
                                {/* End of Add Postings */}



                                {/* Postings comment content */}
                                {
                                    !error && threads ?
                                        threads.map((thread) => (
                                            <div key={thread.thread.threadId} className="mb-8">
                                                <Stack className="border-[1px] shadow-lg rounded-md">
                                                    <Stack className="!flex-row">
                                                        <Stack className="!flex-row gap-2 w-full rounded-md">
                                                            <Stack className="w-1/4 gap-4 items-center bg-slate-200/50 p-4">
                                                                <Avatar className="!mr-2 !border-md"><Avatar /></Avatar>
                                                                <Typography variant="body1" component="span" className="!capitalize !text-sm">{thread.thread.user}</Typography>
                                                            </Stack>
                                                            <Stack className="ml-4 min-h-46 relative !w-full py-4 pr-4 gap-1">

                                                                <Typography className="!font-bold capitalize">
                                                                    {thread.thread.title}
                                                                </Typography>
                                                                <Typography className="!text-sm pl-6 pt-2">
                                                                    {thread.thread.content}
                                                                </Typography>

                                                                {/* UPDATE */}
                                                                <Stack className="!absolute right-0 top-0 ">
                                                                    {
                                                                        localStorage.getItem('role') === "Women" && thread.thread.userId === localStorage.getItem('userId') &&
                                                                        <>
                                                                            <ClosedThreadDialog threadId={thread.thread.threadId} />
                                                                            <Button variant="ghost" onClick={() => {
                                                                                setThreadToUpdate(thread.thread)
                                                                                setUpdatePostings(true)
                                                                            }} className="!text-sm !capitalize hover:!text-green-400">update</Button>
                                                                        </>
                                                                    }
                                                                    {
                                                                        localStorage.getItem('role') !== "Women" &&
                                                                        <>
                                                                            <ClosedThreadDialog threadId={thread.thread.threadId} />
                                                                            <Button variant="ghost" onClick={() => {
                                                                                setThreadToUpdate(thread.thread)
                                                                                setUpdatePostings(true)
                                                                            }} className="!text-sm !capitalize hover:!text-green-400">update</Button>
                                                                        </>
                                                                    }


                                                                </Stack>

                                                                <Divider className="!my-4" />
                                                                {
                                                                    thread.thread.imgUrl !== null &&
                                                                    <Typography className="!text-sm">

                                                                        <img src={`https://localhost:44398/api/image/name/${thread.thread.imgUrl}`} alt="Thread Image" />
                                                                    </Typography>
                                                                }

                                                                <Stack className="!flex-row mt-4">
                                                                    <Stack className=" !flex-row w-[70%] gap-4">

                                                                        <Button variant="text" className="!text-black">
                                                                            <Typography variant="body1" component="span" className="!text-sm  group cursor-pointer">
                                                                                <ThumbUp className="!text-md mr-2 group-hover:text-slate-400" />
                                                                                Like
                                                                            </Typography>
                                                                        </Button>

                                                                        <Button onClick={() => {
                                                                            setOpen(true)
                                                                            setThreadToOpen(thread)
                                                                        }} variant="text" className="!text-black">
                                                                            <Typography variant="body1" component="span" className="!text-sm group cursor-pointer">
                                                                                <Badge sx={{ "& .MuiBadge-badge": { fontSize: 6, height: 10, minWidth: 10 } }} badgeContent={thread.comment.length} color="primary">
                                                                                    <Comment className="!text-md mr-2 group-hover:text-slate-400" />
                                                                                    Comment
                                                                                </Badge>
                                                                            </Typography>
                                                                        </Button>
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
                                            </div>

                                        )) : (
                                            <Alert severity="info">No data yet</Alert>
                                        )
                                }

                            </Stack>
                        </>

                    )
                }
                <ThreadCommentModa open={open} close={() => setOpen(false)} thread={threadToOpen} />
                {updatePostings && <ModalEditPostings thread={threadToUpdate} onClose={() => setUpdatePostings(false)} />}

            </Stack>

            {/* Forum right aside */}
            <Stack className="!hidden lg:!block h-screen md:w-[320px] bg-white">
                <Stack className="border-l-2 h-dvh w-[250px] fixed top-[5rem] right-0 ">
                    <Stack className="h-1/2 pt-5 overflow-y-auto border-b-2">
                        <TopForum />
                    </Stack>
                    <Stack className="h-1/2 overflow-y-auto">
                        <Stack className="px-4">
                            <Stack className="!flex-row items-center">
                                <Typography className="!text-[18px] pb-2 !font-semibold">Official Hotlines</Typography>
                                {
                                    localStorage.getItem('role') === 'Personnel' &&
                                    <Button onClick={() => setOpen(true)}><Add /> hotline</Button>
                                }
                            </Stack>
                            <OfficialsHotline />
                        </Stack>
                    </Stack>

                </Stack>
            </Stack>
            {/* End Forum right aside */}
        </Stack >
    )
}

export default Thread