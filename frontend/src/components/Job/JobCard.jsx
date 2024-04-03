/* eslint-disable react/prop-types */
import { Edit, Work } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, IconButton, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ModalDeActivate from '../UserManagement/ModalDeActivate'
import AddJob from './AddJob'

const JobCard = (props) => {
    const [open, setOpen] = useState(false)
    const [jobToEdit, setJobToEdit] = useState(null)

    
    return (
        <>
            {props.job
                .filter(jb => jb.isActive)
                .map((jb) => (

                    <Card key={jb.id} className=" !rounded-lg border-[1px] shadow-sm !border-gray-400 !w-[17rem] p-2 hover:transform hover:scale-105 transition-transform ease-in-out duration-300">
                        <CardContent className="!flex !flex-col justify-between !h-56 !bg-yellow-500/60 rounded-lg">
                            <Stack >
                                <Stack className='!flex-row relative justify-between items-center'>
                                    <Typography className="!text-sm bg-white p-2 rounded-xl w-1/2 !text-center ">{new Date(jb.dateCreated).toDateString().split(" ").splice(1).join(" ")}</Typography>
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
                                                <ModalDeActivate job={true} jobId={jb.id}/>

                                                <IconButton onClick={() => {
                                                    setJobToEdit(jb)
                                                    setOpen(true)
                                                }}
                                                    className="!rounded-md"

                                                >
                                                    <Edit className='!text-green-500' fontSize='small' />
                                                </IconButton>
                                            </Stack>
                                        )
                                    }
                                </Stack>
                                <Typography component="div" className="!my-2 !text-[0.78rem] !font-semibold"><span className='!font-normal'>Look for : </span>{jb.contactPerson}</Typography>
                                <Stack className=" justify-center relative h-[5rem] overflow-hidden">
                                    <Stack className='!flex-row gap-8 '>
                                        <Typography className="!text-lg !font-bold capitalize">{jb.jobTitle}</Typography>
                                        <Work className='!text-white absolute right-0 top-0 !text-[2rem]' />
                                    </Stack>
                                    <Typography className="!text-sm line-clamp-3 capitalize w-3/4">{jb.jobDescription}</Typography>
                                </Stack>
                            </Stack>

                            <div className=" mt-4 grid grid-cols-1 gap-[5px]">
                                <Stack className="!text-center w-full">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] w-full inline-block px-2 py-1 rounded-lg border-[1px] bg-white group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>

                            </div>
                        </CardContent>
                        <Stack className="!flex-row items-center justify-between px-2 border-2">
                            <Stack className="mt-2">
                                <Typography className="!text-sm inline-block "> <span className="font-bold">{jb.wage}</span> per day</Typography>
                                <Typography color="text.secondary" className="!text-sm capitalize">{jb.location}</Typography>
                            </Stack>
                            <CardActions>
                                <Link to={`${jb.id}/details`}>
                                    <Button variant="contained" className="!bg-black hover:!bg-black/80" size="small">Details</Button>
                                </Link>
                            </CardActions>
                        </Stack>

                    </Card>
                ))}

            {open && <AddJob update={true} job={jobToEdit} onClose={() => setOpen(false)} />}

        </>
    )
}

export default JobCard