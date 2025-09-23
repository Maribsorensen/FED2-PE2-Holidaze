import { useState } from 'react';
import { Button } from '../components/common/Button';
import { login } from '../features/auth/services';
import { Link, useNavigate } from 'react-router-dom';

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

    try {
      await login(email, password);
      navigate('/');
    } catch {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-auto mt-10">
      <form onSubmit={handleSubmit}>
        <h2 className="font-headings text-transform: uppercase text-2xl">
          Log into your Holidaze account
        </h2>

        <label
          htmlFor="email"
          className="font-headings text-transform: uppercase"
        >
          Email
        </label>
        <input id="email" type="email" name="email" required />

        <label
          htmlFor="password"
          className="font-headings text-transform: uppercase"
        >
          Password
        </label>
        <input id="password" type="password" name="password" required />

        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        {error && <p className="text-cta">{error}</p>}

        <p className="font-headings text-transform: uppercase">
          Don't have an account? Register{' '}
          <Link to="/register" className="text-cta">
            here
          </Link>
        </p>
      </form>
    </div>
  );
}
