import { useEffect, useState } from 'react';
import './styles.css';
import { DashboardService } from '../../services/dashboard.service';

interface DeliveryCounts {
    total: number;
    pendente: number;
    emTransito: number;
    entregue: number;
}

const Dashboard = () => {
    const [counts, setCounts] = useState<DeliveryCounts>({
        total: 0,
        pendente: 0,
        emTransito: 0,
        entregue: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCounts();
        const interval = setInterval(fetchCounts, 5000); // Atualiza a cada 5 segundos

        return () => {
            clearInterval(interval);
        };
    }, []);

    const fetchCounts = async () => {
        try {
            const data = await DashboardService.getDeliveryCounts();
            setCounts(data);
        } catch (err) {
            setError('Erro ao carregar dados do dashboard');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="dashboard">
            <div className="card">
                <h2>Dashboard</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Total de Entregas</h3>
                        <p className="stat-value">{counts.total}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Em Andamento</h3>
                        <p className="stat-value">{counts.emTransito}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Concluídas</h3>
                        <p className="stat-value">{counts.entregue}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Pendentes</h3>
                        <p className="stat-value">{counts.pendente}</p>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2>Entregas Recentes</h2>
                {/* Conteúdo da tabela de entregas */}
            </div>
        </div>
    );
}

export default Dashboard; 