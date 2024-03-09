/* eslint-disable react/prop-types */
import { Alert, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as UserApi from "../network/user_api";
import Modal from "./Modal";
import ModalHeading from "./ModalHeading";

export default function AddPeronnelModal(props) {
    const { register, setValue, handleSubmit, formState: { isSubmitting }, } = useForm();
    const [error, setError] = useState(null);

    async function onSubmit(credentials) {
        try {
            const response = await UserApi.registerPersonnel(credentials);

            console.log(response)


        } catch (error) {
            console.error('An unexpected error occurred:', error);
            setError('An unexpected error occurred. Please check your inputs.');
        } finally {
            setTimeout(() => {
                setError(null)
            }, 3000);
        }
    }

    return (
        <Modal
            onDismiss={props.onClose}
            heading={<ModalHeading title="Add Personnel" desc="" />}
            width=" w-[35%]"
        >
            {
                error && <Alert severity="error">{error}!</Alert>
            }
            <div className="w-full ">
                <div className="p-2">
                    <form action="" onSubmit={handleSubmit(onSubmit)} >
                        <div className="w-full sm:gap-1">
                            <div className="w-full flex-col sm:flex  md:gap-[3px]">

                                <TextField
                                    id="outline-idno"
                                    name="employeeNumber"
                                    label="employeeNumber # "
                                    size="small"
                                    className="!w-full"
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                    {...register("employeeNumber", { required: true })}
                                />

                                <TextField
                                    id="outline-idno"
                                    name="username"
                                    label="username "
                                    size="small"
                                    className="!w-full"
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                    {...register("username", { required: true })}
                                />

                                <TextField
                                    id="outline-firstname"
                                    name="firstname"
                                    label="Firstname"
                                    size="small"
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}

                                    // value={selectedItem.id || ''}

                                    {...register("firstname", { required: true })}
                                />

                                <TextField
                                    id="outline-lastName"
                                    name="middlename"
                                    label="Middlename"
                                    size="small"
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                    {...register("middlename", { required: false })}
                                />

                                <TextField
                                    id="outline-username"
                                    name="lastname"
                                    label="Lastname"
                                    size="small"
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                    {...register("lastname", { required: true })}
                                />

                                <TextField
                                    id="outline-email"
                                    name="email"
                                    label="Email"
                                    size="small"
                                    InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                                    {...register("email", { required: true })}
                                />

                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        name="birthdate"
                                        label="Birthdate"
                                        sx={{ '& .MuiInputBase-root': { fontSize: '0.775rem' } }}
                                        disabledTime onChange={(date) => {
                                            setValue('birthdate',
                                                date, { shouldValidate: true });
                                        }} />
                                </LocalizationProvider>


                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    variant="contained"
                                    size="small"
                                    className="text-white font-bold
                                    w-full md:w-full flex place-self-end justify-end  rounded-lg
                                    py-4 !mt-2 tracking-wider md:py-2"
                                >
                                    Add account
                                </Button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}