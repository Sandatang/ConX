import { Stack } from "@mui/material"
import { useEffect, useState } from "react"
import BarChartUI from "../components/Analytics/BarChart"
import * as TestimonyApi from "../network/testimony_api"
import * as UserApi from "../network/user_api"

const Analytics = () => {
    const [testimonies, setTestimonies] = useState(null)
    const [monthlyUser, setMonthlyUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAllTestimonies = async () => {
            try {
                const response = await TestimonyApi.getAllTestimony()
                const responseMonthly = await UserApi.getMonthlyUser()
                setTestimonies(response)
                setMonthlyUser(responseMonthly)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        getAllTestimonies()
    }, [])
    return (
        <Stack className=" h-screen overflow-y-auto overflow-x-hidden no-scrollbar md:my-8">
            {
                !loading && testimonies &&
                <>
                <BarChartUI testimonies={testimonies} monthlyUser={monthlyUser}/>
                </>
            }
        </Stack>
    )
}

export default Analytics