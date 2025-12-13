import React, { useState } from 'react';
import { TournamentClock } from './TournamentClock';

// Distributions for different stack sizes [White, Red, Green, Blue, Black]
const STACK_DISTRIBUTIONS: Record<number, number[]> = {
    5000: [8, 8, 8, 0, 0],
    10000: [8, 8, 4, 2, 1],
    15000: [8, 8, 8, 5, 1],
    20000: [8, 8, 8, 5, 2],
    25000: [8, 8, 8, 10, 2],
    30000: [8, 8, 8, 15, 2],
    50000: [8, 8, 8, 10, 7],
};

const CHIP_DEFINITIONS = [
    { color: 'Valkoinen', value: 25, colorCode: 'bg-gray-200 text-gray-900 border-gray-300' },
    { color: 'Punainen', value: 100, colorCode: 'bg-red-600 text-white border-red-700' },
    { color: 'Vihreä', value: 500, colorCode: 'bg-green-600 text-white border-green-700' },
    { color: 'Sininen', value: 1000, colorCode: 'bg-blue-600 text-white border-blue-700' },
    { color: 'Musta', value: 5000, colorCode: 'bg-gray-900 text-white border-gray-700' },
];

// Type definitions for tournament levels
type BlindLevel = {
    level: number;
    sb: number;
    bb: number;
};

type BreakLevel = {
    level: 'break';
    label: string;
    note: string;
    fixedDuration: string;
};

type TournamentLevel = BlindLevel | BreakLevel;

const blinds: TournamentLevel[] = [
    { level: 1, sb: 50, bb: 100 },
    { level: 2, sb: 75, bb: 150 },
    { level: 3, sb: 100, bb: 200 },
    { level: 4, sb: 150, bb: 300 },
    { level: 5, sb: 200, bb: 400 },
    { level: 'break', label: 'TAUKO', note: 'Värinvaihto (25 & 100 pois)', fixedDuration: '15 min' },
    { level: 6, sb: 300, bb: 600 },
    { level: 7, sb: 500, bb: 1000 },
    { level: 8, sb: 800, bb: 1600 },
    { level: 9, sb: 1000, bb: 2000 },
    { level: 10, sb: 1500, bb: 3000 },
];

interface TournamentInfoProps {
    playerCount: number;
    blindDuration: number;
    startingStack: number;
}

