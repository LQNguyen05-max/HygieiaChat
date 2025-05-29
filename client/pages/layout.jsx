import "./global.css";

export const metadata = {
    title: "HygieiaBot - Medical Healthcare Bot",
    description: "Learn more about your health with our AI chatbot",
};


//Adds HygieiaBot image as the Favicon, then creates the other children components (such as homepage, etc) for the website
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