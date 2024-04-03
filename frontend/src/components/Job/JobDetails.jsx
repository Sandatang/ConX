import { AccountCircle, ArrowBack, LocationOn } from "@mui/icons-material"
import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material"
import JobListingRightAside from "./JobListingRightAside"
import EmergencyContacts from "../EmergencyContacts"
import BreadCrumb from "../BreadCrumb"

const JobDetails = () => {
    const back =
        <>
        <ArrowBack /> Back
        </>
    const breadCrumbUrl = [
        { url: '../', name: back },
        // { name: forumTitle.split("-").join(" ") }
    ]
    return (
        // <Stack className="py-8 px-10 no-scrollbar overflow-y-auto  !flex-row gap-2">
        //     <Stack>
        <Stack className=" h-full overflow-auto mx-4 pb-10 no-scrollbar overflow-y-auto !flex-row">
            {/* Empowering text and Picture Container*/}
            <Stack className="h-auto w-full pt-2">
                <Stack className="pb-4">
                    <Stack className="bg-pinkish px-4 py-2 mb-4 rounded-sm">
                        {/* <Typography className="!tracking-wider"> */}
                        <BreadCrumb data={breadCrumbUrl} classes="!text-[12px] tracking-wider !text-white font-bold " />
                        {/* </Typography> */}
                    </Stack>
                    <Stack>
                        <Typography>Job Title</Typography>
                        <Stack className="!flex-row gap-2">
                            <AccountCircle fontSize="large" />
                            <Stack>
                                <Stack className="!flex-row items-center justify-center gap-2">

                                    <Typography className="!text-blue-400 !font-semibold !text-md">Google</Typography>
                                    <Typography className="!text-md"> <LocationOn className="!text-md" /> Cebu City</Typography>

                                </Stack>
                                <Stack className="!flex-row items-center justify-center gap-2">
                                    <Typography className="!text-sm !text-slate-600">Fulltime </Typography>
                                    <Typography className="!text-sm !text-slate-600">Remote</Typography>
                                    <Typography className="!text-sm !text-slate-600">2-4 Years</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack className="my-2">
                    <Typography className="py-2 !font-semibold !text-md">About this role</Typography>
                    <Typography className="!text-md !text-slate-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                </Stack>

                <Stack className="my-2">
                    <Typography className="py-2 !font-semibold !text-md">Qualifications</Typography>
                    <Stack className="ml-4">

                        <List sx={{
                            width: '100%',
                            maxWidth: 360,
                            maxHeight: 300,
                            '& ul': {
                                padding: 0
                            },
                            listStyleType: 'disc'
                        }}>
                            <ListItem sx={{ display: 'list-item' }} className="!py-0" disableGutters>
                                <ListItemText className="!text-sm" >
                                    <Typography className="!text-md">  Lorem ipsum dolor sit amet, consectetur </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }} className="!py-0" disableGutters>
                                <ListItemText className="!text-sm" >
                                    <Typography className="!text-md">  Lorem ipsum dolor sit amet, consectetur </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }} className="!py-0" disableGutters>
                                <ListItemText className="!text-sm" >
                                    <Typography className="!text-md">  Lorem ipsum dolor sit amet, consectetur </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }} className="!py-0" disableGutters>
                                <ListItemText className="!text-sm" >
                                    <Typography className="!text-md">  Lorem ipsum dolor sit amet, consectetur </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Stack>
                </Stack>

                <Stack className="my-2">
                    <Typography className="py-2 !font-semibold !text-md">Responsibility</Typography>
                    <Stack className="ml-4">

                        <List sx={{
                            width: '100%',
                            maxWidth: 360,
                            maxHeight: 300,
                            '& ul': {
                                padding: 0
                            },
                            listStyleType: 'disc'
                        }}>
                            <ListItem sx={{ display: 'list-item' }} className="!py-0" disableGutters>
                                <ListItemText className="!text-sm" >
                                    <Typography className="!text-md">  Lorem ipsum dolor sit amet, consectetur </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }} className="!py-0" disableGutters>
                                <ListItemText className="!text-sm" >
                                    <Typography className="!text-md">  Lorem ipsum dolor sit amet, consectetur </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }} className="!py-0" disableGutters>
                                <ListItemText className="!text-sm" >
                                    <Typography className="!text-md">  Lorem ipsum dolor sit amet, consectetur </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem sx={{ display: 'list-item' }} className="!py-0" disableGutters>
                                <ListItemText className="!text-sm" >
                                    <Typography className="!text-md">  Lorem ipsum dolor sit amet, consectetur </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Stack>
                </Stack>
            </Stack>
            {/* <Stack className="h-screen">
                <JobListingRightAside />
            </Stack> */}
            <Stack className=" h-screen w-[400px] p-8 bg-white">
                <Stack className="border-l-2 h-[500px] w-[300px] px-4  fixed top-[5rem] right-0 ">
                    <Stack className="h-1/2 overflow-y-auto  border-b-2">
                        <JobListingRightAside />
                    </Stack>
                    <Stack className="h-1/2 overflow-y-auto">
                        <EmergencyContacts />
                    </Stack>

                </Stack>
            </Stack>
        </Stack>
    )
}

export default JobDetails