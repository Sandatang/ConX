/* eslint-disable react/prop-types */
import ReactPlayer from "react-player"
import Modal from "../Modal"
import ModalHeading from "../ModalHeading"

const ModalPlayVideo = (props) => {
    return (
        <Modal
            heading={<ModalHeading title={`Video Player`} desc="" onDismiss={() => {
                props.onClose()
            }} />}
            width=" md:w-[60%]"
        >
            <div className="w-full " >
                <div className="p-2">
                    <div className="w-full sm:gap-1">
                        <div className="w-full flex-col flex gap-3">
                            <ReactPlayer
                                className='react-player'
                                url={`https://localhost:44398/api/video/name/${props.videoToPlay}`}
                                width='100%'
                                height='100%'
                                controls
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ModalPlayVideo