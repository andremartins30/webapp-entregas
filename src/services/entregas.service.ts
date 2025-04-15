import { api } from './api';

export interface IEntrega {
    id?: number;
    destino: string;
    status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO';
    usuarioId?: number;
    criadaEm?: string;
    atualizadaEm?: string;
}

export class EntregasService {
    static async listarEntregas(): Promise<IEntrega[]> {
        try {
            const response = await api.get('/entregas/delivery');
            type ApiEntrega = {
                id: number;
                destino: string;
                status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO';
                usuarioId?: number;
                criadaEm?: string;
                atualizadaEm?: string;
            };

            return response.data.map((item: ApiEntrega) => ({
                id: Number(item.id),
                destino: String(item.destino),
                status: item.status as IEntrega['status'],
                usuarioId: item.usuarioId ? Number(item.usuarioId) : undefined,
                criadaEm: item.criadaEm ? String(item.criadaEm) : undefined,
                atualizadaEm: item.atualizadaEm ? String(item.atualizadaEm) : undefined
            }));
        } catch (error) {
            console.error('Erro ao listar entregas:', error);
            throw error;
        }
    }

    static async criarEntrega(entrega: Pick<IEntrega, 'destino'>): Promise<IEntrega> {
        try {
            const response = await api.post('/entregas/delivery', {
                destino: String(entrega.destino),
                status: 'PENDENTE'
            });

            return {
                id: Number(response.data.id),
                destino: String(response.data.destino),
                status: response.data.status as IEntrega['status'],
                usuarioId: response.data.usuarioId ? Number(response.data.usuarioId) : undefined,
                criadaEm: response.data.criadaEm ? String(response.data.criadaEm) : undefined,
                atualizadaEm: response.data.atualizadaEm ? String(response.data.atualizadaEm) : undefined
            };
        } catch (error) {
            console.error('Erro ao criar entrega:', error);
            throw error;
        }
    }

    static async atualizarStatus(id: number, status: IEntrega['status']): Promise<IEntrega> {
        try {
            const response = await api.put(`/entregas/delivery/status/${id}`, { status });

            return {
                id: Number(response.data.id),
                destino: String(response.data.destino),
                status: response.data.status as IEntrega['status'],
                usuarioId: response.data.usuarioId ? Number(response.data.usuarioId) : undefined,
                criadaEm: response.data.criadaEm ? String(response.data.criadaEm) : undefined,
                atualizadaEm: response.data.atualizadaEm ? String(response.data.atualizadaEm) : undefined
            };
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
            throw error;
        }
    }
}
