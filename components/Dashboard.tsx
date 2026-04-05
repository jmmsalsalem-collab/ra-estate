'use client';

import { useEffect, useState } from 'react';

interface DashboardStats {
  totalProperties: number;
  availableProperties: number;
  soldProperties: number;
  rentedProperties: number;
  totalRevenueKwd: number;
  totalClientsKwd: number;
  activeTransactions: number;
  topPropertiesByValue: { title: string; price: number }[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 156,
    availableProperties: 89,
    soldProperties: 42,
    rentedProperties: 25,
    totalRevenueKwd: 28750000,
    totalClientsKwd: 5420000,
    activeTransactions: 23,
    topPropertiesByValue: [
      { title: 'Luxury Villa - Salmiya Waterfront', price: 2850000 },
      { title: 'Premium Apartment - Zamalek Tower', price: 1650000 },
      { title: 'Commercial Land Plot - Jahra Industrial', price: 3200000 },
      { title: 'Modern Villa - Bayan Hills', price: 1950000 },
      { title: 'Business Hub - Downtown Kuwait', price: 2100000 },
    ],
  });

  const formatKwd = (value: number) => {
    return new Intl.NumberFormat('ar-KW', {
      style: 'currency',
      currency: 'KWD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Properties',
            value: stats.totalProperties,
            icon: '🏠',
            color: 'from-blue-500 to-cyan-500',
          },
          {
            label: 'Available',
            value: stats.availableProperties,
            icon: '✅',
            color: 'from-green-500 to-emerald-500',
          },
          {
            label: 'Sold/Rented',
            value: stats.soldProperties + stats.rentedProperties,
            icon: '✔️',
            color: 'from-purple-500 to-pink-500',
          },
          {
            label: 'Active Transactions',
            value: stats.activeTransactions,
            icon: '💼',
            color: 'from-orange-500 to-red-500',
          },
        ].map((metric, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${metric.color} p-0.5 rounded-lg`}
          >
            <div className="bg-slate-900 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-white">{metric.value}</p>
                </div>
                <span className="text-4xl">{metric.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-0.5 rounded-lg">
          <div className="bg-slate-900 rounded-lg p-8">
            <p className="text-gray-400 text-sm mb-2">Total Revenue</p>
            <p className="text-4xl font-bold text-white mb-2">
              {formatKwd(stats.totalRevenueKwd)}
            </p>
            <p className="text-gray-500 text-sm">From all completed transactions</p>
          </div>
        </div>

        {/* Active Clients Value */}
        <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-0.5 rounded-lg">
          <div className="bg-slate-900 rounded-lg p-8">
            <p className="text-gray-400 text-sm mb-2">Clients Portfolio Value</p>
            <p className="text-4xl font-bold text-white mb-2">
              {formatKwd(stats.totalClientsKwd)}
            </p>
            <p className="text-gray-500 text-sm">Active buyer/renter interests</p>
          </div>
        </div>
      </div>

      {/* Properties by Status Chart */}
      <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Portfolio Status</h2>
        <div className="space-y-4">
          {[
            { label: 'Available', count: stats.availableProperties, color: 'bg-green-500', percentage: (stats.availableProperties / stats.totalProperties) * 100 },
            { label: 'Sold', count: stats.soldProperties, color: 'bg-blue-500', percentage: (stats.soldProperties / stats.totalProperties) * 100 },
            { label: 'Rented', count: stats.rentedProperties, color: 'bg-purple-500', percentage: (stats.rentedProperties / stats.totalProperties) * 100 },
          ].map((status, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">{status.label}</span>
                <span className="text-white font-bold">{status.count} ({status.percentage.toFixed(0)}%)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className={`${status.color} h-2 rounded-full transition-all`} style={{ width: `${status.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Properties Table */}
      <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Top Properties by Value</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Property</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Price (د.ك)</th>
              </tr>
            </thead>
            <tbody>
              {stats.topPropertiesByValue.map((prop, idx) => (
                <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-white">{prop.title}</td>
                  <td className="py-3 px-4 text-right text-cyan-400 font-semibold">{formatKwd(prop.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Quick Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">{((stats.availableProperties / stats.totalProperties) * 100).toFixed(0)}%</p>
            <p className="text-sm text-gray-400 mt-1">Availability Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-400">{((stats.soldProperties / stats.totalProperties) * 100).toFixed(0)}%</p>
            <p className="text-sm text-gray-400 mt-1">Sold Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-400">{((stats.rentedProperties / stats.totalProperties) * 100).toFixed(0)}%</p>
            <p className="text-sm text-gray-400 mt-1">Rented Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-400">{(stats.totalRevenueKwd / 1000000).toFixed(1)}M</p>
            <p className="text-sm text-gray-400 mt-1">Revenue (Millions)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
