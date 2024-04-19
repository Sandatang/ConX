/* eslint-disable react/prop-types */
import { Avatar, Stack, Typography } from "@mui/material"
import AddComment from "../Comment/AddComment"
import Modal from "../Modal"
import ModalHeading from "../ModalHeading"

const ThreadCommentModa = ({ open, thread, close }) => {
    return (
        thread && open && (

            <Modal

                heading={<ModalHeading title={`${thread.thread.title} Post`} desc="" classname="!text-center " onDismiss={() => {
                    close()
                }} />}
                width=" w-1/2"
                height="h-[550px]"
                abs="right-[20rem]"
            >

                <div className="w-full ">
                    {/* <form action="" > */}
                    <Stack className="pb-6 border-[1px]">
                        <Stack className="!flex-row ">
                            <Stack className="!flex-row gap-2 w-full border-[1px] border-b-0  rounded-md">
                                <Stack className="w-1/4 h-full gap-4 items-center bg-slate-200/50 p-4">
                                    <Avatar className="!mr-2 " />
                                    <Typography variant="body1" component="span" className="!capitalize !text-sm !font-bold">{thread.thread.user}</Typography>
                                </Stack>
                                <Stack className="ml-4 min-h-46 !w-full py-4 pr-4 gap-1">

                                    <Typography className="!font-bold capitalize">
                                        {thread.thread.title}
                                    </Typography>
                                    <Typography className="!text-sm pl-6">
                                        {thread.thread.content}
                                    </Typography>
                                </Stack>
                            </Stack>

                        </Stack>
                        {/* <Divider/> */}
                        <Stack className="px-8 mt-4">
                            <Typography className="!text-sm">
                                <img src={`https://localhost:44398/api/image/name/${thread.thread.imgUrl}`} alt="Thread Image" />
                            </Typography>
                        </Stack>
                        <Stack className="gap-4 my-4 py-4 border-[1px]">
                            <Stack className="px-4 gap-2">

                                <AddComment threadId={thread.thread.threadId} thread={thread} />
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