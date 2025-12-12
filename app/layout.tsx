import type { Metadata } from "next";
import { Spline_Sans } from "next/font/google";
import "./globals.css";

const splineSans = Spline_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LEHMUSKUJA EPT",
    description: "Lehmuskuja Poker Tour",
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
            <body className={splineSans.className}>{children}</body>
        </html>
    );
}
