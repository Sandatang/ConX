/* eslint-disable react/prop-types */
import Modal from '../Modal'
import ModalHeading from '../ModalHeading'

const AddJob = (props) => {
    return (
        <Modal
            onDismiss={props.onClose}
            heading={<ModalHeading title={`Add Personnel`} desc="" />}
            width=" w-[35%]"
        >

            <div className="w-full ">
                <div className="p-2">

                </div>
            </div>
        </Modal>
    )
}

export default AddJob