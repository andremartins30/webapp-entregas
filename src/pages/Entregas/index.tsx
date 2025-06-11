import { useState, useEffect } from 'react';
import EntregasForm from './EntregasForm';
import { EntregasService, IEntrega } from '../../services/entregas.service';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { LoadingSpinner } from '../../components/ui/loading-spinner';
import { Plus, Package, MapPin, User, Clock, AlertCircle, CheckCircle, Truck } from 'lucide-react';

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
        } catch {
            return '-';
        }
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            'PENDENTE': { variant: 'destructive' as const, icon: Clock, text: 'Pendente' },
            'EM_TRANSITO': { variant: 'warning' as const, icon: Truck, text: 'Em Andamento' },
            'ENTREGUE': { variant: 'success' as const, icon: CheckCircle, text: 'Concluído' }
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDENTE;
        const Icon = config.icon;

        return (
            <Badge variant={config.variant} className="flex items-center gap-1">
                <Icon className="h-3 w-3" />
                {config.text}
            </Badge>
        );
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Entregas</h1>
                </div>
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Entregas</h1>
                </div>
                <Card>
                    <CardContent className="flex items-center justify-center p-6">
                        <div className="text-center">
                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                            <p className="text-red-600 font-medium">{error}</p>
                            <Button
                                variant="outline"
                                onClick={carregarEntregas}
                                className="mt-4"
                            >
                                Tentar novamente
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Entregas</h1>
                <Button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Nova Entrega
                </Button>
            </div>

            {isFormOpen && (
                <EntregasForm
                    onClose={() => setIsFormOpen(false)}
                    onEntregaCriada={carregarEntregas}
                />
            )}            <Card className="relative overflow-hidden">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Lista de Entregas
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {entregas.length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                            <h3 className="text-lg font-semibold mb-2">Nenhuma entrega encontrada</h3>
                            <p className="text-muted-foreground mb-4">
                                Comece criando sua primeira entrega
                            </p>
                            <Button onClick={() => setIsFormOpen(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Nova Entrega
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Destino</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Entregador</TableHead>
                                    <TableHead>Última Atualização</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {entregas.map(entrega => (
                                    <TableRow key={entrega.id}>
                                        <TableCell className="font-medium">
                                            #{entrega.id}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                {entrega.destino}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(entrega.status)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                {entrega.entregador?.nome || '-'}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                {formatarData(entrega.atualizadaEm)}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
