'use client';

import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Building2, Users, Award } from 'lucide-react';
import { agents, monthlyRevenue, propertyTypeData, locationData, formatKwd, transactions } from '@/lib/demo-data';

const revenueByType = [
  { type: 'Villas', revenue: 12_400_000, fill: '#00d4ff' },
  { type: 'Apartments', revenue: 8_200_000, fill: '#a855f7' },
  { type: 'Commercial', revenue: 5_800_000, fill: '#7c3aed' },
  { type: 'Land', revenue: 2_350_000, fill: '#3b82f6' },
];

const yearComparison = [
  { month: 'Jan', y2025: 2_800_000, y2026: 3_200_000 },
  { month: 'Feb', y2025: 3_500_000, y2026: 4_100_000 },
  { month: 'Mar', y2025: 4_200_000, y2026: 5_850_000 },
  { month: 'Apr', y2025: 5_100_000, y2026: 8_600_000 },
  { month: 'May', y2025: 4_800_000, y2026: 7_000_000 },
  { month: 'Jun', y2025: 4_300_000, y2026: 6_400_000 },
];

const commissionBreakdown = [
  { agent: 'Amira', commission: 421_000 },
  { agent: 'Khalid', commission: 339_000 },
  { agent: 'Fatima', commission: 260_000 },
  { agent: 'Omar', commission: 217_500 },
  { agent: 'Noura', commission: 155_000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d0d1a]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-white/50 text-xs mb-2">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: <span className="font-semibold text-white">د.ك {formatKwd(entry.value)}</span>
        </p>
      ))}
    </div>
  );
};

export default function Analytics() {
  const totalRevenue = 28_750_000;
  const lastYearRevenue = 24_700_000;
  const revenueGrowth = ((totalRevenue - lastYearRevenue) / lastYearRevenue * 100).toFixed(1);
  const avgDealSize = totalRevenue / 67;
  const conversionRate = 78;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={TrendingUp} label="Revenue Growth" value={`+${revenueGrowth}%`} subtitle="vs 2025" color="text-emerald-400" gradient="from-emerald-500 to-teal-500" />
        <MetricCard icon={DollarSign} label="Avg Deal Size" value={`${formatKwd(avgDealSize)}`} subtitle="KWD per transaction" color="neon-text-blue" gradient="from-[#00d4ff] to-[#3b82f6]" />
        <MetricCard icon={Users} label="Conversion Rate" value={`${conversionRate}%`} subtitle="Lead to deal" color="neon-text-purple" gradient="from-[#a855f7] to-[#7c3aed]" />
        <MetricCard icon={Award} label="Top Agent" value="Amira" subtitle="23 deals closed" color="text-amber-400" gradient="from-amber-500 to-orange-500" />
      </div>

      {/* Year-over-Year */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-1">Year-over-Year Revenue</h3>
        <p className="text-[11px] text-white/25 mb-5">2025 vs 2026 comparison</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yearComparison}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.15)" tick={{ fontSize: 11 }} />
            <YAxis stroke="rgba(255,255,255,0.15)" tick={{ fontSize: 11 }} tickFormatter={(v) => formatKwd(v)} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }} />
            <Line type="monotone" dataKey="y2025" name="2025" stroke="#6b7294" strokeWidth={2} strokeDasharray="6 4" dot={false} />
            <Line type="monotone" dataKey="y2026" name="2026" stroke="#00d4ff" strokeWidth={2.5} dot={{ fill: '#00d4ff', r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue by Type + Commission Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Property Type */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Revenue by Property Type</h3>
          <p className="text-[11px] text-white/25 mb-5">KWD breakdown</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueByType} layout="vertical" barSize={20}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <XAxis type="number" stroke="rgba(255,255,255,0.15)" tick={{ fontSize: 11 }} tickFormatter={(v) => formatKwd(v)} />
              <YAxis type="category" dataKey="type" stroke="rgba(255,255,255,0.15)" tick={{ fontSize: 11 }} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" name="Revenue" radius={[0, 8, 8, 0]}>
                {revenueByType.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Commission Breakdown */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Commission Breakdown</h3>
          <p className="text-[11px] text-white/25 mb-5">By agent</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={commissionBreakdown} barSize={32}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <XAxis dataKey="agent" stroke="rgba(255,255,255,0.15)" tick={{ fontSize: 11 }} />
              <YAxis stroke="rgba(255,255,255,0.15)" tick={{ fontSize: 11 }} tickFormatter={(v) => formatKwd(v)} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="commission" name="Commission" fill="#a855f7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent Leaderboard */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-1">Agent Leaderboard</h3>
        <p className="text-[11px] text-white/25 mb-5">Performance rankings</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {['Rank', 'Agent', 'Properties', 'Deals', 'Revenue (KWD)', 'Commission (KWD)', 'Rating'].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-[11px] text-white/25 font-medium uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, i) => (
                <tr key={agent.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <span className={`w-6 h-6 inline-flex items-center justify-center rounded-full text-xs font-bold ${i === 0 ? 'bg-amber-500/20 text-amber-400' : i === 1 ? 'bg-gray-400/20 text-gray-300' : i === 2 ? 'bg-orange-500/20 text-orange-400' : 'text-white/20'}`}>
                      {i + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${agent.avatar_color} flex items-center justify-center text-[9px] font-bold text-white`}>
                        {agent.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="font-medium text-white">{agent.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white/50">{agent.properties_listed}</td>
                  <td className="py-3 px-4 text-white/50">{agent.deals_closed}</td>
                  <td className="py-3 px-4 font-semibold neon-text-blue">د.ك {formatKwd(agent.revenue_kwd)}</td>
                  <td className="py-3 px-4 text-emerald-400">د.ك {formatKwd(agent.commission_kwd)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400">★</span>
                      <span className="text-white/60 text-xs">{agent.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Location Revenue Heatmap */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-white mb-1">Revenue by Location</h3>
        <p className="text-[11px] text-white/25 mb-5">KWD per area</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {locationData.map((loc) => {
            const maxRev = Math.max(...locationData.map((l) => l.revenue));
            const intensity = loc.revenue / maxRev;
            return (
              <div key={loc.location} className="glass-card p-4 hover:border-[#00d4ff]/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{loc.location}</span>
                  <span className="text-[10px] text-white/25">{loc.properties} props</span>
                </div>
                <p className="text-lg font-bold neon-text-blue">د.ك {formatKwd(loc.revenue)}</p>
                <div className="w-full h-1 rounded-full bg-white/[0.04] mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#00d4ff] to-[#a855f7] transition-all duration-700"
                    style={{ width: `${intensity * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, subtitle, color, gradient }: any) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center opacity-80`}>
          <Icon size={18} className="text-white" />
        </div>
        <div>
          <p className="text-[10px] text-white/25 uppercase tracking-wider">{label}</p>
          <p className={`text-xl font-bold ${color} mt-0.5`}>{value}</p>
          <p className="text-[10px] text-white/20">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
