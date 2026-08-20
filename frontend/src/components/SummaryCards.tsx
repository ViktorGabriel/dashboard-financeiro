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

  const balance = summary?.balance ?? 0;
  const incomes = summary?.incomes ?? 0;
  const expenses = summary?.expenses ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Signature Element: Card de Saldo Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 shadow-xl shadow-indigo-950/20 border border-indigo-500/20 flex flex-col justify-between group hover:border-indigo-500/40 transition-all duration-300">
        {/* Glow sutil no fundo */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/30 transition-all duration-500" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
              Saldo Total
            </span>
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-indigo-300">
              <Wallet size={18} />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl font-bold tracking-tight text-white tabular-nums">
              {formatCurrency(balance)}
            </h3>
            <p className="text-xs text-indigo-200/70 font-medium">
              {balance >= 0 ? '✓ Posição líquida positiva' : '⚠ Posição líquida negativa'}
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-indigo-300/80">
          <span>Status Financeiro</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/20">
            Atualizado
          </span>
        </div>
      </div>

      {/* Card de Receitas */}
      <div className="rounded-2xl bg-white dark:bg-slate-900/90 p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/50 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Entradas / Receitas
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
              <TrendingUp size={18} />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
              {formatCurrency(incomes)}
            </h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Total acumulado de créditos
            </p>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>Fluxo positivo</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs">+{formatCurrency(incomes)}</span>
        </div>
      </div>

      {/* Card de Despesas */}
      <div className="rounded-2xl bg-white dark:bg-slate-900/90 p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 hover:border-rose-500/30 dark:hover:border-rose-500/50 hover:shadow-md hover:shadow-rose-500/5 transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Saídas / Despesas
            </span>
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-800/60 text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
              <TrendingDown size={18} />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
              {formatCurrency(expenses)}
            </h3>
            <p className="text-xs text-rose-600 dark:text-rose-400 font-medium flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500" />
              Total acumulado de débitos
            </p>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
          <span>Fluxo negativo</span>
          <span className="font-semibold text-rose-600 dark:text-rose-400 text-xs">-{formatCurrency(expenses)}</span>
        </div>
      </div>
    </div>
  );
}
