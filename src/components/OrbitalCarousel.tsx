import React, { useState, useEffect, useRef } from 'react';
import { TarotCard, SpreadMode, DrawnCard } from '../types';
import { TAROT_DATABASE } from '../data/tarot';
import TarotCardVisual from './TarotCardVisual';
import { ArrowLeft, ArrowRight, RotateCcw, HelpCircle, Sparkles, Eye } from 'lucide-react';
import { useGestureContext, useGlobalGestureControl } from '../context/GestureContext';

interface OrbitalCarouselProps {
  mode: SpreadMode;
  onSelectionComplete: (drawnCards: { card: TarotCard; isReversed: boolean; positionName: string; positionNameZh: string; positionMeaning: string; positionMeaningZh: string }[]) => void;
  gestureEnabled?: boolean;
}

export default function OrbitalCarousel({ mode, onSelectionComplete, gestureEnabled }: OrbitalCarouselProps) {
  const [rotation, setRotation] = useState(0); // Current rotation in degrees
  const [drawnList, setDrawnList] = useState<{ card: TarotCard; isReversed: boolean }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [orbitRadius, setOrbitRadius] = useState(720);
  const [gestureStatus, setGestureStatus] = useState<string>('Sensing / 校准中');

  // Real Hand gesture tracking state
  const { cameraStatus, currentGesture, dx, gestureActive, setGestureActive } = useGestureContext();
  const [localGestureEnabled, setLocalGestureEnabled] = useState(gestureEnabled !== false);
  const [rotDirection, setRotDirection] = useState<'left' | 'right' | 'static'>('static');
  const [hasError, setHasError] = useState<string | null>(null);

  // Sync prop & active state
  useEffect(() => {
    setGestureActive(localGestureEnabled);
  }, [localGestureEnabled, setGestureActive]);

  useEffect(() => {
    if (gestureEnabled !== undefined) {
      setLocalGestureEnabled(gestureEnabled);
    }
  }, [gestureEnabled]);

  useEffect(() => {
    if (cameraStatus === 'denied') {
      setHasError('Camera unavailable. Use mouse drag and click instead.');
    } else if (cameraStatus === 'error') {
      setHasError('Gesture initialization error. Mouse fallback active.');
    } else {
      setHasError(null);
    }
  }, [cameraStatus]);
  
  // Track dragging physics
  const startX = useRef(0);
  const startRotation = useRef(0);
  const velocity = useRef(0);
  const lastTime = useRef(0);
  const lastX = useRef(0);
  const animationRef = useRef<number | null>(null);

  // Gesture camera refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const CARDS_COUNT = 78;
  const ANGLE_STEP = 360 / CARDS_COUNT;

  // Responsive radius adjustment
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOrbitRadius(480);
      } else {
        setOrbitRadius(700);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Normalize angle helper to keep it in [-180, 180]
  const normalizeAngle = (angle: number) => {
    let norm = angle % 360;
    if (norm > 180) norm -= 360;
    if (norm < -180) norm += 360;
    return norm;
  };

  // Find the front-most card index
  const getFrontCardIndex = () => {
    let minDiff = Infinity;
    let closestIndex = 0;
    
    for (let i = 0; i < CARDS_COUNT; i++) {
      const cardAngle = normalizeAngle(i * ANGLE_STEP + rotation);
      const diff = Math.abs(cardAngle);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }
    return closestIndex;
  };

  const frontIndex = getFrontCardIndex();
  const frontCard = TAROT_DATABASE[frontIndex];

  // Drag handlers for mouse / touch fallbacks
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
    lastX.current = e.clientX;
    startRotation.current = rotation;
    velocity.current = 0;
    lastTime.current = performance.now();
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX.current;
    const now = performance.now();
    const dt = now - lastTime.current;
    
    // Calculate drag velocity for inertia
    if (dt > 0) {
      velocity.current = (e.clientX - lastX.current) / dt;
    }
    
    lastX.current = e.clientX;
    lastTime.current = now;
    
    // Scale down delta so rotation feels highly deliberate
    setRotation(startRotation.current + deltaX * 0.15);
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Apply smooth inertia physics
    let speed = velocity.current * 10; // scale up velocity
    const decay = 0.94; // physics friction coefficient
    
    const applyInertia = () => {
      if (Math.abs(speed) < 0.05) {
        // Snap focus to the closest card cleanly once slowed down
        const finalFrontIndex = getFrontCardIndex();
        const targetRotation = -finalFrontIndex * ANGLE_STEP;
        
        let snapSpeed = 0.15;
        const snap = () => {
          setRotation(prev => {
            const diff = normalizeAngle(targetRotation - prev);
            if (Math.abs(diff) < 0.1) {
              return targetRotation;
            }
            return prev + diff * snapSpeed;
          });
          animationRef.current = requestAnimationFrame(snap);
        };
        animationRef.current = requestAnimationFrame(snap);
        return;
      }
      
      setRotation(prev => prev + speed);
      speed *= decay;
      animationRef.current = requestAnimationFrame(applyInertia);
    };
    
    animationRef.current = requestAnimationFrame(applyInertia);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        spinToCard(frontIndex + 1);
      } else if (e.key === 'ArrowRight') {
        spinToCard(frontIndex - 1);
      } else if (e.key === 'Enter' || e.key === ' ') {
        selectFocusedCard();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [frontIndex, rotation]);

  const spinToCard = (targetIndex: number) => {
    const wrappedIndex = (targetIndex + CARDS_COUNT) % CARDS_COUNT;
    const targetRotation = -wrappedIndex * ANGLE_STEP;
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    let snapSpeed = 0.18;
    const animate = () => {
      setRotation(prev => {
        const diff = normalizeAngle(targetRotation - prev);
        if (Math.abs(diff) < 0.05) {
          return targetRotation;
        }
        return prev + diff * snapSpeed;
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
  };

  // Select focused card and slide into next available slot
  const selectFocusedCard = () => {
    if (drawnList.length >= mode.cardCount) return;
    
    // Ensure the card isn't already selected
    if (drawnList.some(item => item.card.id === frontCard.id)) {
      return; // Already drawn
    }

    const isReversed = Math.random() > 0.8; // Poetic 20% reversed probability
    const newDrawn = [...drawnList, { card: frontCard, isReversed }];
    setDrawnList(newDrawn);
    
    // Play active chime if configured globally via audio context
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 chime
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {}

    // Auto shift a bit after selection for visual variety
    setTimeout(() => {
      spinToCard(frontIndex + 4);
    }, 400);
  };

  const removeCard = (idx: number) => {
    const updated = [...drawnList];
    updated.splice(idx, 1);
    setDrawnList(updated);
  };

  // Confirm and proceed
  const handleConfirm = () => {
    if (drawnList.length < mode.cardCount) return;
    
    const completeDrawn = drawnList.map((item, index) => {
      const pos = mode.positions[index];
      return {
        card: item.card,
        isReversed: item.isReversed,
        positionName: pos.name,
        positionNameZh: pos.nameZh,
        positionMeaning: pos.meaning,
        positionMeaningZh: pos.meaningZh
      };
    });
    
    onSelectionComplete(completeDrawn);
  };

  // Reset current shuffle
  const resetDraw = () => {
    setDrawnList([]);
    setRotation(0);
  };

  // Handle continuous rotation using the global dx on each frame
  useEffect(() => {
    if (localGestureEnabled && cameraStatus === 'active' && Math.abs(dx) > 0.0005) {
      // Scale dx smoothly for natural organic rotation
      setRotation(prev => prev + dx * 320);
      setRotDirection(dx > 0 ? 'right' : 'left');
    } else {
      setRotDirection('static');
    }
  }, [dx, cameraStatus, localGestureEnabled]);

  // Subscribe to gesture actions for card selection
  useGlobalGestureControl({
    onPinch: () => {
      if (drawnList.length < mode.cardCount) {
        selectFocusedCard();
      } else {
        handleConfirm();
      }
    },
    onOpenPalm: () => {
      if (drawnList.length === mode.cardCount) {
        handleConfirm();
      }
    }
  }, [drawnList, frontIndex, frontCard, mode.cardCount]);


  return (
    <div className="flex flex-col items-center justify-between min-h-[85vh] p-4 text-[#f5f2eb] relative select-none z-10">
      
      {/* Top Header info */}
      <div className="w-full text-center space-y-2.5 z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#161514]/90 border border-[#c5a059]/30 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059] shadow-md relative overflow-hidden">
          {/* Inner hairline border */}
          <div className="absolute inset-0.5 border border-[#c5a059]/5 pointer-events-none rounded-full" />
          <Sparkles className="w-3 h-3 text-[#c5a059] animate-pulse" />
          Drawing Ritual / 启牌仪式
        </div>
        <h2 className="font-serif text-2xl md:text-3xl tracking-[0.08em] font-light text-ivory">
          Orbiting Fate Shuffle
        </h2>
        <p className="text-[10px] font-mono tracking-[0.2em] text-[#c5a059]/80 uppercase">
          {mode.nameZh} · Draw {mode.cardCount} {mode.cardCount === 1 ? 'Card' : 'Cards'} / 共需抽取 {mode.cardCount} 张牌阵槽
        </p>
      </div>

      {/* Real Hand Gesture Sensor HUD Panel */}
      <div className="w-full max-w-md mx-auto mt-4 mb-2 z-20 bg-[#161514]/95 border-2 border-[#c5a059]/20 rounded-[4px] shadow-[0_15px_35px_rgba(0,0,0,0.85)] backdrop-blur-md p-5 text-[#f5f2eb] relative overflow-hidden">
        {/* Double decorative thin border lines */}
        <div className="absolute inset-1 border border-[#c5a059]/5 pointer-events-none rounded-[2px]" />
        {/* Antique corner crosshairs */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[#c5a059]/20 pointer-events-none" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-[#c5a059]/20 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-[#c5a059]/20 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-[#c5a059]/20 pointer-events-none" />
        
        <div className="relative flex flex-col gap-3.5 z-10">
          <div className="flex items-center justify-between border-b border-[#c5a059]/15 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                {cameraStatus === 'active' && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  cameraStatus === 'active' ? 'bg-emerald-500' :
                  cameraStatus === 'initializing' ? 'bg-amber-500 animate-pulse' :
                  cameraStatus === 'denied' || cameraStatus === 'error' ? 'bg-rose-700' :
                  'bg-neutral-600'
                }`}></span>
              </span>
              <h3 className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#c5a059] font-medium">
                Sensing Device / 镜影感应仪
              </h3>
            </div>
            
            <button
              id="toggle-sensor-btn"
              onClick={() => setLocalGestureEnabled(prev => !prev)}
              className={`group relative px-3 py-1.5 text-[8px] font-mono tracking-widest uppercase transition-all duration-300 rounded-[2px] border ${
                localGestureEnabled
                  ? 'bg-[#5f1f2a]/20 border-[#c5a059]/40 text-[#c5a059] hover:bg-[#5f1f2a]/40'
                  : 'bg-[#c5a059]/10 border-[#c5a059]/20 text-[#f5f2eb]/70 hover:bg-[#c5a059]/20 hover:text-white'
              }`}
            >
              {localGestureEnabled ? 'Deactivate / 停用' : 'Activate / 启用'}
            </button>
          </div>

          {/* HUD Parameter Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-[10px] font-mono tracking-[0.08em] border-t border-[#c5a059]/15 pt-3">
            {/* Camera status row */}
            <div className="flex justify-between items-center border-b border-[#c5a059]/5 pb-1.5">
              <span className="text-[#c5a059]/65">SENSOR STATUS:</span>
              <span className={`font-semibold tracking-[0.05em] ${
                cameraStatus === 'active' ? 'text-emerald-400 font-medium' :
                cameraStatus === 'initializing' ? 'text-amber-400 animate-pulse' :
                cameraStatus === 'denied' ? 'text-rose-400 font-light' :
                cameraStatus === 'error' ? 'text-rose-500' : 'text-neutral-500'
              }`}>
                {cameraStatus === 'active' ? 'ACTIVE / 运行' :
                 cameraStatus === 'initializing' ? 'INIT / 链接中' :
                 cameraStatus === 'denied' ? 'DENIED / 受阻' :
                 cameraStatus === 'error' ? 'FAILED / 故障' : 'OFF / 停用'}
              </span>
            </div>

            {/* Gesture row with alert effect for pinch */}
            <div className={`flex justify-between items-center border-b border-[#c5a059]/5 pb-1.5 transition-all duration-300 ${
              currentGesture === 'pinch' ? 'bg-[#5f1f2a]/30 px-1.5 rounded-[2px] text-white' : ''
            }`}>
              <span className="text-[#c5a059]/65">GESTURE:</span>
              <span className={`font-semibold tracking-[0.05em] ${
                currentGesture === 'pinch' ? 'text-rose-400 font-bold animate-pulse' :
                currentGesture === 'open-palm' ? 'text-[#c5a059]' :
                currentGesture === 'hand-detected' ? 'text-white/90' : 'text-neutral-500'
              }`}>
                {currentGesture === 'pinch' ? 'Pinch / 捏合选择' :
                 currentGesture === 'open-palm' ? 'Open Palm / 张掌' :
                 currentGesture === 'hand-detected' ? 'Detected / 已识别' : 'None / 悬空'}
              </span>
            </div>

            {/* Rotation direction row */}
            <div className="flex justify-between items-center border-b border-[#c5a059]/5 pb-1.5">
              <span className="text-[#c5a059]/65">ORBIT DIR:</span>
              <span className={`tracking-[0.05em] ${rotDirection !== 'static' ? 'text-white font-semibold' : 'text-neutral-500'}`}>
                {rotDirection === 'left' ? '◀ LEFT / 逆时针' :
                 rotDirection === 'right' ? 'RIGHT ▶ / 顺时针' : 'STATIC / 驻停'}
              </span>
            </div>

            {/* Selected Count row */}
            <div className="flex justify-between items-center border-b border-[#c5a059]/5 pb-1.5">
              <span className="text-[#c5a059]/65">DRAWN SLOTS:</span>
              <span className="text-white font-semibold tracking-[0.05em]">
                {drawnList.length} / {mode.cardCount}
              </span>
            </div>
          </div>

          {/* Handle Error / Helper Status message */}
          {hasError ? (
            <div className="bg-[#5f1f2a]/15 border border-[#5f1f2a]/30 rounded-[2px] p-2.5 text-[9.5px] font-mono text-rose-300 leading-normal">
              {hasError}
            </div>
          ) : (
            <div className="bg-[#121110]/50 border border-[#c5a059]/10 rounded-[2px] p-2.5 text-[9px] font-mono text-[#c5a059]/70 leading-normal flex items-start gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#c5a059]/40 flex-shrink-0 mt-0.5" />
              <div>
                <span>FALLBACK: Mouse control and button click are fully active at all times. </span>
                {localGestureEnabled && cameraStatus === 'active' && (
                  <span className="text-emerald-400 font-medium">Webcam tracking active. Show hand to control.</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Orbital Arena */}
      <div 
        className="w-full h-[45vh] md:h-[52vh] flex items-center justify-center relative overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {/* Ambient Focal Light Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-radial from-[#c5a059]/10 to-transparent pointer-events-none rounded-full z-0 animate-pulse" style={{ animationDuration: '8s' }} />
        
        {/* Celestial Astrological Chart Backing (Procedural thin brass vector rings) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border border-[#c5a059]/10 rounded-full pointer-events-none select-none z-0 flex items-center justify-center">
          <div className="absolute w-[440px] h-[440px] border border-[#c5a059]/5 rounded-full" />
          <div className="absolute w-[360px] h-[360px] border border-dashed border-[#c5a059]/8 rounded-full" />
          <div className="absolute w-[240px] h-[240px] border border-[#c5a059]/5 rounded-full" />
          <div className="absolute w-[120px] h-[120px] border border-[#c5a059]/10 rounded-full" />
          {/* Astrological cardinal axes */}
          <div className="absolute w-full h-[1px] bg-[#c5a059]/5" />
          <div className="absolute h-full w-[1px] bg-[#c5a059]/5" />
          {/* Decorative cardinal letters */}
          <span className="absolute top-2 font-mono text-[8px] text-[#c5a059]/35 tracking-widest">N 000°</span>
          <span className="absolute bottom-2 font-mono text-[8px] text-[#c5a059]/35 tracking-widest">S 180°</span>
          <span className="absolute left-2 font-mono text-[8px] text-[#c5a059]/35 tracking-widest">W 270°</span>
          <span className="absolute right-2 font-mono text-[8px] text-[#c5a059]/35 tracking-widest">E 090°</span>
        </div>

        {/* Snap alignment guides with beautiful brass coordinate sights */}
        <div className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[190px] h-[320px] border border-dashed border-[#c5a059]/25 pointer-events-none rounded-[4px] z-10 flex flex-col justify-between p-2.5 bg-[#121110]/20 backdrop-blur-[2px]">
          {/* Glowing sight brackets */}
          <div className="flex justify-between">
            <div className="w-3.5 h-3.5 border-t-2 border-l-2 border-[#c5a059]/70" />
            <div className="w-3.5 h-3.5 border-t-2 border-r-2 border-[#c5a059]/70" />
          </div>
          <div className="text-[9px] font-mono text-center tracking-[0.25em] text-[#c5a059]/70 uppercase font-light select-none">
            ⌜ focus mirror ⌝
          </div>
          <div className="flex justify-between">
            <div className="w-3.5 h-3.5 border-b-2 border-l-2 border-[#c5a059]/70" />
            <div className="w-3.5 h-3.5 border-b-2 border-r-2 border-[#c5a059]/70" />
          </div>
        </div>

        {/* The 3D Carousel Stage */}
        <div 
          className="relative w-full h-full flex items-center justify-center z-20"
          style={{
            perspective: '1400px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Tilted Cylinder container forward-pitching the 3D ring */}
          <div 
            className="w-full h-full flex items-center justify-center transition-transform duration-500"
            style={{
              transform: 'rotateX(15deg) rotateY(-3deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Main Rotating Ring */}
            <div
              className="absolute w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                transform: `translateZ(-${orbitRadius}px) rotateY(${rotation}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {TAROT_DATABASE.map((card, i) => {
                const cardAngle = i * ANGLE_STEP;
                const relativeAngle = normalizeAngle(cardAngle + rotation);
                
                // Cull cards in the rear 115 degrees to optimize webkit rendering
                const isBehind = Math.abs(relativeAngle) > 115;
                if (isBehind) return null;

                // Smooth fade-away in perspective distance
                const opacity = Math.max(0.08, 1 - Math.abs(relativeAngle) / 110);
                const isFocused = i === frontIndex;

                // Jump focused card slightly forward along Z-axis and scale up
                const zOffset = isFocused ? 55 : 0;
                const scale = isFocused ? 1.15 : 1.0;

                return (
                  <div
                    key={card.id}
                    className="absolute select-none transition-all duration-300"
                    style={{
                      transform: `rotateY(${cardAngle}deg) translateZ(${orbitRadius + zOffset}px) scale(${scale})`,
                      transformStyle: 'preserve-3d',
                      opacity: opacity,
                      zIndex: Math.round(100 - Math.abs(relativeAngle)),
                    }}
                  >
                    <TarotCardVisual 
                      card={card} 
                      faceDown={true}
                      size="md"
                      highlighted={isFocused}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ambient Drag instruction labels overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[9px] font-mono tracking-[0.18em] text-[#c5a059]/60 uppercase pointer-events-none z-10">
          <span className="flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Wave / Drag to rotate</span>
          <span>•</span>
          <span>Pinch / Click to draw</span>
          <span>•</span>
          <span className="flex items-center gap-1">Swipe / Drag <ArrowRight className="w-3.5 h-3.5" /></span>
        </div>
      </div>

      {/* Middle Interactive snap detail info */}
      <div className="w-full max-w-md bg-[#161514]/95 border-2 border-[#c5a059]/20 p-5 rounded-[4px] text-center space-y-3.5 shadow-2xl backdrop-blur-md z-10 relative overflow-hidden">
        {/* Double decorative thin border lines */}
        <div className="absolute inset-1 border border-[#c5a059]/5 pointer-events-none rounded-[2px]" />
        
        <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.18em] text-[#c5a059]/80 px-1 relative z-10">
          <span>Focused Card / 聚焦宿命</span>
          <span className="text-[#f5f2eb]/40">Index {frontIndex + 1}/78</span>
        </div>
        <div className="h-[1px] bg-[#c5a059]/15 relative z-10" />
        
        <div className="py-1 relative z-10">
          <h3 className="font-serif text-xl tracking-[0.05em] font-light text-ivory">
            {frontCard ? frontCard.name : 'Searching...'}
          </h3>
          <p className="text-xs text-[#c5a059] font-mono tracking-[0.15em] uppercase mt-1">
            {frontCard ? frontCard.nameZh : '寻找中'}
          </p>
        </div>

        <div className="flex gap-2 relative z-10">
          <button
            onClick={() => spinToCard(frontIndex - 1)}
            className="p-2.5 border border-[#c5a059]/30 hover:border-[#c5a059] hover:bg-[#121110] text-[#c5a059] rounded-[2px] transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <button
            id="select-card-btn"
            onClick={selectFocusedCard}
            disabled={drawnList.length >= mode.cardCount || drawnList.some(item => item.card.id === frontCard.id)}
            className="flex-1 py-2.5 bg-[#5f1f2a]/95 hover:bg-[#5f1f2a] disabled:bg-[#1c1a19] disabled:text-neutral-600 disabled:border-neutral-800 border-2 border-[#c5a059]/40 hover:border-[#c5a059] text-ivory font-serif tracking-[0.2em] text-xs transition-all duration-500 rounded-[2px] shadow-md"
          >
            {drawnList.some(item => item.card.id === frontCard.id) 
              ? 'Card Already Drawn / 牌已在槽位中' 
              : `Draw into Slot / 放入第 ${drawnList.length + 1} 槽位`}
          </button>

          <button
            onClick={() => spinToCard(frontIndex + 1)}
            className="p-2.5 border border-[#c5a059]/30 hover:border-[#c5a059] hover:bg-[#121110] text-[#c5a059] rounded-[2px] transition-all duration-300"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Slots display progress display */}
      <div className="w-full max-w-4xl space-y-5 pt-6 z-10 relative">
        <div className="flex justify-between items-end px-2">
          <div>
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-[#c5a059]/80 uppercase">Reading Slots</h4>
            <div className="w-8 h-[1px] bg-[#c5a059]/30 mt-1" />
            <p className="text-[9px] font-mono text-neutral-400 mt-1">Drawn {drawnList.length} / {mode.cardCount} Slots / 已选 {drawnList.length} 槽位</p>
          </div>
          {drawnList.length > 0 && (
            <button
              onClick={resetDraw}
              className="flex items-center gap-1 text-[9px] font-mono tracking-[0.15em] text-[#c5a059]/60 hover:text-white uppercase transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-[#c5a059]/50 group-hover:text-white" /> Clear Slots / 重置
            </button>
          )}
        </div>

        {/* Display slots bento grid with museum card border styles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {mode.positions.map((pos, idx) => {
            const drawn = drawnList[idx];
            return (
              <div
                key={idx}
                className={`relative p-3.5 rounded-[4px] border transition-all duration-500 min-h-[120px] flex flex-col justify-between text-left group overflow-hidden ${
                  drawn 
                    ? 'bg-[#1a1817] border-2 border-[#c5a059] shadow-[0_10px_25px_rgba(0,0,0,0.6)]' 
                    : 'bg-[#121110]/40 border border-[#c5a059]/10 border-dashed hover:border-[#c5a059]/30'
                }`}
              >
                {/* Dual lines inside drawn slot */}
                {drawn && <div className="absolute inset-0.5 border border-[#c5a059]/10 pointer-events-none rounded-[2px]" />}
                
                {/* Background ordinal indicator */}
                <span className="absolute top-1 right-2 text-2xl font-serif text-white/5 font-bold select-none group-hover:text-[#c5a059]/10 transition-colors">{idx + 1}</span>

                <div className="relative z-10">
                  <h5 className="text-[10px] font-mono uppercase tracking-[0.12em] text-[#c5a059] font-medium truncate">
                    {pos.nameZh}
                  </h5>
                  <p className="text-[9px] text-neutral-400 font-sans tracking-wide leading-tight mt-0.5 truncate">
                    {pos.name}
                  </p>
                </div>

                {drawn ? (
                  <div className="mt-3 flex items-center justify-between border-t border-[#3c352a] pt-2 relative z-10">
                    <span className="text-[11px] font-serif text-ivory truncate pr-1 font-light">
                      {drawn.card.nameZh}
                    </span>
                    <button
                      onClick={() => removeCard(idx)}
                      className="text-[11px] font-mono text-neutral-500 hover:text-white px-1.5 hover:bg-[#121110]/50 rounded transition-all"
                      title="Remove Card / 移除"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="text-[8.5px] font-sans text-[#c5a059]/35 leading-relaxed mt-4 relative z-10 italic">
                    {pos.meaningZh}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Ultimate CTA to trigger analysis with epic glow and double border */}
        {drawnList.length === mode.cardCount && (
          <button
            id="start-interpret-btn"
            onClick={handleConfirm}
            className="group relative w-full py-4.5 bg-[#5f1f2a] hover:bg-[#802a36] border-2 border-[#c5a059] text-ivory font-serif tracking-[0.25em] uppercase text-xs md:text-sm transition-all duration-700 shadow-3xl rounded-[2px] mt-6"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Cast Mirror Reflection / 窥视命运解读 ➔
            </span>
            {/* Shimmer line inside */}
            <div className="absolute inset-0.5 border border-[#c5a059]/20 group-hover:border-[#c5a059]/40 transition-colors pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        )}
      </div>
    </div>
  );
}
