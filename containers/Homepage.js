import Link from "next/link";

export function HomePage() {
  return (
    <div>
      <h1>Hello</h1>
      <Link href="/people">
        <a>People</a>
      </Link>
    </div>
  );
}
