import { Avatar, Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const JobLisintgs = () => {
    return (
        <Stack className="overflow-auto px-8 py-4">
            <Stack className="!flex-row gap-3 items-center mb-2">
                <Typography className="!text-2xl !font-semibold tracking-wider ! capitalize" >Jobs available</Typography>
                <Typography className="!text-md bg-gray-100/70 px-6 py-2 rounded-full shadow-sm !font-medium">121</Typography>
            </Stack>

            <Stack className="w-full">
                <div className=" mt-4 grid grid-cols-3 gap-y-8">
                    <Card className=" !rounded-lg border-[1px] shadow-sm !border-gray-400 !w-[17rem] p-2 hover:transform hover:scale-105 transition-transform ease-in-out duration-300">
                        <CardContent className="!flex !flex-col justify-between !h-56 !bg-yellow-500/60 rounded-lg">
                            <Stack >
                                <Typography className="!text-sm bg-white p-2 rounded-xl inline-block ">December 19, 2024</Typography>
                                <Typography component="div" className="!my-2 !text-sm !font-semibold">General Hospital</Typography>
                                <Stack className="!flex-row gap-8 justify-start items-center h-12">
                                    <Typography className="!text-lg !font-bold capitalize w-3/4">Hospital janitor</Typography>
                                    <Avatar />
                                </Stack>
                            </Stack>

                            <div className=" mt-4 grid grid-cols-2 gap-[5px]">
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                            </div>
                        </CardContent>
                        <Stack className="!flex-row items-center justify-between px-2 border-2">
                            <Stack className="mt-2">
                                <Typography className="!text-sm inline-block "> <span className="font-bold">Php 15,000</span> / monthly</Typography>
                                <Typography color="text.secondary" className="!text-sm">Metro cebu</Typography>
                            </Stack>
                            <CardActions>
                                <Link to={`1/details`}>
                                    <Button variant="contained" className="!bg-black hover:!bg-black/80" size="small">Details</Button>
                                </Link>
                            </CardActions>
                        </Stack>

                    </Card>

                    <Card className=" cursor-pointer !rounded-lg border-[1px] shadow-sm !border-gray-400 !w-[17rem] p-2 hover:transform hover:scale-105 transition-transform ease-in-out duration-300">
                        <CardContent className="!flex !flex-col justify-between !h-56 !bg-yellow-500/60 rounded-lg">
                            <Stack >
                                <Typography className="!text-sm bg-white p-2 rounded-xl inline-block ">December 19, 2024</Typography>
                                <Typography component="div" className="!my-2 !text-sm !font-semibold">General Hospital</Typography>
                                <Stack className="!flex-row gap-8 justify-start items-center h-12">
                                    <Typography className="!text-lg !font-bold capitalize w-3/4">Hospital janitor</Typography>
                                    <Avatar />
                                </Stack>
                            </Stack>

                            <div className=" mt-4 grid grid-cols-2 gap-[5px]">
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                            </div>
                        </CardContent>
                        <Stack className="!flex-row items-center px-2 gap-4">
                            <Stack className="mt-2">
                                <Typography className="!text-sm inline-block "> <span className="font-bold">Php 15,000</span> / monthly</Typography>
                                <Typography color="text.secondary" className="!text-sm">Metro cebu</Typography>
                            </Stack>
                            <CardActions>
                                <Button variant="contained" className="!bg-black" size="small">Details</Button>
                            </CardActions>
                        </Stack>

                    </Card>

                    <Card className=" cursor-pointer !rounded-lg border-[1px] shadow-sm !border-gray-400 !w-[17rem] p-2 hover:transform hover:scale-105 transition-transform ease-in-out duration-300">
                        <CardContent className="!flex !flex-col justify-between !h-56 !bg-yellow-500/60 rounded-lg">
                            <Stack >
                                <Typography className="!text-sm bg-white p-2 rounded-xl inline-block ">December 19, 2024</Typography>
                                <Typography component="div" className="!my-2 !text-sm !font-semibold">General Hospital</Typography>
                                <Stack className="!flex-row gap-8 justify-start items-center h-12">
                                    <Typography className="!text-lg !font-bold capitalize w-3/4">Hospital janitor</Typography>
                                    <Avatar />
                                </Stack>
                            </Stack>

                            <div className=" mt-4 grid grid-cols-2 gap-[5px]">
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                            </div>
                        </CardContent>
                        <Stack className="!flex-row items-center px-2 gap-4">
                            <Stack className="mt-2">
                                <Typography className="!text-sm inline-block "> <span className="font-bold">Php 15,000</span> / monthly</Typography>
                                <Typography color="text.secondary" className="!text-sm">Metro cebu</Typography>
                            </Stack>
                            <CardActions>
                                <Button variant="contained" className="!bg-black" size="small">Details</Button>
                            </CardActions>
                        </Stack>

                    </Card>

                    <Card className=" cursor-pointer !rounded-lg border-[1px] shadow-sm !border-gray-400 !w-[17rem] p-2 hover:transform hover:scale-105 transition-transform ease-in-out duration-300">
                        <CardContent className="!flex !flex-col justify-between !h-56 !bg-yellow-500/60 rounded-lg">
                            <Stack >
                                <Typography className="!text-sm bg-white p-2 rounded-xl inline-block ">December 19, 2024</Typography>
                                <Typography component="div" className="!my-2 !text-sm !font-semibold">General Hospital</Typography>
                                <Stack className="!flex-row gap-8 justify-start items-center h-12">
                                    <Typography className="!text-lg !font-bold capitalize w-3/4">Hospital janitor</Typography>
                                    <Avatar />
                                </Stack>
                            </Stack>

                            <div className=" mt-4 grid grid-cols-2 gap-[5px]">
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                            </div>
                        </CardContent>
                        <Stack className="!flex-row items-center px-2 gap-4">
                            <Stack className="mt-2">
                                <Typography className="!text-sm inline-block "> <span className="font-bold">Php 15,000</span> / monthly</Typography>
                                <Typography color="text.secondary" className="!text-sm">Metro cebu</Typography>
                            </Stack>
                            <CardActions>
                                <Button variant="contained" className="!bg-black" size="small">Details</Button>
                            </CardActions>
                        </Stack>

                    </Card>

                    <Card className=" cursor-pointer !rounded-lg border-[1px] shadow-sm !border-gray-400 !w-[17rem] p-2 hover:transform hover:scale-105 transition-transform ease-in-out duration-300">
                        <CardContent className="!flex !flex-col justify-between !h-56 !bg-yellow-500/60 rounded-lg">
                            <Stack >
                                <Typography className="!text-sm bg-white p-2 rounded-xl inline-block ">December 19, 2024</Typography>
                                <Typography component="div" className="!my-2 !text-sm !font-semibold">General Hospital</Typography>
                                <Stack className="!flex-row gap-8 justify-start items-center h-12">
                                    <Typography className="!text-lg !font-bold capitalize w-3/4">Hospital janitor</Typography>
                                    <Avatar />
                                </Stack>
                            </Stack>

                            <div className=" mt-4 grid grid-cols-2 gap-[5px]">
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                            </div>
                        </CardContent>
                        <Stack className="!flex-row items-center px-2 gap-4">
                            <Stack className="mt-2">
                                <Typography className="!text-sm inline-block "> <span className="font-bold">Php 15,000</span> / monthly</Typography>
                                <Typography color="text.secondary" className="!text-sm">Metro cebu</Typography>
                            </Stack>
                            <CardActions>
                                <Button variant="contained" className="!bg-black" size="small">Details</Button>
                            </CardActions>
                        </Stack>

                    </Card>

                    <Card className=" cursor-pointer !rounded-lg border-[1px] shadow-sm !border-gray-400 !w-[17rem] p-2 hover:transform hover:scale-105 transition-transform ease-in-out duration-300">
                        <CardContent className="!flex !flex-col justify-between !h-56 !bg-yellow-500/60 rounded-lg">
                            <Stack >
                                <Typography className="!text-sm bg-white p-2 rounded-xl inline-block ">December 19, 2024</Typography>
                                <Typography component="div" className="!my-2 !text-sm !font-semibold">General Hospital</Typography>
                                <Stack className="!flex-row gap-8 justify-start items-center h-12">
                                    <Typography className="!text-lg !font-bold capitalize w-3/4">Hospital janitor</Typography>
                                    <Avatar />
                                </Stack>
                            </Stack>

                            <div className=" mt-4 grid grid-cols-2 gap-[5px]">
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                                <Stack className="!text-center">
                                    <Typography variant="body1" component="span" className="!text-[0.545rem] inline-block px-2 py-1 rounded-lg border-[1px] border-black group overflow-x-hidden cursor-pointer">Partime/Fulltime</Typography>
                                </Stack>
                            </div>
                        </CardContent>
                        <Stack className="!flex-row items-center px-2 gap-4">
                            <Stack className="mt-2">
                                <Typography className="!text-sm inline-block "> <span className="font-bold">Php 15,000</span> / monthly</Typography>
                                <Typography color="text.secondary" className="!text-sm">Metro cebu</Typography>
                            </Stack>
                            <CardActions>
                                <Button variant="contained" className="!bg-black" size="small">Details</Button>
                            </CardActions>
                        </Stack>

                    </Card>










                </div>
            </Stack>
        </Stack>
    )
}

export default JobLisintgs