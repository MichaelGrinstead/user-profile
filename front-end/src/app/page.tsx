import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center mt-60 gap-4">
      <Link href="/register-user">Register</Link>
      <h3>or</h3>
      <Link href="/login-user">Login</Link>
    </main>
  );
}
