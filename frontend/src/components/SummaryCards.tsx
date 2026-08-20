import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { api } from '../services/api';
import { formatCurrency } from '../utils/formatters';

interface Summary {
  incomes: number;
  expenses: number;
  balance: number;
}

interface SummaryCardsProps {
  refreshKey: number;
}

export function SummaryCards({ refreshKey }: SummaryCardsProps) {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    api.get('/summary').then((res) => setSummary(res.data));
  }, [refreshKey]);

  const cards = [
    {
      label: 'Saldo Atual',
      value: summary?.balance ?? 0,
      icon: <Wallet size={20} />,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Receitas',
      value: summary?.incomes ?? 0,
      icon: <TrendingUp size={20} />,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Despesas',
      value: summary?.expenses ?? 0,
      icon: <TrendingDown size={20} />,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
          <div className={`${card.bg} ${card.color} p-3 rounded-lg`}>{card.icon}</div>
          <div>
            <p className="text-xs text-gray-500">{card.label}</p>
            <p className={`text-xl font-bold ${card.color}`}>{formatCurrency(card.value)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
