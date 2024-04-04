/* eslint-disable react/prop-types */
import { Alert, Button, Stack, TextField } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as UserApi from "../../network/user_api"
import Modal from "../Modal"
import ModalHeading from "../ModalHeading"

const UpdateModalUser = (props) => {
  const navigate = useNavigate()
  const { register, setValue, handleSubmit, formState: {isSubmitting} } = useForm();
  const [error, setError] = useState(null)

  const updateUser = async (data) => {
    try {
      const formData = {
        ...data,
        // userId: localStorage.getItem("userId")
      }
      const response = await UserApi.updateUser(formData);
      if (response.status === "Success") {
        navigate(0)
      } else {
        setError("Update is unsuccessful try again later")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      onDismiss={props.onClose}
      heading={<ModalHeading title="Add Personnel" desc="" />}
      width=" w-[35%]"
    >
      <div className="w-full ">
        <div className="p-2">
          <form action="" onSubmit={handleSubmit(updateUser)}>
            <div className="w-full sm:gap-1">
              <Stack className="w-full gap-4">
                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                  id="outline-idno"
                  name="firstname"
                  label="Firstname "
                  size="small"
                  className="!w-full"
                  // InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                  defaultValue={props.user.firstname}
                  {...register("firstname")}
                />
                <TextField
                  id="outline-idno"
                  name="middlename"
                  label="Middlename"
                  size="small"
                  className="!w-full"
                  // InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                  defaultValue={props.user.middlename}
                  {...register("middlename")}

                />
                <TextField
                  id="outline-idno"
                  name="lastname"
                  label="Lastname "
                  size="small"
                  className="!w-full"
                  // InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                  defaultValue={props.user.lastname}
                  {...register("lastname")}

                />

                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    name="birthdate"
                    label="Birthdate"
                    value={dayjs(props.user.birthdate)}
                    sx={{ '& .MuiInputBase-root': { fontSize: '0.775rem' } }}
                    disabledTime onChange={(date) => {
                      setValue('birthdate',
                        date, { shouldValidate: true });
                    }} />
                </LocalizationProvider>

                <TextField
                  id="outline-idno"
                  name="email"
                  label="Email"
                  size="small"
                  className="!w-full"
                  // InputLabelProps={{ style: { fontSize: '0.775rem' } }}
                  defaultValue={props.user.email}
                  {...register("email")}

                />

                <Button disabled={isSubmitting} type="submit" variant="contained">Update</Button>
              </Stack>
            </div>
          </form>
        </div>
      </div>

    </Modal >
  )
}

export default UpdateModalUser