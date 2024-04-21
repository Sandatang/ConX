import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as WorkshopApi from "../../network/workshop_api";

const SelfDefense = () => {
    const [category, setCategory] = useState(null)

    useEffect(() => {
        const viewAll = async () => {
            try {
                const response = await WorkshopApi.getWorkshops('2');
                setCategory(response)
                console.log(response)
            } catch (error) {
                console.error(error)
            }
        }
        viewAll()
    }, [])
    return (
        <>
            {
                category && category.map((c) => (
                    <Stack key={c.workshopId} className="!flex-row gap-10 border-b-[1px] pb-8">
                        <Stack >
                            <FaLeaf className="!text-[50px] !text-slate-600" />
                        </Stack>
                        <Stack>

                            <Link to={`/workshop/self-defense/${c.workshopTitle.toLowerCase().replace(/ /g, "-")}/${c.workshopId}`}
                                className="!text-[16px] text-slate-800 hover:!text-slate-600 hover:underline underline-offset-2 !justify-start !font-semibold"
                            >
                                {c.workshopTitle}
                            </Link>

                            <Typography variant="body2" className="!text-slate-600">{c.description}</Typography>

                        </Stack>
                    </Stack>
                ))
            }
        </>
    )
}

export default SelfDefense