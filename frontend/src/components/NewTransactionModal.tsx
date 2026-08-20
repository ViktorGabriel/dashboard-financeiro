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
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Nova Transação</h2>
            <p className="text-xs text-slate-400">Preencha os dados da movimentação</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-200/80 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Tipo de Movimentação
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setType('INCOME')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  type === 'INCOME'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                + Receita (Entrada)
              </button>
              <button
                type="button"
                onClick={() => setType('EXPENSE')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  type === 'EXPENSE'
                    ? 'bg-white text-rose-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                - Despesa (Saída)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Descrição
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="Ex: Salário mensal, Supermercado..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Valor (R$)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                R$
              </span>
              <input
                type="text"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 font-semibold tabular-nums placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="0,00"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Categoria
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="Ex: Alimentação, Transporte, Lazer... (Padrão: Geral)"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-semibold text-xs rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
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
