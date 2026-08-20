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

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#22c55e', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export function CategoryPieChart({ refreshKey }: CategoryPieChartProps) {
  const [data, setData] = useState<CategoryBreakdown[]>([]);

  useEffect(() => {
    api.get('/dashboard/categories').then((res) => setData(res.data));
  }, [refreshKey]);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-base font-semibold text-gray-700 mb-3">Despesas por Categoria</h2>
        <p className="text-sm text-gray-400 text-center py-8">Nenhuma despesa registrada ainda.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-base font-semibold text-gray-700 mb-3">Despesas por Categoria</h2>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [formatCurrency(Number(value)), String(name)]}
          />
          <Legend
            formatter={(value, entry: any) => `${value} (${entry.payload.percentage}%)`}
            iconType="circle"
            iconSize={10}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
