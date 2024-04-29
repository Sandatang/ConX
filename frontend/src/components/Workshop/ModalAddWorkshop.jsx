/* eslint-disable react/prop-types */
import { Alert, Button, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as WorkshopApi from "../../network/workshop_api";
import Modal from "../Modal";
import ModalHeading from "../ModalHeading";

const ModalAddWorkshop = (props) => {
    const [val, setVal] = useState(props.shop ? props.shop.categoryId : 'none')
    const [message, setMessage] = useState(null)
    const { register, reset, handleSubmit, formState: { isSubmitting } } = useForm()

    const handleChange = (event) => {
        setVal(event.target.value);
    };

    const addWorkshop = async (data) => {
        try {
            const formData = {
                ...data,
                "categoryId": val,
                "creatorId": localStorage.getItem('userId')
            }
            const response = await WorkshopApi.addWorkShop(formData)
            if (response.status === "Success") {
                setMessage(response.message)
                reset()
            }
        } catch (error) {
            console.error(error)
        }
    }
    const updateWorkShop = async (data) => {
        try {
            const formData = {
                ...data,
                "categoryId": val,
                "workshopId": props.shop.workshopId,
                "creatorId": localStorage.getItem('userId')
            }
            const response = await WorkshopApi.updateWorkShop(formData)
            if (response.status === "Success") {
                setMessage(response.message)
                reset()
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Modal
            heading={<ModalHeading title={`${props.shop ? 'Update': 'Add' } Workshop`} desc="" onDismiss={() => {
                props.onClose()
            }} />}
            width=" md:w-[35%]"
        >
            {message && <Alert severity="success">{message}</Alert>}
            <div className="w-full " >
                <div className="p-2">
                    <form action="" onSubmit={handleSubmit(props.shop ? updateWorkShop : addWorkshop)}>
                        <div className="w-full sm:gap-1">
                            <div className="w-full flex-col flex gap-3">
                                <TextField
                                    id="outline-idno"
                                    name="workshopTitle"
                                    label="Title "
                                    size="small"
                                    className="!w-full"
                                    defaultValue={props.shop ? props.shop.workshopTitle : ''}
                                    {...register('workshopTitle', { required: true })}
                                />

                                <TextField
                                    id="outline-firstname"
                                    name="tags"
                                    label="Tags"
                                    size="small"
                                    defaultValue={props.shop ? props.shop.tags : ''}
                                    {...register('tags', { required: true })}

                                />

                                <TextField
                                    id="outline-lastName"
                                    name="description"
                                    label="Description"
                                    size="small"
                                    defaultValue={props.shop ? props.shop.description : ''}
                                    {...register('description', { required: true })}

                                />

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={val}
                                    onChange={handleChange}

                                >
                                    <MenuItem value={'none'} disabled>Category</MenuItem>
                                    {
                                        props.category && props.category.length > 0 && props.category.map((ct, index) => (

                                            <MenuItem key={index} value={ct.id}>{ct.categoryName}</MenuItem>
                                        ))
                                    }
                                </Select>




                                <Button
                                    disabled={isSubmitting}
                                    type="submit"
                                    variant="contained"
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