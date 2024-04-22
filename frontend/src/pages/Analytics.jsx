import { Stack } from "@mui/material"
import BarChartUI from "../components/Analytics/BarChart"
import LineChartUI from "../components/Analytics/LineChartUI"

const Analytics = () => {
    return (
        <Stack className=" h-screen my-8">
            <BarChartUI />
        </Stack>
    )
}

export default Analytics