import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MainLayout } from './components/Layout/MainLayout';
import { LoadingSpinner } from './components/ui/loading-spinner';
import { ReactNode } from 'react';
import { useAuth } from './contexts/AuthContext';

// Import direto das páginas
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import Entregas from './pages/Entregas';
import Veiculos from './pages/Veiculos';
import Usuarios from './pages/Usuarios/index.new';

function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <MainLayout>{children}</MainLayout>;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/entregas"
            element={
              <PrivateRoute>
                <Entregas />
              </PrivateRoute>
            }
          />
          <Route
            path="/veiculos"
            element={
              <PrivateRoute>
                <Veiculos />
              </PrivateRoute>
            }
          />            <Route
            path="/usuarios"
            element={
              <PrivateRoute>
                <Usuarios />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
