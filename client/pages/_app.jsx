import "./output.css";

// Create a custom App component to include which wraps the entire application in our
export default function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Component {...pageProps} />
    </div>

    
  );
}
