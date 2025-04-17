import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import vetorEntregas from '../../assets/Vetor-entregas.jpg';
import Logo from '../../assets/palusa-fix.png'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            navigate('/dashboard');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login');
        }
    };

    return (
        <div className="min-h-screen flex items-start justify-center bg-gray-50 pt-7">
            <div className="flex w-full max-w-6xl mx-auto">
                {/* Login Form Section */}
                <div className="w-1/2 p-10">
                    <div className="max-w-md mx-auto space-y-8">
                        <div className="flex flex-col items-center">
                            <img
                                src={Logo}
                                alt="Logo"
                                className="w-[16rem] h-auto"
                            />
                            <h2 className="text-3xl font-extrabold text-gray-900">
                                Login
                            </h2>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <input
                                        type="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Entrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-1/2 p-12 flex items-center justify-center mt-14">
                    <img
                        src={vetorEntregas}
                        alt="Ilustração de entregas"
                        className="max-w-full h-auto object-contain"
                    />
                </div>
            </div>
        </div>
    );
}

