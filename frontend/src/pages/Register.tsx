import { useState, type FormEvent } from 'react';
import { LayoutDashboard, ArrowRight, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface RegisterProps {
  onNavigate: (page: 'login' | 'register') => void;
}

export function Register({ onNavigate }: RegisterProps) {
  const { register } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 flex items-center justify-center p-4 selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-200/80 dark:border-slate-800 w-full max-w-md p-8 sm:p-10 relative">
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
        </button>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 mb-4">
            <LayoutDashboard size={26} className="stroke-[2.2]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Criar Nova Conta</h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium tracking-wide uppercase mt-1">Comece a gerenciar suas finanças</p>
        </div>

        {error && (
          <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/50 text-rose-700 dark:text-rose-300 px-4 py-3 rounded-xl mb-5 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Nome Completo</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="Seu nome completo"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white py-2.5 rounded-xl font-semibold text-sm shadow-sm shadow-indigo-600/25 hover:shadow-indigo-600/35 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>{loading ? 'Cadastrando...' : 'Criar Conta'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
          Já possui uma conta?{' '}
          <button onClick={() => onNavigate('login')} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold hover:underline cursor-pointer">
            Fazer login
          </button>
        </p>
      </div>
    </div>
  );
}
