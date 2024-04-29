/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/material";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const MonthlyUserChart = ({ testimonies }) => {

    const data = [
        {
            name: "Single",
            value: 0,
        },
        {
            name: "Married",
            value: 0,
        },
        {
            name: "Divorced",
            value: 0,
        },
        {
            name: "Separated",
            value: 0,
        },
        {
            name: "Widowed",
            value: 0,
        },
        // Add more data entries as needed
    ];
    testimonies.forEach(entry => {
        if (entry.civilStatus !== null) {
            if (entry.civilStatus === "single") {
                data[0].value += 1;
            }
            if (entry.civilStatus === "married") {
                data[1].value += 1;
            }
            if (entry.civilStatus === "divorced") {
                data[2].value += 1;
            }
            if (entry.civilStatus === "separated") {
                data[3].value += 1;
            }
            if (entry.civilStatus === "widowed") {
                data[4].value += 1;
            }
        }
    });

    const colors = ['#ff5733', '#ffc30f', '#65ffc3', '#ff65c3', '#3b65ff'];

    const totalEmpoweredUsers = data.reduce((total, entry) => {
        return total + entry.value;
    }, 0);


    return (
        <Stack Stack className="w-full border-[1px] rounded-md" >
            <Typography className="!text-sm !font-bold px-4">Monthly Users</Typography>
            <Stack className="!flex-row justify-evenly w-full gap-8">
                <div className="">
                    <PieChart width={500} height={400}>
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
                        <thead className="bg-gray-300 border border-solid ">

                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Value</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y  divide-gray-200">
                            {
                                data.map((d, index) => (

                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">{d.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{d.value}</td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td className="px-6 py-4 font-bold whitespace-nowrap">Total</td>
                                <td className="px-6 py-4 font-bold whitespace-nowrap">{totalEmpoweredUsers}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </Stack>
        </Stack >
    )
}

export default MonthlyUserChart;
