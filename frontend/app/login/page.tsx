'use client';


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon } from 'lucide-react'; // Or use react-icons if preferred

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Invalid credentials');
      }

      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      router.push('/index');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {error && <p className="text-error text-sm text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your username"
            required
          />

          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full pr-10"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center"
              tabIndex={-1}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Login
          </button>
          <button
            type="button"
            onClick={handleRegisterRedirect}
            className="btn btn-sm btn-outline"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
