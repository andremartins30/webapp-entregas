import { api } from "./api";


export class DashboardService {
    static async getDeliveryCounts() {
        try {
            const response = await api.get('/entregas/delivery/count')
            return response.data
        } catch (error) {
            throw new Error('Erro ao buscar contagens de entregas')
        }
    }
}