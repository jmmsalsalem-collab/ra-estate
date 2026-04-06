'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Building2, DollarSign, Users, TrendingUp, Percent, BarChart3,
  ArrowUpRight, ArrowDownRight, Star, Plus, UserPlus, FileText,
  Sparkles, ArrowRight
} from 'lucide-react';
import { agents, activities, monthlyRevenue, propertyTypeData, locationData, transactionTrend, formatKwd } from '@/lib/demo-data';

// Animated counter hook
function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return count;
}

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const count = useCounter(value);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const kpis = [
  { label: 'Total Properties', value: 156, display: '156', change: '+12%', positive: true, icon: Building2, color: '#00d4ff', sparkData: [40, 55, 45, 68, 72, 85, 92, 156] },
  { label: 'Total Revenue', value: 28.75, display: '28.75M', prefix: 'د.ك ', change: '+18%', positive: true, icon: DollarSign, color: '#a855f7', sparkData: [8, 12, 15, 18, 22, 25, 27, 28.75] },
  { label: 'Active Clients', value: 342, display: '342', change: '+8%', positive: true, icon: Users, color: '#00d4ff', sparkData: [120, 150, 180, 220, 260, 290, 320, 342] },
  { label: 'Transactions', value: 67, display: '67', change: '+15%', positive: true, icon: TrendingUp, color: '#7c3aed', sparkData: [10, 18, 25, 32, 42, 50, 58, 67] },
  { label: 'Commission', value: 1.44, display: '1.44M', prefix: 'د.ك ', change: '+22%', positive: true, icon: Percent, color: '#3b82f6', sparkData: [0.2, 0.4, 0.6, 0.8, 1.0, 1.15, 1.3, 1.44] },
  { label: 'Occupancy', value: 87, display: '87%', suffix: '%', change: '-2%', positive: false, icon: BarChart3, color: '#a855f7', sparkData: [82, 85, 88, 90, 89, 88, 86, 87] },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d0d1a]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl px-4 py-3 shadow-2xl">
      <p className="text-white/40 text-[10px] mb-1.5 uppercase tracking-wider">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-[12px]" style={{ color: entry.color }}>
          {entry.name}: <span className="font-semibold text-white">د.ك {formatKwd(entry.value)}</span>
        </p>
      ))}
    </div>
  );
};

interface DashboardProps {
  onNavigate: (tab: any) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="space-y-8">
      {/* ── Welcome Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="text-white/20 text-xs tracking-wide">{dateStr}</p>
          <h1 className="text-2xl font-bold text-white mt-1">
            {greeting} 👋
          </h1>
          <p className="text-white/25 text-sm mt-1">Here&apos;s what&apos;s happening with your portfolio today.</p>
        </div>
        {/* Status bar */}
        <div className="flex items-center gap-4 text-xs text-white/25">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            3 pending deals
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            2 new clients today
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
            Live
          </span>
        </div>
      </div>

      {/* ── Hero Revenue Card ── */}
      <div className="glass-card-accent p-7 gradient-border">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <p className="text-white/25 text-xs uppercase tracking-wider font-medium">Total Portfolio Revenue</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-white/40 text-lg">د.ك</span>
              <span className="text-4xl font-bold neon-text-blue animate-count">28,750,000</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-400 font-medium">
              <ArrowUpRight size={12} />
              <span>+18% vs last quarter</span>
              <span className="text-white/15 ml-2">|</span>
              <span className="text-white/25 ml-2">5.2M KWD this month</span>
            </div>
          </div>
          <div className="w-full lg:w-64 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="revenue" stroke="#00d4ff" strokeWidth={2} fill="url(#heroGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button onClick={() => onNavigate('properties')} className="quick-action flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/[0.08] flex items-center justify-center group-hover:bg-[#00d4ff]/[0.12] transition-colors">
            <Plus size={17} className="text-[#00d4ff]" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">Add Property</p>
            <p className="text-[10px] text-white/15">List a new property</p>
          </div>
          <ArrowRight size={14} className="ml-auto text-white/10 group-hover:text-white/25 transition-colors" />
        </button>
        <button onClick={() => onNavigate('clients')} className="quick-action flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-xl bg-[#a855f7]/[0.08] flex items-center justify-center group-hover:bg-[#a855f7]/[0.12] transition-colors">
            <UserPlus size={17} className="text-[#a855f7]" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">New Client</p>
            <p className="text-[10px] text-white/15">Register a client</p>
          </div>
          <ArrowRight size={14} className="ml-auto text-white/10 group-hover:text-white/25 transition-colors" />
        </button>
        <button onClick={() => onNavigate('transactions')} className="quick-action flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/[0.08] flex items-center justify-center group-hover:bg-emerald-500/[0.12] transition-colors">
            <FileText size={17} className="text-emerald-400" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">Record Deal</p>
            <p className="text-[10px] text-white/15">Log a transaction</p>
          </div>
          <ArrowRight size={14} className="ml-auto text-white/10 group-hover:text-white/25 transition-colors" />
        </button>
      </div>

