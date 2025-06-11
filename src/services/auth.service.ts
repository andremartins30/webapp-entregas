import { api } from './api';

export interface User {
    id: number;
    nome: string;
    email: string;
    role: 'GESTOR' | 'ENTREGADOR';
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

class AuthService {
    private TOKEN_KEY = 'token';

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        this.setAuthHeader(token);
    }

    setAuthHeader(token: string | null): void {
        if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
        } else {
            delete api.defaults.headers.authorization;
        }
    }

    /**
     * Faz login do usuário
     */
    async login(email: string, password: string): Promise<LoginResponse> {
        try {
            const response = await api.post('/usuarios/login', { email, password });
            const { token, user } = response.data;
            this.setToken(token);
            return { user, token };
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    }

    /**
     * Faz logout do usuário
     */
    async logout(): Promise<void> {
        try {
            await api.post('/usuarios/logout');
        } catch (error) {
            console.error('Erro ao fazer logout na API:', error);
        } finally {
            this.clearAuth();
        }
    }

    /**
     * Busca dados do usuário autenticado atual
     */
    async getCurrentUser(): Promise<User | null> {
        const token = this.getToken();

        if (!token) {
            return null;
        }

        try {
            this.setAuthHeader(token);
            const response = await api.get('/usuarios/me');
            return response.data.user || response.data;
        } catch (error) {
            console.error('Erro ao buscar usuário atual:', error);
            this.clearAuth();
            return null;
        }
    }

    /**
     * Limpa dados de autenticação
     */
    clearAuth(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.setAuthHeader(null);
    }

    /**
     * Verifica se o usuário está autenticado
     */
    isAuthenticated(): boolean {
        return !!this.getToken();
    }    /**
     * Inicializa o serviço de autenticação
     */
    init(): void {
        const token = this.getToken();
        if (token) {
            this.setAuthHeader(token);
        }
    }
}

export default new AuthService();
