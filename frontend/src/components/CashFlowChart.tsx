import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';
import { formatCurrency } from '../utils/formatters';

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

export function CashFlowChart({ refreshKey }: CashFlowChartProps) {
  const [data, setData] = useState<CashFlowPoint[]>([]);

  useEffect(() => {
    api.get('/dashboard/cash-flow').then((res) => setData(res.data));
  }, [refreshKey]);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-base font-semibold text-gray-700 mb-3">Fluxo de Caixa Mensal</h2>
        <p className="text-sm text-gray-400 text-center py-8">Nenhum dado disponível ainda.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-base font-semibold text-gray-700 mb-3">Fluxo de Caixa Mensal</h2>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="period" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={formatTick} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => formatCurrency(Number(value))}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend />
          <Bar dataKey="incomes" name="Receitas" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" name="Despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
