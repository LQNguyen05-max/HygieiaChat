import "./globals.css"

export const metadata = {
  title: "MediTerms - Medical Terminology Chatbot",
  description: "Learn about medical terms and concepts through a conversational interface",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' fontSize='90' fill='%2322C55E'>💚</text></svg>"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
