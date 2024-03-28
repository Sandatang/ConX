import { AccountCircle, Comment, Favorite } from "@mui/icons-material"
import { Button, Stack, Typography } from "@mui/material"
import sample from "../../assets/sample3.png"

const Content = () => {
    return (
        <>
            <Stack>
                <Stack className="!flex-row items-center">
                    <AccountCircle className="!text-[3rem]" />
                    <Stack>
                        <Typography className="!text-md">Bgry user name</Typography>
                        <Typography className="!text-large !font-semibold !text-slate-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                    </Stack>
                </Stack>
                <Stack>
                    <img src={sample} className="object-cover rounded-xl h-80 w-full" />
                </Stack>
                <Stack className="my-2 !flex-row justify-evenly ">
                    <Button className="gap-2 items-center !text-slate-600 !text-sm cursor-pointer">
                        <Favorite className="cursor-pointer"/>
                        Heart
                    </Button>
                    <Button className="gap-2  !text-slate-600 !text-sm items-center cursor-pointer">
                        <Comment className="cursor-pointer"/>
                        Comment
                    </Button>
                </Stack>
            </Stack>
            <Stack>
                <Stack className="!flex-row items-center">
                    <AccountCircle className="!text-[3rem]" />
                    <Stack>
                        <Typography className="!text-md">Bgry user name</Typography>
                        <Typography className="!text-large !font-semibold !text-slate-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                    </Stack>
                </Stack>
                <Stack>
                    <img src={sample} className="object-cover rounded-xl h-80 w-full" />
                </Stack>
                <Stack className="my-2 !flex-row justify-evenly ">
                    <Button className="gap-2 items-center !text-slate-600 !text-sm cursor-pointer">
                        <Favorite className="cursor-pointer"/>
                        Heart
                    </Button>
                    <Button className="gap-2  !text-slate-600 !text-sm items-center cursor-pointer">
                        <Comment className="cursor-pointer"/>
                        Comment
                    </Button>
                </Stack>
            </Stack>
            <Stack>
                <Stack className="!flex-row items-center">
                    <AccountCircle className="!text-[3rem]" />
                    <Stack>
                        <Typography className="!text-md">Bgry user name</Typography>
                        <Typography className="!text-large !font-semibold !text-slate-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                    </Stack>
                </Stack>
                <Stack>
                    <img src={sample} className="object-cover rounded-xl h-80 w-full" />
                </Stack>
                <Stack className="my-2 !flex-row justify-evenly ">
                    <Button className="gap-2 items-center !text-slate-600 !text-sm cursor-pointer">
                        <Favorite className="cursor-pointer"/>
                        Heart
                    </Button>
                    <Button className="gap-2  !text-slate-600 !text-sm items-center cursor-pointer">
                        <Comment className="cursor-pointer"/>
                        Comment
                    </Button>
                </Stack>
            </Stack>
            <Stack>
                <Stack className="!flex-row items-center">
                    <AccountCircle className="!text-[3rem]" />
                    <Stack>
                        <Typography className="!text-md">Bgry user name</Typography>
                        <Typography className="!text-large !font-semibold !text-slate-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                    </Stack>
                </Stack>
                <Stack>
                    <img src={sample} className="object-cover rounded-xl h-80 w-full" />
                </Stack>
                <Stack className="my-2 !flex-row justify-evenly ">
                    <Button className="gap-2 items-center !text-slate-600 !text-sm cursor-pointer">
                        <Favorite className="cursor-pointer"/>
                        Heart
                    </Button>
                    <Button className="gap-2  !text-slate-600 !text-sm items-center cursor-pointer">
                        <Comment className="cursor-pointer"/>
                        Comment
                    </Button>
                </Stack>
            </Stack>
            <Stack>
                <Stack className="!flex-row items-center">
                    <AccountCircle className="!text-[3rem]" />
                    <Stack>
                        <Typography className="!text-md">Bgry user name</Typography>
                        <Typography className="!text-large !font-semibold !text-slate-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                    </Stack>
                </Stack>
                <Stack>
                    <img src={sample} className="object-cover rounded-xl h-80 w-full" />
                </Stack>
                <Stack className="my-2 !flex-row justify-evenly ">
                    <Button className="gap-2 items-center !text-slate-600 !text-sm cursor-pointer">
                        <Favorite className="cursor-pointer"/>
                        Heart
                    </Button>
                    <Button className="gap-2  !text-slate-600 !text-sm items-center cursor-pointer">
                        <Comment className="cursor-pointer"/>
                        Comment
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}

export default Content