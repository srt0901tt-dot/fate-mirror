import React from 'react';

interface CosmicBackgroundProps {
  step: number;
}

export default function CosmicBackground({ step }: CosmicBackgroundProps) {
  // Common vector assets shared across screens
  const NoiseTexture = () => (
    <div 
      className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );

  const CoordinatesOverlay = () => (
    <div className="absolute inset-0 pointer-events-none select-none text-[#c5a059]/15 font-mono text-[8px] tracking-[0.25em] uppercase p-6 hidden md:block">
      <div className="absolute top-10 left-10">RA 04h 32m / DEC -16°</div>
      <div className="absolute top-10 right-10">LMT 23:44:02 / UTC+8</div>
      <div className="absolute bottom-10 left-10">SECTOR 09 / ANOMALY CORE</div>
      <div className="absolute bottom-10 right-10">FATE MIRROR · V3.0</div>
    </div>
  );

  // Background geometries per step
  switch (step) {
    case 1: // Home / Enter - Giant Cosmic Astrolabe and Floating Card Silhouettes
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <NoiseTexture />
          <CoordinatesOverlay />
          
          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-[#5f1f2a]/10 via-[#c5a059]/5 to-transparent blur-3xl opacity-80" />

          {/* Epic celestial grid system */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] stroke-[#c5a059]/10" viewBox="0 0 1000 1000" fill="none" strokeWidth="0.8">
            {/* Concentric rotating brass rings */}
            <circle cx="500" cy="500" r="480" className="animate-spin" style={{ animationDuration: '140s' }} />
            <circle cx="500" cy="500" r="420" strokeDasharray="3,6" />
            <circle cx="500" cy="500" r="350" className="animate-spin" style={{ animationDuration: '90s', animationDirection: 'reverse' }} />
            <circle cx="500" cy="500" r="280" />
            <circle cx="500" cy="500" r="210" strokeWidth="1.5" strokeDasharray="1,1" />
            <circle cx="500" cy="500" r="140" />
            <circle cx="500" cy="500" r="70" strokeDasharray="2,2" />

            {/* Astrological cardinal axes */}
            <line x1="0" y1="500" x2="1000" y2="500" />
            <line x1="500" y1="0" x2="500" y2="1000" />

            {/* Constellation lines */}
            <path d="M500,220 L620,150 L710,220 L780,180" strokeWidth="0.5" opacity="0.4" />
            <path d="M500,780 L380,850 L290,780 L220,820" strokeWidth="0.5" opacity="0.4" />
            <path d="M220,290 L290,220 L380,150" strokeWidth="0.5" opacity="0.4" />
            <path d="M780,710 L710,780 L620,850" strokeWidth="0.5" opacity="0.4" />

            {/* Zodiac ticks around the astrolabe */}
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 10 * Math.PI) / 180;
              const x1 = 500 + 420 * Math.cos(angle);
              const y1 = 500 + 420 * Math.sin(angle);
              const x2 = 500 + 440 * Math.cos(angle);
              const y2 = 500 + 440 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1" opacity="0.6" />;
            })}
          </svg>

          {/* Faint rotating card silhouettes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] animate-spin" style={{ animationDuration: '240s' }}>
            {Array.from({ length: 4 }).map((_, i) => {
              const angle = i * 90;
              return (
                <div 
                  key={i} 
                  className="absolute w-20 h-32 border border-[#c5a059]/10 bg-[#161514]/20 rounded-[4px] shadow-sm flex items-center justify-center opacity-20"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-320px) rotate(-${angle}deg)`,
                  }}
                >
                  <div className="w-16 h-28 border border-dashed border-[#8c6a2c]/10 rounded-[2px]" />
                </div>
              );
            })}
          </div>
        </div>
      );

    case 2: // Ask / Question - Oracle Desk & Technical Notebook Draft
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <NoiseTexture />
          <CoordinatesOverlay />

          {/* Soft background red glow like a darkroom lantern */}
          <div className="absolute right-[5%] top-[10%] w-[500px] h-[500px] bg-radial from-[#5f1f2a]/12 to-transparent blur-3xl opacity-70" />

          {/* Intricate editorial drafting lines */}
          <svg className="absolute inset-0 w-full h-full stroke-[#c5a059]/10" viewBox="0 0 1440 900" fill="none" strokeWidth="0.8">
            {/* Horizontal guidelines */}
            <line x1="0" y1="180" x2="1440" y2="180" />
            <line x1="0" y1="450" x2="1440" y2="450" strokeDasharray="3,6" />
            <line x1="0" y1="720" x2="1440" y2="720" />

            {/* Vertical guidelines */}
            <line x1="240" y1="0" x2="240" y2="900" />
            <line x1="720" y1="0" x2="720" y2="900" strokeDasharray="3,6" />
            <line x1="1200" y1="0" x2="1200" y2="900" />

            {/* Technical layout brackets */}
            <path d="M260,200 L250,200 L250,250" />
            <path d="M1180,200 L1190,200 L1190,250" />
            <path d="M260,700 L250,700 L250,650" />
            <path d="M1180,700 L1190,700 L1190,650" />

            {/* Faint alchemical manuscript text block labels */}
            <text x="270" y="220" fill="#c5a059" className="opacity-15 font-serif italic text-[11px] tracking-wider">Memoria Anima / 心灵之镜</text>
            <text x="270" y="240" fill="#c5a059" className="opacity-10 font-mono text-[9px] tracking-wider">PROJECT NO. FM-2026-CALIBRATION</text>
            <text x="960" y="685" fill="#c5a059" className="opacity-15 font-serif italic text-[11px] tracking-wider">The Questioning Mind / 自省之问</text>
            <text x="960" y="705" fill="#c5a059" className="opacity-10 font-mono text-[9px] tracking-wider">TARGET FIELD: SUBCONSCIOUS WAVEFORM</text>
          </svg>
        </div>
      );

    case 3: // Mode Selection - Astronomical Grid Connection system
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <NoiseTexture />
          <CoordinatesOverlay />

          {/* Center glow */}
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#8c6a2c]/8 via-[#5f1f2a]/5 to-transparent blur-3xl opacity-80" />

          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] stroke-[#c5a059]/10" viewBox="0 0 1000 1000" fill="none" strokeWidth="0.8">
            {/* Concentric grid system */}
            <circle cx="500" cy="500" r="450" />
            <circle cx="500" cy="500" r="300" strokeDasharray="2,4" />
            <circle cx="500" cy="500" r="150" />

            {/* Diagonal axis */}
            <line x1="150" y1="150" x2="850" y2="850" />
            <line x1="150" y1="850" x2="850" y2="150" />

            {/* Hexagonal geometric layout */}
            <polygon points="500,50 890,275 890,725 500,950 110,725 110,275" opacity="0.3" strokeWidth="0.5" />
            <polygon points="500,200 760,350 760,650 500,800 240,650 240,350" strokeDasharray="3,3" opacity="0.2" />

            {/* Little star glyphs */}
            <g transform="translate(500, 50)" className="stroke-[#c5a059]/30">
              <circle cx="0" cy="0" r="4" fill="#c5a059" className="opacity-40" />
              <line x1="-10" y1="0" x2="10" y2="0" />
              <line x1="0" y1="-10" x2="0" y2="10" />
            </g>
            <g transform="translate(890, 275)" className="stroke-[#c5a059]/30">
              <circle cx="0" cy="0" r="4" fill="#c5a059" className="opacity-40" />
            </g>
            <g transform="translate(110, 725)" className="stroke-[#c5a059]/30">
              <circle cx="0" cy="0" r="4" fill="#c5a059" className="opacity-40" />
            </g>
            <g transform="translate(500, 950)" className="stroke-[#c5a059]/30">
              <circle cx="0" cy="0" r="4" fill="#c5a059" className="opacity-40" />
              <line x1="-10" y1="0" x2="10" y2="0" />
              <line x1="0" y1="-10" x2="0" y2="10" />
            </g>
          </svg>
        </div>
      );

    case 4: // Calibration Screen
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <NoiseTexture />
          <CoordinatesOverlay />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#c5a059]/8 to-transparent blur-3xl opacity-60 animate-pulse" />

          {/* Calibration grid & crosshairs overlay */}
          <svg className="absolute inset-0 w-full h-full stroke-[#c5a059]/8" viewBox="0 0 1440 900" fill="none" strokeWidth="0.8">
            {/* Compass quadrants */}
            <circle cx="720" cy="450" r="400" />
            <circle cx="720" cy="450" r="280" strokeDasharray="3,6" />
            <circle cx="720" cy="450" r="140" />

            <line x1="120" y1="450" x2="1320" y2="450" />
            <line x1="720" y1="50" x2="720" y2="850" />

            {/* Constellation mapping nodes for hand gestures calibration visualizer */}
            <g className="stroke-[#c5a059]/20" strokeWidth="0.5">
              <line x1="720" y1="310" x2="800" y2="250" />
              <line x1="800" y1="250" x2="840" y2="290" />
              <line x1="720" y1="310" x2="640" y2="250" />
              <line x1="640" y1="250" x2="600" y2="290" />
              
              <circle cx="720" cy="310" r="3" fill="#c5a059" className="opacity-50" />
              <circle cx="800" cy="250" r="3" fill="#c5a059" className="opacity-50" />
              <circle cx="840" cy="290" r="3" fill="#c5a059" className="opacity-50" />
              <circle cx="640" cy="250" r="3" fill="#c5a059" className="opacity-50" />
              <circle cx="600" cy="290" r="3" fill="#c5a059" className="opacity-50" />
            </g>
          </svg>
        </div>
      );

    case 5: // Shuffle / Draw Screen - Physical Wood & Foil Table surface underneath
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#0f0e0d]">
          <NoiseTexture />
          <CoordinatesOverlay />

          {/* Golden table radial vignette shadow */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#000000]/40 to-[#000000]/95" />

          {/* Under-carousel deep wooden table diagram engraving (3D transformed perspective) */}
          <div 
            className="absolute top-[48%] left-1/2 -translate-x-1/2 w-[1400px] h-[700px] border border-[#c5a059]/15 rounded-full z-0 flex items-center justify-center"
            style={{
              transform: 'rotateX(72deg) translateY(50px)',
              transformStyle: 'preserve-3d',
              backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1816 0%, #11100f 60%, #060505 100%)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.95), inset 0 0 80px rgba(0,0,0,0.9)',
            }}
          >
            {/* Double brass layout frame */}
            <div className="absolute inset-2 border-2 border-[#c5a059]/25 rounded-full" />
            <div className="absolute inset-[16px] border border-dashed border-[#8c6a2c]/20 rounded-full" />
            <div className="absolute inset-[50px] border border-[#c5a059]/10 rounded-full" />
            
            {/* Heavy wood block segment lines (Zodiac sectors) */}
            <svg className="absolute inset-0 w-full h-full stroke-[#c5a059]/12" viewBox="0 0 1000 1000" fill="none" strokeWidth="1">
              <line x1="500" y1="0" x2="500" y2="1000" />
              <line x1="0" y1="500" x2="1000" y2="500" />
              <line x1="146" y1="146" x2="854" y2="854" />
              <line x1="146" y1="854" x2="854" y2="146" />
              <circle cx="500" cy="500" r="460" />
              <circle cx="500" cy="500" r="320" strokeDasharray="4,8" />
              <circle cx="500" cy="500" r="180" />

              {/* Zodiac / Elemental icons placeholders at nodes */}
              <text x="485" y="80" fill="#c5a059" className="opacity-20 font-serif italic text-[24px]">♈</text>
              <text x="895" y="490" fill="#c5a059" className="opacity-20 font-serif italic text-[24px]">♌</text>
              <text x="485" y="940" fill="#c5a059" className="opacity-20 font-serif italic text-[24px]">♐</text>
              <text x="75" y="490" fill="#c5a059" className="opacity-20 font-serif italic text-[24px]">♒</text>
            </svg>
          </div>
        </div>
      );

    case 6: // Interpretation / Reading - Parchment Documents
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <NoiseTexture />
          <CoordinatesOverlay />

          {/* Subconscious patterns visual backing */}
          <div className="absolute left-[3%] top-[20%] w-[400px] h-[400px] bg-radial from-[#5f1f2a]/12 to-transparent blur-3xl opacity-60" />
          <div className="absolute right-[3%] bottom-[15%] w-[450px] h-[450px] bg-radial from-[#8c6a2c]/8 to-transparent blur-3xl opacity-60" />

          {/* Museum parchment dividers and diagrams */}
          <svg className="absolute inset-0 w-full h-full stroke-[#c5a059]/10" viewBox="0 0 1440 900" fill="none" strokeWidth="0.8">
            {/* Fine framing margins */}
            <line x1="40" y1="40" x2="1400" y2="40" />
            <line x1="40" y1="860" x2="1400" y2="860" />
            <line x1="40" y1="40" x2="40" y2="860" />
            <line x1="1400" y1="40" x2="1400" y2="860" />

            {/* Diagram connecting cards to reading */}
            <path d="M220,180 L720,80" strokeDasharray="3,3" opacity="0.3" />
            <path d="M1220,180 L720,80" strokeDasharray="3,3" opacity="0.3" />

            {/* Catalog labels */}
            <text x="60" y="70" fill="#c5a059" className="opacity-25 font-mono text-[9px] tracking-widest">RECORD CLASS: COGNITIVE RITUAL INTERPRETATION</text>
            <text x="60" y="85" fill="#c5a059" className="opacity-15 font-mono text-[8px] tracking-widest">SPECIMEN NO. FM-2026-R849</text>
            <text x="1220" y="70" fill="#c5a059" className="opacity-20 font-mono text-[9px] tracking-widest text-right">MUSEUM ARCHIVE INDEX</text>
          </svg>
        </div>
      );

    case 7: // Archive database - Library Shelf feel
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <NoiseTexture />
          <CoordinatesOverlay />

          {/* Editorial catalog background */}
          <svg className="absolute inset-0 w-full h-full stroke-[#c5a059]/8" viewBox="0 0 1440 900" fill="none" strokeWidth="0.8">
            {/* Vertical grid lines like library shelves index */}
            <line x1="80" y1="0" x2="80" y2="900" />
            <line x1="360" y1="0" x2="360" y2="900" strokeDasharray="1,2" />
            <line x1="1080" y1="0" x2="1080" y2="900" strokeDasharray="1,2" />
            <line x1="1360" y1="0" x2="1360" y2="900" />

            {/* Horizontal timeline rows */}
            <line x1="80" y1="120" x2="1360" y2="120" />
            <line x1="80" y1="450" x2="1360" y2="450" />
            <line x1="80" y1="780" x2="1360" y2="780" />

            {/* Archival index markers */}
            <text x="100" y="110" fill="#c5a059" className="opacity-20 font-mono text-[9px] tracking-widest">LIB.SECT // 09_SUBCONSCIOUS</text>
            <text x="100" y="440" fill="#c5a059" className="opacity-20 font-mono text-[9px] tracking-widest">LIB.SECT // 10_EMOTIONAL_TRENDS</text>
            <text x="100" y="770" fill="#c5a059" className="opacity-20 font-mono text-[9px] tracking-widest">LIB.SECT // 11_CHRONO_HISTORY</text>
          </svg>
        </div>
      );

    default:
      return null;
  }
}
