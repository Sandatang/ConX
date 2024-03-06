import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';


const ManageUsers = () => {
  const [users] = useState([
    {
      id: 1,
      username: "maria_delos_santos",
      fullName: "Maria Delos Santos",
      email: "mariadelossantos@gmail.com",
      address: "123 Main St, Cebu City",
      verified: true,
      active: true
    },
    {
      id: 2,
      username: "isabella_gonzales",
      fullName: "Isabella Gonzales",
      email: "isag@yahoo.com",
      address: "456 Elm St, Cebu City",
      verified: false,
      active: true
    },
    {
      id: 3,
      username: "sofia_villanueva",
      fullName: "Sofia Villanueva",
      email: "sofiavilla@gmail.com",
      address: "789 Oak St, Cebu City",
      verified: true,
      active: false
    },
    {
      id: 4,
      username: "lucia_santamaria",
      fullName: "Lucia Santamaria",
      email: "luciasanta@yahoo.com",
      address: "123 Magellan St, Cebu City",
      verified: true,
      active: true
    },
    {
      id: 5,
      username: "camila_aguilar",
      fullName: "Camila Aguilar",
      email: "camilaa@gmail.com",
      address: "456 Mactan St, Cebu City",
      verified: false,
      active: false
    },
    {
      id: 6,
      username: "emma_santiago",
      fullName: "Emma Santiago",
      email: "emma_santiago@yahoo.com",
      address: "789 Carbon St, Cebu City",
      verified: true,
      active: true
    },

  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = sortBy ? filteredUsers.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    } else {
      return a[sortBy] > b[sortBy] ? -1 : 1;
    }
  }) : filteredUsers;

  const verifiedUsersCount = users.filter(user => user.verified).length;
  const nonVerifiedUsersCount = users.length - verifiedUsersCount;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Manage Users</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded-md w-full mr-4"
        />
        <div className="relative">
          <select
            className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded-md shadow-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Sort by...</option>
            <option value="fullName">Name</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
            <option value="address">Address</option>
            <option value="verified">Verified</option>
            <option value="active">Active</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-pink-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedUsers.map(user => (
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
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <p className="text-gray-800">Verified Users: {verifiedUsersCount}</p>
        <p className="text-gray-800">Non-Verified Users: {nonVerifiedUsersCount}</p>
      </div>
    </div>
  );
};

export default ManageUsers;