export const TournamentInfo: React.FC<TournamentInfoProps> = ({ playerCount, blindDuration, startingStack }) => {
    const [selectedLevelIndex, setSelectedLevelIndex] = useState(0);
    const [isClockOpen, setIsClockOpen] = useState(false);

    const distribution = STACK_DISTRIBUTIONS[startingStack] || STACK_DISTRIBUTIONS[10000];

    const chips = CHIP_DEFINITIONS.map((def, index) => ({
        ...def,
        count: distribution[index],
        total: distribution[index] * def.value
    })).filter(chip => chip.count > 0);

    const selectedLevel = blinds[selectedLevelIndex];

    // Helper to calculate stats for the selected level
    const getLevelStats = () => {
        if (selectedLevel.level === 'break') return null;
        // TypeScript now knows selectedLevel is BlindLevel here
        const { bb, sb } = selectedLevel;
        const bbInStack = startingStack / bb;

        return { bb, sb, bbInStack };
    };

    const stats = getLevelStats();

    // Calculate max BB for chart scaling
    const maxBB = blinds.reduce((max, level) => {
        return level.level !== 'break' ? Math.max(max, level.bb) : max;
    }, 0);

    return (
        <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12">

                {/* Chip Distribution (1st on Mobile, Top Left on Desktop) */}
                <div className="bg-card-bg border border-border-green/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">poker_chip</span>
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white leading-none">Merkkijako</h3>
                                <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">{playerCount} Pelaajaa</span>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-border-green/30">
                        <table className="w-full text-left text-xs sm:text-sm whitespace-nowrap">
                            <thead className="bg-[#112117] text-gray-400 uppercase tracking-wider text-[10px] sm:text-xs font-semibold">
                                <tr>
                                    <th className="px-2 py-2 sm:px-3 sm:py-3">Väri</th>
                                    <th className="px-2 py-2 sm:px-2 sm:py-3 text-right">Arvo</th>
                                    <th className="px-2 py-2 sm:px-2 sm:py-3 text-right">Kpl</th>
                                    <th className="px-2 py-2 sm:px-3 sm:py-3 text-right">Yht.</th>
                                    <th className="px-2 py-2 sm:px-3 sm:py-3 text-right bg-white/5 text-primary">Tarve ({playerCount})</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-green/30">
                                {chips.map((chip) => (
                                    <tr key={chip.color} className="bg-[#1b2b22]/50 hover:bg-[#1b2b22] transition-colors">
                                        <td className="px-2 py-2 sm:px-3 sm:py-3 font-medium text-white flex items-center gap-1.5 sm:gap-2">
                                            <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border shadow-sm shrink-0 ${chip.colorCode}`}></span>
                                            {chip.color}
                                        </td>
                                        <td className="px-2 py-2 sm:px-2 sm:py-3 text-right text-gray-300 font-mono">{chip.value}</td>
                                        <td className="px-2 py-2 sm:px-2 sm:py-3 text-right text-gray-300 font-mono">{chip.count}</td>
                                        <td className="px-2 py-2 sm:px-3 sm:py-3 text-right text-white font-bold font-mono">{chip.total}</td>
                                        <td className="px-2 py-2 sm:px-3 sm:py-3 text-right text-primary font-bold font-mono bg-white/5">
                                            {chip.count * playerCount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 text-center px-1">
                        <p className="text-xs sm:text-sm text-gray-400 flex flex-col sm:block">
                            <span>Yhteensä <span className="text-white font-bold">{startingStack.toLocaleString()}</span> / pelaaja</span>
                            <span className="hidden sm:inline mx-2">•</span>
                            <span className="mt-1 sm:mt-0"><span className="text-primary font-bold">{(startingStack * playerCount).toLocaleString()}</span> pistettä pelissä</span>
                        </p>
                    </div>
                </div>

                {/* Blind Structure (Interactive) */}
                <div className="bg-card-bg border border-border-green/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl flex flex-col h-full lg:col-start-2 lg:row-span-2">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">timer</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-white">Blinditasot</h3>
                        </div>
                        <button
                            onClick={() => setIsClockOpen(true)}
                            className="flex items-center gap-2 bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue border border-brand-blue/30 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm">play_arrow</span>
                            Avaa kello
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col overflow-hidden min-h-[400px]">

                        {/* Detail View */}
                        <div className="bg-[#112117] rounded-xl p-4 sm:p-6 mb-4 border border-border-green/30 shadow-inner relative overflow-hidden group transition-all duration-300 shrink-0">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="material-symbols-outlined text-8xl">timer</span>
                            </div>

                            {selectedLevel.level === 'break' ? (
                                <div className="flex flex-col items-center justify-center py-4 text-center">
                                    <span className="text-brand-blue font-bold tracking-[0.2em] uppercase text-sm mb-2">Tauko</span>
                                    <h2 className="text-3xl sm:text-4xl text-white font-black mb-1">{selectedLevel.label}</h2>
                                    <p className="text-gray-400 text-sm">{selectedLevel.note}</p>
                                    <div className="mt-4 px-3 py-1 bg-brand-blue/20 rounded text-brand-blue font-mono font-bold">
                                        {selectedLevel.fixedDuration}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-1 block">Taso {selectedLevel.level}</span>
                                            <h2 className="text-4xl sm:text-5xl text-white font-black tracking-tighter">
                                                {selectedLevel.sb} <span className="text-gray-600 font-light">/</span> {selectedLevel.bb}
                                            </h2>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-gray-500 text-xs uppercase tracking-wider">Kesto</span>
                                            <span className="text-xl text-white font-bold font-mono">{blindDuration} min</span>
                                        </div>
                                    </div>

                                    {/* Stack Stats Visuals */}
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                                            <span className="block text-gray-500 text-[10px] uppercase tracking-wider mb-1 truncate" title="Alkustack (BB)">Stack (BB)</span>
                                            <span className={`text-lg font-bold font-mono ${stats && stats.bbInStack < 20 ? 'text-red-400' : 'text-primary'}`}>
                                                {stats ? Math.floor(stats.bbInStack) : '-'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                                            <span className="block text-gray-500 text-[10px] uppercase tracking-wider mb-1 truncate" title="Potti (Min)">Min Potti</span>
                                            <span className="text-lg text-white font-bold font-mono">
                                                {stats ? stats.sb + stats.bb : '-'}
                                            </span>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                                            <span className="block text-gray-500 text-[10px] uppercase tracking-wider mb-1 truncate">Min Raise</span>
                                            <span className="text-lg text-white font-bold font-mono">
                                                {stats ? stats.bb * 2 : '-'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Interactive Visual Graph (Desktop/Tablet) */}
                        <div className="hidden sm:flex h-40 items-end gap-2 mb-6 px-4 pt-8 relative select-none">
                            {/* Background Grid */}
                            <div className="absolute inset-0 px-4 pb-6 pt-8 flex flex-col justify-between pointer-events-none opacity-10">
                                <div className="w-full border-t border-white"></div>
                                <div className="w-full border-t border-white"></div>
                                <div className="w-full border-t border-white"></div>
                                <div className="w-full border-t border-white"></div>
                            </div>

                            {blinds.map((level, i) => {
                                const isBreak = level.level === 'break';
                                const isSelected = i === selectedLevelIndex;
                                const bb = level.level === 'break' ? 0 : level.bb;
                                const heightPercent = isBreak ? 100 : Math.max(10, (bb / maxBB) * 100);

                                return (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedLevelIndex(i)}
                                        className="flex-1 h-full flex flex-col justify-end items-center group relative focus:outline-none"
                                    >
                                        {/* Tooltip */}
                                        <div className={`absolute -top-6 transition-all duration-200 text-xs font-bold font-mono ${isSelected ? 'opacity-100 text-primary translate-y-0' : 'opacity-0 text-gray-400 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                                            {isBreak ? 'Tauko' : bb}
                                        </div>

                                        {/* Bar */}
                                        <div
                                            className={`w-full max-w-[32px] rounded-t-md transition-all duration-300 relative ${isBreak
                                                ? 'bg-brand-blue/10 h-full border-x border-t border-brand-blue/30'
                                                : isSelected
                                                    ? 'bg-primary shadow-[0_0_20px_rgba(54,226,123,0.3)] z-10'
                                                    : 'bg-[#2d4a39] hover:bg-[#36e27b]/50'
                                                }`}
                                            style={{ height: isBreak ? '100%' : `${heightPercent}%` }}
                                        >
                                            {isBreak && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-brand-blue/50 text-lg">coffee</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Label */}
                                        <div className={`mt-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                                            {isBreak ? 'T' : level.level}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* List Container */}
                        <div className="flex flex-col flex-grow overflow-hidden">

                            {/* Desktop/Tablet Header (Hidden on Mobile) */}
                            <div className="hidden sm:grid grid-cols-3 px-4 py-2 text-gray-400 uppercase tracking-wider text-xs font-semibold border-b border-border-green/30 bg-card-bg">
                                <div>Taso</div>
                                <div>Blindit</div>
                                <div className="text-right">Kesto</div>
                            </div>

                            {/* Scrollable Area */}
                            {/* Mobile: Horizontal scroll, Cards */}
                            {/* Desktop: Vertical scroll, List items */}
                            <div className="flex sm:flex-col flex-row overflow-x-auto sm:overflow-x-hidden sm:overflow-y-auto gap-3 sm:gap-0 p-1 sm:p-0 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent snap-x snap-mandatory">
                                {blinds.map((level, i) => {
                                    const isSelected = i === selectedLevelIndex;

                                    const handleClick = () => setSelectedLevelIndex(i);

                                    if (level.level === 'break') {
                                        return (
                                            <div
                                                key={`break-${i}`}
                                                onClick={handleClick}
                                                className={`
                                                    snap-center shrink-0 sm:shrink
                                                    cursor-pointer transition-all duration-200 
                                                    /* Mobile Styles */
                                                    w-32 sm:w-full 
                                                    rounded-xl sm:rounded-none
                                                    flex flex-col sm:flex-row items-center sm:justify-center
                                                    justify-center p-4 sm:px-4 sm:py-3
                                                    border border-brand-blue/20 sm:border-0 sm:border-y
                                                    ${isSelected
                                                        ? 'bg-brand-blue/20 scale-[1.02] shadow-md z-10 relative border-brand-blue'
                                                        : 'bg-brand-blue/5 hover:bg-brand-blue/10'}
                                                `}
                                            >
                                                <span className="material-symbols-outlined text-brand-blue text-xl sm:text-sm mb-2 sm:mb-0 sm:mr-2">coffee</span>
                                                <span className="text-brand-blue font-bold tracking-widest uppercase text-xs text-center">{level.label}</span>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div
                                            key={i}
                                            onClick={handleClick}
                                            className={`
                                                snap-center shrink-0 sm:shrink
                                                cursor-pointer transition-all duration-200 
                                                /* Mobile Styles */
                                                w-32 sm:w-full 
                                                rounded-xl sm:rounded-none
                                                flex flex-col sm:grid sm:grid-cols-3 items-center sm:items-center
                                                justify-center p-3 sm:px-4 sm:py-3 gap-1 sm:gap-0
                                                border sm:border-0 sm:border-l-4
                                                ${isSelected
                                                    ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(54,226,123,0.1)] sm:shadow-none'
                                                    : 'bg-[#112117] sm:bg-transparent border-border-green/30 sm:border-transparent hover:bg-white/5'}
                                            `}
                                        >
                                            <div className={`font-medium text-xs sm:text-sm ${isSelected ? 'text-primary' : 'text-gray-400'} flex flex-col sm:block items-center`}>
                                                <span className="sm:hidden uppercase text-[9px] tracking-widest opacity-60 mb-0.5">Taso</span>
                                                #{level.level}
                                            </div>
                                            <div className={`font-mono font-bold text-sm sm:text-base text-center sm:text-left ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                                                {level.sb} / {level.bb}
                                            </div>
                                            <div className="text-right text-gray-400 text-xs sm:text-sm sm:block hidden">
                                                {blindDuration} min
                                            </div>
                                            {/* Mobile only duration */}
                                            <div className="text-gray-500 text-[10px] sm:hidden mt-1">
                                                {blindDuration} min
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rules Card (3rd on Mobile, Bottom Left on Desktop) */}
                <div className="bg-card-bg border border-border-green/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
                            <span className="material-symbols-outlined text-[20px] sm:text-[24px]">gavel</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">Säännöt & Ohjeet</h3>
                    </div>
                    <ul className="space-y-3 sm:space-y-4">
                        {[
                            "Pelaa standardi NLHE-säännöillä (No-Limit Texas Hold'em).",
                            "Vilunkipelaaminen, puhelinhäirintä ja merkkien manipulointi kielletty.",
                            "Turnausjohtajan päätös on lopullinen ristiriitatilanteissa.",
                            "Merkit eivät vastaa rahaa – ei vaihtoarvoa turnauksen ulkopuolella.",
                            "Eemeli-special mahdollinen",
                            `Tasot nousevat automaattisesti ${blindDuration} minuutin välein.`
                        ].map((rule, i) => (
                            <li key={i} className="flex gap-2 sm:gap-3 text-gray-300 text-xs sm:text-sm leading-relaxed">
                                <span className="material-symbols-outlined text-primary text-base sm:text-lg flex-shrink-0 mt-0.5">check_circle</span>
                                <span>{rule}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Clock Overlay */}
                <TournamentClock
                    isOpen={isClockOpen}
                    onClose={() => setIsClockOpen(false)}
                    levels={blinds}
                    blindDuration={blindDuration}
                />

            </div>
        </section>
    );
};