      {/* ── KPI Grid (2x3) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="glass-card p-5 animate-fade-in group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white/20 text-[11px] font-medium tracking-wide uppercase">{kpi.label}</p>
                  <div className="flex items-baseline gap-1 mt-1.5">
                    {kpi.prefix && <span className="text-white/30 text-sm">{kpi.prefix}</span>}
                    <span className="text-[22px] font-bold text-white">{kpi.display}</span>
                  </div>
                </div>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center opacity-60 group-hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: `${kpi.color}10` }}
                >
                  <Icon size={16} style={{ color: kpi.color }} />
                </div>
              </div>
              {/* Mini sparkline */}
              <div className="h-8 mt-1 mb-2 opacity-40 group-hover:opacity-60 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={kpi.sparkData.map((v, j) => ({ v, i: j }))}>
                    <defs>
                      <linearGradient id={`spark-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={kpi.color} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={kpi.color} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke={kpi.color} strokeWidth={1.5} fill={`url(#spark-${i})`} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-medium ${kpi.positive ? 'text-emerald-400/70' : 'text-red-400/70'}`}>
                {kpi.positive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                <span>{kpi.change} vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Charts Row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Revenue Trend</h3>
              <p className="text-[10px] text-white/15 mt-0.5">Monthly revenue & commissions</p>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-white/20">
              <span className="flex items-center gap-1.5"><span className="w-2 h-0.5 rounded-full bg-[#00d4ff]" />Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-0.5 rounded-full bg-[#a855f7]" />Commission</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gCom" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.1)" tick={{ fontSize: 10 }} />
              <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fontSize: 10 }} tickFormatter={(v) => formatKwd(v)} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#00d4ff" strokeWidth={2} fill="url(#gRev)" />
              <Area type="monotone" dataKey="commissions" name="Commission" stroke="#a855f7" strokeWidth={1.5} fill="url(#gCom)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Portfolio Mix</h3>
          <p className="text-[10px] text-white/15 mb-4">By property type</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={propertyTypeData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" stroke="none">
                {propertyTypeData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0d0d1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-2">
            {propertyTypeData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-[10px] text-white/30">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.fill }} />
                {d.name} ({d.value})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Charts Row 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Deal Pipeline</h3>
          <p className="text-[10px] text-white/15 mb-5">Weekly transaction status</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={transactionTrend} barGap={2} barSize={14}>
              <CartesianGrid stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.1)" tick={{ fontSize: 10 }} />
              <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#0d0d1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', fontSize: '11px' }} />
              <Bar dataKey="completed" name="Completed" fill="#00d4ff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" name="Pending" fill="#a855f7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="under_contract" name="Contract" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-sm font-semibold text-white mb-1">Top Areas</h3>
          <p className="text-[10px] text-white/15 mb-4">Properties by location</p>
          <div className="space-y-3.5">
            {locationData.slice(0, 6).map((loc) => {
              const maxProps = Math.max(...locationData.map((l) => l.properties));
              const pct = (loc.properties / maxProps) * 100;
              return (
                <div key={loc.location}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-white/50">{loc.location}</span>
                    <span className="text-[10px] text-white/20">{loc.properties}</span>
                  </div>
                  <div className="w-full h-[5px] rounded-full bg-white/[0.03] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#00d4ff]/80 to-[#a855f7]/80 transition-all duration-1000" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom: Activity + Agents ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
              <p className="text-[10px] text-white/15 mt-0.5">Latest team actions</p>
            </div>
            <Sparkles size={14} className="text-white/10" />
          </div>
          <div className="space-y-4">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 group">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${act.avatar_color} flex items-center justify-center text-[9px] font-bold text-white shrink-0 ring-2 ring-white/[0.03]`}>
                  {act.agent_name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-white/60">
                    <span className="font-medium text-white/80">{act.agent_name}</span>
                    {' '}{act.action}
                  </p>
                  <p className="text-[10px] text-white/15 mt-0.5">{act.detail}</p>
                </div>
                <span className="text-[9px] text-white/10 shrink-0 pt-0.5">{act.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Agents */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Top Agents</h3>
              <p className="text-[10px] text-white/15 mt-0.5">By revenue</p>
            </div>
            <button onClick={() => onNavigate('analytics')} className="text-[10px] text-[#00d4ff]/40 hover:text-[#00d4ff]/70 transition-colors">View all →</button>
          </div>
          <div className="space-y-2">
            {agents.map((agent, i) => (
              <div key={agent.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/[0.02] transition-colors">
                <span className={`text-[10px] w-4 text-center font-mono ${i === 0 ? 'text-amber-400' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-400' : 'text-white/10'}`}>
                  {i + 1}
                </span>
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${agent.avatar_color} flex items-center justify-center text-[8px] font-bold text-white shrink-0`}>
                  {agent.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-white/70 truncate">{agent.name}</p>
                  <p className="text-[10px] text-white/15">{agent.deals_closed} deals</p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] font-semibold neon-text-blue">د.ك {formatKwd(agent.revenue_kwd)}</p>
                  <div className="flex items-center gap-0.5 justify-end mt-0.5">
                    <Star size={8} className="text-amber-400/60 fill-amber-400/60" />
                    <span className="text-[9px] text-white/15">{agent.rating}</span>
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
