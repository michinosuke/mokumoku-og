import Image from "next/image";

export default async function Home() {
  const data = await fetch("/api/og");
  return { data };
}
