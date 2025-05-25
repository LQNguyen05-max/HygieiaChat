import '../styles/globals.css';
import { Navbar } from '../components/Navbar';

// Create a custom App component to include which wraps the entire application in our
export default function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
