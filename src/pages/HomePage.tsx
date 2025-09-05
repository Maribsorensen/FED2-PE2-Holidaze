import { HomeHero } from "../components/common/HomeHero";

export function HomePage() {
  return (
    <div>
      <HomeHero />
      <h1 className="font-headings text-transform: uppercase text-2xl">
        {' '}
        Welcome to Holidaze
      </h1>
    </div>
  );
}
