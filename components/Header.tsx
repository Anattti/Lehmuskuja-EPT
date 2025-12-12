"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from '../types';

const navItems: NavItem[] = [
    { label: 'Etusivu', href: '/' },
    { label: 'Säännöt', href: '/rules' },
];

export const Header: React.FC = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === '/' && pathname === '/') return true;
        if (href !== '/' && pathname.startsWith(href)) return true;
        return false;
    };

    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className="w-full border-b border-[#254632]/50 bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo Area */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-background-dark shadow-[0_0_15px_rgba(54,226,123,0.3)] group-hover:shadow-[0_0_25px_rgba(54,226,123,0.5)] transition-shadow">
                            <span className="material-symbols-outlined !text-[24px]">playing_cards</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white text-lg font-bold leading-none tracking-tight">LEHMUSKUJA</h1>
                            <span className="text-gray-400 text-xs font-medium tracking-widest uppercase">Poker Tour</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`text-sm font-semibold uppercase tracking-wide transition-colors ${isActive(item.href) ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Action Button */}
                    <button className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary-hover transition-all text-background-dark px-5 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(54,226,123,0.15)] hover:shadow-[0_0_25px_rgba(54,226,123,0.3)]">
                        <span className="material-symbols-outlined !text-[20px]">login</span>
                        <span>Kirjaudu</span>
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] bg-background-dark/95 backdrop-blur-xl flex flex-col p-6 animate-in fade-in duration-200">
                    <div className="flex justify-end mb-8">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                        >
                            <span className="material-symbols-outlined !text-3xl">close</span>
                        </button>
                    </div>

                    <nav className="flex flex-col items-center gap-8 mt-10">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={handleNavClick}
                                className={`text-2xl font-bold uppercase tracking-widest transition-colors ${isActive(item.href) ? 'text-primary' : 'text-white hover:text-gray-300'}`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="w-16 h-1 bg-white/10 rounded-full my-4"></div>

                        <button className="flex items-center gap-3 bg-primary text-background-dark px-8 py-4 rounded-full text-lg font-bold shadow-[0_0_20px_rgba(54,226,123,0.15)] w-full max-w-xs justify-center">
                            <span className="material-symbols-outlined">login</span>
                            <span>Kirjaudu</span>
                        </button>
                    </nav>

                    <div className="mt-auto text-center text-gray-500 text-xs uppercase tracking-widest pb-8">
                        Lehmuskuja Poker Tour
                    </div>
                </div>
            )}
        </>
    );
};