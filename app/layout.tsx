import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
    title: 'LEHMUSKUJA EPT',
    description: 'A dark-themed poker tournament landing page featuring tournament structure, schedule, and details.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
                <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `
            tailwind.config = {
              darkMode: "class",
              theme: {
                extend: {
                  colors: {
                    primary: "#36e27b",
                    "primary-hover": "#2dc66b",
                    "background-light": "#f6f8f7",
                    "background-dark": "#112117",
                    "card-bg": "#1a2c22",
                    "border-green": "#2d4a39",
                    "brand-blue": "#005595",
                    "brand-red": "#E31D2B",
                  },
                  fontFamily: {
                    display: ["Spline Sans", "sans-serif"],
                  },
                  backgroundImage: {
                      'ept-slash': 'linear-gradient(135deg, transparent 40%, #005595 40%, #005595 60%, #E31D2B 60%, #E31D2B 100%)',
                      'ept-overlay': 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03) 10px, transparent 10px, transparent 20px)',
                  }
                },
              },
            };
          `
                }} />
                <style dangerouslySetInnerHTML={{
                    __html: `
            body { background-color: #112117; }
          `
                }} />
            </head>
            <body className="font-display bg-background-light dark:bg-background-dark min-h-screen flex flex-col antialiased selection:bg-primary selection:text-background-dark overflow-x-hidden">
                <Analytics />
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
            </body>
        </html>
    );
}