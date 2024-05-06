/* eslint-disable react/prop-types */
import { Alert, Button, TextField, Typography } from '@mui/material'
import Modal from '../Modal'
import ModalHeading from '../ModalHeading'
import * as HotlineApi from "../../network/hotline_api"
import { useForm } from 'react-hook-form'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

const AddHotline = (props) => {
    // const navigate = useNavigate()
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm()

    const addHotLine = async (data) => {
        try {
            const formData = {
                ...data,
                'userId': localStorage.getItem('userId')
            }
            const response = await HotlineApi.addHotline(formData)
            if (!response.status) {
                reset()
                setMessage("Added successfully, changed will be reflected once page is refreshed.")
            }
        } catch (error) {
            console.error(error)
        }
    }
    const updateHotline = async (data) => {

        try {
            const formData = {
                ...data,
                'hotlineId': props.hotline.hotlineId,
                'userId': localStorage.getItem('userId')
            }
            const response = await HotlineApi.updateHotline(formData)
            if (response.errors) {
                const er = Object.keys(response.errors)
                const key = er[0]
                setError(response.errors[key])
                // setMessage("Updated successfully")
                // setTimeout(() => {
                //     navigate(0)
                // }, 1000)
            }
            if (response.status === "Success") {
                setMessage("Updated successfully, changed will be reflected once page is refreshed.")
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <Modal

                heading={<ModalHeading title={props.update ? 'Update Hotline' : `Add Hotline`} desc="" onDismiss={props.onClose} />}
                width=" w-[35%]"
            >

                {error && <Typography variant="caption" color="error">{error}</Typography>}
                {message && <Alert severity='success'>{message}</Alert>}
                <div className="w-full ">
                    <div className="p-2">
                        <form action="" onSubmit={handleSubmit(props.update ? updateHotline : addHotLine)}>
                            <div className="w-full sm:gap-1">
                                <div className="w-full flex-col flex gap-3">
                                    <Typography>Owner name <span className='text-red-500'>*</span></Typography>
                                    <TextField
                                        id="outline-idno"
                                        name="name"
                                        placeholder="Hotline owner "
                                        size="small"
                                        className="!w-full"
                                        defaultValue={props.update ? props.hotline.name : ""}
                                        InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                        {...register('name', { required: true })}
                                    />
                                    <Typography>Hotline or Phone # <span className='text-red-500'>*</span></Typography>
                                    <TextField
                                        id="outline-idno"
                                        name="hotline"
                                        placeholder="Number "
                                        size="small"
                                        className="!w-full"
                                        defaultValue={props.update ? props.hotline.hotline : ""}
                                        InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                        {...register('hotline', { required: true })}
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
                                        {props.update ? 'Update' : 'Add'}
                                    </Button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AddHotline