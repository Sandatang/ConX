/* eslint-disable react/prop-types */
import { Comment, Report, ThumbUp } from "@mui/icons-material"
import { Avatar, Button, Divider, Stack, Typography } from "@mui/material"
import Modal from "../components/Modal"
import ModalHeading from "../components/ModalHeading"
import AddComment from "../components/Comment/AddComment"

const ThreadCommentModa = ({ open, thread, close }) => {
    return (
        open && (

            <Modal
                onDismiss={close}
                heading={<ModalHeading title={`${thread.thread.title} Post`} desc="" classname="!text-center " />}
                width=" w-1/2"
                height="h-[550px]"
            >

                <div className="w-full ">
                    {/* <form action="" > */}
                        <Stack className="pb-6 bg-gray-200/70">
                            <Stack className="!flex-row ">
                                <Stack className="!flex-row gap-2 w-full  rounded-md">
                                    <Stack className="w-1/4 h-full gap-4 items-center bg-gray-300/50 p-4">
                                        <Avatar className="!mr-2 !border-md" />
                                        <Typography variant="body1" component="span" className="!capitalize !text-sm">{thread.thread.user}</Typography>
                                    </Stack>
                                    <Stack className="ml-4 min-h-46 !w-full py-4 pr-4 gap-1">

                                        <Typography className="!font-bold capitalize">
                                            {thread.thread.title}
                                        </Typography>
                                        <Typography className="!text-sm pl-6">
                                            {thread.thread.content}
                                        </Typography>
                                        <Divider className="!my-4" />
                                        <Typography className="!text-sm">Image here if the user uploaded image</Typography>

                                        <Stack className="!flex-row mt-4">
                                            <Stack className=" !flex-row w-[70%] gap-4">

                                                <Button variant="text" className="!text-black">
                                                    <Typography variant="body1" component="span" className="!text-sm  group cursor-pointer">
                                                        <ThumbUp className="!text-md mr-2 group-hover:text-slate-400" />
                                                        Like
                                                    </Typography>
                                                </Button>

                                                <Button variant="text" className="!text-black">
                                                    <Typography variant="body1" component="span" className="!text-sm group cursor-pointer">
                                                        <Comment className="!text-md mr-2 group-hover:text-slate-400" />
                                                        Comment
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

                                        {/* Comments */}
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack className="gap-4">
                                <Divider className="!border-b-2 !border-gray-300/90" />
                                <Divider className="!border-b-2 !border-gray-300/90" />
                                <Stack className="px-4 gap-2">

                                    <AddComment threadId={thread.thread.threadId} thread={thread}/>
                                </Stack>
                            </Stack>
                        </Stack>
                    {/* </form> */}
                </div>
            </Modal>
        )
    )
}

export default ThreadCommentModa