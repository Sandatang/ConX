import { useState } from "react"
import * as UserApi from "../network/user_api"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const ViewWomen = () => {
    const [user, setUser] = useState(null)
    async function generateWomenUser() {
        try {
            const response = await UserApi.viewAllWomen()
            setUser(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {user && user.map(user => (
                <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                                <AccountCircleIcon className="w-10 h-10 rounded-full text-gray-800" />
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                                <div className="text-sm text-gray-500">{user.username}</div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {user.verified ? 'Verified' : 'Not Verified'}
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.verified ? (
                            <div className="flex">
                                <button className="text-red-500 mr-2 bg-red-100 px-3 py-1 rounded-md hover:bg-red-200">Reject</button>
                                <button className="text-green-500 mr-2 bg-green-100 px-3 py-1 rounded-md hover:bg-green-200">Admit</button>
                            </div>
                        ) : (
                            <span className="text-gray-400">Inactive</span>
                        )}
                    </td>
                </tr>
            ))}
        </>
    )
}

export default ViewWomen