import { Stack, Typography } from "@mui/material";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const BarChartUI = () => {
    const data = [
        {
            name: "Separated",
            value: 4000,
        },
        {
            name: "Married",
            value: 2400,
        },
        {
            name: "Widowed",
            value: 2000,
        },
        // Add more data entries as needed
    ];
    const colors = ['#8884d8', '#82ca9d', '#ffc658'];
    // Calculate total empowered users
    const totalEmpoweredUsers = data.reduce((total, entry) => {
        return total + entry.separated + entry.married + entry.widowed;
    }, 0);


    return (
        <Stack className="w-full px-8 justify-center items-center">
            <Stack className="my-4 px-16">
                <h2 className="!text-center text-lg font-bold">Analytics</h2>
                <Typography variant="caption" >Gain insights to empowered users trends with our Monthly Analytics. Track key metrics and patterns to understand how platform fosters empowerment among users. This data-driven overview provides valuable insights into the impact of our initiatives on user engagement, satisfaction, and empowerment.</Typography>
            </Stack>
            <Stack className="!flex-row justify-evenly w-full gap-8">

                <div className="">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>

                <div>
                    <h3>Additional Information</h3>
                    <table className="min-w-full divide-y border-[1px] divide-gray-200 relative">
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
                            <tr>
                                <td className="px-6 py-4 font-bold whitespace-nowrap">Total</td>
                                <td className="px-6 py-4 font-bold whitespace-nowrap">{totalEmpoweredUsers}</td>
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
