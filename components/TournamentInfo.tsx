import React from 'react';

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

const blinds = [
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

    const distribution = STACK_DISTRIBUTIONS[startingStack] || STACK_DISTRIBUTIONS[10000];

    const chips = CHIP_DEFINITIONS.map((def, index) => ({
        ...def,
        count: distribution[index],
        total: distribution[index] * def.value
    })).filter(chip => chip.count > 0);

    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                {/* Chip Distribution (1st on Mobile, Top Left on Desktop) */}
                <div className="bg-card-bg border border-border-green/50 rounded-3xl p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">poker_chip</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white leading-none">Merkkijako</h3>
                                <span className="text-xs text-gray-400 uppercase tracking-widest">{playerCount} Pelaajaa</span>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-border-green/30">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#112117] text-gray-400 uppercase tracking-wider text-xs font-semibold">
                                <tr>
                                    <th className="px-3 py-3">Väri</th>
                                    <th className="px-2 py-3 text-right">Arvo</th>
                                    <th className="px-2 py-3 text-right">Kpl</th>
                                    <th className="px-3 py-3 text-right">Yht.</th>
                                    <th className="px-3 py-3 text-right bg-white/5 text-primary">Tarve ({playerCount})</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-green/30">
                                {chips.map((chip) => (
                                    <tr key={chip.color} className="bg-[#1b2b22]/50 hover:bg-[#1b2b22] transition-colors">
                                        <td className="px-3 py-3 font-medium text-white flex items-center gap-2">
                                            <span className={`w-3 h-3 rounded-full border shadow-sm ${chip.colorCode}`}></span>
                                            {chip.color}
                                        </td>
                                        <td className="px-2 py-3 text-right text-gray-300 font-mono">{chip.value}</td>
                                        <td className="px-2 py-3 text-right text-gray-300 font-mono">{chip.count}</td>
                                        <td className="px-3 py-3 text-right text-white font-bold font-mono">{chip.total}</td>
                                        <td className="px-3 py-3 text-right text-primary font-bold font-mono bg-white/5">
                                            {chip.count * playerCount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-400">
                            Yhteensä <span className="text-white font-bold">{startingStack.toLocaleString()}</span> / pelaaja
                            <span className="mx-2">•</span>
                            <span className="text-primary font-bold">{(startingStack * playerCount).toLocaleString()}</span> pistettä pelissä
                        </p>
                    </div>
                </div>

                {/* Blind Structure (2nd on Mobile, Right Column Spanning 2 Rows on Desktop) */}
                <div className="bg-card-bg border border-border-green/50 rounded-3xl p-8 shadow-xl flex flex-col h-full lg:col-start-2 lg:row-span-2">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                            <span className="material-symbols-outlined">timer</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white">Blinditasot</h3>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-border-green/30 flex-grow">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-[#112117] text-gray-400 uppercase tracking-wider text-xs font-semibold">
                                <tr>
                                    <th className="px-4 py-3">Taso</th>
                                    <th className="px-4 py-3">Blindit</th>
                                    <th className="px-4 py-3 text-right">Kesto</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-green/30">
                                {blinds.map((level, i) => {
                                    if (level.level === 'break') {
                                        return (
                                            <tr key={`break-${i}`} className="bg-brand-blue/10 border-y border-brand-blue/20">
                                                <td colSpan={3} className="px-4 py-3 text-center">
                                                    <div className="flex flex-col items-center justify-center gap-1">
                                                        <span className="text-brand-blue font-bold tracking-widest uppercase text-xs">{level.label}</span>
                                                        <span className="text-gray-400 text-xs">{level.note}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return (
                                        <tr key={i} className="bg-[#1b2b22]/50 hover:bg-[#1b2b22] transition-colors">
                                            <td className="px-4 py-3 font-medium text-gray-400">#{level.level}</td>
                                            <td className="px-4 py-3 text-white font-mono font-bold">
                                                {level.sb} / {level.bb}
                                            </td>
                                            <td className="px-4 py-3 text-right text-gray-400">{blindDuration} min</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Rules Card (3rd on Mobile, Bottom Left on Desktop) */}
                <div className="bg-card-bg border border-border-green/50 rounded-3xl p-8 shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                            <span className="material-symbols-outlined">gavel</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white">Säännöt & Ohjeet</h3>
                    </div>
                    <ul className="space-y-4">
                        {[
                            "Pelaa standardi NLHE-säännöillä (No-Limit Texas Hold'em).",
                            "Vilunkipelaaminen, puhelinhäirintä ja merkkien manipulointi kielletty.",
                            "Turnausjohtajan päätös on lopullinen ristiriitatilanteissa.",
                            "Merkit eivät vastaa rahaa – ei vaihtoarvoa turnauksen ulkopuolella.",
                            "Eemeli-special mahdollinen",
                            `Tasot nousevat automaattisesti ${blindDuration} minuutin välein.`
                        ].map((rule, i) => (
                            <li key={i} className="flex gap-3 text-gray-300 text-sm leading-relaxed">
                                <span className="material-symbols-outlined text-primary text-lg flex-shrink-0 mt-0.5">check_circle</span>
                                <span>{rule}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
};