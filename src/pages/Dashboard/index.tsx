import { useEffect, useState } from 'react';
import { DashboardService } from '../../services/dashboard.service';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Shimmer } from '../../components/ui/shimmer';
import { Package, Truck, Clock, CheckCircle, AlertCircle } from 'lucide-react';

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

    const statsCards = [
        {
            title: 'Total de Entregas',
            value: counts.total,
            icon: Package,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Em Andamento',
            value: counts.emTransito,
            icon: Truck,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
        },
        {
            title: 'Concluídas',
            value: counts.entregue,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            title: 'Pendentes',
            value: counts.pendente,
            icon: AlertCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
        },
    ];

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                </div>                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <Shimmer key={i} className="h-32">
                            <div></div>
                        </Shimmer>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <Card className="w-full max-w-md">
                    <CardContent className="flex items-center justify-center p-6">
                        <div className="text-center">
                            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                            <p className="text-red-600 font-medium">{error}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <Badge variant="outline" className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Atualizado agora</span>
                </Badge>
            </div>

            {/* Stats Cards */}            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((stat) => (
                    <Card key={stat.title} className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Deliveries */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Package className="h-5 w-5" />
                        <span>Entregas Recentes</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                        <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Nenhuma entrega recente encontrada</p>
                        <p className="text-sm">As entregas aparecerão aqui quando disponíveis</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Dashboard;