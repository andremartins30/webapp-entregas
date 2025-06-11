import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Mail, Lock, LogIn, Package } from 'lucide-react';
import { cn } from '../../lib/utils';
import vetorEntregas from '../../assets/Vetor-entregas.jpg';
import Logo from '../../assets/palusa-fix.png'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signIn(email, password);
            navigate('/dashboard');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login');
        } finally {
            setIsLoading(false);
        }
    }; return (
        <div className="min-h-[90vh] bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
                {/* Login Form Section */}
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-md space-y-6">
                        {/* Logo */}
                        <div className="text-center space-y-3">
                            <div className="flex justify-center">
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    className="w-64 h-40 object-contain mx-auto"
                                />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold tracking-tight">Bem-vindo ao Coleta Entrega</h1>
                            </div>
                        </div>                        {/* Login Card */}
                        <Card className="relative overflow-hidden">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                                    <LogIn className="h-5 w-5" />
                                    Login
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <input
                                                id="email"
                                                type="email"
                                                required
                                                className={cn(
                                                    "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background",
                                                    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                                                    "placeholder:text-muted-foreground",
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                                    "disabled:cursor-not-allowed disabled:opacity-50"
                                                )}
                                                placeholder="seu@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Senha
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <input
                                                id="password"
                                                type="password"
                                                required
                                                className={cn(
                                                    "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background",
                                                    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                                                    "placeholder:text-muted-foreground",
                                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                                    "disabled:cursor-not-allowed disabled:opacity-50"
                                                )}
                                                placeholder="Digite sua senha"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                Entrando...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <LogIn className="h-4 w-4" />
                                                Entrar
                                            </div>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>                {/* Image Section */}
                <div className="hidden lg:flex items-center justify-center">
                    <div className="p-8 bg-card border rounded-lg shadow-sm">
                        <div className="space-y-6 text-center">
                            <Package className="h-16 w-16 mx-auto text-primary" />
                            <img
                                src={vetorEntregas}
                                alt="Ilustração de entregas"
                                className="max-w-full h-auto object-contain rounded-lg"
                            />
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">Sistema de Entregas</h3>
                                <p className="text-muted-foreground">
                                    Gerencie suas entregas de forma eficiente e moderna
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

