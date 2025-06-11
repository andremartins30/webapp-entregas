import { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import { LogOut, Truck, Package, Users, BarChart3 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    const { signOut } = useAuth();

    const navItems = [
        { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
        { to: '/entregas', icon: Package, label: 'Entregas' },
        { to: '/veiculos', icon: Truck, label: 'Veículos' },
        { to: '/usuarios', icon: Users, label: 'Usuários' },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-2">
                            <Package className="h-6 w-6" />
                            <span className="hidden font-bold sm:inline-block">
                                Coleta / Entrega
                            </span>
                        </div>

                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center space-x-2 transition-colors hover:text-foreground/80",
                                            isActive
                                                ? "text-foreground"
                                                : "text-foreground/60"
                                        )
                                    }
                                >
                                    <item.icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    <div className="ml-auto flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={signOut}
                            className="flex items-center space-x-2"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Sair</span>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto py-8">
                {children}
            </main>
        </div>
    );
}