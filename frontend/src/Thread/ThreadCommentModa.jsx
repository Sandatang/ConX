/* eslint-disable react/prop-types */
import Modal from "../components/Modal"
import ModalHeading from "../components/ModalHeading"

const ThreadCommentModa = (props) => {
    return (

        <Modal
            onDismiss={props.onClose}
            heading={<ModalHeading title={props.title} desc="" />}
            width=" w-[35%]"
        >

            <div className="w-full ">
                <div className="p-2">
                    <form action="" >
                        <div className="w-full sm:gap-1">
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default ThreadCommentModa