/* eslint-disable react/prop-types */
import { LocationOn, Work } from "@mui/icons-material"
import { Button, Card, CardContent, Stack, Typography } from "@mui/material"
import React from "react"
import { NavLink, useNavigate } from "react-router-dom"

const JobListingRightAside = (props) => {
    const navigate = useNavigate()
    return (
        <React.Fragment>
            
            <Typography className="!text-md capitalize !font-bold">More jobs</Typography>

            <Stack className="gap-2">
                {
                    props.job.slice(0, 3).map((jb) => (
                        <Card key={jb.id} className=" !rounded-lg border-[1px] shadow-lg !border-gray-400 !w-[15rem] !h-28">
                            <CardContent className="!flex !flex-col !h-full rounded-lg justify-start !m-0 !p-1 ">
                                <Stack className="!flex-row items-center gap-2">
                                    <Work fontSize="large" />
                                    <Stack className="w-full">
                                        <Typography className="!text-sm !font-bold capitalize w-3/4">{jb.jobTitle}</Typography>
                                        <Typography className="!text-sm"> <LocationOn className="!text-md" /> {jb.location}</Typography>
                                    </Stack>
                                </Stack>

                                <div className="mt-2 grid grid-cols-1 mb-2 gap-[5px]">
                                    <Stack className="!text-center">
                                        <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block py-1 rounded-lg bg-gray-300 group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                    </Stack>
                                    {/* <Stack className="!text-center">
                                        <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block  rounded-lg bg-gray-300 group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                    </Stack>
                                    <Stack className="!text-center">
                                        <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block  rounded-lg bg-gray-300 group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                    </Stack> */}
                                </div>


                                <Stack className="!flex-row items-center justify-between  px-2">
                                    <Typography className="!text-sm inline-block "> <span className="font-bold">{jb.wage}</span> per day</Typography>
                                    {/* <Link to={`../${jb.id}/details`}> */}
                                        <Button onClick={() => {
                                            navigate(`/jobs/${jb.id}/details`)
                                            window.location.reload()
                                        }}
                                         variant="contained" className="!bg-black hover:!bg-black/80 !text-sm" size="small">Details</Button>
                                    {/* </Link> */}
                                </Stack>
                            </CardContent>


                        </Card>
                    ))
                }


                <Button component={NavLink} to={'/jobs'} className="!text-md">See more.....</Button>

            </Stack>
        </React.Fragment>
    )
}

export default JobListingRightAside