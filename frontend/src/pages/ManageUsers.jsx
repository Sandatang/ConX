import { Add, AdminPanelSettings, LocalPolice, Person, Search } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Alert, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AddPeronnelModal from '../components/AddPersonnelModal';
import ModalDeActivate from "../components/UserManagement/ModalDeActivate";
import * as UserApi from "../network/user_api";
import ModalDeletion from '../components/UserManagement/ModalDeletion';
import AddAdminModal from '../components/UserManagement/AddAdminModal';

const ManageUsers = () => {
  const [active1, setActive1] = useState(null);
  const [active2, setActive2] = useState(null);
  const [active3, setActive3] = useState(null);
  const [active4, setActive4] = useState(null);
  const [active5, setActive5] = useState(null);
  const [add, setAdd] = useState(false)
  const [addAdmin, setAddAdmin] = useState(false)
  const [userToDelete, setUserToDelete] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [update, setUpdate] = useState(false)
  const [userToUpdate, setUserToUpdate] = useState(null)
  const [user, setUser] = useState(null);
  const [totalUser, setTotalUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { register, watch } = useForm()
  const [pollingInterval, setPollingInterval] = useState(1000); // Initial polling interval

  const searchedValue = watch('searched')


  useEffect(() => {
    const getTotalUsers = async () => {
      try {
        let user = localStorage.getItem('role');
        const responseOne = await UserApi.viewAllPersonnel()
        const responseTwo = await UserApi.viewAllWomen()

        const responseThree = await UserApi.viewAllAdmin()
        setTotalUser({
          "users": user === "Admin" ? responseOne.length + responseTwo.length + responseThree.length : responseOne.length + responseTwo.length,
          "personnel": responseOne.length,
          "totalWomen": responseTwo.length,
          "totalAdmin": responseThree.length,
        })

      } catch (error) {
        console.error(error)
        setPollingInterval(interval => Math.min(interval * 2, 60000)); // Exponential backoff with max interval of 1 minute
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }
    allUser()
    const intervalId = setInterval(getTotalUsers, pollingInterval);
    return () => clearInterval(intervalId);
  }, [pollingInterval])



  async function generateWomenUser() {
    try {
      const response = await UserApi.viewAllWomen()
      console.log(response)

      setActive1(true)
      setActive2(false)
      setActive3(false)
      setActive4(false)
      setActive5(false)
      setUser(response)
    } catch (error) {
      console.error(error)
    }
  }
  async function generateAdminUser() {
    try {
      const response = await UserApi.viewAllAdmin()
      console.log(response)

      setActive1(false)
      setActive2(false)
      setActive3(false)
      setActive4(true)
      setActive5(false)
      setUser(response)
    } catch (error) {
      console.error(error)
    }
  }

  async function generateDeletedAccounts() {
    try {
      const response = await UserApi.viewDeletedAccounts()
      console.log(response)

      setActive1(false)
      setActive2(false)
      setActive3(false)
      setActive4(false)
      setActive5(true)
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
      setActive4(false)
      setActive5(false)

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
      setActive4(false)
      setActive5(false)

      setUser(responseOne.concat(responseTwo))
      // console.log(responseOne.concat(responseTwo))
    } catch (error) {
      console.error(error)
    }

  }

  const filteredData = user && user.filter(item => {
    // Replace propertyName with the actual property name you want to check against
    return Object.values(item.user).some(value => {
      if (typeof value === 'string') {
        return value.includes(searchedValue);
      }
      return false; // You can handle other types if needed
    });
  });


  return (
    loading ? (
      <Stack className="animate-pulse p-6 gap-6">
        <Stack className='!flex-row gap-4'>
          <div className="bg-gray-300/50 w-16 py-4 rounded-lg"></div>
          <div className="bg-gray-300/50 w-16 py-4 rounded-lg"></div>
          <div className="bg-gray-300/50 w-16 py-4 rounded-lg"></div>
        </Stack>
        <Stack className='!flex-row gap-4'>

          <div className="bg-gray-300/50 w-56 aspect-video rounded-lg"></div>
          <div className="bg-gray-300/50 w-56 aspect-video rounded-lg"></div>
          <div className="bg-gray-300/50 w-56 aspect-video rounded-lg"></div>
          <div className="bg-gray-300/50 w-56 aspect-video rounded-lg"></div>
        </Stack>
        <div className="bg-gray-300/50 w-full py-4 rounded-lg"></div>
      </Stack>
    ) : (

      <div className="bg-white overflow-auto no-scrollbar rounded-lg shadow-md p-6">
        {/* View users by role */}
        <Stack className='!flex-row-reverse sm:!flex-row justify-between items-start md:items-center mb-4'>

          {/* Button for showing user base on role SMALL DEVICE */}
          <Stack className='!grid !grid-cols-2 sm:items-center sm:!flex sm:!flex-row  gap-2 !text-slate-400'>
            <Button onClick={allUser} variant={active3 ? 'contained' : 'text'}>All User</Button>
            <Button onClick={generatePersonnelUser} variant={active2 ? 'contained' : 'text'}>Personnel</Button>
            <Button onClick={generateWomenUser} variant={active1 ? 'contained' : 'text'}>Women</Button>
            {
              localStorage.getItem('role') === "Admin" &&
              <>
                <Button onClick={generateAdminUser} variant={active4 ? 'contained' : 'text'}>Admin</Button>
                <Button onClick={generateDeletedAccounts} variant={active5 ? 'contained' : 'text'}>Deleted accounts</Button>
              </>
            }
          </Stack>
          {/* End button for showing user base on role */}

          <Stack className=' !flex-col-reverse sm:!flex-row gap-2'>
            {
              localStorage.getItem('role') === "Admin" &&
              <Button variant='contained' onClick={() => setAddAdmin(!addAdmin)}> <Add /> Admin</Button>
            }
            <Button variant='contained' onClick={() => setAdd(!add)}> <Add /> Personnel</Button>  {/* For adding personnel */}
          </Stack>
        </Stack>

        <Stack className='!grid !grid-cols-2 sm:!grid-cols-3 md:!grid-cols-4 my-10 justify-between'>
          <Stack className='bg-yellow-500 p-4 !text-white w-56 aspect-video rounded-md'>
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
          <Stack className='bg-red-500 p-4 !text-white w-56 aspect-video rounded-md'>
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
          <Stack className='bg-pinkish p-4 !text-white w-56 aspect-video rounded-md'>
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
          {
            localStorage.getItem('role') === "Admin" &&
            <Stack className='bg-violet-500 p-4 !text-white w-56 aspect-video rounded-md'>
              <Stack className='!flex-row justify-between '>
                <Typography className='!text-lg !font-bold tracking-widest'>
                  Admin Users
                </Typography>
                <AdminPanelSettings fontSize='large' />
              </Stack>
              <Stack className='h-1/2 justify-center'>
                <Typography className='!text-2xl !font-bold'>{totalUser && totalUser.totalAdmin}</Typography>
              </Stack>
            </Stack>
          }

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
        <Stack className="overflow-x-auto max-h-[80%] ">
          <table className="min-w-full divide-y divide-gray-200 relative">
            <thead className="bg-gray-300 border border-solid sticky top-0 z-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Birthdate</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User Type</th> */}
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Active</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y  divide-gray-200">
              {filteredData && filteredData.length > 0 ? (filteredData.slice().sort((a, b) => {
                const nameA = a.user.userName.toLowerCase();
                const nameB = b.user.userName.toLowerCase();
                return nameA.localeCompare(nameB);
              }).map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center">
                      <span className="flex-shrink-0 h-10 w-10">
                        <AccountCircleIcon className="w-10 h-10 rounded-full text-gray-800" />
                      </span>
                      <span className="ml-4 flex flex-col">
                        <span className="text-sm font-medium text-gray-900 capitalize"> {user.user.lastname}, {user.user.firstname} {user.user.middlename}</span>
                        <span className="text-sm text-gray-500 text-start">{user.user.employeeNumber}</span>
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{new Date(user.user.birthdate).toDateString().split(" ").splice(1).join(" ")}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{user.user.userName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{user.user.email}</span>
                  </td>

                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{user.user.role}</span>
                  </td> */}

                  <td className="px-6 py-4 whitespace-nowrap text-center">

                    <ModalDeActivate userId={user.user.id} active5={active5} status={user.user.deActivate} />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {
                      !active5 &&
                      <Button onClick={() => {
                        setUserToUpdate(user)
                        setUpdate(true)
                        setAdd(true)
                      }} className="!text-sm !font-medium !text-green-500" variant="ghost" >
                        Edit
                      </Button>
                    }

                    {
                      localStorage.getItem('role') === "Admin" ?
                        active5 ? (
                          <Button className="!text-sm !font-medium" variant='text' disabled={true}>Deleted</Button>
                        ) : (

                          <Button onClick={() => {
                            setUserToDelete(user.user.id)
                            setDeleteModal(true)
                          }}
                            className="!text-sm !font-medium !text-red-500" variant="ghost">
                            Delete
                          </Button>
                        ) : (
                          <Button className="!text-sm !font-medium" variant='text' disabled={true}>Deleted</Button>

                        )
                    }
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
        {addAdmin && <AddAdminModal admin={true} onClose={() => {
          setUpdate(false)
          setAddAdmin(false)
        }} />}
        {deleteModal && <ModalDeletion userId={userToDelete} open={deleteModal} close={() => setDeleteModal(false)} />}
        {/* Modal */}

      </div>
    )
  );
};

export default ManageUsers;
