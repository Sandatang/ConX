import { Button, Stack, Typography } from "@mui/material";
import TrainingCard from "../components/Training/TrainingCard";
import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import AddTraining from "../components/Training/AddTraining";
import * as TrainingApi from "../network/training_api"

const Training = () => {
    const [add, setAdd] = useState(false)
    const [trainings, setTrainings] = useState(null)

    useEffect(() => {
        const getAllTrainings = async () => {
            const response = await TrainingApi.getAllTraining();
            setTrainings(response)
        }
        getAllTrainings()
    }, [])
    return (
        <Stack className="w-full overflow-y-auto no-scrollbar px-8 py-4">
            <Typography className="!text-md !text-slate-800 !mb-4">
                Participate in our training program to enhance your skills and knowledge.
                Upon successful completion, receive a certification validating your achievement.
                Our training offers hands-on experience, expert guidance, and comprehensive learning materials to ensure your success.
            </Typography>
            <Stack className="mr-4">
                <Button onClick={() => setAdd(true)} className="self-end" variant="contained">
                    <Add />
                    Training
                </Button>
            </Stack>
            <div className=" mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8">

                <TrainingCard trainings={trainings}/>
            </div>

            {add && <AddTraining onClose={() => setAdd(false)} />}
        </Stack>

    )
}

export default Training