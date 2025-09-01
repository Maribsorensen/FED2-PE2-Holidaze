export function LoginPage() {
  return (
    <div>
      <form action="">
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
        <button
          type="submit"
          className="font-headings text-transform: uppercase bg-cta text-white rounded-sm px-3 py-1"
        >
          Login
        </button>
        <p className="font-headings text-transform: uppercase">
          Don't have an account? Register{' '}
          <a href="/register" className="text-cta">
            here
          </a>
        </p>
      </form>
    </div>
  );
}
