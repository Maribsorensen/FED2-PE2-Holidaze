import { useState } from 'react';
import { Button } from '../components/common/Button';
import { register } from '../features/auth/services';
import { Link, useNavigate } from 'react-router-dom';
import { safeAsync } from '../lib/safeAsync';
import { usePageMeta } from '../hooks/usePageMeta';

export function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const name = form.get('name') as string;
    const email = form.get('email') as string;
    const password = form.get('password') as string;
    const venueManager = form.get('venueManager') === 'on';

    const user = await safeAsync(
      () => register(name, email, password, venueManager),
      () => setError('Registration failed. Please check your credentials.')
    );

    if (user) navigate('/');
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
          Register your Holidaze account
        </h2>

        {error && <p className="text-cta text-center">{error}</p>}

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-headings uppercase text-sm">
            Username
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            pattern="^[a-zA-Z0-9_]+$"
            title="Username can only contain letters, numbers, and underscores."
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-headings uppercase text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            pattern="^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$"
            title="Email must be a valid stud.noroff.no address."
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
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

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="venueManager"
            className="accent-primary"
          />
          Register as Venue Manager
        </label>

        <Button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>

        <p className="text-center font-headings uppercase text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-cta underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
