import { useState } from 'react';
import { Button } from '../components/common/Button';
import { register } from '../features/auth/services';

export function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const name = form.get('name') as string;
    const email = form.get('email') as string;
    const password = form.get('password') as string;
    const venueManager = form.get('venueManager') === 'on';

    try {
      const { user } = await register(name, email, password, venueManager);
      console.log('Registered user:', user);

      window.location.href = '/';
    } catch {
      setError('Registration failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white rounded-sm p-4">
        <h2 className="font-headings text-transform: uppercase text-2xl">
          Register your Holidaze account
        </h2>
        <label
          htmlFor="name"
          className="font-headings text-transform: uppercase"
        >
          Username
        </label>
        <input id="name" type="text" name="name" required />
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
        <label className="flex items-center gap-2">
          <input type="checkbox" name="venueManager" />
          Register as Venue Manager
        </label>
        <Button type="submit" disabled={loading}>
          Register
        </Button>
        {error && <p className="text-cta">{error}</p>}
        <p className="font-headings text-transform: uppercase">
          Already have an account? Login{' '}
          <a href="/login" className="text-cta">
            here
          </a>
        </p>
      </form>
    </div>
  );
}
