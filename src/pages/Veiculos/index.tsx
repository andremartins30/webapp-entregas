import { useState, useEffect } from "react"
import { veiculosService } from "../../services/veiculos.service"
import { Veiculo } from "../../types/veiculo"
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { LoadingSpinner } from '../../components/ui/loading-spinner';
import { Button } from '../../components/ui/button';
import { Truck, Plus, User, Hash } from 'lucide-react';

export default function Veiculos() {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        carregarVeiculos()
    }, [])

    async function carregarVeiculos() {
        try {
            setLoading(true)
            const data = await veiculosService.getTodosVeiculos()
            setVeiculos(data)
        } catch (error) {
            console.error('Erro ao carregar veículos:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">Veículos</h1>
                </div>
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Veículos</h1>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Novo Veículo
                </Button>
            </div>            <Card className="relative overflow-hidden">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Lista de Veículos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {veiculos.length === 0 ? (
                        <div className="text-center py-12">
                            <Truck className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                            <h3 className="text-lg font-semibold mb-2">Nenhum veículo encontrado</h3>
                            <p className="text-muted-foreground mb-4">
                                Comece cadastrando seu primeiro veículo
                            </p>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Novo Veículo
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Modelo</TableHead>
                                    <TableHead>Placa</TableHead>
                                    <TableHead>Responsável</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {veiculos.map((veiculo) => (
                                    <TableRow key={veiculo.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <Hash className="h-4 w-4 text-muted-foreground" />
                                                {veiculo.id}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Truck className="h-4 w-4 text-muted-foreground" />
                                                {veiculo.modelo}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                                                {veiculo.placa}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                ID: {veiculo.usuarioId}
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

