import { AccountCircle, LocationOn } from "@mui/icons-material"
import { Button, Card, CardContent, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import EmergencyContacts from "../EmergencyContacts"

const JobListingRightAside = () => {
    return (
        <Stack className="border-l-2 w-[300px]  border-2 px-4 mx-4 sticky top-0">

            {/* <Stack className="px-2 sticky top-0"> */}
            <Stack className="h-1/2 border-b-2 overflo">

                <Typography className="!text-md capitalize !font-bold">More jobs</Typography>

                <Stack className="gap-2">
                    <Card className=" !rounded-lg border-[1px] shadow-lg !border-gray-400 !w-[17rem] !h-28">
                        <CardContent className="!flex !flex-col !h-full rounded-lg justify-start !m-0 !p-1 ">
                            <Stack className="!flex-row items-center gap-2">
                                <AccountCircle fontSize="large" />
                                <Stack className="w-full">
                                    <Typography className="!text-sm !font-bold capitalize w-3/4">Hospital janitor</Typography>
                                    <Typography className="!text-sm"> <LocationOn className="!text-md" /> Cebu City</Typography>
                                </Stack>
                            </Stack>

                            <div className="mt-2 grid grid-cols-2 gap-[5px]">
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block  rounded-lg bg-gray-300 group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block  rounded-lg bg-gray-300 group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block  rounded-lg bg-gray-300 group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                            </div>


                            <Stack className="!flex-row items-center justify-between  px-2">
                                <Typography className="!text-sm inline-block "> <span className="font-bold">Php 15,000</span> / monthly</Typography>
                                <Link to={`1/details`}>
                                    <Button variant="contained" className="!bg-black hover:!bg-black/80 !text-sm" size="small">Details</Button>
                                </Link>
                            </Stack>
                        </CardContent>


                    </Card>

                    <Card className=" !rounded-lg border-[1px] shadow-lg !border-gray-400 !w-[17rem] !h-28">
                        <CardContent className="!flex !flex-col !h-full rounded-lg justify-start !m-0 !p-1 ">
                            <Stack className="!flex-row items-center gap-2">
                                <AccountCircle fontSize="large" />
                                <Stack className="w-full">
                                    <Typography className="!text-sm !font-bold capitalize w-3/4">Hospital janitor</Typography>
                                    <Typography className="!text-sm"> <LocationOn className="!text-md" /> Cebu City</Typography>
                                </Stack>
                            </Stack>

                            <div className="mt-2 grid grid-cols-2 gap-[5px]">
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block  rounded-lg bg-gray-300 group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block  rounded-lg bg-gray-300 group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block  rounded-lg bg-gray-300 group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                            </div>


                            <Stack className="!flex-row items-center justify-between  px-2">
                                <Typography className="!text-sm inline-block "> <span className="font-bold">Php 15,000</span> / monthly</Typography>
                                <Link to={`1/details`}>
                                    <Button variant="contained" className="!bg-black hover:!bg-black/80 !text-sm" size="small">Details</Button>
                                </Link>
                            </Stack>
                        </CardContent>


                    </Card>

                    {/* <Card className=" !rounded-lg border-[1px] shadow-lg !border-gray-400 !w-[18rem] !h-32">
                        <CardContent className="!flex !flex-col !h-full rounded-lg justify-start">
                            <Stack className="!flex-row items-center gap-2">
                                <AccountCircle fontSize="large" />
                                <Stack className="w-full">
                                    <Typography className="!text-sm !font-bold capitalize w-3/4">Hospital janitor</Typography>
                                    <Typography className="!text-sm"> <LocationOn className="!text-md" /> Cebu City</Typography>
                                </Stack>
                            </Stack>

                            <div className="mt-2 grid grid-cols-2 gap-[5px]">
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block  rounded-lg bg-gray-300 group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block  rounded-lg bg-gray-300 group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block  rounded-lg bg-gray-300 group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                            </div>


                            <Stack className="!flex-row items-center justify-between  px-2">
                                <Typography className="!text-sm inline-block "> <span className="font-bold">Php 15,000</span> / monthly</Typography>
                                <Link to={`1/details`}>
                                    <Button variant="contained" className="!bg-black hover:!bg-black/80 !text-sm" size="small">Details</Button>
                                </Link>
                            </Stack>
                        </CardContent>


                    </Card> */}

                    <Button className="!text-md">See more.....</Button>

                </Stack>
            </Stack>

            <Stack>
                <EmergencyContacts />
            </Stack>
        </Stack>
    )
}

export default JobListingRightAside