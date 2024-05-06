import { Delete, Edit } from "@mui/icons-material"
import { Alert, IconButton, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import * as HotlineApi from "../../network/hotline_api"
import AddHotline from "./AddHotline"


const OfficialsHotline = () => {

  const [openUpdate, setOpenUpdate] = useState(false)
  const [hotlines, setHotlines] = useState(null)
  const [hotlineToUpdate, setHotlineToUpdate] = useState(null)
  const [pollingInterval, setPollingInterval] = useState(5000); // Initial polling interval


  useEffect(() => {
    const getAllHotline = async () => {
      try {

        const response = await HotlineApi.viewHotlines()
        setHotlines(response)
      } catch (error) {
        console.error(error)
        setPollingInterval(interval => Math.min(interval * 2, 60000)); // Exponential backoff with max interval of 1 minute
      }
    }
    const intervalId = setInterval(getAllHotline, pollingInterval);
    return () => clearInterval(intervalId);
  }, [pollingInterval])

  const deleteHotline = async (id) => {
    await HotlineApi.deleteHotline(id);
  }
  return (
    <Stack className={`!text-md h-[300px] ${localStorage.getItem('role') !== "Women" && 'gap-6'} !p-0 !m-0`}>
      {

        hotlines ? hotlines.map(hs => (
          <div key={hs.hotlineId}>

            <Stack className="!flex-row items-center justify-between">
              <span className=" capitalize">{hs.name}</span>
              <Stack className=" items-end relative">
                <span className="font-bold underline underline-offset-2 flex gap-2 items  -center">
                  {hs.hotline}
                  <Stack className="absolute top-[-20px] right-0 !flex-row">

                    {
                      localStorage.getItem('role') === 'Personnel' &&
                      <>
                        <IconButton onClick={() => {
                          deleteHotline(hs.hotlineId)
                        }}
                        >
                          <Delete className="!text-md hover:!text-red-400" /></IconButton>
                        <IconButton
                          onClick={() => {
                            setHotlineToUpdate(hs)
                            setOpenUpdate(true)
                          }}
                        >
                          <Edit className="!text-md hover:!text-green-400" />
                        </IconButton>
                      </>
                    }
                  </Stack>
                </span>
              </Stack>
            </Stack>

          </div>
        )) : (
          <Alert severity="info">No data yet</Alert>
        )
      }

      {openUpdate && <AddHotline update={true} onClose={() => setOpenUpdate(false)} hotline={hotlineToUpdate} />}
    </Stack>

  )
}

export default OfficialsHotline