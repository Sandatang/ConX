/* eslint-disable react/prop-types */
import { Stack, Typography } from "@mui/material";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const MonthlyUserChart = ({ monthlyUser }) => {

    const data = [
        {
            "name": "January",
            "value": 0
        },
        {
            "name": "February",
            "value": 0
        },
        {
            "name": "March",
            "value": 0
        },
        {
            "name": "April",
            "value": 0
        },
        {
            "name": "May",
            "value": 0
        },
        {
            "name": "June",
            "value": 0
        }
    ]
    monthlyUser.forEach(entry => {
        if (entry.month === 1) {
            data[0].value = entry.userCount;
        }
        if (entry.month === 2) {
            data[1].value = entry.userCount;
        }
        if (entry.month === 3) {
            data[2].value = entry.userCount;
        }
        if (entry.month === 4) {
            data[3].value = entry.userCount;
        }
        if (entry.month === 5) {
            data[4].value = entry.userCount;
        }
        if (entry.month === 6) {
            data[5].value = entry.userCount;
        }
        if (entry.month === 7) {
            data[6].value = entry.userCount;
        }
    });


    const totalMonthlyUser = data.reduce((total, entry) => {
        return total + entry.value;
    }, 0);


    return (
        <Stack className="w-full border-[1px] rounded-md" >
            <Typography className="!text-sm !font-bold px-4">Monthly Users</Typography>
            <Stack className=" justify-evenly w-full gap-8 p-16">
                <div className="w-full">
                    <ResponsiveContainer height={250}>
                        <BarChart width={730} height={250} data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
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
                                <td className="px-6 py-4 font-bold whitespace-nowrap">{totalMonthlyUser}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </Stack>
        </Stack >
    )
}

export default MonthlyUserChart;
