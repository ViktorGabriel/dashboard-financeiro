import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { CashFlowChart } from './components/CashFlowChart';
import { CategoryPieChart } from './components/CategoryPieChart';
import { TransactionTable } from './components/TransactionTable';
import { NewTransactionModal } from './components/NewTransactionModal';

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleSuccess() {
    setRefreshKey((k) => k + 1);
  }

  return (
    <div className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      <Header onNewTransaction={() => setShowModal(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <SummaryCards refreshKey={refreshKey} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CashFlowChart refreshKey={refreshKey} />
          <CategoryPieChart refreshKey={refreshKey} />
        </div>

        <TransactionTable refreshKey={refreshKey} />
      </main>

      {showModal && (
        <NewTransactionModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const [page, setPage] = useState<'login' | 'register'>('login');

  if (!isAuthenticated) {
    if (page === 'register') {
      return <Register onNavigate={setPage} />;
    }
    return <Login onNavigate={setPage} />;
  }

  return <Dashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
