import { LogOut, PlusCircle, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onNewTransaction: () => void;
}

export function Header({ onNewTransaction }: HeaderProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800/80 sticky top-0 z-30 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/25">
            <LayoutDashboard size={20} className="stroke-[2.2]" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-slate-900 dark:text-white text-base sm:text-lg block leading-none transition-colors">
              Dashboard Financeiro
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium tracking-wide">
              GESTÃO & CONTROLE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {user?.name && (
            <div className="hidden sm:flex items-center gap-2 bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 rounded-full px-3 py-1 text-xs text-slate-600 dark:text-slate-300 font-medium transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{user.name}</span>
            </div>
          )}

          {/* Botão de Alternância de Tema */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
            aria-label="Alternar tema"
            className="flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-xl p-2 transition-all cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-amber-400 rotate-0 transition-transform duration-300" />
            ) : (
              <Moon size={18} className="text-slate-600 rotate-0 transition-transform duration-300" />
            )}
          </button>

          <button
            onClick={onNewTransaction}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl shadow-sm shadow-indigo-600/20 hover:shadow-md hover:shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <PlusCircle size={17} className="stroke-[2.2]" />
            <span className="hidden sm:inline">Nova Transação</span>
          </button>

          <button
            onClick={logout}
            title="Sair da conta"
            className="flex items-center justify-center text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-transparent hover:border-rose-100 dark:hover:border-rose-900/40 rounded-xl p-2 transition-all cursor-pointer"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
