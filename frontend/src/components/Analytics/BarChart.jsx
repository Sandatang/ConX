import { Stack, Typography } from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const BarChartUI = () => {
    const data = [
        {
            name: "Page A",
            separated: 4000,
            married: 2400,
            widowed: 2000,
        },
        {
            name: "Page B",
            separated: 3000,
            married: 1398,
            widowed: 3000,
        },
        // Add more data entries as needed
    ];

    return (
        <Stack className="w-full px-8 justify-center items-center">
            <Stack className="my-4 px-16">
                <h2 className="!text-center text-lg font-bold">Monthly Analytics</h2>
                <Typography variant="caption" >Gain insights to empowered users trends with our Monthly Analytics. Track key metrics and patterns to understand how platform fosters empowerment among users. This data-driven overview provides valuable insights into the impact of our initiatives on user engagement, satisfaction, and empowerment.</Typography>
            </Stack>
            <Stack className="!flex-row justify-evenly w-full gap-8">

                <div className="">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="separated" fill="#8884d8" />
                        <Bar dataKey="married" fill="#82ca9d" />
                        <Bar dataKey="widowed" fill="#ff7f0e" />
                    </BarChart>
                </div>

                <div>
                    <h3>Additional Information</h3>
                    <table className="min-w-full divide-y divide-gray-200 relative">
                        <thead className="bg-gray-300 border border-solid sticky top-0 z-50">

                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Value</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y  divide-gray-200">

                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">Separated</td>
                                <td className="px-6 py-4 whitespace-nowrap">4000</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">Married</td>
                                <td className="px-6 py-4 whitespace-nowrap">2400</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">Widowed</td>
                                <td className="px-6 py-4 whitespace-nowrap">2000</td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>

            </Stack>
        </Stack>
    )
}

export default BarChartUI;
