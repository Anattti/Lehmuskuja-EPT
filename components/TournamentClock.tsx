'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface TournamentClockProps {
    isOpen: boolean;
    onClose: () => void;
    levels: any[];
    blindDuration: number;
}

// Chip definitions for calculation
const CHIP_VALUES = [
    { value: 5000, color: 'bg-gray-900 border-gray-600 text-white', ring: 'border-gray-500' },
    { value: 1000, color: 'bg-blue-600 border-blue-700 text-white', ring: 'border-blue-400' },
    { value: 500, color: 'bg-green-600 border-green-700 text-white', ring: 'border-green-400' },
    { value: 100, color: 'bg-red-600 border-red-700 text-white', ring: 'border-red-400' },
    { value: 25, color: 'bg-gray-200 border-gray-300 text-gray-900', ring: 'border-gray-400' },
];

export const TournamentClock: React.FC<TournamentClockProps> = ({ isOpen, onClose, levels, blindDuration }) => {
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0); // seconds
    const [isRunning, setIsRunning] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isFirstMount = useRef(true);

    const currentLevel = levels[currentLevelIndex];
    const nextLevel = levels[currentLevelIndex + 1];

    // Helper to calculate required chips
    const getChipsForAmount = (amount: number) => {
        const result = [];
        let remaining = amount;

        for (const chip of CHIP_VALUES) {
            const count = Math.floor(remaining / chip.value);
            if (count > 0) {
                for (let i = 0; i < count; i++) {
                    result.push(chip);
                }
                remaining %= chip.value;
            }
        }
        return result;
    };

    // Sound Generators
    const playTimerEndSound = () => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();

            const now = ctx.currentTime;

            // 4 beeps for attention (Alarm)
            [0, 0.4, 0.8, 1.2].forEach(start => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.type = 'square';
                osc.frequency.setValueAtTime(880, now + start);
                osc.frequency.exponentialRampToValueAtTime(440, now + start + 0.1);

                gain.gain.setValueAtTime(0.1, now + start);
                gain.gain.exponentialRampToValueAtTime(0.01, now + start + 0.3);

                osc.start(now + start);
                osc.stop(now + start + 0.3);
            });
        } catch (e) {
            console.error("Audio play failed", e);
        }
    };

    const playLevelChangeSound = () => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();

            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            // Pleasant chime
            osc.type = 'sine';
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.2); // C6

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);

            osc.start(now);
            osc.stop(now + 1.5);
        } catch (e) {
            console.error("Audio play failed", e);
        }
    };

    // Helper to get duration in seconds for a specific level
    const getLevelDuration = (level: any) => {
        if (!level) return 0;
        if (level.level === 'break' && level.fixedDuration) {
            // Assume format "15 min"
            const min = parseInt(level.fixedDuration.split(' ')[0]);
            return min * 60;
        }
        return blindDuration * 60;
    };

    // Initialize timer when opening
    useEffect(() => {
        if (isOpen) {
            setTimeLeft(getLevelDuration(currentLevel));
            setIsRunning(false);
            isFirstMount.current = true;
        }
    }, [isOpen, blindDuration]);

    // Play sound on level change (but not first mount)
    useEffect(() => {
        if (isOpen) {
            if (isFirstMount.current) {
                isFirstMount.current = false;
            } else {
                playLevelChangeSound();
            }
        }
    }, [currentLevelIndex, isOpen]);

    // Timer Logic
    useEffect(() => {
        let interval: any;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
            playTimerEndSound();
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    // Full Screen Toggle
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const handleNextLevel = () => {
        if (currentLevelIndex < levels.length - 1) {
            const nextIdx = currentLevelIndex + 1;
            setCurrentLevelIndex(nextIdx);
            setTimeLeft(getLevelDuration(levels[nextIdx]));
            setIsRunning(false);
        }
    };

    const handlePrevLevel = () => {
        if (currentLevelIndex > 0) {
            const prevIdx = currentLevelIndex - 1;
            setCurrentLevelIndex(prevIdx);
            setTimeLeft(getLevelDuration(levels[prevIdx]));
            setIsRunning(false);
        }
    };

    const handleResetLevel = () => {
        setTimeLeft(getLevelDuration(currentLevel));
        setIsRunning(false);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!isOpen) return null;

    const isBreak = currentLevel?.level === 'break';

    // Calculate chips for current level
    const sbChips = !isBreak ? getChipsForAmount(currentLevel.sb) : [];
    const bbChips = !isBreak ? getChipsForAmount(currentLevel.bb) : [];

    // Use portal to render at document root level to ensure proper z-index stacking
    return createPortal(
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#050b08] text-white flex flex-col animate-in fade-in duration-300">

            {/* Top Bar */}
            <div className="flex justify-between items-center p-4 sm:p-6 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">timer</span>
                    <span className="font-bold tracking-widest uppercase text-sm text-gray-400">Turnauskello</span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleFullScreen}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                        title="Full Screen"
                    >
                        <span className="material-symbols-outlined">fullscreen</span>
                    </button>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-gray-400 hover:text-red-500"
                        title="Sulje"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow flex flex-col items-center justify-center p-4 relative overflow-hidden">

                {/* Background Glow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[150px] opacity-20 pointer-events-none transition-colors duration-1000 ${isBreak ? 'bg-brand-blue' : 'bg-primary'}`}></div>

                {/* Level Indicator */}
                <div className="mb-4 text-center relative z-10">
                    {isBreak ? (
                        <span className="inline-block px-4 py-1 rounded-full bg-brand-blue/20 text-brand-blue font-bold tracking-[0.3em] uppercase animate-pulse">
                            Tauko
                        </span>
                    ) : (
                        <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-gray-400 font-bold tracking-[0.2em] uppercase">
                            Taso {currentLevel.level}
                        </span>
                    )}
                </div>

                {/* Blinds Display */}
                <div className="text-center mb-6 relative z-10">
                    {isBreak ? (
                        <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight">
                            {currentLevel.note || "Tauko"}
                        </h1>
                    ) : (
                        <h1 className="text-6xl sm:text-9xl font-black text-white tracking-tighter tabular-nums leading-none">
                            <span className="text-gray-500 text-4xl sm:text-6xl align-top mr-2">$</span>
                            {currentLevel.sb}
                            <span className="text-gray-600 mx-4 font-light">/</span>
                            {currentLevel.bb}
                        </h1>
                    )}
                </div>

                {/* Chip Visualization */}
                {!isBreak && (
                    <div className="flex items-center justify-center gap-8 sm:gap-16 mb-8 relative z-10 animate-fade-in">
                        {/* SB Chips */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Small Blind</span>
                            <div className="flex items-center justify-center -space-x-2 sm:-space-x-3">
                                {sbChips.map((chip, idx) => (
                                    <div
                                        key={`sb-${idx}`}
                                        className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full border-4 shadow-lg flex items-center justify-center text-[10px] sm:text-xs font-bold relative group transform transition-transform hover:-translate-y-2 ${chip.color} ${chip.ring}`}
                                        style={{ zIndex: idx }}
                                    >
                                        <div className="absolute inset-0 rounded-full border border-white/20 border-dashed m-1"></div>
                                        {chip.value}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-12 w-px bg-white/10"></div>

                        {/* BB Chips */}
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Big Blind</span>
                            <div className="flex items-center justify-center -space-x-2 sm:-space-x-3">
                                {bbChips.map((chip, idx) => (
                                    <div
                                        key={`bb-${idx}`}
                                        className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full border-4 shadow-lg flex items-center justify-center text-[10px] sm:text-xs font-bold relative group transform transition-transform hover:-translate-y-2 ${chip.color} ${chip.ring}`}
                                        style={{ zIndex: idx }}
                                    >
                                        <div className="absolute inset-0 rounded-full border border-white/20 border-dashed m-1"></div>
                                        {chip.value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Timer */}
                <div className={`font-mono font-bold text-[20vw] sm:text-[12rem] leading-none mb-8 tabular-nums tracking-tighter relative z-10 drop-shadow-2xl transition-colors duration-500 ${timeLeft < 60 && isRunning ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                    {formatTime(timeLeft)}
                </div>

                {/* Next Level Preview */}
                <div className="absolute bottom-32 sm:bottom-40 text-center opacity-60">
                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Seuraava Taso</p>
                    {nextLevel ? (
                        nextLevel.level === 'break' ? (
                            <p className="text-xl font-bold text-brand-blue">TAUKO ({nextLevel.fixedDuration})</p>
                        ) : (
                            <p className="text-xl font-bold text-white">{nextLevel.sb} / {nextLevel.bb}</p>
                        )
                    ) : (
                        <p className="text-xl font-bold text-gray-600">Turnaus Päättyy</p>
                    )}
                </div>

            </div>

            {/* Controls */}
            <div className="bg-[#0f1913] border-t border-white/5 p-6 sm:p-8 flex items-center justify-center gap-4 sm:gap-8 z-20">
                <button
                    onClick={handlePrevLevel}
                    disabled={currentLevelIndex === 0}
                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-2xl sm:text-3xl">skip_previous</span>
                </button>

                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all active:scale-95 ${isRunning ? 'bg-yellow-500 hover:bg-yellow-400 text-black' : 'bg-primary hover:bg-primary-hover text-black'}`}
                >
                    <span className="material-symbols-outlined text-4xl sm:text-5xl fill">
                        {isRunning ? 'pause' : 'play_arrow'}
                    </span>
                </button>

                <button
                    onClick={handleResetLevel}
                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-all active:scale-95"
                    title="Reset Level Time"
                >
                    <span className="material-symbols-outlined text-2xl sm:text-3xl">replay</span>
                </button>

                <button
                    onClick={handleNextLevel}
                    disabled={currentLevelIndex === levels.length - 1}
                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-2xl sm:text-3xl">skip_next</span>
                </button>
            </div>
        </div>,
        document.body
    );
};