import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { UserPlus, Mail, Lock, User, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FormInputs {
    nome: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: 'GESTOR' | 'ENTREGADOR';
}

const Usuarios = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data: FormInputs) => {
        try {
            setLoading(true);
            setError('');
            setSuccess(false);

            // Verificar se as senhas conferem
            if (data.password !== data.password_confirmation) {
                setError('As senhas não conferem');
                return;
            }

            await axios.post('http://localhost:3333/usuarios/register', {
                nome: data.nome,
                email: data.email,
                password: data.password,
                role: data.role
            });

            setSuccess(true);
            reset();
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Erro ao cadastrar usuário');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
            </div>

            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                            <UserPlus className="h-5 w-5" />
                            Cadastro de Usuários
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded-md mb-4">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
                                <CheckCircle className="h-4 w-4" />
                                Usuário cadastrado com sucesso!
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="nome" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Nome
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        id="nome"
                                        type="text"
                                        className={cn(
                                            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background",
                                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                                            "placeholder:text-muted-foreground",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                            "disabled:cursor-not-allowed disabled:opacity-50",
                                            errors.nome && "border-destructive"
                                        )}
                                        placeholder="Digite o nome completo"
                                        {...register("nome", { required: "Nome é obrigatório" })}
                                    />
                                </div>
                                {errors.nome && (
                                    <p className="text-sm text-destructive">{errors.nome.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        id="email"
                                        type="email"
                                        className={cn(
                                            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background",
                                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                                            "placeholder:text-muted-foreground",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                            "disabled:cursor-not-allowed disabled:opacity-50",
                                            errors.email && "border-destructive"
                                        )}
                                        placeholder="exemplo@email.com"
                                        {...register("email", {
                                            required: "Email é obrigatório",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Email inválido"
                                            }
                                        })}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Senha
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        id="password"
                                        type="password"
                                        className={cn(
                                            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background",
                                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                                            "placeholder:text-muted-foreground",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                            "disabled:cursor-not-allowed disabled:opacity-50",
                                            errors.password && "border-destructive"
                                        )}
                                        placeholder="Digite sua senha"
                                        {...register("password", {
                                            required: "Senha é obrigatória",
                                            minLength: {
                                                value: 6,
                                                message: "A senha deve ter no mínimo 6 caracteres"
                                            }
                                        })}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-destructive">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password_confirmation" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Confirmar Senha
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        className={cn(
                                            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background",
                                            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                                            "placeholder:text-muted-foreground",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                            "disabled:cursor-not-allowed disabled:opacity-50",
                                            errors.password_confirmation && "border-destructive"
                                        )}
                                        placeholder="Confirme sua senha"
                                        {...register("password_confirmation", {
                                            required: "Confirmação de senha é obrigatória"
                                        })}
                                    />
                                </div>
                                {errors.password_confirmation && (
                                    <p className="text-sm text-destructive">{errors.password_confirmation.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="role" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Perfil
                                </label>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <select
                                        id="role"
                                        className={cn(
                                            "flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background",
                                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                            "disabled:cursor-not-allowed disabled:opacity-50",
                                            errors.role && "border-destructive"
                                        )}
                                        {...register("role", { required: "O perfil é obrigatório" })}
                                    >
                                        <option value="">Selecione o perfil</option>
                                        <option value="GESTOR">Gestor</option>
                                        <option value="ENTREGADOR">Entregador</option>
                                    </select>
                                </div>
                                {errors.role && (
                                    <p className="text-sm text-destructive">{errors.role.message}</p>
                                )}
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                            Cadastrando...
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <UserPlus className="h-4 w-4" />
                                            Cadastrar Usuário
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Usuarios;
