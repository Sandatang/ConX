import { Videocam } from "@mui/icons-material";
import { Alert, CircularProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as WorkshopApi from "../../network/workshop_api"
import ShopActionDropDown from "./ShopActionDropDown";
import ModalAddWorkshop from "./ModalAddWorkshop";

const CategoryContainer = () => {
    const [workshop, setWorkshop] = useState(null)
    const [cat, setCat] = useState(null)
    const [loading, setLoading] = useState(true)
    const [updateShop, setUpdateShop] = useState(false)
    const [shopToUpdate, setShopToUpdate] = useState(null)
    const { categoryId, categoryTitle, } = useParams()
    const [pollingInterval, setPollingInterval] = useState(5000); // Initial polling interval


    useEffect(() => {
        const viewAll = async () => {
            try {
                const response = await WorkshopApi.getWorkshops(categoryId);
                const responseCat = await WorkshopApi.getAllCategory();
                setWorkshop(response)
                setCat(responseCat)
                setLoading(false)
                console.log(response)
            } catch (error) {
                console.error(error)
                setPollingInterval(interval => Math.min(interval * 2, 60000)); // Exponential backoff with max interval of 1 minute

            }
        }
        const intervalId = setInterval(viewAll, pollingInterval);
        return () => clearInterval(intervalId);
    }, [pollingInterval, categoryTitle, categoryId])
    return (
        <>

            {!loading ? (workshop && workshop.length > 0 ? workshop.map((w, index) => (
                <Stack key={index} className="md:mx-16 bg-slate-200 pl-8 py-2 rounded-md">

                    <Stack className="!flex-row justify-between border-b-[1px]">
                        <Stack className="!flex-row gap-10 border-b-[1px]">
                            <Stack >
                                <Videocam className="!text-[50px] !text-slate-600" />
                            </Stack>
                            <Stack>

                                <Link to={`/workshop/${categoryTitle}/${categoryId}/${w.workshopTitle.toLowerCase().replace(/ /g, "-")}/${w.workshopId}`}
                                    className="!text-[16px] text-slate-800 hover:!text-slate-600 hover:underline underline-offset-2 !justify-start !font-semibold capitalize"
                                >
                                    {w.workshopTitle}
                                </Link>

                                <Typography variant="body2" className="!text-slate-600">{w.description}</Typography>

                            </Stack>
                        </Stack>
                        <Stack className="relative">
                            {
                                localStorage.getItem('role') !== "Women" &&
                                <ShopActionDropDown toDelete={w.workshopId} setUpdatePost={() => setUpdateShop(true)} setPostToUpdate={() => setShopToUpdate(w)} />
                            }
                        </Stack>
                    </Stack>
                </Stack >
            )) : (
                <Alert severity="info">No workshop yet stay tuned</Alert>
            )) : (
                <Stack className="justify-center items-center">

                    <CircularProgress />
                </Stack>
            )

            }

            {updateShop && <ModalAddWorkshop onClose={() => setUpdateShop(false)} shop={shopToUpdate} category={cat} />}

        </>
    )
}

export default CategoryContainer