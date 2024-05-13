/* eslint-disable react/prop-types */
import { Alert, Button, Card, CardActions, CardContent, IconButton, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { differenceInDays, parseISO } from 'date-fns';
import { useState } from 'react';
// import ModalDeActivate from '../UserManagement/ModalDeActivate';
import { Edit } from '@mui/icons-material';
import AddTraining from './AddTraining';


const TrainingCard = (props) => {
    const [toUpdate, setToUpdate] = useState(null);
    const [update, setUpdate] = useState(false)


    return (
        <>
            {
                props.trainings !== null && props.trainings.length > 0 ? (
                    props.trainings.map((t) => (


                        <Card key={t.id} className="!rounded-lg border-[1px] shadow-sm !border-gray-400  w-full sm:!w-[17rem] p-2 hover:transform hover:scale-105 transition-transform ease-in-out duration-300">
                            <CardContent className="!flex !flex-col justify-between !h-56 rounded-lg">
                                <Stack >
                                    <Stack className='!flex-row relative justify-between items-center'>
                                        {/* <Typography className="!text-sm bg-white p-2 rounded-xl w-1/2 !text-center ">{new Date(jb.dateCreated).toDateString().split(" ").splice(1).join(" ")}</Typography> */}
                                        {
                                            localStorage.getItem('role') === "Personnel" && (
                                                <Stack className='absolute right-0'>
                                                    {/* <IconButton onClick={() => {
                                                    setJobToEdit(jb)
                                                    // setOpen(true)
                                                }}
                                                    className="!rounded-md hover:!bg-transparent group"
                                                > */}
                                                    {/* <Close className='!text-red-500' />  */}
                                                    {/* <span className='text-sm text-red-500 group-hover:!text-black/50 '>Close Job</span>
                                                </IconButton> */}
                                                    {/* <ModalDeActivate/> */}

                                                    <IconButton onClick={() => {
                                                        setToUpdate(t)
                                                        setUpdate(true)
                                                    }}
                                                        className="!rounded-md"

                                                    >
                                                        <Edit className='!text-green-500' fontSize='small' />
                                                    </IconButton>
                                                </Stack>
                                            )
                                        }
                                    </Stack>
                                </Stack>
                                <Stack>
                                    <Stack className=" justify-center overflow-hidden">
                                        <Stack className='!flex-row gap-8 !pr-6 '>
                                            <Typography className="!text-lg !font-bold capitalize">{t.trainingName}</Typography>
                                        </Stack>
                                        <Stack className='!h-[5rem] !pt-2'>
                                            <Typography className="!text-sm capitalize line-clamp-4 w-3/4">
                                                {t.trainingDescription}
                                            </Typography>
                                        </Stack>
                                        <Stack className='!flex-row gap-2'>
                                            <Stack>
                                                <Typography className='!text-md !font-bold'>Venue :</Typography>
                                                <Typography className='!text-md !font-bold'>Duration :</Typography>
                                            </Stack>
                                            <Stack>
                                                <Typography className='!text-md !font-bold'>{t.venue}</Typography>
                                                <Typography className='!text-md !font-bold'>
                                                    {differenceInDays(parseISO(t.dateEnd), parseISO(t.dateStarted))}
                                                    {" day(s)"}
                                                </Typography>
                                            </Stack>
                                        </Stack>

                                    </Stack>
                                </Stack>

                            </CardContent>
                            <CardActions>
                                <Button component={Link} to={`details/${t.id}`} variant="contained" className="!bg-black hover:!bg-black/80 !w-full" size="small">Details</Button>
                            </CardActions>

                        </Card>
                    ))

                ) : (
                    <Alert severity='info'>No data yet</Alert>
                )
            }
            {update && <AddTraining update={true} training={toUpdate} onClose={() => setUpdate(false)}/>}
        </>
    )
}

export default TrainingCard