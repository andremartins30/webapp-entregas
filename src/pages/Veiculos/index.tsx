import { useState, useEffect } from "react"
import { veiculosService } from "../../services/veiculos.service"
import { Veiculo } from "../../types/veiculo"

export default function Veiculos() {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([])

    useEffect(() => {
        veiculosService.getTodosVeiculos().then(setVeiculos)
    }, [])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Veículos</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placa</th>
                            <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID do Usuário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {veiculos.map((veiculo) => (
                            <tr key={veiculo.id} className="hover:bg-gray-50">
                                <td className="px-6 py-3 border-b">{veiculo.id}</td>
                                <td className="px-6 py-3 border-b">{veiculo.modelo}</td>
                                <td className="px-6 py-3 border-b">{veiculo.placa}</td>
                                <td className="px-6 py-3 border-b">{veiculo.usuarioId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

