import "./global.css";

export const metadata = {
    title: "HygieiaBot - Medical Healthcare Bot",
    description: "Learn more about your health with our AI chatbot",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
           <head>
                <link 
                rel="icon" 
                href="hybot.png"/>
            </head> 
            <body>{children}</body>
        </html>
    )
}