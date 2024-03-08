import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import * as UserApi from "../network/user_api";
import AddPeronnelModal from '../components/AddPersonnelModal';




const ManageUsers = () => {
  const [active1, setActive1] = useState(null);
  const [active2, setActive2] = useState(null);
  const [add, setAdd] = useState(false)
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  async function generateWomenUser() {
    try {
      const response = await UserApi.viewAllWomen()
      console.log(response)
      setUser(response)
    } catch (error) {
      console.error(error)
    }
  }

  async function generatePersonnelUser() {
    try {
      const response = await UserApi.viewAllPersonnel()
      console.log(response)
      setUser(response)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Stack className='!flex-row justify-between items-center mb-2'>
        {/* <h2 className="text-xl font-bold mb-4 text-gray-800">Manage Users</h2> */}
        <Stack className='!flex-row gap-2'>
          <Button onClick={() => {
            generateWomenUser()
            setActive1(true)
            setActive2(false)
          }} variant={active1 ? 'contained' : 'text'}>View Women</Button>
          <Button onClick={() => {
            generatePersonnelUser()
            setActive2(true)
            setActive1(false)
          }} variant={active2 ? 'contained' : 'text'}>Add Personnel</Button>
        </Stack>
        <Button variant='contained' onClick={() => setAdd(!add)}>Add Personnel</Button>
      </Stack>
      <Stack className="!flex-row justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded-md w-full mr-4"
        />
        <Stack className="!relative ">
          <select
            className="block cursor-pointer appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded-md shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          // onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Sort by...</option>
            <option value="fullName">Name</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
            <option value="address">Address</option>
            <option value="verified">Verified</option>
            <option value="active">Active</option>
          </select>
        </Stack>
      </Stack>
      <Stack className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-300 border border-solid">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User Type</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {user && user.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <AccountCircleIcon className="w-10 h-10 rounded-full text-gray-800" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.userName}</div>
                      <div className="text-sm text-gray-500">{user.userName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.userName}</div>
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
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Button className='!text-red-400 !text-[0.7em] !font-thin hover:!underline hover:!underline-offset-2 hover:!text-red-600'>
                    DeActivate
                  </Button>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.verified ? (
                    <div className="flex">
                      <button className="text-red-500 mr-2 bg-red-100 px-3 py-1 rounded-md hover:bg-red-200">Reject</button>
                      <button className="text-green-500 mr-2 bg-green-100 px-3 py-1 rounded-md hover:bg-green-200">Admit</button>
                    </div>
                  ) : (
                    <span className="text-gray-400">Inactive</span>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </Stack>
      {add && <AddPeronnelModal onClose={() => setAdd(false)} />}
      {/* <div className="mt-4">
        <p className="text-gray-800">Verified Users: {verifiedUsersCount}</p>
        <p className="text-gray-800">Non-Verified Users: {nonVerifiedUsersCount}</p>
      </div> */}
    </div>
  );
};

export default ManageUsers;
