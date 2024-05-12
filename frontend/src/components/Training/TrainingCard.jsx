/* eslint-disable react/prop-types */
import { Alert, Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { differenceInDays, parseISO } from 'date-fns';


const TrainingCard = (props) => {


    return (
        <>
            {
                props.trainings !== null && props.trainings.length > 0 ? (
                    props.trainings.map((t) => (


                        <Card key={t.id} className="!rounded-lg border-[1px] shadow-sm !border-gray-400  w-full sm:!w-[17rem] p-2 hover:transform hover:scale-105 transition-transform ease-in-out duration-300">
                            <CardContent className="!flex !flex-col justify-between !h-56 !bg-yellow-500/60 rounded-lg">
                                <Stack>
                                    <Stack className=" justify-center overflow-hidden">
                                        <Stack className='!flex-row gap-8 '>
                                            <Typography className="!text-lg !font-bold capitalize">{t.trainingName}</Typography>
                                        </Stack>
                                        <Stack className='!h-[8rem] !pt-2'>
                                            <Typography className="!text-sm capitalize line-clamp-6 w-3/4">
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
                                <Button component={Link} variant="contained" className="!bg-black hover:!bg-black/80 !w-full" size="small">Details</Button>
                            </CardActions>

                        </Card>
                    ))

                ) : (
                    <Alert severity='info'>No data yet</Alert>
                )
            }

        </>
    )
}

export default TrainingCard