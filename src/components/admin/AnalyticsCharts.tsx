import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const trafficData = [
  { day: 'Mon', views: 2400, clicks: 820, claims: 140 },
  { day: 'Tue', views: 3200, clicks: 1100, claims: 210 },
  { day: 'Wed', views: 4100, clicks: 1450, claims: 290 },
  { day: 'Thu', views: 3800, clicks: 1320, claims: 240 },
  { day: 'Fri', views: 5200, clicks: 1980, claims: 410 },
  { day: 'Sat', views: 6800, clicks: 2600, claims: 580 },
  { day: 'Sun', views: 7400, clicks: 3100, claims: 720 },
];

const appPerformanceData = [
  { name: 'ME PASS', clicks: 3420, revenue: '$20,520' },
  { name: 'mPaisa', clicks: 2890, revenue: '$4,335' },
  { name: 'HiFami', clicks: 2540, revenue: '$3,810' },
  { name: 'Jolly Cash', clicks: 1980, revenue: '$2,970' },
  { name: 'JumpTask', clicks: 1620, revenue: '$1,620' },
  { name: 'Buzzerfan', clicks: 1210, revenue: '$1,210' },
];

const payoutMethodData = [
  { name: 'Ethio Telecom Airtime', value: 38, color: '#10b981' },
  { name: 'USDT Crypto', value: 32, color: '#3b82f6' },
  { name: 'Me Pass P2P', value: 18, color: '#eab308' },
  { name: 'Safaricom Airtime', value: 12, color: '#8b5cf6' },
];

export const AnalyticsCharts: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Traffic & Conversion Trend Chart */}
      <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="font-display font-bold text-lg text-foreground">Traffic & Claim Conversions</h3>
            <p className="text-xs text-muted-foreground">Daily page views vs referral click-throughs (Past 7 Days)</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-primary">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span> Page Views
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span> Referral Clicks
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2.5} fillOpacity={1} fill="url(#colorViews)" name="Page Views" />
              <Area type="monotone" dataKey="clicks" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorClicks)" name="Referral Clicks" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Most Popular Apps Bar Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border shadow-sm">
          <div className="mb-4">
            <h3 className="font-display font-bold text-lg text-foreground">Top Earning Apps Performance</h3>
            <p className="text-xs text-muted-foreground">Total user claims and referral engagements</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="clicks" name="Claim Clicks" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payout Channels Pie Chart */}
        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-foreground mb-1">Payout Channels</h3>
            <p className="text-xs text-muted-foreground mb-4">Distribution by user cashout method</p>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={payoutMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {payoutMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-border/50">
            {payoutMethodData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-semibold text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
