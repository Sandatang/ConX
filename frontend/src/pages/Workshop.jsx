import { Alert, Button, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { NavLink, Outlet, useLocation } from "react-router-dom"
import ModalAddWorkshop from "../components/Workshop/ModalAddWorkshop"
// import { category } from "../constants"
import conxlogo from "../assets/secondlogo.png"
import AddCategory from "../components/Workshop/AddCategory"
import * as WorkshopApi from "../network/workshop_api"
import ModalDeleteCategory from "../components/Workshop/ModalDeleteCategory"

const Workshop = () => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(null);
    const [addCategory, setAddCategory] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState(false);
    const [message, setMessage] = useState(null);
    const [pollingInterval, setPollingInterval] = useState(5000); // Initial polling interval
    let location = useLocation();

    useEffect(() => {
        const viewAllCategory = async () => {
            try {
                const response = await WorkshopApi.getAllCategory();
                if (response.status === "Success") {
                    setMessage(response.message)
                }
                setCategory(response)
            } catch (error) {
                console.error(error)
                setPollingInterval(interval => Math.min(interval * 2, 60000)); // Exponential backoff with max interval of 1 minute

            }
        }
        const intervalId = setInterval(viewAllCategory, pollingInterval);
        return () => clearInterval(intervalId);
    }, [pollingInterval])

    return (
        <Stack className=" overflow-y-auto no-scrollbar">

            {
                localStorage.getItem("role") !== "Women" &&
                <Stack className="!flex-row py-4 pr-4 justify-end gap-2">
                    <Button
                        onClick={() => {
                            setAddCategory(true)
                        }}
                        variant="contained">Add Category
                    </Button>
                    <Button
                        onClick={() => {
                            setOpen(true)
                        }}
                        variant="contained">Create workshop
                    </Button>
                </Stack>
            }
            <Stack className="!flex-row justify-between border-[1px] py-2 px-4 w-full bg-white">
                <Stack className="!flex-row gap-20 ">
                    <Stack className="!flex-row gap-20 overflow-x-auto">

                        {category && category.length > 0 ? category.map((ct, index) => (
                            <Button
                                key={index}
                                component={NavLink} // Pass NavLink directly here
                                to={`${ct.categoryName}/${ct.id}`}
                                variant="text"
                                sx={{
                                    '&.active': {
                                        background: '#EB80D9',
                                        color: '#fff',

                                    },
                                    color: 'rgb(148 163 184 )',
                                }}
                                className=" relative !text-[11px] !font-semibold !capitalize"
                            >
                                <span className=" !text-[11px] !font-semibold !capitalize">{ct.categoryName}</span>
                            </Button>
                        )) : (
                            <Alert severity="info">{message}</Alert>
                        )}

                    </Stack>
                    {category && category.length > 0 && <Button onClick={() => setDeleteCategory(true)} className="!text-[0.4rem] !text-red-500">delete category</Button>}
                </Stack>
            </Stack>
            <Stack className="my-10 gap-4 px-16 ">
                {location.pathname === "/workshop" ? (
                    <Stack className="items-center gap-6">
                        <Typography variant="h4">Welcome to Our Empowerment Workshop!</Typography>
                        <Typography variant="body1">Explore our collection of empowerment videos to learn and grow.</Typography>
                        <img src={conxlogo} alt="logo" className="w-[60%] aspect-video" />

                    </Stack>
                ) : (
                    <Outlet />
                )}
            </Stack>

            {open && <ModalAddWorkshop category={category} onClose={() => setOpen(false)} />}
            {addCategory && <AddCategory onClose={() => setAddCategory(false)} />}
            {deleteCategory && <ModalDeleteCategory category={category} onClose={() => setDeleteCategory(false)} />}
        </Stack>
    )
}

export default Workshop