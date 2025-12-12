import React, { useEffect, useState } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const AlcoholPolicyOverlay: React.FC<Props> = ({ isOpen, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Small delay to trigger the CSS transition
            setTimeout(() => setIsVisible(true), 50);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    if (!isOpen && !isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ${isOpen ? 'bg-black/90 backdrop-blur-md' : 'bg-black/0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div
                className={`transform transition-all duration-[2000ms] cubic-bezier(0.25, 1, 0.5, 1) relative z-10 p-4 max-w-md w-full mx-4 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150vh] opacity-100'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button - Sticker style */}
                <button
                    onClick={onClose}
                    className="absolute -top-2 -right-2 sm:-right-6 sm:-top-4 z-50 bg-primary hover:bg-primary-hover text-[#112117] font-black py-3 px-6 rounded shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-300 uppercase tracking-widest border-2 border-white/20 text-sm sm:text-base cursor-pointer"
                >
                    Ymmärretty
                </button>

                {/* The Wire (hanging effect) */}
                <div className="absolute -top-[100vh] left-1/2 -translate-x-1/2 w-1 h-[100vh] bg-gradient-to-b from-gray-800 to-[#FFD700] opacity-50"></div>
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-4 h-16 bg-gradient-to-b from-[#FFD700] to-[#b8860b] shadow-lg rounded-full z-0"></div>

                {/* The Frame */}
                <div className="relative bg-[#1a0f0f] p-3 shadow-[0_0_100px_rgba(0,0,0,0.9)] rounded-sm border-2 border-[#3d2b1f]">
                    {/* Outer Gold Border */}
                    <div className="border-4 border-[#b8860b] rounded-sm p-2 shadow-inner">
                        {/* Inner Detail Border */}
                        <div className="border-2 border-[#FFD700] border-dashed p-1 rounded-sm">

                            {/* Title Plate */}
                            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-[#b8860b] px-6 py-2 border-2 border-[#FFD700] shadow-xl rounded-sm transform rotate-1 hover:rotate-0 transition-transform duration-300 min-w-[200px] text-center z-20">
                                <span className="text-[#1a0f0f] font-serif font-bold uppercase tracking-widest text-xs sm:text-sm drop-shadow-sm block">
                                    Virallinen Linjaus
                                </span>
                            </div>

                            {/* Image Container - Vertical 9:16 Aspect Ratio */}
                            <div className="relative bg-black aspect-[9/16] overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-end justify-center pb-8">
                                    <p className="text-[#FFD700] font-serif italic text-lg px-4 text-center">"Stefan's Steakhouse: Lopputulos."</p>
                                </div>
                                <img
                                    src="./IMG_2840.webp"
                                    alt="Sleeping after dinner at Stefans Steakhouse"
                                    className="w-full h-full object-cover sepia-[0.3] contrast-125 brightness-75 group-hover:sepia-0 group-hover:brightness-100 transition-all duration-1000"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Corner Ornaments */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#FFD700] -translate-x-1 -translate-y-1"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#FFD700] translate-x-1 -translate-y-1"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#FFD700] -translate-x-1 translate-y-1"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#FFD700] translate-x-1 translate-y-1"></div>
                </div>
            </div>
        </div>
    );
};