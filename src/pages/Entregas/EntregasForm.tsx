import React, { useState } from 'react';
import { EntregasService } from '../../services/entregas.service';
import './styles.css';

interface EntregasFormProps {
    onClose: () => void;
    onEntregaCriada: () => void;
}

export default function EntregasForm({ onClose, onEntregaCriada }: EntregasFormProps) {
    const [destino, setDestino] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await EntregasService.criarEntrega({
                destino
            });

            onEntregaCriada();
            onClose();
        } catch (error) {
            setError('Erro ao criar entrega. Tente novamente.');
            console.error('Erro ao criar entrega:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="form-overlay">
            <div className="form-container">
                <h2>Nova Entrega</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="destino">Destino</label>
                        <textarea
                            id="destino"
                            value={destino}
                            onChange={e => setDestino(e.target.value)}
                            required
                            placeholder="Digite o endereço de destino"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-cancelar"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-salvar"
                            disabled={loading}
                        >
                            {loading ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
