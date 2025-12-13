'use client';

import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { StatsGrid } from '../components/StatsGrid';
import { TournamentInfo } from '../components/TournamentInfo';
import { AlcoholPolicyOverlay } from '../components/AlcoholPolicyOverlay';

export default function HomePage() {
    const [playerCount, setPlayerCount] = useState(4);
    const [blindDuration, setBlindDuration] = useState(15);
    const [startingStack, setStartingStack] = useState(10000);
    const [showPolicy, setShowPolicy] = useState(false);

    return (
        <div className="animate-in fade-in duration-500 w-full">
            <HeroSection onOpenPolicy={() => setShowPolicy(true)} />
            <div className="flex justify-center z-10 mb-8">
                <StatsGrid
                    playerCount={playerCount}
                    onPlayerCountChange={setPlayerCount}
                    blindDuration={blindDuration}
                    onBlindDurationChange={setBlindDuration}
                    startingStack={startingStack}
                    onStartingStackChange={setStartingStack}
                />
            </div>
            <TournamentInfo
                playerCount={playerCount}
                blindDuration={blindDuration}
                startingStack={startingStack}
            />
            <AlcoholPolicyOverlay isOpen={showPolicy} onClose={() => setShowPolicy(false)} />
        </div>
    );
}