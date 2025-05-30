import "../styles/output.css";
import { Navbar } from "../components/Navbar";
import Head from "next/head";
import { Toaster } from 'react-hot-toast';

// Create a custom App component to include which wraps the entire application in our
export default function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <Component {...pageProps} />
      </main>
      <div className="toast-container">
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#16a34a',
              border: '1px solid #bbf7d0',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#16a34a',
                secondary: '#fff',
              },
            },
            error: {
              style: {
                color: '#dc2626',
                border: '1px solid #fecaca',
              },
              iconTheme: {
                primary: '#dc2626',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
      <Head>
        <title>HygieiaChat</title>
        {/* Added a favicon for the header of the webpage */}
        <link rel="icon" href="/hybot.png" type="image/png" />
      </Head>
    </div>

    
  );
}
