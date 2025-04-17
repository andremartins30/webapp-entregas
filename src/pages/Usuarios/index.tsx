import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

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
        <div className="mt-8 max-w-md">
            <h1 className="font-bold mb-6">Cadastro de Usuários</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    Usuário cadastrado com sucesso!
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div className="flex flex-col gap-2">
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome:</label>
                        <input
                            type="text"
                            id="nome"
                            className="mt-1 block w-full rounded-md border border-gray-500 h-8 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            {...register("nome", { required: "Nome é obrigatório" })}
                        />
                        {errors.nome && (
                            <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full rounded-md border border-gray-500 h-8 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            {...register("email", {
                                required: "Email é obrigatório",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email inválido"
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full rounded-md border border-gray-500 h-8 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            {...register("password", {
                                required: "Senha é obrigatória",
                                minLength: {
                                    value: 6,
                                    message: "A senha deve ter no mínimo 6 caracteres"
                                }
                            })}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                            Confirmar Senha:
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            className="mt-1 block w-full rounded-md border border-gray-500 h-8 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            {...register("password_confirmation", {
                                required: "Confirmação de senha é obrigatória"
                            })}
                        />
                        {errors.password_confirmation && (
                            <p className="mt-1 text-sm text-red-600">{errors.password_confirmation.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Perfil:</label>
                        <select
                            id="role"
                            className="mt-1 block w-full rounded-md border border-gray-500 h-8 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            {...register("role", { required: "O perfil é obrigatório" })}
                        >
                            <option value="">Selecione o perfil</option>
                            <option value="GESTOR">Gestor</option>
                            <option value="ENTREGADOR">Entregador</option>
                        </select>
                        {errors.role && (
                            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end mt-10">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Usuarios;