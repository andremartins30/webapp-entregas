export interface Usuario {
    id: number;
    nome: string;
    email: string;
}

export interface Entrega {
    id: number;
    destino: string;
    status: string;
    usuarioId: number;
    criadaEm: string;
    atualizadaEm: string;
}

export interface Veiculo {
    id: number;
    placa: string;
    modelo: string;
    usuarioId: number;
}
