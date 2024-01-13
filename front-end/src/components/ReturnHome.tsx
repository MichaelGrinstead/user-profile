import Link from "next/link";

export default function ReturnHome() {
  return (
    <div className="absolute right-6 top-6">
      <Link href="/">Home</Link>
    </div>
  );
}
