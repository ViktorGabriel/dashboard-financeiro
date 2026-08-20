import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';
import { formatCurrency } from '../utils/formatters';
import { useTheme } from '../contexts/ThemeContext';

interface CashFlowPoint {
  period: string;
  incomes: number;
  expenses: number;
  balance: number;
}

interface CashFlowChartProps {
  refreshKey: number;
}

function formatTick(value: number) {
  if (value >= 100) return `R$${(value / 100).toFixed(0)}`;
  return `${value}`;
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-sm border border-slate-800 text-white px-3.5 py-2.5 rounded-xl shadow-xl text-xs space-y-1.5">
        <p className="font-semibold text-slate-300 border-b border-slate-800 pb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-bold text-white tabular-nums">{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function CashFlowChart({ refreshKey }: CashFlowChartProps) {
  const [data, setData] = useState<CashFlowPoint[]>([]);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    api.get('/dashboard/cash-flow').then((res) => setData(res.data));
  }, [refreshKey]);

  if (data.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-slate-900/90 p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Fluxo de Caixa Mensal</h2>
          <span className="text-xs text-slate-400 dark:text-slate-500">Histórico</span>
        </div>
        <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-12">Nenhum dado disponível ainda.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900/90 p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">Fluxo de Caixa Mensal</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Comparativo de entradas e saídas</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
          Mensal
        </span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }} barGap={6}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#f1f5f9'} vertical={false} />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#64748b' }}
            axisLine={{ stroke: isDark ? '#334155' : '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatTick}
            tick={{ fontSize: 11, fill: isDark ? '#94a3b8' : '#64748b' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(241, 245, 249, 0.6)' }} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: '12px', fontSize: '12px', color: isDark ? '#94a3b8' : '#64748b' }}
          />
          <Bar dataKey="incomes" name="Receitas" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={32} />
          <Bar dataKey="expenses" name="Despesas" fill="#f43f5e" radius={[6, 6, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
