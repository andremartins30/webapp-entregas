import { api } from './api';

export interface IUsuario {
    id?: number;
    nome: string;
    email: string;
    role: 'GESTOR' | 'ENTREGADOR';
    criadoEm?: string;
    atualizadoEm?: string;
}

export interface IUsuarioCreate {
    nome: string;
    email: string;
    password: string;
    role: 'GESTOR' | 'ENTREGADOR';
}

export interface IUsuarioUpdate {
    nome?: string;
    email?: string;
    role?: 'GESTOR' | 'ENTREGADOR';
}

export class UsuariosService {
    /**
     * Registra um novo usuário no sistema
     */
    static async registrar(dados: IUsuarioCreate): Promise<IUsuario> {
        try {
            const response = await api.post('/usuarios/register', dados);
            return response.data;
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            throw error;
        }
    }

    /**
     * Lista todos os usuários (se a rota existir no backend)
     */
    static async listarUsuarios(): Promise<IUsuario[]> {
        try {
            const response = await api.get('/usuarios/list');
            return response.data;
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            throw error;
        }
    }

    /**
     * Busca um usuário por ID (se a rota existir no backend)
     */
    static async buscarUsuario(id: number): Promise<IUsuario> {
        try {
            const response = await api.get(`/usuarios/${id}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw error;
        }
    }

    /**
     * Atualiza dados de um usuário (se a rota existir no backend)
     */
    static async atualizarUsuario(id: number, dados: IUsuarioUpdate): Promise<IUsuario> {
        try {
            const response = await api.put(`/usuarios/${id}`, dados);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            throw error;
        }
    }

    /**
     * Remove um usuário (se a rota existir no backend)
     */
    static async removerUsuario(id: number): Promise<void> {
        try {
            await api.delete(`/usuarios/${id}`);
        } catch (error) {
            console.error('Erro ao remover usuário:', error);
            throw error;
        }
    }

    /**
     * Lista apenas entregadores (se a rota existir no backend)
     */
    static async listarEntregadores(): Promise<IUsuario[]> {
        try {
            const response = await api.get('/usuarios/entregadores');
            return response.data;
        } catch (error) {
            console.error('Erro ao listar entregadores:', error);
            throw error;
        }
    }

    /**
     * Lista apenas gestores (se a rota existir no backend)
     */
    static async listarGestores(): Promise<IUsuario[]> {
        try {
            const response = await api.get('/usuarios/gestores');
            return response.data;
        } catch (error) {
            console.error('Erro ao listar gestores:', error);
            throw error;
        }
    }

    /**
     * Acessa rota protegida para teste
     */
    static async testarRotaProtegida(): Promise<unknown> {
        try {
            const response = await api.get('/usuarios/protected-route');
            return response.data;
        } catch (error) {
            console.error('Erro ao acessar rota protegida:', error);
            throw error;
        }
    }
}
