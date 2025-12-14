import React from 'react';

interface StatsGridProps {
    playerCount: number;
    onPlayerCountChange: (count: number) => void;
    blindDuration: number;
    onBlindDurationChange: (duration: number) => void;
    startingStack: number;
    onStartingStackChange: (stack: number) => void;
}

// 500 total chips / 5 colors = 100 chips per color
const TOTAL_CHIPS_PER_COLOR = 100;

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

const STACK_OPTIONS = Object.keys(STACK_DISTRIBUTIONS).map(Number);

const CHIP_CONFIGS = [
    { color: 'Valkoinen', colorClass: 'bg-gray-200' },
    { color: 'Punainen', colorClass: 'bg-red-600' },
    { color: 'Vihreä', colorClass: 'bg-green-600' },
    { color: 'Sininen', colorClass: 'bg-blue-600' },
    { color: 'Musta', colorClass: 'bg-gray-900 border border-gray-600' },
];

const DURATION_OPTIONS = [5, 10, 15, 20, 25, 30];

export const StatsGrid: React.FC<StatsGridProps> = ({
    playerCount,
    onPlayerCountChange,
    blindDuration,
    onBlindDurationChange,
    startingStack,
    onStartingStackChange
}) => {

    const handleDecrement = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (playerCount > 2) onPlayerCountChange(playerCount - 1);
    };

    const handleIncrement = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (playerCount < 20) onPlayerCountChange(playerCount + 1);
    };

    const toggleDuration = () => {
        const currentIndex = DURATION_OPTIONS.indexOf(blindDuration);
        const nextIndex = (currentIndex + 1) % DURATION_OPTIONS.length;
        onBlindDurationChange(DURATION_OPTIONS[nextIndex]);
    };

    const toggleStack = () => {
        const currentIndex = STACK_OPTIONS.indexOf(startingStack);
        const nextIndex = (currentIndex + 1) % STACK_OPTIONS.length;
        onStartingStackChange(STACK_OPTIONS[nextIndex]);
    };

    const currentDistribution = STACK_DISTRIBUTIONS[startingStack] || STACK_DISTRIBUTIONS[10000];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-7xl px-3 sm:px-4">

            {/* Stack Card - Clickable */}
            <button
                onClick={toggleStack}
                className="bg-[#1b2b22]/50 border border-border-green/50 backdrop-blur-sm p-4 sm:p-5 rounded-2xl flex items-center gap-3 sm:gap-4 hover:bg-[#1b2b22] hover:border-brand-blue/50 transition-all group cursor-pointer text-left relative"
            >
                <div className="absolute top-2 right-3 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Vaihda
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform bg-brand-blue/20 text-brand-blue shrink-0">
                    <span className="material-symbols-outlined text-[20px] sm:text-[24px]">layers</span>
                </div>
                <div>
                    <p className="text-[10px] sm:text-xs text-gray-400 uppercase font-semibold tracking-wider">Alkustack</p>
                    <p className="text-white font-bold text-base sm:text-lg tabular-nums">{startingStack.toLocaleString()}</p>
                </div>
            </button>

            {/* Players Card - Interactive */}
            <div className="bg-[#1b2b22]/50 border border-border-green/50 backdrop-blur-sm p-4 sm:p-5 rounded-2xl flex items-center gap-3 sm:gap-4 hover:bg-[#1b2b22] transition-colors group select-none relative overflow-hidden">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform bg-primary/20 text-primary shrink-0">
                    <span className="material-symbols-outlined text-[20px] sm:text-[24px]">groups</span>
                </div>
                <div className="flex-grow">
                    <p className="text-[10px] sm:text-xs text-gray-400 uppercase font-semibold tracking-wider">Pelaajia</p>
                    <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-0">
                        <button
                            onClick={handleDecrement}
                            className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-30"
                            disabled={playerCount <= 2}
                        >
                            <span className="material-symbols-outlined text-xs sm:text-sm">remove</span>
                        </button>
                        <p className="text-white font-bold text-base sm:text-lg min-w-[1.5ch] text-center">{playerCount}</p>
                        <button
                            onClick={handleIncrement}
                            className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors disabled:opacity-30"
                            disabled={playerCount >= 20}
                        >
                            <span className="material-symbols-outlined text-xs sm:text-sm">add</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Chip Inventory Card */}
            <div className="bg-[#1b2b22]/50 border border-border-green/50 backdrop-blur-sm p-4 sm:p-5 rounded-2xl flex flex-col justify-center gap-2 hover:bg-[#1b2b22] transition-colors group cursor-default">
                <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] sm:text-xs text-gray-400 uppercase font-semibold tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs sm:text-sm">inventory_2</span>
                        Merkkitilanne
                    </p>
                    <span className="text-[9px] sm:text-[10px] text-gray-500">Max 100/väri</span>
                </div>

                <div className="flex justify-between items-end h-8 gap-1 mb-6">
                    {CHIP_CONFIGS.map((chip, index) => {
                        const neededPerPlayer = currentDistribution[index];
                        const neededTotal = neededPerPlayer * playerCount;
                        const remaining = TOTAL_CHIPS_PER_COLOR - neededTotal;
                        const isCritical = remaining < 0;
                        const isLow = remaining < 20 && remaining >= 0;
                        const heightPercent = Math.min(100, Math.max(10, (remaining / TOTAL_CHIPS_PER_COLOR) * 100));

                        return (
                            <div key={chip.color} className="flex flex-col items-center gap-1 w-full group/bar relative">
                                {/* Bar */}
                                <div className="w-full h-full flex items-end justify-center">
                                    <div
                                        className={`w-2.5 sm:w-3 rounded-t-sm transition-all duration-500 ${isCritical ? 'bg-red-500 animate-pulse' : isLow ? 'bg-yellow-500' : 'bg-primary/50'}`}
                                        style={{ height: `${isCritical ? 100 : heightPercent}%` }}
                                    ></div>
                                </div>

                                {/* Indicator Dot */}
                                <div className={`w-5 h-5 rounded-full ${chip.colorClass} shadow-sm border border-black/20`}></div>

                                {/* Number Display */}
                                <span className={`absolute top-full mt-1 text-[15px] sm:text-[12px] font-mono font-bold ${isCritical ? 'text-red-500' : 'text-gray-500'}`}>
                                    {remaining}
                                </span>
                            </div>
                        );
                    })}
                </div>
                {/* Warning Text if critical */}
                {currentDistribution.some(count => (count * playerCount) > TOTAL_CHIPS_PER_COLOR) && (
                    <p className="text-[9px] sm:text-[10px] text-red-400 font-bold text-center animate-pulse mt-2">
                        Merkit eivät riitä!
                    </p>
                )}
            </div>

            {/* Levels Card - Clickable */}
            <button
                onClick={toggleDuration}
                className="bg-[#1b2b22]/50 border border-border-green/50 backdrop-blur-sm p-4 sm:p-5 rounded-2xl flex items-center gap-3 sm:gap-4 hover:bg-[#1b2b22] hover:border-brand-red/50 transition-all group cursor-pointer text-left relative"
            >
                <div className="absolute top-2 right-3 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Vaihda
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform bg-brand-red/20 text-brand-red shrink-0">
                    <span className="material-symbols-outlined text-[20px] sm:text-[24px]">timer</span>
                </div>
                <div>
                    <p className="text-[10px] sm:text-xs text-gray-400 uppercase font-semibold tracking-wider">Tasot</p>
                    <p className="text-white font-bold text-base sm:text-lg tabular-nums">{blindDuration} Minuuttia</p>
                </div>
            </button>

        </div>
    );
};