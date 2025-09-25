import { useState } from 'react';
import { Button } from '../components/common/Button';
import { login } from '../features/auth/services';
import { Link, useNavigate } from 'react-router-dom';
import { safeAsync } from '../lib/safeAsync';
import { usePageMeta } from '../hooks/usePageMeta';

export function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    if (!email.toLowerCase().endsWith('@stud.noroff.no')) {
      setError('Email must be a valid stud.noroff.no address.');
      setLoading(false);
      return;
    }

    const result = await safeAsync(
      () => login(email, password),
      () => setError('Login failed. Please check your credentials.')
    );

    if (result) navigate('/');
    setLoading(false);
  }

  usePageMeta();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6"
      >
        <h2 className="font-headings uppercase text-2xl text-center">
          Log into your Holidaze account
        </h2>

        {error && <p className="text-cta text-center mt-2">{error}</p>}

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="font-headings uppercase text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            title="Email must be a valid stud.noroff.no address."
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password" className="font-headings uppercase text-sm">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={8}
            title="Password must be at least 8 characters."
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <p className="text-center font-headings uppercase text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-cta underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
