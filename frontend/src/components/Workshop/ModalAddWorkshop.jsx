/* eslint-disable react/prop-types */
import { Alert, Button, MenuItem, Select, TextField } from "@mui/material";
import Modal from "../Modal";
import ModalHeading from "../ModalHeading";
import { useState } from "react";
import * as WorkshopApi from "../../network/workshop_api"
import { useForm } from "react-hook-form";

const ModalAddWorkshop = (props) => {
    const [val, setVal] = useState('none')
    const [message, setMessage] = useState(null)
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()

    const handleChange = (event) => {
        setVal(event.target.value);
    };

    const addWorkshop = async (data) => {
        try {
            const formData = {
                ...data,
                "category": val,
                "creatorId": localStorage.getItem('userId')
            }
            const response = await WorkshopApi.addWorkShop(formData)
            if (response.status === "Success") {
                setMessage(response.message)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Modal
            heading={<ModalHeading title={`Add Workshop`} desc="" onDismiss={() => {
                props.onClose()
            }} />}
            width=" w-[35%]"
        >
            {message && <Alert severity="success">{message}</Alert>}
            <div className="w-full " >
                <div className="p-2">
                    <form action="" onSubmit={handleSubmit(addWorkshop)}>
                        <div className="w-full sm:gap-1">
                            <div className="w-full flex-col flex gap-3">
                                <TextField
                                    id="outline-idno"
                                    name="workshopTitle"
                                    label="Title "
                                    size="small"
                                    className="!w-full"
                                    {...register('workshopTitle', { required: true })}
                                />

                                <TextField
                                    id="outline-firstname"
                                    name="tags"
                                    label="Tags"
                                    size="small"
                                    {...register('tags', { required: true })}

                                />

                                <TextField
                                    id="outline-lastName"
                                    name="description"
                                    label="Description"
                                    size="small"
                                    {...register('description', { required: true })}

                                />

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={val}
                                    onChange={handleChange}

                                >
                                    <MenuItem value={'none'} disabled>Category</MenuItem>
                                    <MenuItem value={'1'}>Livelihood</MenuItem>
                                    <MenuItem value={'2'}>Self-Defense</MenuItem>
                                    <MenuItem value={'3'}>Self-Growth</MenuItem>
                                </Select>




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

export default ModalAddWorkshop