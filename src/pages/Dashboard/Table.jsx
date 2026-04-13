import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';


const dummyData = [
  {
    id: 1,
    user: "Alexandre Paiva",
    email: "alex@design.co",
    avatar: "https://i.pravatar.cc/48?u=1",
    status: "Active",
    lastActive: "2 mins ago",
    revenue: 1450.00,
  },
  {
    id: 2,
    user: "Sarah Jenkins",
    email: "sarah@fintech.io",
    avatar: "https://i.pravatar.cc/48?u=2",
    status: "Inactive",
    lastActive: "4 hours ago",
    revenue: 2890.00,
  },
  {
    id: 3,
    user: "David Miller",
    email: "d.miller@techhub.com",
    avatar: "https://i.pravatar.cc/48?u=3",
    status: "Active",
    lastActive: "12 mins ago",
    revenue: 840.50,
  },
  {
    id: 4,
    user: "Elena Rodriguez",
    email: "elena.r@agency.com",
    avatar: "https://i.pravatar.cc/48?u=4",
    status: "Suspended",
    lastActive: "1 day ago",
    revenue: 5200.00,
  },
  {
    id: 5,
    user: "Marcus Chen",
    email: "marcus@startup.vc",
    avatar: "https://i.pravatar.cc/48?u=5",
    status: "Active",
    lastActive: "35 mins ago",
    revenue: 1750.00,
  },
  {
    id: 6,
    user: "Priya Sharma",
    email: "priya@creative.io",
    avatar: "https://i.pravatar.cc/48?u=6",
    status: "Inactive",
    lastActive: "2 days ago",
    revenue: 920.75,
  },
  {
    id: 7,
    user: "James Okoro",
    email: "james@globalpay.ng",
    avatar: "https://i.pravatar.cc/48?u=7",
    status: "Active",
    lastActive: "1 hour ago",
    revenue: 3450.00,
  },
  {
    id: 8,
    user: "Fatima Al-Sayed",
    email: "fatima@luxury.ae",
    avatar: "https://i.pravatar.cc/48?u=8",
    status: "Suspended",
    lastActive: "3 days ago",
    revenue: 6820.00,
  },
];

const Table = () => {
  const [sortConfig, setSortConfig] = useState({ key: 'revenue', direction: 'desc' });

  const sortedData = useMemo(() => {
    const sortableData = [...dummyData];

    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        let valueA = a[sortConfig.key];
        let valueB = b[sortConfig.key];

        // Special handling for revenue (number)
        if (sortConfig.key === 'revenue') {
          valueA = Number(valueA);
          valueB = Number(valueB);
        }

        if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="w-4 h-4 text-indigo-600" />
      : <ArrowDown className="w-4 h-4 text-indigo-600" />;
  };

  const getStatusBadge = (status) => {
    const colors = {
      Active: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
      Inactive: 'bg-amber-100 text-amber-700 border border-amber-200',
      Suspended: 'bg-rose-100 text-rose-700 border border-rose-200',
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
        <span className={`w-2 h-2 rounded-full mr-1.5 ${
          status === 'Active' ? 'bg-emerald-500' : 
          status === 'Inactive' ? 'bg-amber-500' : 'bg-rose-500'
        }`} />
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-5">

<div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
        
        <div className="flex gap-2">
          <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">Active</button>
          <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">Pending</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th 
                onClick={() => handleSort('user')}
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  USER
                  {getSortIcon('user')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('status')}
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  STATUS
                  {getSortIcon('status')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('lastActive')}
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2">
                  LAST ACTIVE
                  {getSortIcon('lastActive')}
                </div>
              </th>
              <th 
                onClick={() => handleSort('revenue')}
                className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-end gap-2">
                  REVENUE
                  {getSortIcon('revenue')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.avatar}
                      alt={item.user}
                      className="w-10 h-10 rounded-full object-cover border border-gray-100"
                    />
                    <div className='flex flex-col'>
                      <p className="font-medium text-gray-900">{item.user}</p>
                      <p className="text-sm text-gray-500">{item.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-5 text-sm text-gray-600">
                  {item.lastActive}
                </td>
                <td className="px-6 py-5 text-right font-semibold text-gray-900">
                  ${item.revenue.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;