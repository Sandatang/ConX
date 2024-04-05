import { Stack } from "@mui/material"
import BarChartUI from "../components/Analytics/BarChart"
import LineChartUI from "../components/Analytics/LineChartUI"

const Analytics = () => {
    return (
        <Stack className="!flex-row  h-screen justify-center items-center">
            <BarChartUI />
            <LineChartUI />
        </Stack>
    )
}

export default Analytics