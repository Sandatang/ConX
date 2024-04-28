import { Add, PostAdd } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Content from "../components/Board/Content";
import WritePost from "../components/Board/WritePost";
import OfficialsHotline from "../components/Contacts/OfficialsHotline";
import TopForum from "../components/Forum/TopForum";
import * as BulletinApi from "../network/bulletin_api"
import AddHotline from "../components/Contacts/AddHotline";


const BulletinBoard = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [toPost, setToPost] = useState(false);
  const [open, setOpen] = useState(false)
  const writePostRef = useRef(null);
  const [loading, setLoading] = useState(true)
  const [bulletins, setBulletins] = useState(null)
  const [pollingInterval, setPollingInterval] = useState(5000); // Initial polling interval



  useEffect(() => {
    const getBulletinPost = async () => {
      try {
        const response = await BulletinApi.viewAllBUlletinPost()
        setBulletins(response)

      } catch (error) {
        console.error(error)
        setPollingInterval(interval => Math.min(interval * 2, 60000)); // Exponential backoff with max interval of 1 minute

      } finally {
        setTimeout(() => {

          setLoading(false)
        }, 500)
      }
    }
    const intervalId = setInterval(getBulletinPost, pollingInterval);
    return () => clearInterval(intervalId);
  }, [pollingInterval])

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
    <Stack className="!flex-row relative">
      <Stack
        ref={writePostRef}
        className="w-full h-screen py-10 overflow-y-auto no-scrollbar px-4"
        onScroll={handleScroll}
      >
        {
          loading ? (
            <Stack className="animate-pulse gap-6 mx-16">
              <div className="bg-gray-300/50 h-[300px] round-2xl"></div>
              <div className="bg-gray-300/50 h-[300px] round-2xl"></div>
              <div className="bg-gray-300/50 h-[300px] round-2xl"></div>
            </Stack>
          ) : (
            <>
              {
                localStorage.getItem('role') !== "Women" &&
                <WritePost toPostFalse={() => setToPost(false)} classes={`${toPost ? "!block absolute " : "hidden"}`} />
              }
              {localStorage.getItem('role') !== "Women" && !toPost && (
                <div className="w-full flex justify-end cursor-pointer group" onClick={handlePostClick}>
                  <IconButton
                    className={`!fixed top-24 z-50 group-hover:!rounded-md opacity-40 group-hover:opacity-100 !bg-blue-500 ${toPost && isScrolled ? "" : "hidden !text-md"}`}
                  >
                    <span className="text-white font-bold uppercase ">
                      <PostAdd className="group-hover:!text-lg" /> <span className="hidden group-hover:inline-block">Postings</span>
                    </span>
                  </IconButton>
                </div>

              )}
              <Stack className="relative mx-16">
                <Content bulletins={bulletins} />
              </Stack>

            </>
          )}

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
                  <Button onClick={() => setOpen(true)}><Add /> hotline</Button>
                }
              </Stack>
              <OfficialsHotline />
            </Stack>
          </Stack>

        </Stack>
      </Stack>
      {open && <AddHotline onClose={() => setOpen(false)} />}

    </Stack>
  );
};

export default BulletinBoard;
