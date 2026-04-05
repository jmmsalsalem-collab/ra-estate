'use client';

import { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { TrendingUp, DollarSign, Home, Users, ArrowUp, ArrowDown } from 'lucide-react';

interface DashboardStats {
  totalProperties: number;
  availableProperties: number;
  soldProperties: number;
  rentedProperties: number;
  totalRevenueKwd: number;
  totalClientsKwd: number;
  activeTransactions: number;
  monthlyRevenue: Array<{ month: string; revenue: number; commissions: number }>;
  propertyTypes: Array<{ name: string; value: number; fill: string }>;
  transactionTrend: Array<{ date: string; completed: number; pending: number }>;
}

export default function Dashboard() {
  const [stats] = useState<DashboardStats>({
    totalProperties: 156,
    availableProperties: 89,
    soldProperties: 42,
    rentedProperties: 25,
    totalRevenueKwd: 28750000,
    totalClientsKwd: 5420000,
    activeTransactions: 23,
    monthlyRevenue: [
      { month: 'Jan', revenue: 3200000, commissions: 160000 },
      { month: 'Feb', revenue: 4100000, commissions: 205000 },
      { month: 'Mar', revenue: 5850000, commissions: 292500 },
      { month: 'Apr', revenue: 8600000, commissions: 430000 },
      { month: 'May', revenue: 7000000, commissions: 350000 },
    ],
    propertyTypes: [
      { name: 'Villas', value: 54, fill: '#3b82f6' },
      { name: 'Apartments', value: 68, fill: '#8b5cf6' },
      { name: 'Land', value: 22, fill: '#ec4899' },
      { name: 'Commercial', value: 12, fill: '#f59e0b' },
    ],
    transactionTrend: [
      { date: 'Apr 1', completed: 8, pending: 4 },
      { date: 'Apr 2', completed: 12, pending: 5 },
      { date: 'Apr 3', completed: 15, pending: 6 },
      { date: 'Apr 4', completed: 18, pending: 5 },
      { date: 'Apr 5', completed: 23, pending: 8 },
    ],
  });

  const formatKwd = (value: number) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    }
    return (value / 1000).toFixed(0) + 'K';
  };

  const StatCard = ({ icon: Icon, label, value, change, positive = true }: any) => (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium mb-2">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${positive ? 'text-green-400' : 'text-red-400'}`}>
              {positive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
              <span>{change}% vs last month</span>
            </div>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Home}
          label="Total Properties"
          value={stats.totalProperties}
          change={12}
          positive={true}
        />
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={formatKwd(stats.totalRevenueKwd)}
          change={18}
          positive={true}
        />
        <StatCard
          icon={Users}
          label="Active Clients"
          value={8}
          change={5}
          positive={true}
        />
        <StatCard
          icon={TrendingUp}
          label="Transactions"
          value={stats.activeTransactions}
          change={15}
          positive={true}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-6">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats.monthlyRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
                formatter={(value: any) => `د.ك ${(value / 1000000).toFixed(1)}M`}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Property Type Distribution */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-6">Property Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.propertyTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} (${value})`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.propertyTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Status Trend */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-6">Transaction Status Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.transactionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="completed" fill="#10b981" name="Completed" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pending" fill="#f59e0b" name="Pending" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue vs Commission */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-bold text-white mb-6">Revenue vs Commission (Monthly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
                formatter={(value: any) => `د.ك ${(value / 1000000).toFixed(2)}M`}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" dot={{ fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="commissions" stroke="#10b981" strokeWidth={2} name="Commissions" dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Portfolio Analytics */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-6">Portfolio Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Available Properties', value: stats.availableProperties, total: stats.totalProperties, color: 'from-green-500 to-emerald-500', percentage: (stats.availableProperties / stats.totalProperties * 100).toFixed(1) },
            { label: 'Sold Properties', value: stats.soldProperties, total: stats.totalProperties, color: 'from-blue-500 to-cyan-500', percentage: (stats.soldProperties / stats.totalProperties * 100).toFixed(1) },
            { label: 'Rented Properties', value: stats.rentedProperties, total: stats.totalProperties, color: 'from-purple-500 to-pink-500', percentage: (stats.rentedProperties / stats.totalProperties * 100).toFixed(1) },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-sm font-medium">{item.label}</span>
                <span className="text-white font-bold">{item.percentage}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-3 rounded-full bg-gradient-to-r ${item.color} transition-all`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>{item.value} properties</span>
                <span>out of {item.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-6">
          <p className="text-blue-400 text-sm font-medium mb-2">Avg Property Value</p>
          <p className="text-2xl font-bold text-white">د.ك {formatKwd(stats.totalRevenueKwd / stats.totalProperties)}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-6">
          <p className="text-green-400 text-sm font-medium mb-2">Total Commission Earned</p>
          <p className="text-2xl font-bold text-white">د.ك {formatKwd(stats.totalRevenueKwd * 0.05)}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg p-6">
          <p className="text-purple-400 text-sm font-medium mb-2">Success Rate</p>
          <p className="text-2xl font-bold text-white">{((stats.soldProperties + stats.rentedProperties) / stats.totalProperties * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
}
