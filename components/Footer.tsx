import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full py-8 text-center z-10 border-t border-[#254632]/30 mt-auto bg-background-dark">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#1b2b22] border border-[#2d4a39]">
                    <span className="material-symbols-outlined text-gray-500 text-sm">verified</span>
                    <p className="text-[#95c6a9] text-xs sm:text-sm font-bold tracking-[0.15em] uppercase">
                        EST. 2025 – Official Home Series
                    </p>
                </div>
                <p className="text-gray-600 text-xs px-4">
                    © 2025 Lehmuskuja Poker Tour. Kaikki oikeudet pidätetään.
                </p>
            </div>
        </footer>
    );
};