/* eslint-disable react/prop-types */
import { Avatar, Stack, Typography } from "@mui/material"
import AddComment from "../Comment/AddComment"
import Modal from "../Modal"
import ModalHeading from "../ModalHeading"

const BulletinComments = ({ open, bulletin, close }) => {
    return (
        bulletin && open && (

            <Modal

                heading={<ModalHeading title={`${bulletin.bulletinPost.title} Post`} desc="" classname="!text-center " onDismiss={() => {
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
                                    <Typography variant="body1" component="span" className="!capitalize !text-sm !font-bold">{bulletin.bulletinPost.user}</Typography>
                                </Stack>
                                <Stack className="ml-4 min-h-46 !w-full py-4 pr-4 gap-1">

                                    <Typography className="!font-bold capitalize">
                                        {bulletin.bulletinPost.title}
                                    </Typography>
                                    <Typography className="!text-sm pl-6">
                                        {bulletin.bulletinPost.content}
                                    </Typography>
                                </Stack>
                            </Stack>

                        </Stack>
                        {/* <Divider/> */}
                        <Stack className="px-8 mt-4 border-[1px] m-4 rounded-lg shadow-sm">
                            <img src={`https://localhost:44398/api/image/name/${bulletin.bulletinPost.imageName}`} alt="Thread Image" />
                        </Stack>
                        <Stack className="gap-4 my-4 py-4 border-[1px]">
                            <Stack className="px-4 gap-2">

                                <AddComment bulletinPostId={bulletin.bulletinPost.bulletinId} bulletin={bulletin} />
                            </Stack>
                        </Stack>
                    </Stack>
                    {/* </form> */}
                </div>
            </Modal>
        )
    )
}

export default BulletinComments