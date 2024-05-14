import { useEffect, useState } from "react"
import * as TrainingApi from "../../network/training_api"
import { Stack, Typography } from "@mui/material"

const WomenTrainingCompletion = () => {
    const [training, setTraining] = useState(null)
    useEffect(() => {
        const getMyTraining = async () => {
            const response = await TrainingApi.userCompletedTraining(localStorage.getItem('userId'))
            setTraining(response)
        }
        getMyTraining()
    }, [])
    return (
        <Stack className="my-10 px-10">

            <Stack>
                <Typography className="!text-md !text-slate-800 !mb-4">
                    Welcome to your Completed Trainings page! Here, you can view all the training programs you have successfully finished.
                    Helping you track your learning journey.
                    Keep enhancing your skills and stay motivated with a clear record of your professional development.
                </Typography>

            </Stack>

            <table className="min-w-full divide-y divide-gray-200 relative">
                <thead className="bg-gray-300 border border-solid sticky top-0 z-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Training Name</th>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}>Started</th>
                        <th scope="col" className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider`}>End</th>
                        <th scope="col" className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider`}>Venue</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        training && training.length > 0 &&
                        training.map((t, index) => (

                            <>
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900">
                                            {t.trainingTitle}
                                        </span>
                                    </td>
                                    <td className="px-6 text-left py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900">
                                            {new Date(t.stared).toDateString().split(" ").splice(1).join(" ")}
                                        </span>
                                    </td>
                                    <td className="px-6 text-center py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900">
                                            {new Date(t.end).toDateString().split(" ").splice(1).join(" ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900">
                                            {t.venue}
                                        </span>
                                    </td>
                                </tr>
                            </>
                        ))
                    }

                </tbody>
            </table>
        </Stack>
    )
}

export default WomenTrainingCompletion