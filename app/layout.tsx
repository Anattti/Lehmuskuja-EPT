import type { Metadata } from "next";
import { Spline_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const splineSans = Spline_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LEHMUSKUJA EPT",
    description: "Lehmuskuja Poker Tour",
    icons: {
        icon: [
            {
                url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' fontSize='90'>♠️</text></svg>",
                type: "image/svg+xml",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                />
            </head>
            <body className={`${splineSans.className} font-display bg-background-light dark:bg-background-dark min-h-screen flex flex-col antialiased selection:bg-primary selection:text-background-dark overflow-x-hidden`}>
                <Header />
                <main className="flex-grow flex flex-col relative pb-12">
                    {/* Abstract Background Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
                    </div>
                    {children}
                </main>
                <Footer />
                <Analytics />
            </body>
        </html>
    );
}
