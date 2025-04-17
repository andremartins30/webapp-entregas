import { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { NavLink } from 'react-router-dom';

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    const { signOut } = useAuth();

    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        `inline-flex items-center justify-center w-24 px-4 py-2 border-b-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${isActive
            ? 'text-gray-900 border-gray-500'
            : 'text-gray-500 hover:text-gray-900 border-transparent'
        }`;

    return (
        <div className="min-h-screen --background-color">
            <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 mr-8">
                                <span className="text-lg font-semibold">Coleta / Entrega</span>
                            </div>
                            <div className="flex space-x-4">
                                <NavLink to="/dashboard" className={linkClasses}>
                                    Dashboard
                                </NavLink>
                                <NavLink to="/entregas" className={linkClasses}>
                                    Entregas
                                </NavLink>
                                <NavLink to="/veiculos" className={linkClasses}>
                                    Veículos
                                </NavLink>
                                <NavLink to="/usuarios" className={linkClasses}>
                                    Usuários
                                </NavLink>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={signOut}
                                className="text-gray-500 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-16">
                {children}
            </main>
        </div>
    );
}