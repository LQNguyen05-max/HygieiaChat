import "./output.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Component {...pageProps} />
    </div>
  );
}
