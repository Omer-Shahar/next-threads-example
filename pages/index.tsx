import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"./api/fibonacci"}>Thread API</Link>
      <br />
      <Link href={"./api/fibonacciPool"}>Thread Pool API</Link>
    </>
  );
}
