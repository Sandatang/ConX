/* eslint-disable react/prop-types */
import { Alert, Button, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import Modal from '../Modal'
import ModalHeading from '../ModalHeading'
import * as WorkshopApi from "../../network/workshop_api"
import { useForm } from 'react-hook-form'

const ModalDeleteCategory = (props) => {
    const [val, setVal] = useState('none')
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)
    const { handleSubmit, formState: { isSubmitting } } = useForm()

    const categoryDeletion = async () => {
        try {
            const response = await WorkshopApi.deleteCategory(val)
            if (response.status === "Success") {
                setMessage(response.message)

                setTimeout(() => {
                    props.handleClose()
                    setMessage(null)

                }, 1000)
            }
            if (response.status === "Error") {
                setError(true)
                setMessage(response.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (event) => {
        setVal(event.target.value);
    };
    return (
        <Modal
            heading={<ModalHeading title={`Delete Category`} desc="" onDismiss={() => {
                props.onClose()
                setMessage(null)
                setError(false)

            }} />}
            width=" w-[35%]"
        >
            <div className="w-full " >

                {error && <Alert severity="error">{message}</Alert>}
                {!error && message && <Alert severity="success">{message}</Alert>}
                <div className="p-2">
                    <form action="" onSubmit={handleSubmit(categoryDeletion)}>
                        <div className="w-full sm:gap-1">
                            <div className="w-full flex-col flex gap-3">
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
                                    type='submit'
                                    disabled={isSubmitting}
                                    variant='contained'>Delete</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default ModalDeleteCategory