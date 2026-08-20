import { LogOut, PlusCircle, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onNewTransaction: () => void;
}

export function Header({ onNewTransaction }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/70 sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/25">
            <LayoutDashboard size={20} className="stroke-[2.2]" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-slate-900 text-base sm:text-lg block leading-none">
              Dashboard Financeiro
            </span>
            <span className="text-[11px] text-slate-400 font-medium tracking-wide">
              GESTÃO & CONTROLE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user?.name && (
            <div className="hidden sm:flex items-center gap-2 bg-slate-100/70 border border-slate-200/60 rounded-full px-3 py-1 text-xs text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{user.name}</span>
            </div>
          )}

          <button
            onClick={onNewTransaction}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl shadow-sm shadow-indigo-600/20 hover:shadow-md hover:shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <PlusCircle size={17} className="stroke-[2.2]" />
            <span>Nova Transação</span>
          </button>

          <button
            onClick={logout}
            title="Sair da conta"
            className="flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl p-2 transition-all cursor-pointer"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
