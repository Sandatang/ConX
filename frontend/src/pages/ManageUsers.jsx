import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import * as UserApi from "../network/user_api";
import AddPeronnelModal from '../components/AddPersonnelModal';
import ModalDeActivate from "../components/UserManagement/ModalDeActivate"

const ManageUsers = () => {
  const [active1, setActive1] = useState(null);
  const [active2, setActive2] = useState(null);
  const [add, setAdd] = useState(false)
  const [update, setUpdate] = useState(false)
  const [userToUpdate, setUserToUpdate] = useState(null)
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
      {/* View users by role */}
      <Stack className='!flex-row justify-between items-center mb-2'>

        {/* Button for showing user base on role */}
        <Stack className='!flex-row gap-2'>
          <Button onClick={() => {
            generateWomenUser()
            setActive1(true)
            setActive2(false)
          }} variant={active1 ? 'contained' : 'text'}>Women</Button>
          <Button onClick={() => {
            generatePersonnelUser()
            setActive2(true)
            setActive1(false)
          }} variant={active2 ? 'contained' : 'text'}>Personnel</Button>
        </Stack>
        {/* End button for showing user base on role */}

        <Button variant='contained' onClick={() => setAdd(!add)}>Add Personnel</Button>  {/* For adding personnel */}
      </Stack>
      {/* End View users by role */}


      {/* Search and Sort  */}
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
      {/* End of search and Sort */}

      {/* Users Table */}
      <Stack className="overflow-x-auto max-h-[70%] ">
        <table className="min-w-full divide-y divide-gray-200 relative">
          <thead className="bg-gray-300 border border-solid sticky top-0 z-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Birthdate</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User Type</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Deactivate</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Update</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y  divide-gray-200">
            {user && user.slice().sort((a, b) => {
              const nameA = a.lastname.toLowerCase();
              const nameB = b.lastname.toLowerCase();
              return nameA.localeCompare(nameB);
            }).map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <AccountCircleIcon className="w-10 h-10 rounded-full text-gray-800" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 capitalize"> {user.lastname}, {user.firstname} {user.middlename}</div>
                      {/* <div className="text-sm text-gray-500">{user.userName}</div> */}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{new Date(user.birthdate).toDateString().split(" ").splice(1).join(" ")}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.userName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.email}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {/* <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}> */}

                  <div className="text-sm font-medium text-gray-900">{active1 ? 'Women' : 'Personnel'}</div>
                  {/* </span> */}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {/* <Button className='!text-red-400 !text-[0.7em] !font-thin hover:!underline hover:!underline-offset-2 hover:!text-red-600'>
                    DeActivate
                  </Button> */}
                  <ModalDeActivate userId={user.id} status={user.deActivate} />
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Button onClick={() => {
                    setUserToUpdate(user)
                    setUpdate(true)
                    setAdd(true)
                  }} className="!text-sm !font-medium !text-gray-900" variant='outlined'>Edit</Button>
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

      {/* End Users Table */}

      {add && <AddPeronnelModal user={userToUpdate} update={update} onClose={() => {
        setUpdate(false)
        setAdd(false)
      }} />}
      {/* Modal */}

    </div>
  );
};

export default ManageUsers;
