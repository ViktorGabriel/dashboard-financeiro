import { useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { api } from '../services/api';

interface NewTransactionModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function NewTransactionModal({ onClose, onSuccess }: NewTransactionModalProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    const amountInCents = Math.round(parseFloat(amount.replace(',', '.')) * 100);
    if (isNaN(amountInCents) || amountInCents <= 0) {
      setError('Informe um valor válido maior que zero.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/transactions', {
        description,
        amount: amountInCents,
        type,
        category: category || 'Geral',
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erro ao salvar transação.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-md overflow-hidden transition-colors">
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Nova Transação</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">Preencha os dados da movimentação</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/50 text-rose-700 dark:text-rose-300 px-3.5 py-2.5 rounded-xl text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Tipo de Movimentação
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setType('INCOME')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  type === 'INCOME'
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                + Receita (Entrada)
              </button>
              <button
                type="button"
                onClick={() => setType('EXPENSE')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  type === 'EXPENSE'
                    ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                - Despesa (Saída)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Descrição
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="Ex: Salário mensal, Supermercado..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Valor (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400 dark:text-slate-500">
                R$
              </span>
              <input
                type="text"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 font-semibold tabular-nums placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="0,00"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Categoria
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="Ex: Alimentação, Transporte, Lazer... (Padrão: Geral)"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs font-semibold rounded-xl shadow-sm shadow-indigo-600/25 hover:shadow-indigo-600/35 disabled:opacity-50 transition-all cursor-pointer"
            >
              {loading ? 'Salvando...' : 'Salvar Transação'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
