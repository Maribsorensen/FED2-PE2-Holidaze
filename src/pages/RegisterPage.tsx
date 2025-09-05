import { Button } from "../components/common/Button";

export function RegisterPage() {
  return (
    <div>
      <form action="" className="bg-white rounded-sm p-4">
        <h2 className="font-headings text-transform: uppercase text-2xl">
          Register your Holidaze account
        </h2>
        <label
          htmlFor="username"
          className="font-headings text-transform: uppercase"
        >
          Username
        </label>
        <input id="username" type="text" name="username" required />
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
        <Button type="submit">Register</Button>
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
