import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import authService, { User } from '../services/auth.service';

interface AuthContextData {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStoredAuth = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                }
            } catch (error) {
                console.error('Error loading auth:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStoredAuth();
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            const { user } = await authService.login(email, password);
            setUser(user);
        } catch {
            throw new Error('Erro na autenticação');
        }
    };

    const signOut = async () => {
        await authService.logout();
        setUser(null);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated: !!user,
            user,
            loading,
            signIn,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
