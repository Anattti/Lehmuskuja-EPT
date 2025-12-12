import React from 'react';

export const RulesPage: React.FC = () => {
    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-12 relative z-10 animate-fade-in">
             {/* Header */}
             <div className="text-center mb-16 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-blue/20 rounded-full blur-[80px] -z-10"></div>
                <h2 className="text-sm font-bold tracking-[0.3em] text-primary uppercase mb-2">Turnausohjesääntö</h2>
                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter mb-6">
                    SÄÄNNÖT & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-red">ETIKETTI</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Lehmuskuja EPT noudattaa kansainvälisiä pokeriturnauskäytäntöjä (TDA) sovellettuna kotipeliympäristöön.
                    Tavoitteena on reilu, sujuva ja viihtyisä peli.
                </p>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
                {/* General Rules */}
                <div className="bg-card-bg border border-border-green/50 rounded-3xl p-8 shadow-lg relative overflow-hidden group hover:border-border-green transition-colors">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="material-symbols-outlined text-8xl">balance</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-xs">01</span>
                        Yleiset Periaatteet
                    </h3>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex gap-3">
                            <span className="material-symbols-outlined text-primary mt-1">check</span>
                            <span>Peli on <strong>No-Limit Texas Hold'em</strong>.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="material-symbols-outlined text-primary mt-1">check</span>
                            <span>Turnausjohtajan (TD) sana on laki. Ristiriitatilanteissa TD:n päätös on lopullinen.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="material-symbols-outlined text-primary mt-1">check</span>
                            <span>Merkit eivät vastaa oikeaa rahaa. Turnaus on puhtaasti viihteellinen.</span>
                        </li>
                    </ul>
                </div>

                {/* Etiquette */}
                <div className="bg-card-bg border border-border-green/50 rounded-3xl p-8 shadow-lg relative overflow-hidden group hover:border-border-green transition-colors">
                     <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="material-symbols-outlined text-8xl">handshake</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-xs">02</span>
                        Pöytäetiketti
                    </h3>
                    <ul className="space-y-4 text-gray-300">
                         <li className="flex gap-3">
                            <span className="material-symbols-outlined text-brand-red mt-1">block</span>
                            <span><strong>Ei vilunkipeliä.</strong> Korttien merkkaaminen, yhteistyö (collusion) tai merkkien piilottelu johtaa diskaukseen.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="material-symbols-outlined text-brand-red mt-1">block</span>
                            <span><strong>Puhelinhäirintä.</strong> Vältä puhelimen käyttöä käden aikana. Peliä ei hidasteta somettamisen takia.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="material-symbols-outlined text-primary mt-1">check</span>
                            <span>Kunnioita muita pelaajia ja jakajaa. Puhu vain suomea tai englantia pöydässä.</span>
                        </li>
                    </ul>
                </div>

                {/* Game Structure */}
                <div className="bg-card-bg border border-border-green/50 rounded-3xl p-8 shadow-lg md:col-span-2 relative overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full bg-primary text-background-dark flex items-center justify-center text-xs font-bold">03</span>
                                Pelin Kulku
                            </h3>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    <strong className="text-white block mb-1">Blindit & Kellotus</strong> 
                                    Blindit nousevat automaattisesti 15 minuutin välein. Uusi taso alkaa heti kellon soidessa. Jos jako on kesken (ensimmäinen kortti jaettu), se pelataan loppuun vanhoilla blindeilla.
                                </p>
                                <p>
                                    <strong className="text-white block mb-1">Värinvaihto (Chip Race)</strong> 
                                    Tauon aikana pienet merkit (25 ja 100) poistetaan pelistä. Ylimääräiset pikkumerkit vaihdetaan suurempiin pyöristyssäännöllä (ns. chip race tai "yksi yli puolen").
                                </p>
                                <p>
                                    <strong className="text-white block mb-1">Showdown</strong> 
                                    Jos panostus on maksettu riverillä, viimeisen aggressiivisen teon tehnyt näyttää ensin. Jos ei panostuksia (sökötetty ympäri), "first to act" (SB tai buttonin vasen puoli) näyttää ensin.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 bg-[#112117] rounded-xl p-6 border border-border-green/30">
                            <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Seuraamukset</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li className="flex justify-between border-b border-white/5 pb-2">
                                    <span>Korttien paljastus (kesken käden)</span>
                                    <span className="text-white">Varoitus</span>
                                </li>
                                <li className="flex justify-between border-b border-white/5 pb-2">
                                    <span>Jatkuva viivyttely</span>
                                    <span className="text-white">1 kierros jäähylle</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Törkeä epäurheilijamaisuus</span>
                                    <span className="text-white">Diskaus</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    );
};