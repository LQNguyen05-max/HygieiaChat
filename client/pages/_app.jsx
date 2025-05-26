import "../styles/output.css";
import { Navbar } from "../components/Navbar";
import Head from "next/head";

// Create a custom App component to include which wraps the entire application in our
export default function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <Component {...pageProps} />
      </main>
      <Head>
        <title>HygieiaChat</title>
        {/* Added a favicon for the header of the webpage */}
        <link rel="icon" href="/hybot.png" type="image/png" />
      </Head>
    </div>
  );
}
