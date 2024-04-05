import { LocalPolice, Person, Search } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Alert, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AddPeronnelModal from '../components/AddPersonnelModal';
import ModalDeActivate from "../components/UserManagement/ModalDeActivate";
import * as UserApi from "../network/user_api";

const ManageUsers = () => {
  const [active1, setActive1] = useState(null);
  const [active2, setActive2] = useState(null);
  const [active3, setActive3] = useState(null);
  const [add, setAdd] = useState(false)
  const [update, setUpdate] = useState(false)
  const [userToUpdate, setUserToUpdate] = useState(null)
  const [user, setUser] = useState(null);
  const [totalUser, setTotalUser] = useState(null);
  const { register, watch } = useForm()
  const searchedValue = watch('searched')


  useEffect(() => {
    const getTotalUsers = async () => {
      const response = await UserApi.getTotalOfUser()
      setTotalUser(response)
    }
    allUser()
    getTotalUsers()
  }, [])



  async function generateWomenUser() {
    try {
      const response = await UserApi.viewAllWomen()
      console.log(response)

      setActive1(true)
      setActive2(false)
      setActive3(false)
      setUser(response)
    } catch (error) {
      console.error(error)
    }
  }

  async function generatePersonnelUser() {
    try {
      const response = await UserApi.viewAllPersonnel()
      console.log(response)

      setActive1(false)
      setActive2(true)
      setActive3(false)
      setUser(response)
    } catch (error) {
      console.error(error)
    }
  }

  async function allUser() {
    try {

      const responseOne = await UserApi.viewAllPersonnel()
      const responseTwo = await UserApi.viewAllWomen()

      setActive1(false)
      setActive2(false)
      setActive3(true)
      setUser(responseOne.concat(responseTwo))
      console.log(responseOne.concat(responseTwo))
    } catch (error) {
      console.error(error)
    }

  }

  const filteredData = user && user.filter(item => {
    // Replace propertyName with the actual property name you want to check against
    return Object.values(item).some(value => {
      if (typeof value === 'string') {
        return value.includes(searchedValue);
      }
      return false; // You can handle other types if needed
    });
  });


  return (
    <div className="bg-white overflow-auto no-scrollbar rounded-lg shadow-md p-6">
      {/* View users by role */}
      <Stack className='!flex-row justify-between items-center mb-4'>

        {/* Button for showing user base on role */}
        <Stack className='!flex-row gap-2'>
          <Button onClick={allUser} variant={active3 ? 'contained' : 'text'}>All User</Button>
          <Button onClick={generatePersonnelUser} variant={active2 ? 'contained' : 'text'}>Personnel</Button>
          <Button onClick={generateWomenUser} variant={active1 ? 'contained' : 'text'}>Women</Button>
        </Stack>
        {/* End button for showing user base on role */}

        <Button variant='contained' onClick={() => setAdd(!add)}>Add Personnel</Button>  {/* For adding personnel */}
      </Stack>

      <Stack className='!flex-row my-4 justify-between'>
        <Stack className='bg-yellow-500 p-4 !text-white w-60 aspect-video rounded-md'>
          <Stack className='!flex-row justify-between '>
            <Typography className='!text-lg !font-bold tracking-widest'>
              All Users
            </Typography>
            <Person fontSize='large' />
          </Stack>
          <Stack className='h-1/2 justify-center'>
            <Typography className='!text-2xl !font-bold'>{totalUser && totalUser.users}</Typography>
          </Stack>
        </Stack>
        <Stack className='bg-red-500 p-4 !text-white w-60 aspect-video rounded-md'>
          <Stack className='!flex-row justify-between '>
            <Typography className='!text-lg !font-bold tracking-widest'>
              Personnel Users
            </Typography>
            <LocalPolice fontSize='large' />
          </Stack>
          <Stack className='h-1/2 justify-center'>
            <Typography className='!text-2xl !font-bold'>{totalUser && totalUser.personnel}</Typography>
          </Stack>
        </Stack>
        <Stack className='bg-pinkish p-4 !text-white w-60 aspect-video rounded-md'>
          <Stack className='!flex-row justify-between '>
            <Typography className='!text-lg !font-bold tracking-widest'>
              Women Users
            </Typography>
            <Person fontSize='large' />
          </Stack>
          <Stack className='h-1/2 justify-center'>
            <Typography className='!text-2xl !font-bold'>{totalUser && totalUser.totalWomen}</Typography>
          </Stack>
        </Stack>
      </Stack>
      {/* End View users by role */}


      {/* Search and Sort  */}
      <form className="flex flex-row justify-between mb-4" >
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border-2 rounded-md w-full mr-4"
          {...register('searched')}
        />
        <Stack className="!relative ">
          <Button variant='outlined' type='submit' >
            <Search />
            <Typography>Search...</Typography>
          </Button>
        </Stack>
      </form>
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
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Active</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Update</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y  divide-gray-200">
            {filteredData && filteredData.length > 0 ? (filteredData.slice().sort((a, b) => {
              const nameA = a.lastname.toLowerCase();
              const nameB = b.lastname.toLowerCase();
              return nameA.localeCompare(nameB);
            }).map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="flex items-center">
                    <span className="flex-shrink-0 h-10 w-10">
                      <AccountCircleIcon className="w-10 h-10 rounded-full text-gray-800" />
                    </span>
                    <span className="ml-4 flex flex-col">
                      <span className="text-sm font-medium text-gray-900 capitalize"> {user.lastname}, {user.firstname} {user.middlename}</span>
                      <span className="text-sm text-gray-500 text-center">{user.employeeNumber}</span>
                    </span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{new Date(user.birthdate).toDateString().split(" ").splice(1).join(" ")}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{user.userName}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{user.email}</span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{active1 ? 'Women' : 'Personnel'}</span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">

                  <ModalDeActivate userId={user.id} status={user.deActivate} />
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <Button onClick={() => {
                    setUserToUpdate(user)
                    setUpdate(true)
                    setAdd(true)
                  }} className="!text-sm !font-medium !text-gray-900" variant='outlined'>Edit</Button>
                </td>
              </tr>
            ))) : (<Alert>No data</Alert>)}
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
