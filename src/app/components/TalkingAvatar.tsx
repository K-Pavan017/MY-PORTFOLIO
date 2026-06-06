"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, Square, Volume2, VolumeX, Sparkles, MessageSquare } from "lucide-react";
import { profile } from "@/lib/data";

interface TalkingAvatarProps {
  imagePath?: string;
  videoPath?: string; // e.g., '/projects/avatar.mp4' if generated with Wav2Lip/HeyGen/etc.
}

export default function TalkingAvatar({
  imagePath = "/projects/developer.png",
  videoPath,
}: TalkingAvatarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [audioWaves, setAudioWaves] = useState<number[]>(Array.from({ length: 12 }, () => 6));
  
  // Custom states for visual lip-sync and hand movements
  const [mouthHeight, setMouthHeight] = useState(4);
  const [mouthWidth, setMouthWidth] = useState(16);
  const [handLeftY, setHandLeftY] = useState(40);
  const [handRightY, setHandRightY] = useState(40);

  // Combined introduction script built from resume summary
  const introScript = `Hello! I'm ${profile.name}, a specialist ${profile.roles[0]}, ${profile.roles[1]}, and ${profile.roles[2]}. ${profile.summary} I love developing end-to-end intelligent applications. Feel free to explore my projects below!`;

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
      setSpeechSupported(true);
    }
  }, []);

  // Autoplay Trigger Logic (Attempts immediate speak, otherwise waits for user activity)
  useEffect(() => {
    if (!speechSupported) return;

    let speechStarted = false;

    const tryAutoSpeak = () => {
      if (speechStarted || isPlaying) return;
      
      // Clear queue and compile introduction
      if (synthRef.current) {
        synthRef.current.cancel();
        
        const utterance = new SpeechSynthesisUtterance(introScript);
        utteranceRef.current = utterance;
        
        const voices = synthRef.current.getVoices();
        const premiumVoice = voices.find(
          (v) =>
            v.name.includes("Google US English") ||
            v.name.includes("Microsoft David") ||
            v.lang === "en-US"
        );
        if (premiumVoice) utterance.voice = premiumVoice;
        
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        utterance.volume = isMuted ? 0 : 1;

        utterance.onstart = () => {
          setIsPlaying(true);
          speechStarted = true;
          removeListeners();
        };

        utterance.onend = () => {
          setIsPlaying(false);
        };

        utterance.onerror = () => {
          // Silent catch if browser blocks autoplay
        };

        synthRef.current.speak(utterance);
      }
    };

    const removeListeners = () => {
      window.removeEventListener("click", tryAutoSpeak);
      window.removeEventListener("scroll", tryAutoSpeak);
      window.removeEventListener("mousemove", tryAutoSpeak);
      window.removeEventListener("touchstart", tryAutoSpeak);
    };

    // Attach interaction listeners to bypass audio blocking policies
    window.addEventListener("click", tryAutoSpeak);
    window.addEventListener("scroll", tryAutoSpeak);
    window.addEventListener("mousemove", tryAutoSpeak);
    window.addEventListener("touchstart", tryAutoSpeak);

    // Initial immediate launch attempt
    const timeout = setTimeout(() => {
      tryAutoSpeak();
    }, 1500);

    return () => {
      clearTimeout(timeout);
      removeListeners();
    };
  }, [speechSupported, isMuted]);

  // Sync lips, waves, and hands when speech is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        // Equalizer waves
        const newWaves = Array.from({ length: 12 }, () => Math.floor(Math.random() * 45) + 5);
        setAudioWaves(newWaves);

        // Lip movement: compute mouth height and width based on voice intensity
        const intensity = newWaves[5]; // central wave
        setMouthHeight(Math.max(4, Math.floor(intensity * 0.4)));
        setMouthWidth(Math.max(12, Math.floor(intensity * 0.5) + 10));

        // Hand movements: animate vertical displacement to replicate speaking gestures
        setHandLeftY(Math.sin(Date.now() * 0.005) * 12 + 10);
        setHandRightY(Math.cos(Date.now() * 0.006) * 12 + 10);
      }, 100);
    } else {
      setAudioWaves(Array.from({ length: 12 }, () => 6));
      setMouthHeight(4);
      setMouthWidth(16);
      setHandLeftY(45);
      setHandRightY(45);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSpeak = () => {
    if (videoPath) {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        } else {
          videoRef.current.play().catch(err => console.log("Video play error:", err));
          setIsPlaying(true);
        }
      }
      return;
    }

    if (!speechSupported || !synthRef.current) return;

    if (isPlaying) {
      synthRef.current.cancel();
      setIsPlaying(false);
      return;
    }

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(introScript);
    utteranceRef.current = utterance;

    const voices = synthRef.current.getVoices();
    const premiumVoice = voices.find(
      (v) =>
        v.name.includes("Google US English") ||
        v.name.includes("Microsoft David") ||
        v.lang === "en-US"
    );
    if (premiumVoice) utterance.voice = premiumVoice;

    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = isMuted ? 0 : 1;

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    synthRef.current.speak(utterance);
  };

  const handleStop = () => {
    if (videoPath) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      return;
    }

    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (videoPath && videoRef.current) {
      videoRef.current.muted = nextMuted;
      return;
    }

    if (isPlaying && synthRef.current && utteranceRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(introScript);
      utteranceRef.current = utterance;
      const voices = synthRef.current.getVoices();
      const premiumVoice = voices.find(
        (v) => v.name.includes("Google US") || v.lang === "en-US"
      );
      if (premiumVoice) utterance.voice = premiumVoice;
      utterance.volume = nextMuted ? 0 : 1;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      synthRef.current.speak(utterance);
    }
  };

  return (
    <div className="glass p-6 md:p-8 flex flex-col items-center justify-center gap-6 max-w-sm mx-auto shadow-2xl relative overflow-hidden group border-white/10 hover:border-accent-cyan/30 transition-all duration-500">
      {/* Decorative gradient corner glowing */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent-violet/20 blur-2xl rounded-full group-hover:bg-accent-violet/35 transition-colors" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-accent-cyan/15 blur-2xl rounded-full group-hover:bg-accent-cyan/25 transition-colors" />

      {/* Avatar Container */}
      <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-border/80 group-hover:border-accent-cyan/40 transition-colors shadow-inner bg-surface">
        {videoPath ? (
          <video
            ref={videoRef}
            src={videoPath}
            loop
            muted={isMuted}
            className="w-full h-full object-cover"
            playsInline
          />
        ) : (
          <div className="relative w-full h-full">
            {/* The Pixar style avatar image, with swaying animation on speech */}
            <div 
              className="relative w-full h-full transition-transform duration-300"
              style={{
                transform: isPlaying 
                  ? `translateY(${Math.sin(Date.now() * 0.01) * 2}px) rotate(${Math.cos(Date.now() * 0.005) * 1.5}deg)` 
                  : "translateY(0px) rotate(0deg)"
              }}
            >
              <Image
                src={imagePath}
                alt={profile.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Glowing audio background circle */}
            {isPlaying && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="absolute w-36 h-36 rounded-full border border-accent-cyan/40 animate-ping opacity-50" />
                <div className="absolute w-24 h-24 rounded-full border-2 border-accent-violet/40 animate-pulse opacity-70" />
              </div>
            )}

            {/* Overlay Morphing Lip Sync Mouth */}
            <div 
              className="absolute pointer-events-none transition-all duration-75 flex items-center justify-center bg-black/60 border border-red-400/50 rounded-full"
              style={{
                bottom: "28%",
                left: "50%",
                transform: "translateX(-50%)",
                height: `${mouthHeight}px`,
                width: `${mouthWidth}px`,
                opacity: isPlaying ? 0.95 : 0,
              }}
            >
              {/* Inner red glowing mouth/tongue element */}
              <div 
                className="bg-red-500 rounded-full transition-all"
                style={{
                  height: `${Math.max(1, mouthHeight - 3)}px`,
                  width: `${Math.max(4, mouthWidth - 6)}px`,
                }}
              />
            </div>

            {/* Pixar-style Animating Gesture Hands Overlay */}
            {/* Left Hand */}
            <div
              className="absolute pointer-events-none transition-all duration-100"
              style={{
                bottom: "-10px",
                left: "15%",
                transform: `translateY(${handLeftY}px) rotate(${isPlaying ? 15 : 0}deg)`,
                opacity: isPlaying ? 0.95 : 0,
              }}
            >
              <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 25C15 22 18 19 22 21C26 23 28 27 26 31C24 35 18 38 12 36C6 34 5 28 12 25Z" fill="#38bdf8" stroke="#06d6a0" strokeWidth="1.5" />
                <circle cx="20" cy="23" r="2.5" fill="#ffffff" />
              </svg>
            </div>
            {/* Right Hand */}
            <div
              className="absolute pointer-events-none transition-all duration-100"
              style={{
                bottom: "-10px",
                right: "15%",
                transform: `translateY(${handRightY}px) rotate(${isPlaying ? -15 : 0}deg)`,
                opacity: isPlaying ? 0.95 : 0,
              }}
            >
              <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33 25C30 22 27 19 23 21C19 23 17 27 19 31C21 35 27 38 33 36C39 34 40 28 33 25Z" fill="#38bdf8" stroke="#06d6a0" strokeWidth="1.5" />
                <circle cx="25" cy="23" r="2.5" fill="#ffffff" />
              </svg>
            </div>
          </div>
        )}

        {/* Floating status tag */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium flex items-center gap-1.5 glass-sm border-white/10 text-accent-cyan">
          <span className={`w-1.5 h-1.5 rounded-full bg-accent-cyan ${isPlaying ? "animate-pulse" : ""}`} />
          {isPlaying ? "SPEAKING" : "AI AVATAR"}
        </div>
      </div>

      {/* Web Audio visualizer style bars */}
      <div className="w-full flex items-center justify-center gap-1 h-10 px-4">
        {audioWaves.map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-accent-violet via-accent-cyan to-accent-magenta transition-all duration-100"
            style={{
              height: `${h}%`,
              opacity: isPlaying ? 0.9 : 0.25,
            }}
          />
        ))}
      </div>

      {/* Script info card */}
      <div className="w-full text-center">
        <h4 className="text-sm font-semibold text-foreground/90 flex items-center justify-center gap-1.5">
          <Sparkles size={14} className="text-accent-cyan" />
          AI Interactive Introduction
        </h4>
        <p className="text-xs text-muted mt-2 leading-relaxed italic line-clamp-3">
          &quot;{introScript}&quot;
        </p>
      </div>

      {/* Audio Controls */}
      <div className="flex items-center gap-3 w-full">
        <button
          onClick={handleSpeak}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            isPlaying
              ? "bg-accent-magenta/25 border border-accent-magenta/40 text-accent-magenta"
              : "bg-gradient-to-r from-accent-cyan to-accent-violet text-background shadow-lg shadow-accent-violet/20 hover:scale-[1.03]"
          }`}
        >
          {isPlaying ? (
            <>
              <Square size={14} />
              Pause
            </>
          ) : (
            <>
              <Play size={14} fill="currentColor" />
              Listen to Intro
            </>
          )}
        </button>

        <button
          onClick={toggleMute}
          disabled={!isPlaying}
          className={`p-2.5 rounded-full border border-border text-muted hover:text-foreground transition-colors cursor-pointer disabled:opacity-40 disabled:pointer-events-none`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>

        {isPlaying && (
          <button
            onClick={handleStop}
            className="p-2.5 rounded-full border border-accent-magenta/35 bg-accent-magenta/5 text-accent-magenta hover:bg-accent-magenta/15 transition-colors cursor-pointer"
            title="Stop Speech"
          >
            <Square size={15} />
          </button>
        )}
      </div>

      {/* Integration guide tooltip for recruiters */}
      <div className="text-[10px] text-muted/60 flex items-center gap-1 mt-1 border-t border-white/5 pt-3 w-full justify-center">
        <MessageSquare size={10} />
        <span>Connects to Wav2Lip / SadTalker mp4 assets</span>
      </div>
    </div>
  );
}
