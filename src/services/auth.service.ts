import api from './api';

export interface User {
    id: string;
    name: string;
    email: string;
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

    async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const response = await api.post('/usuarios/login', { email, password });
        const { token, user } = response.data;
        this.setToken(token);
        return { user, token };
    }

    async logout(): Promise<void> {
        try {
            await api.post('/usuarios/logout');
        } catch (error) {
            console.error('Erro ao fazer logout na API:', error);
        } finally {
            this.clearAuth();
        }
    }

    async getCurrentUser(): Promise<User | null> {
        const token = this.getToken();

        if (!token) {
            return null;
        }

        try {
            this.setAuthHeader(token);
            const response = await api.get('/usuarios/me');
            return response.data.user;
        } catch (error) {
            this.clearAuth();
            return null;
        }
    }

    clearAuth(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.setAuthHeader(null);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

export default new AuthService();
