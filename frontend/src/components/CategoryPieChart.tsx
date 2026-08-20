import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';
import { formatCurrency } from '../utils/formatters';

interface CategoryBreakdown {
  category: string;
  total: number;
  percentage: number;
}

interface CategoryPieChartProps {
  refreshKey: number;
}

const COLORS = [
  '#6366f1', // Indigo
  '#10b981', // Emerald
  '#f43f5e', // Rose
  '#f59e0b', // Amber
  '#8b5cf6', // Violet
  '#0ea5e9', // Sky
  '#ec4899', // Pink
  '#14b8a6', // Teal
];

function CustomPieTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-800 text-white px-3.5 py-2 rounded-xl shadow-xl text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-slate-200">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.payload.fill }} />
          <span>{data.name}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-300">
          <span>Total:</span>
          <span className="font-bold text-white tabular-nums">{formatCurrency(Number(data.value))}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-400 text-[11px]">
          <span>Representação:</span>
          <span className="font-medium text-indigo-300">{data.payload.percentage}%</span>
        </div>
      </div>
    );
  }
  return null;
}

export function CategoryPieChart({ refreshKey }: CategoryPieChartProps) {
  const [data, setData] = useState<CategoryBreakdown[]>([]);

  useEffect(() => {
    api.get('/dashboard/categories').then((res) => setData(res.data));
  }, [refreshKey]);

  if (data.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">Despesas por Categoria</h2>
          <span className="text-xs text-slate-400">Distribuição</span>
        </div>
        <p className="text-sm text-slate-400 text-center py-12">Nenhuma despesa registrada ainda.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">Despesas por Categoria</h2>
          <p className="text-xs text-slate-400 mt-0.5">Distribuição percentual de saídas</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
          Distribuição
        </span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={95}
            paddingAngle={4}
            strokeWidth={0}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                className="transition-all hover:opacity-80 cursor-pointer"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
          <Legend
            formatter={(value, entry: any) => (
              <span className="text-xs text-slate-600 font-medium">
                {value} <span className="text-slate-400 font-normal">({entry.payload.percentage}%)</span>
              </span>
            )}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: '8px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
