import { Stack } from "@mui/material";
import Content from "../components/Board/Content";
import WritePost from "../components/Board/WritePost";
import EmergencyContacts from "../components/EmergencyContacts";
import TopForum from "../components/Forum/TopForum";

const BulletinBoard = () => {
  return (
    <Stack className="!flex-row mx-4">

      <Stack className="w-[650px] h-screen py-4 overflow-y-auto no-scrollbar  px-4">
        <WritePost />
        <Content />
      </Stack>


      {/* <Stack className="px-2 py-4 border-l w-[300px] ">
        <div className="sticky top-0">

        </div>
      </Stack> */}
      <Stack className="border-l-2 w-[300px] px-4 mx-4 sticky top-0">
        <Stack className="h-1/2 border-b-2">
          <TopForum />
        </Stack>
        <Stack>
          <EmergencyContacts />
        </Stack>

      </Stack>
    </Stack>
  )
}

export default BulletinBoard