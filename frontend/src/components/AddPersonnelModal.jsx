/* eslint-disable react/prop-types */
import { Alert, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as UserApi from "../network/user_api";
import Modal from "./Modal";
import ModalHeading from "./ModalHeading";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function AddPeronnelModal(props) {
    const navigate = useNavigate()
    const { register, setValue, reset, handleSubmit, formState: { isSubmitting }, } = useForm();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const [val, setVal] = useState(props.update ? props.user.user.civilStatus : 'none')

    async function onAddPersonnel(credentials) {
        try {
            const formData = {
                ...credentials,
                "civilStatus": val,
            }
            const response = await UserApi.registerPersonnel(formData);

            console.log(response)
            if (response.field) {
                setError(response.message)
            }

            if (response.status === 400) {
                setError(response.errors.Email ? response.errors.Email.toString() : response.errors.ConfirmPassword.toString())
            }

            if (response.status === "Success") {
                setError(null)
                setSuccess(response.message)
                setValue('birthdate', null);
                reset()
            }
            console.log(response)


        } catch (error) {
            console.error('An unexpected error occurred:', error);
            setError('An unexpected error occurred. Please check your inputs.');
        }
    }

    async function onUpdateDetails(credentials) {
        try {
            const formData = {
                ...credentials,
                userId: props.user.user.id,
                "civilStatus": val,
                "role": "Women",
            }
            const response = await UserApi.updateUser(formData);

            if (response.status === " Success") {
                setError(null)
                setSuccess(response.message)
                setValue('birthdate', null);
                reset()
                navigate(0)
            }

            console.log(response)


        } catch (error) {
            console.error('An unexpected error occurred:', error);
            setError('An unexpected error occurred. Please check your inputs.');
        }
    }


    const handleChange = (event) => {
        setVal(event.target.value);
    };

    return (
        <Modal
            heading={<ModalHeading title={`${props.update ? "Update user" : "Add personnel"}`} desc="" onDismiss={() => {
                props.onClose()
            }} />}
            width=" md:w-[35%]"
            height="h-[500px]"
        >

            {error && <Typography variant="caption" color="error">{error}</Typography>}
            {success && <Alert severity='success'>{success}</Alert>}
            <div className="w-full ">
                <div className="p-2">
                    <form action="" onSubmit={handleSubmit(props.update ? onUpdateDetails : onAddPersonnel)} >
                        <div className="w-full sm:gap-1">
                            <div className="w-full flex-col flex gap-3">

                                {!props.update &&
                                    <TextField
                                        id="outline-idno"
                                        name="employeeNumber"
                                        label="employeeNumber # "
                                        size="small"
                                        className="!w-full"
                                        InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                        {...register("employeeNumber", { required: true })}
                                    />
                                }

                                <TextField
                                    id="outline-idno"
                                    name="username"
                                    label="username "
                                    size="small"
                                    className="!w-full"
                                    defaultValue={props.update ? props.user.user.userName : ""}
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                    {...register("username", { required: true })}
                                />

                                <TextField
                                    id="outline-firstname"
                                    name="firstname"
                                    label="Firstname"
                                    size="small"
                                    defaultValue={props.update ? props.user.user.firstname : ""}
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}

                                    // value={selectedItem.id || ''}

                                    {...register("firstname", { required: true })}
                                />

                                <TextField
                                    id="outline-lastName"
                                    name="middlename"
                                    label="Middlename"
                                    size="small"
                                    defaultValue={props.update ? props.user.user.middlename : ""}
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                    {...register("middlename", { required: false })}
                                />

                                <TextField
                                    id="outline-username"
                                    name="lastname"
                                    label="Lastname"
                                    size="small"
                                    defaultValue={props.update ? props.user.user.lastname : ""}
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                    {...register("lastname", { required: true })}
                                />

                                <TextField
                                    id="outline-email"
                                    name="email"
                                    label="Email"
                                    size="small"
                                    defaultValue={props.update ? props.user.user.email : ""}
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                    {...register("email", { required: true })}
                                />

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    className='!w-full'
                                    value={val}
                                    onChange={handleChange}
                                    size="small"

                                >
                                    <MenuItem value="none" disabled>Civil Status</MenuItem>
                                    <MenuItem value="single">Single</MenuItem>
                                    <MenuItem value="married">Married</MenuItem>
                                    <MenuItem value="divorced">Divorced</MenuItem>
                                    <MenuItem value="separated">Separated</MenuItem>
                                    <MenuItem value="widowed">Widowed</MenuItem>
                                    <MenuItem value="civil_union">Civil Union</MenuItem>
                                    <MenuItem value="domestic_partnership">Domestic Partnership</MenuItem>
                                </Select>

                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        name="birthdate"
                                        label="Birthdate"
                                        sx={{ '& .MuiInputBase-root': { fontSize: '0.775rem' } }}
                                        value={props.update ? dayjs(props.user.user.birthdate) : null}
                                        disabledTime onChange={(date) => {
                                            setValue('birthdate',
                                                date, { shouldValidate: true });
                                        }} />
                                </LocalizationProvider>


                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    variant={`${error ? 'outlined':'contained'}`}
                                    size="small"
                                    className={`text-white font-bold
                                    w-full md:w-full flex place-self-end justify-end  rounded-lg
                                    py-4 !mt-2 tracking-wider md:py-2 ${error && '!border-red-500'}`}
                                >
                                    {props.update ? "Update" : "Add"}
                                </Button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}