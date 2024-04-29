/* eslint-disable react/prop-types */
import { Avatar, Stack, Typography } from "@mui/material"
import Modal from "../Modal"
import ModalHeading from "../ModalHeading"
import { DynamicText } from "../Testimonials/AllTestimonial"

const ModalViewReport = (props) => {
    return (
        <Modal
            heading={<ModalHeading title={`View Report`} desc="" onDismiss={() => {
                props.onClose()
            }} />}
            width=" md:w-[60%]"
            height="h-[500px]"
        >
            <div className="w-full " >
                <div className="p-2">
                    <div className="w-full sm:gap-1">
                        <div className="w-full flex-col flex gap-3">
                            <Stack>
                                <Stack className="!flex-row gap-2">
                                    <Avatar />
                                    <Stack>
                                        <Typography variant='h6' className="!text-slate-800 !capitalize">{props.report.fullName}</Typography>

                                    </Stack>
                                </Stack>
                                <Stack className="my-4 line-clamp-2">
                                    <DynamicText text={props.report.content} maxHeight={100} />
                                </Stack>
                            </Stack>
                            <Stack className="shadow-lg">
                                <img src={`https://localhost:44398/api/image/name/${props.report.imgUrl}`} className="w-full aspect-video" alt="Bulletin Image" />

                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ModalViewReport