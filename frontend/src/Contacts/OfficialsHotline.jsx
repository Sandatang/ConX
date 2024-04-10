import { CopyAll, Edit } from "@mui/icons-material"
import { IconButton, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import * as HotlineApi from "../network/hotline_api"
import AddHotline from "./AddHotline"


const OfficialsHotline = () => {

  const [openUpdate, setOpenUpdate] = useState(false)
  const [hotlines, setHotlines] = useState(null)
  const [hotlineToUpdate, setHotlineToUpdate] = useState(null)

  useEffect(() => {
    const getAllHotline = async () => {
      const response = await HotlineApi.viewHotlines()
      setHotlines(response)
    }

    getAllHotline()
  }, [])

  return (
    <Stack className="!text-md !p-0 !m-0">
      {

        hotlines && hotlines.map(hs => (
          <div key={hs.hotlineId}>

            <Stack className="!flex-row items-center justify-between">
              <span className=" capitalize">{hs.name}</span>
              <Stack className=" items-end ">
                <span className="font-bold underline underline-offset-2 flex gap-2 items-center">
                  {hs.hotline}
                  <IconButton><CopyAll fontSize="small" /></IconButton>
                  {
                    localStorage.getItem('role') === 'Personnel' &&
                    <IconButton
                      onClick={() => {
                        setHotlineToUpdate(hs)
                        setOpenUpdate(true)
                      }}
                    ><Edit className="!text-green-500" fontSize="small" /></IconButton>
                  }
                </span>
              </Stack>
            </Stack>

          </div>
        ))
      }

      {openUpdate && <AddHotline update={true} onClose={() => setOpenUpdate(false)} hotline={hotlineToUpdate} />}
    </Stack>

  )
}

export default OfficialsHotline