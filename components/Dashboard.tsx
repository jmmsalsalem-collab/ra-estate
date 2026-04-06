'use client';

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Building2, DollarSign, Users, TrendingUp, Percent, BarChart3,
  ArrowUpRight, ArrowDownRight, Star
} from 'lucide-react';
import { agents, activities, monthlyRevenue, propertyTypeData, locationData, transactionTrend, formatKwd } from '@/lib/demo-data';

const kpis = [
  { label: 'Total Properties', value: '156', change: '+12%', positive: true, icon: Building2, gradient: 'from-[#00d4ff] to-[#3b82f6]' },
  { label: 'Total Revenue', value: '28.75M', prefix: 'د.ك', change: '+18%', positive: true, icon: DollarSign, gradient: 'from-[#a855f7] to-[#7c3aed]' },
  { label: 'Active Clients', value: '342', change: '+8%', positive: true, icon: Users, gradient: 'from-[#00d4ff] to-[#06b6d4]' },
  { label: 'Transactions', value: '67', change: '+15%', positive: true, icon: TrendingUp, gradient: 'from-[#7c3aed] to-[#a855f7]' },
  { label: 'Commission Earned', value: '1.44M', prefix: 'د.ك', change: '+22%', positive: true, icon: Percent, gradient: 'from-[#3b82f6] to-[#00d4ff]' },
  { label: 'Occupancy Rate', value: '87%', change: '-2%', positive: false, icon: BarChart3, gradient: 'from-[#a855f7] to-[#ec4899]' },
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

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="glass-card p-5 group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-white/30 text-xs font-medium tracking-wide uppercase">{kpi.label}</p>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    {kpi.prefix && <span className="text-white/40 text-sm">{kpi.prefix}</span>}
                    <span className="text-2xl font-bold text-white">{kpi.value}</span>
                  </div>
                  <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${kpi.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {kpi.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    <span>{kpi.change} vs last month</span>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                  <Icon size={18} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Revenue Trend — wider */}
        <div className="lg:col-span-4 glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Revenue Trend</h3>
          <p className="text-[11px] text-white/25 mb-5">Monthly revenue & commission overview</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gCom" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.15)" tick={{ fontSize: 11 }} />
              <YAxis stroke="rgba(255,255,255,0.15)" tick={{ fontSize: 11 }} tickFormatter={(v) => formatKwd(v)} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#00d4ff" strokeWidth={2} fill="url(#gRev)" />
              <Area type="monotone" dataKey="commissions" name="Commission" stroke="#a855f7" strokeWidth={2} fill="url(#gCom)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Property Distribution — donut */}
        <div className="lg:col-span-3 glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Property Distribution</h3>
          <p className="text-[11px] text-white/25 mb-5">By property type</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={propertyTypeData}
                cx="50%" cy="50%"
                innerRadius={70} outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {propertyTypeData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#0d0d1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 -mt-4">
            {propertyTypeData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs text-white/50">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.fill }} />
                {d.name} ({d.value})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Transaction Status */}
        <div className="lg:col-span-4 glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Transaction Status</h3>
          <p className="text-[11px] text-white/25 mb-5">Weekly deal pipeline</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={transactionTrend} barGap={4}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.15)" tick={{ fontSize: 11 }} />
              <YAxis stroke="rgba(255,255,255,0.15)" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#0d0d1a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }} />
              <Bar dataKey="completed" name="Completed" fill="#00d4ff" radius={[6, 6, 0, 0]} />
              <Bar dataKey="pending" name="Pending" fill="#a855f7" radius={[6, 6, 0, 0]} />
              <Bar dataKey="under_contract" name="Contract" fill="#7c3aed" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Locations */}
        <div className="lg:col-span-3 glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Top Locations</h3>
          <p className="text-[11px] text-white/25 mb-5">Properties by area</p>
          <div className="space-y-3">
            {locationData.slice(0, 6).map((loc) => {
              const maxProps = Math.max(...locationData.map((l) => l.properties));
              const pct = (loc.properties / maxProps) * 100;
              return (
                <div key={loc.location}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/60">{loc.location}</span>
                    <span className="text-xs text-white/30">{loc.properties} props</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#00d4ff] to-[#a855f7] transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Row: Activity + Top Agents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Recent Activity</h3>
          <p className="text-[11px] text-white/25 mb-5">Latest team actions</p>
          <div className="space-y-4">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${act.avatar_color} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                  {act.agent_name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/80">
                    <span className="font-medium text-white">{act.agent_name}</span>
                    {' '}{act.action}
                  </p>
                  <p className="text-xs text-white/25 mt-0.5">{act.detail}</p>
                </div>
                <span className="text-[10px] text-white/20 shrink-0">{act.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Agents */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Top Performing Agents</h3>
          <p className="text-[11px] text-white/25 mb-5">By revenue generated</p>
          <div className="space-y-3">
            {agents.map((agent, i) => (
              <div key={agent.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <span className="text-xs text-white/20 w-5 text-center font-mono">{i + 1}</span>
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${agent.avatar_color} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                  {agent.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{agent.name}</p>
                  <p className="text-[11px] text-white/25">{agent.deals_closed} deals</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold neon-text-blue">د.ك {formatKwd(agent.revenue_kwd)}</p>
                  <div className="flex items-center gap-0.5 justify-end mt-0.5">
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                    <span className="text-[10px] text-white/30">{agent.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
