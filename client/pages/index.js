import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Put it below this line! Make sure */}
      <h1> Welcome to HygieiaChat!</h1>
      <Link href="/chat">
        <button>Go to chatbot</button>
      </Link>
      <Link href="/users"></Link>
    </div>
  );
}
