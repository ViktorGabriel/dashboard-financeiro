import { useEffect, useState } from 'react';
import { Filter, ArrowUpRight, ArrowDownLeft, ReceiptText } from 'lucide-react';
import { api } from '../services/api';
import { formatCurrency, formatDate } from '../utils/formatters';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  createdAt: string;
}

interface TransactionTableProps {
  refreshKey: number;
}

export function TransactionTable({ refreshKey }: TransactionTableProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (typeFilter) params.append('type', typeFilter);
    if (categoryFilter) params.append('category', categoryFilter);
    api.get(`/transactions?${params.toString()}`).then((res) => setTransactions(res.data));
  }, [refreshKey, typeFilter, categoryFilter]);

  const categories = [...new Set(transactions.map((t) => t.category))];

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900/90 p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white transition-colors">Histórico de Transações</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Acompanhe todas as movimentações recentes</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 rounded-xl px-3 py-2 pr-7 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer appearance-none"
            >
              <option value="">Todos os Tipos</option>
              <option value="INCOME">Receitas</option>
              <option value="EXPENSE">Despesas</option>
            </select>
            <Filter size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 rounded-xl px-3 py-2 pr-7 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer appearance-none"
            >
              <option value="">Todas as Categorias</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <Filter size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-12 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-600 mb-3">
            <ReceiptText size={24} />
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Nenhuma transação encontrada</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Tente ajustar os filtros ou adicione uma nova movimentação.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                <th className="pb-3 pl-2">Descrição</th>
                <th className="pb-3">Categoria</th>
                <th className="pb-3">Tipo</th>
                <th className="pb-3 text-right">Valor</th>
                <th className="pb-3 text-right pr-2">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl text-xs flex items-center justify-center ${
                        t.type === 'INCOME'
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
                      }`}>
                        {t.type === 'INCOME' ? <ArrowUpRight size={15} /> : <ArrowDownLeft size={15} />}
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {t.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/60">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      t.type === 'INCOME'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/50'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/50'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${t.type === 'INCOME' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      {t.type === 'INCOME' ? 'Receita' : 'Despesa'}
                    </span>
                  </td>
                  <td className={`py-3.5 text-right font-bold tabular-nums ${
                    t.type === 'INCOME' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {t.type === 'INCOME' ? '+' : '-'}{formatCurrency(t.amount)}
                  </td>
                  <td className="py-3.5 text-slate-400 dark:text-slate-500 text-xs text-right pr-2 tabular-nums">
                    {formatDate(t.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
