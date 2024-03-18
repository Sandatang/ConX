import { Add, ArrowCircleRight, ForumOutlined, Reply, Report, ThumbUp } from "@mui/icons-material"
import { Avatar, Button, Divider, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useParams } from "react-router-dom"
import BreadCrumb from "../BreadCrumb"



const Thread = () => {
    const { forumTitle } = useParams()
    const [addComment, setAddComment] = useState(false)
    const breadCrumbUrl = [
        { url: '../forum/topics', name: "Forum" },
        { name: `Forum` }
    ]
    return (
        <Stack className="h-full overflow-auto mx-4 !flex-row">
            <Stack className="h-auto w-[650px] gap-4 pt-2">
                <Stack className=" bg-gray-200/70 rounded-md">
                    <Stack className="p-4">

                        <Typography className="!text-lg !font-semibold !tracking-thin capitalize">{forumTitle.split("-").join(" ")}</Typography>
                        <Typography className="!text-md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                    </Stack>
                </Stack>

                <Stack className=" border-t-[2px] border-gray-300">
                    {/* BreadCrumb */}
                    <Stack className="bg-pinkish px-4 py-2 rounded-sm">
                        <Typography className="!tracking-wider">
                            <BreadCrumb data={breadCrumbUrl} classes="!text-[12px] tracking-wider !text-white font-bold "/>
                        </Typography>
                    </Stack>
                    {/* End of BreadCrumb */}

                    <Button variant="outlined" className=" self-end !mt-4 !text-sm " onClick={() => setAddComment(!addComment)}>
                        <Add className="!text-md" />
                        {addComment ? "Cancel" : "Create comment"}
                    </Button>

                    {/* Add Comment */}
                    <Stack className={`!flex-row py-4 transition-opacity duration-500 ease-in-out ${addComment ? 'opacity-100' : 'opacity-0'} ${addComment ? 'h-auto' : 'h-0'}`}>
                        <Stack className="!flex-row gap-2 w-full bg-gray-200/70 rounded-md">
                            <Stack className="w-1/4 gap-4 items-center bg-gray-300/50 p-4">
                                <Avatar className="!mr-2 !border-md"><Avatar /></Avatar>
                                <Typography variant="body1" component="span" className="!capitalize">{localStorage.getItem("username")}</Typography>
                            </Stack>
                            <Stack className="ml-4 !w-full py-4 pr-4">
                                <TextField
                                    multiline
                                    fullWidth
                                    variant="outlined"
                                    rows={4}
                                    placeholder="Write your thoughts here..."
                                    className="bg-white !rounded-sm !text-sm "
                                />

                                <Button className="!self-end !mt-2" variant="contained">Post</Button>
                            </Stack>
                        </Stack>
                    </Stack>
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
                    {/* End Postings comment content */}

                </Stack>

            </Stack>

            {/* Forum right aside */}
            <Stack className="border-l-2 w-[300px] px-4 mx-4 !sticky !top-0">
                <Typography className="!text-[18px] pb-2 !font-semibold">Forums</Typography>

                <Stack className="gap-3">
                    {/* Each discussions */}
                    <Stack className="!flex-row">
                        <ForumOutlined className="!text-[2.5em] !text-slate-500" />
                        <Stack className="ml-2 justify-center">
                            <Typography className="!text-sm !font-semibold tracking-wider">Title of Forum here</Typography>
                            <Typography className="!text-[0.467rem]">Name of creator of the discussion</Typography>
                        </Stack>
                        <Button>
                            <ArrowCircleRight className="!text-pinkish" />
                        </Button>
                    </Stack>
                    {/* End Each discussions */}

                    {/* Each discussions */}
                    <Stack className="!flex-row">
                        <ForumOutlined className="!text-[2.5em] !text-slate-500" />
                        <Stack className="ml-2 justify-center">
                            <Typography className="!text-sm !font-semibold tracking-wider">Title of Forum here</Typography>
                            <Typography className="!text-[0.467rem]">Name of creator of the discussion</Typography>
                        </Stack>
                        <Button>
                            <ArrowCircleRight className="!text-pinkish" />
                        </Button>
                    </Stack>
                    {/* End Each discussions */}

                    {/* Each discussions */}
                    <Stack className="!flex-row">
                        <ForumOutlined className="!text-[2.5em] !text-slate-500" />
                        <Stack className="ml-2 justify-center">
                            <Typography className="!text-sm !font-semibold tracking-wider">Title of Forum here</Typography>
                            <Typography className="!text-[0.467rem]">Name of creator of the discussion</Typography>
                        </Stack>
                        <Button>
                            <ArrowCircleRight className="!text-pinkish" />
                        </Button>
                    </Stack>
                    {/* End Each discussions */}
                </Stack>

            </Stack>
            {/* End Forum right aside */}
        </Stack >
    )
}

export default Thread