'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }
    
    try {
      // Placeholder for authentication logic
      console.log('Logging in with:', { email, password });
      router.push('/home');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-4 ">Login</h2>
        {error && <p className="text-error text-sm text-center mb-2 ">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="label">
            <span className="label-text ">Email</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your email"
            required
          />
          <label className="label">
            <span className="label-text ">Password</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full "
            placeholder="Enter your password"
            required
          />
          <button
            type="submit"
            className="btn btn-primary mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
