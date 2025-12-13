import React, { useState } from 'react';

interface HeroSectionProps {
    onOpenPolicy: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPolicy }) => {
    const [scheduleText, setScheduleText] = useState('Aikataulu');

    return (
        <div className="relative z-10 flex flex-col items-center justify-center flex-grow py-8 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {/* Graphic Banner Container */}
            <div className="w-full max-w-7xl relative mb-8 sm:mb-12 group">

                {/* Decorative EPT Slash (Diagonal Background) */}
                <div className="absolute inset-0 bg-ept-slash rounded-xl sm:rounded-3xl blur-[2px] opacity-80 transform scale-[1.02] transition-transform duration-700 group-hover:scale-[1.03]"></div>

                {/* Main Card Content */}
                <div className="relative bg-card-bg border border-border-green rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl">

                    {/* Image Background with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/90 to-transparent z-10"></div>
                        <div
                            className="w-full h-full bg-cover bg-center opacity-40 mix-blend-overlay"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCkrI6YEZ9wCaq58p5-x3aLozLyv58j6qRheGhiy4y31q8Tw6KqKVobrZSqPEoCSaKvn1c36D_wDQNhIrJ-G8f4sh_c5fvIj7-UcUqipiDl0WlXcijrIwPHakPVoGT_Fg5un3N_66yw-MOMZLBOOGrrVBGeTvKVKCKFLtCDWC4VuJoIuoloiDBdT4CfvGwOYatNVtoYAWZ9AGToZWmdkXouF20Ir5qVgS6x2x6B__nEc70kJCMS3oGV2FeKb21-4c2SDsplJDE6BgpK')" }}
                        ></div>
                        <div className="absolute inset-0 bg-ept-overlay z-10 opacity-30"></div>
                    </div>

                    {/* Content Wrapper */}
                    <div className="relative z-20 flex flex-col items-center justify-center text-center py-12 sm:py-20 lg:py-32 px-4 sm:px-6">

                        {/* Top Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-6 sm:mb-8">
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-red animate-pulse"></span>
                            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white uppercase">Live Tournament Series</span>
                        </div>

                        {/* Main Title Block */}
                        <div className="flex flex-col items-center">
                            <h1 className="text-white text-4xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-3 sm:mb-4 drop-shadow-2xl">
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                                    LEHMUSKUJA
                                </span>
                                <br />
                                <span className="text-brand-blue relative inline-block mt-1 sm:mt-0">
                                    EPT
                                    <span className="absolute -top-1 -right-5 sm:-top-2 sm:-right-8 text-brand-red text-3xl sm:text-5xl material-symbols-outlined transform rotate-12">
                                        playing_cards
                                    </span>
                                </span>
                            </h1>

                            {/* Divider Strip */}
                            <div className="h-1 w-20 sm:w-32 bg-gradient-to-r from-brand-blue via-white to-brand-red rounded-full my-4 sm:my-6"></div>

                            {/* Subtitle */}
                            <h2 className="text-gray-300 text-sm sm:text-2xl font-bold tracking-[0.2em] uppercase max-w-2xl px-2 sm:px-4">
                                Virallinen Turnausstruktuuri
                            </h2>
                        </div>

                        {/* CTA Buttons */}
                        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center max-w-sm sm:max-w-none mx-auto">
                            <button
                                onClick={onOpenPolicy}
                                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-primary text-background-dark text-sm sm:text-base font-bold uppercase tracking-wider rounded-full overflow-hidden transition-all hover:bg-primary-hover hover:scale-105 shadow-[0_0_30px_rgba(54,226,123,0.25)] w-full sm:w-auto"
                            >
                                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-64 group-hover:h-64 opacity-10"></span>
                                <span className="material-symbols-outlined mr-2 text-lg sm:text-xl">wine_bar</span>
                                Alkoholipolitiikka EPT:llä
                            </button>
                            <button
                                onClick={() => setScheduleText('NYT!')}
                                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white/20 text-white text-sm sm:text-base font-bold uppercase tracking-wider rounded-full hover:bg-white/10 transition-all hover:border-white/40 w-full sm:w-auto"
                            >
                                <span className="material-symbols-outlined mr-2 text-lg sm:text-xl">calendar_month</span>
                                {scheduleText}
                            </button>
                        </div>
                    </div>

                    {/* Bottom Colored Strip */}
                    <div className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-brand-blue via-white to-brand-red"></div>
                </div>
            </div>
        </div>
    );
};