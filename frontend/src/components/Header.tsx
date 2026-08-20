import { LogOut, PlusCircle, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onNewTransaction: () => void;
}

export function Header({ onNewTransaction }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-700 font-bold text-lg">
          <LayoutDashboard size={22} />
          <span>Dashboard Financeiro</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 hidden sm:block">
            Olá, <strong>{user?.name}</strong>
          </span>

          <button
            onClick={onNewTransaction}
            className="flex items-center gap-1 bg-blue-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={16} />
            <span className="hidden sm:inline">Nova Transação</span>
          </button>

          <button
            onClick={logout}
            title="Sair"
            className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors text-sm px-2 py-2 rounded-lg hover:bg-gray-100"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
