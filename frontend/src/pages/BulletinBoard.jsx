import { Add } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import Content from "../components/Board/Content";
import WritePost from "../components/Board/WritePost";
import OfficialsHotline from "../components/Contacts/OfficialsHotline";
import TopForum from "../components/Forum/TopForum";

const BulletinBoard = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [toPost, setToPost] = useState(false);
  const writePostRef = useRef(null);

  const handleScroll = () => {
    if (writePostRef.current) {
      const { scrollTop } = writePostRef.current;
      setIsScrolled(scrollTop > 0);
      setToPost(false)
    }
  };

  const handlePostClick = () => {
    setToPost(true);
  };


  return (
    <Stack className="!flex-row mx-16 relative" onClick={() => {
      toPost && setToPost(false)
    }}>
      <Stack
        ref={writePostRef}
        className="w-full h-screen py-4 overflow-y-auto no-scrollbar px-4"
        onScroll={handleScroll}
      >
        <WritePost
          classes={`${toPost ? "!block absolute" : "hidden"
            }`}
        />
        {!toPost && (
          <div className="w-full flex justify-end cursor-pointer group" onClick={handlePostClick}>
            <IconButton
              className={`!fixed top-24 group-hover:!rounded-md !bg-blue-500 ${toPost && isScrolled ? "" : "hidden !text-md"
                }`}
            >
              <span className="text-white font-bold uppercase ">
                <Add className="group-hover:!text-md" /> <span className="hidden group-hover:inline-block">Postings</span>
              </span>
            </IconButton>
          </div>
        )}
        <Content />
      </Stack>

      <Stack className=" h-screen w-[320px] bg-white">
        <Stack className="border-l-2 h-dvh w-[250px] fixed top-[5rem] right-0 ">
          <Stack className="h-1/2 pt-5 overflow-y-auto border-b-2">
            <TopForum />
          </Stack>
          <Stack className="h-1/2 overflow-y-auto">
            <Stack className="px-4">
              <Stack className="!flex-row items-center">
                <Typography className="!text-[18px] pb-2 !font-semibold">Official Hotlines</Typography>
                {
                  localStorage.getItem('role') === 'Personnel' &&
                  <Button><Add /> hotline</Button>
                }
              </Stack>
              <OfficialsHotline />
            </Stack>
          </Stack>

        </Stack>
      </Stack>
    </Stack>
  );
};

export default BulletinBoard;
