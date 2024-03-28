import { Stack, Typography } from "@mui/material";
import WritePost from "../components/Board/WritePost";
import Content from "../components/Board/Content";

const BulletinBoard = () => {
  return (
    <Stack className="!flex-row px-8">

      <Stack className="w-[650px] h-screen py-4 overflow-y-auto no-scrollbar  px-4">
        <WritePost />
        <Content />
      </Stack>


      <Stack className="px-2 py-4 border-l w-[300px] ">
        <div className="sticky top-0">

          <Typography>Top Forum</Typography>
        </div>
      </Stack>
    </Stack>
  )
}

export default BulletinBoard