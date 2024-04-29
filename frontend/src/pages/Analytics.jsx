import { Stack } from "@mui/material"
import { useEffect, useState } from "react"
import BarChartUI from "../components/Analytics/BarChart"
import * as TestimonyApi from "../network/testimony_api"

const Analytics = () => {
    const [testimonies, setTestimonies] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAllTestimonies = async () => {
            try {
                const response = await TestimonyApi.getAllTestimony()
                setTestimonies(response)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        getAllTestimonies()
    }, [])
    return (
        <Stack className=" h-screen overflow-y-auto no-scrollbar my-8">
            {
                !loading && testimonies &&
                <BarChartUI testimonies={testimonies} />
            }
        </Stack>
    )
}

export default Analytics