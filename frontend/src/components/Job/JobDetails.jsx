import { AccountCircle, LocationOn } from "@mui/icons-material"
import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material"
import JobListingRightAside from "./JobListingRightAside"

const JobDetails = () => {
    return (
        <Stack className="py-8 px-10 no-scrollbar overflow-y-auto  !flex-row gap-2">
            <Stack>
                <Stack className="pb-4">
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

            <JobListingRightAside/>
        </Stack>
    )
}

export default JobDetails