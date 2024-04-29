/* eslint-disable react/prop-types */
import { Alert, Button, TextField } from "@mui/material"
import Modal from "../Modal"
import ModalHeading from "../ModalHeading"
import * as WorkshopApi from "../../network/workshop_api"
import { useForm } from "react-hook-form"
import { useState } from "react"

const AddCategory = (props) => {
    const [message, setMessage] = useState(null)
    const { register, reset, handleSubmit, formState: { isSubmitting } } = useForm()

    const insertCategory = async (data) => {
        try {
            const response = await WorkshopApi.addCategory(data)
            console.log(response)
            if (response.status === "Success") {
                setMessage(response.message)
            }
            reset()
            setTimeout(() => {
                props.onClose()
            }, 500)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Modal
            heading={<ModalHeading title={`Add Workshop Category`} desc="" onDismiss={() => {
                props.onClose()
            }} />}
            width=" md:w-[35%]"
        >
            <div className="w-full " >
                {message && <Alert>{message}</Alert>}
                <div className="p-2">
                    <form action="" onSubmit={handleSubmit(insertCategory)}>
                        <div className="w-full sm:gap-1">
                            <div className="w-full flex-col flex gap-3">
                                <TextField
                                    id="outline-idno"
                                    name="categoryName"
                                    label="Category Title "
                                    size="small"
                                    className="!w-full"
                                    {...register("categoryName", { required: true })}
                                />

                                <Button
                                    disabled={isSubmitting}
                                    type="submit"
                                    variant="contained"
                                    size="small"
                                    className="text-white font-bold
                                    w-full md:w-full flex place-self-end justify-end  rounded-lg
                                    py-4 !mt-2 tracking-wider md:py-2"
                                >
                                    Add
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default AddCategory