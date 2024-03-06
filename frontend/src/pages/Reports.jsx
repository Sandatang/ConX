import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Reports = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      Description: "Abusive",
      Name: "Clair Smith",
      Tags: "Done",
      Documents: "Submitted",
      Location: "Chicago",
      Verified: true,
      Active: true,
      ReportAction: "Active",
    },
    {
      id: 2,
      Description: "Partner Sexual Abuse",
      Name: "Juliana Deep",
      Tags: "Pending",
      Documents: "Submitted",
      Location: "California",
      Verified: true,
      Active: false,
      ReportAction: "Pending",
    },
    {
      id: 3,
      Description: "Public Discrimination",
      Name: "Alyssa Cool",
      Tags: "Pending",
      Documents: "Submitted",
      Location: "Ohio state",
      Verified: true,
      Active: true,
      ReportAction: "Active",
    },
  ]);

  const handleReportAction = (id, action) => {
    setReports(reports.map(report => {
      if (report.id === id) {
        return { ...report, ReportAction: action };
      }
      return report;
    }));
  };

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

  const filteredReports = reports.filter(report =>
    report.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.Tags.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedReports = sortBy ? [...filteredReports].sort((a, b) => {
    if (a[sortBy] === b[sortBy]) return 0;
    if (sortOrder === 'asc') {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    } else {
      return a[sortBy] > b[sortBy] ? -1 : 1;
    }
  }) : filteredReports;

  const verifiedReportsCount = reports.filter(report => report.Verified).length;
  const nonVerifiedReportsCount = reports.length - verifiedReportsCount;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Reports</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search reports..."
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
            <option value="Name">Name</option>
            <option value="Tags">Tags</option>
            <option value="Location">Location</option>
            <option value="Verified">Verified</option>
            <option value="Active">Active</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-pink-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedReports.map(report => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <AccountCircleIcon className="w-10 h-10 rounded-full text-gray-800" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{report.Name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{report.Description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${report.Tags === 'Done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {report.Tags}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{report.Documents}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{report.Location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button onClick={() => handleReportAction(report.id, 'Rejected')} className="px-2 py-1 mr-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Rejected
                  </button>
                  <button onClick={() => handleReportAction(report.id, 'Active')} className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <div className="inline-block bg-green-100 rounded-lg p-2">
            <p className="text-green-800">Active Incidents: <span className="font-semibold">{verifiedReportsCount}</span></p>
        </div>
      </div>
      <div className="mt-4">
        <div className="inline-block bg-yellow-100 rounded-lg p-2">
            <p className="text-yellow-800">Pending Incidents: <span className="font-semibold">{verifiedReportsCount}</span></p>
        </div>
      </div>
      <div className="mt-4">
        <div className="inline-block bg-red-100 rounded-lg p-2">
            <p className="text-red-800">Rejected Incidents: <span className="font-semibold">{nonVerifiedReportsCount}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
