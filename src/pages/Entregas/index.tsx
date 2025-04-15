import { useState, useEffect } from 'react';
import EntregasForm from './EntregasForm';
import { EntregasService, IEntrega } from '../../services/entregas.service';
import './styles.css';

export default function Entregas() {
    const [entregas, setEntregas] = useState<IEntrega[]>([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        carregarEntregas();
    }, []);

    async function carregarEntregas() {
        try {
            setLoading(true);
            const data = await EntregasService.listarEntregas();
            setEntregas(data);
            setError(null);
        } catch (error) {
            setError('Erro ao carregar entregas');
            console.error('Erro ao carregar entregas:', error);
        } finally {
            setLoading(false);
        }
    }

    const formatarData = (dataString: string | undefined) => {
        if (!dataString) return '-';
        try {
            const data = new Date(dataString);
            return data.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return '-';
        }
    };

    const getStatusClass = (status: string) => {
        const statusMap: Record<string, string> = {
            'PENDENTE': 'pendente',
            'EM_ANDAMENTO': 'em-andamento',
            'CONCLUIDO': 'concluido'
        };
        return statusMap[status] || 'pendente';
    };

    const getStatusText = (status: string) => {
        const statusMap: Record<string, string> = {
            'PENDENTE': 'Pendente',
            'EM_ANDAMENTO': 'Em Andamento',
            'CONCLUIDO': 'Concluído'
        };
        return statusMap[status] || status;
    };

    if (loading) return <div className="loading">Carregando...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="entregas-container">
            <header>
                <h1>Entregas</h1>
                <button
                    className="nova-entrega-button"
                    onClick={() => setIsFormOpen(true)}
                >
                    Nova Entrega
                </button>
            </header>

            {isFormOpen && (
                <EntregasForm
                    onClose={() => setIsFormOpen(false)}
                    onEntregaCriada={carregarEntregas}
                />
            )}

            <div className="entregas-list">
                {entregas.length === 0 ? (
                    <div className="no-data">Nenhuma entrega encontrada</div>
                ) : (
                    entregas.map(entrega => (
                        <div key={entrega.id} className="entrega-card">
                            <h3>Entrega #{entrega.id}</h3>
                            <p><strong>Destino:</strong> {entrega.destino}</p>
                            <span className={`status ${getStatusClass(entrega.status)}`}>
                                {getStatusText(entrega.status)}
                            </span>
                            <p>Criada em: {formatarData(entrega.criadaEm)}</p>
                            <p>Última atualização: {formatarData(entrega.atualizadaEm)}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
