import React from 'react';
import { TarotCard } from '../types';

interface TarotCardVisualProps {
  card: TarotCard;
  isReversed?: boolean;
  faceDown?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'fluid';
  highlighted?: boolean;
}

export default function TarotCardVisual({
  card,
  isReversed = false,
  faceDown = false,
  size = 'md',
  highlighted = false,
}: TarotCardVisualProps) {
  // Determine sizing classes
  const sizeClasses = {
    sm: 'w-32 h-52 text-xs',
    md: 'w-44 h-72 text-sm',
    lg: 'w-56 h-90 text-base',
    fluid: 'w-full aspect-[5/8] text-sm',
  }[size];

  // Roman Numeral Helper for Major Arcana
  const getRomanNumeral = (num: number): string => {
    const roman = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
    return roman[num] || num.toString();
  };

  // Helper to render beautiful vector symbols based on card suit
  const renderSuitSymbol = () => {
    const goldColor = "#c5a059";
    
    if (card.type === 'major') {
      const majorSymbols: Record<number, React.ReactNode> = {
        0: ( // The Fool: Sun, cliff line, and the leap of faith dot
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <circle cx="50" cy="30" r="10" strokeDasharray="2,2" />
            <path d="M15,85 C25,85 30,75 45,55 L85,15" strokeLinecap="round" />
            <circle cx="85" cy="15" r="4" fill={goldColor} />
            <path d="M15,30 L25,35 M50,12 L50,18 M75,30 L65,35" strokeWidth="1" />
            <path d="M40,75 L60,75 M45,80 L55,80" strokeWidth="1" opacity="0.6" />
          </svg>
        ),
        1: ( // The Magician: Infinity symbol and the four elemental altar tools
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M25,35 C25,25 45,25 50,35 C55,45 75,45 75,35 C75,25 55,25 50,35 C45,45 25,45 25,35 Z" />
            <path d="M50,45 L50,85 M30,85 L70,85" strokeLinecap="round" />
            <circle cx="50" cy="55" r="5" />
            <path d="M35,65 L65,65" />
            <path d="M42,50 L58,50" strokeWidth="1" />
          </svg>
        ),
        2: ( // The High Priestess: Twin pillars of Solomon and the crescent moon
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <rect x="25" y="20" width="8" height="60" rx="1" />
            <rect x="67" y="20" width="8" height="60" rx="1" />
            <path d="M33,35 L67,35 M33,65 L67,65" strokeDasharray="3,3" />
            <path d="M38,50 C48,50 52,42 52,50 C52,58 48,50 38,50 Z" fill="none" />
            <circle cx="50" cy="50" r="6" />
          </svg>
        ),
        3: ( // The Empress: Ornate star crown and circular wheat shield of Demeter
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <circle cx="50" cy="55" r="18" />
            <path d="M35,25 L50,40 L65,25 M50,15 L50,35" />
            <circle cx="35" cy="25" r="2.5" fill={goldColor} />
            <circle cx="50" cy="15" r="2.5" fill={goldColor} />
            <circle cx="65" cy="25" r="2.5" fill={goldColor} />
            <path d="M42,55 L58,55 M50,47 L50,63" />
          </svg>
        ),
        4: ( // The Emperor: Ornate cubic throne and regal scepter of authority
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <rect x="25" y="30" width="50" height="45" rx="2" />
            <path d="M50,15 L50,30" strokeWidth="1.5" />
            <circle cx="50" cy="15" r="3" fill={goldColor} />
            <path d="M35,45 L65,45 M35,60 L65,60" />
            <path d="M15,20 L85,80 M85,20 L15,80" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.3" />
          </svg>
        ),
        5: ( // The Hierophant: Triple papal cross and the keys of heaven
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M50,15 L50,85 M30,30 L70,30 M35,42 L65,42 M40,54 L60,54" strokeLinecap="round" />
            <path d="M40,75 L45,70 L55,70 L60,75" strokeWidth="1" />
            <circle cx="45" cy="70" r="1.5" fill={goldColor} />
            <circle cx="55" cy="70" r="1.5" fill={goldColor} />
          </svg>
        ),
        6: ( // The Lovers: Twin interlocking rings of destiny under the great star
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <circle cx="40" cy="55" r="15" />
            <circle cx="60" cy="55" r="15" />
            <path d="M50,12 L53,24 L65,24 L55,31 L59,42 L50,35 L41,42 L45,31 L35,24 L47,24 Z" />
            <path d="M50,35 L50,75" strokeDasharray="2,2" opacity="0.5" />
          </svg>
        ),
        7: ( // The Chariot: Crowned winged shield and celestial steering wheel
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <circle cx="50" cy="50" r="16" />
            <path d="M15,50 C30,35 70,35 85,50 C70,65 30,65 15,50 Z" opacity="0.4" />
            <path d="M50,15 L50,85 M15,50 L85,50 M25,25 L75,75 M25,75 L75,25" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="4" fill={goldColor} />
          </svg>
        ),
        8: ( // Strength: Infinity loop and lion's majestic mane contour
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M30,28 C30,20 45,20 50,28 C55,36 70,36 70,28 C70,20 55,20 50,28 C45,36 30,36 30,28 Z" />
            <path d="M25,75 C25,50 45,45 50,65 C55,85 75,80 75,55" strokeLinecap="round" />
            <circle cx="50" cy="65" r="3" fill={goldColor} />
          </svg>
        ),
        9: ( // The Hermit: Celestial guiding lantern with star inside and staff
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M35,80 L45,20 L55,80" strokeLinecap="round" />
            <circle cx="65" cy="35" r="12" />
            <polygon points="65,27 68,33 75,33 70,37 72,43 65,39 58,43 60,37 55,33 62,33" fill="none" />
            <path d="M65,15 L65,23 M65,47 L65,55" strokeWidth="1" strokeDasharray="1,2" />
          </svg>
        ),
        10: ( // Wheel of Fortune: Nested alchemical rings and planetary coordinates
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <circle cx="50" cy="50" r="24" />
            <circle cx="50" cy="50" r="16" />
            <circle cx="50" cy="50" r="8" />
            <path d="M50,10 L50,90 M10,50 L90,50 M22,22 L78,78 M22,78 L78,22" strokeWidth="0.8" strokeDasharray="2,2" />
            <circle cx="50" cy="50" r="2.5" fill={goldColor} />
          </svg>
        ),
        11: ( // Justice: Sword of truth balanced inside scales of karma
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M50,15 L50,75 M25,35 L75,35" strokeWidth="1.5" />
            <path d="M25,35 L15,60 L35,60 Z M75,35 L65,60 L85,60 Z" />
            <circle cx="50" cy="15" r="2" fill={goldColor} />
            <circle cx="50" cy="75" r="2.5" fill={goldColor} />
          </svg>
        ),
        12: ( // The Hanged Man: Radiant halo and inverted wooden cross
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M20,25 L80,25 M50,25 L50,85" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M35,45 L50,60 L65,45" />
            <circle cx="50" cy="72" r="10" strokeDasharray="2,2" />
            <circle cx="50" cy="72" r="4" fill={goldColor} />
          </svg>
        ),
        13: ( // Death: Celestial scythe cutting through physical loops, and the rose
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M30,80 L70,20 C85,25 82,45 62,45" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="30" cy="80" r="3.5" fill={goldColor} />
            <path d="M45,55 C40,40 60,30 55,45" />
            <circle cx="50" cy="40" r="2" fill={goldColor} />
          </svg>
        ),
        14: ( // Temperance: Golden chalices in eternal alchemical fluid exchange
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M30,30 C30,45 42,45 42,30 Z" />
            <path d="M36,43 L36,55 M30,55 L42,55" />
            <path d="M70,70 C70,55 58,55 58,70 Z" />
            <path d="M64,58 L64,70 M58,58 L70,58" />
            <path d="M36,35 Q50,45 64,65" strokeDasharray="1,1" strokeWidth="1.5" />
            <circle cx="50" cy="48" r="2" fill={goldColor} />
          </svg>
        ),
        15: ( // The Devil: Forbidden chains and inverted dark pentagram
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <polygon points="50,55 56,38 72,42 59,51 64,68 50,58 36,68 41,51 28,42 44,38" fill="none" />
            <path d="M30,75 C40,65 60,65 70,75" strokeLinecap="round" />
            <path d="M30,75 L25,82 M70,75 L75,82" />
            <circle cx="50" cy="20" r="4" strokeWidth="1.5" fill="none" />
          </svg>
        ),
        16: ( // The Tower: Crown struck by lightning and planetary crumbling orbits
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M35,80 L42,35 L58,35 L65,80 Z" />
            <path d="M48,22 L50,30 L52,22" />
            <path d="M20,15 L45,40 M80,15 L55,40" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="28" cy="55" r="2.5" fill={goldColor} />
            <circle cx="72" cy="55" r="2.5" fill={goldColor} />
          </svg>
        ),
        17: ( // The Star: Large central compass star and the seven streams of renewal
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M50,12 L54,34 L76,34 L58,47 L65,70 L50,56 L35,70 L42,47 L24,34 L46,34 Z" />
            <circle cx="25" cy="20" r="2" fill={goldColor} />
            <circle cx="75" cy="20" r="2" fill={goldColor} />
            <circle cx="15" cy="45" r="2" fill={goldColor} />
            <circle cx="85" cy="45" r="2" fill={goldColor} />
            <circle cx="25" cy="70" r="2" fill={goldColor} />
            <circle cx="75" cy="70" r="2" fill={goldColor} />
            <circle cx="50" cy="82" r="2.5" fill={goldColor} />
          </svg>
        ),
        18: ( // The Moon: Triple lunar deity glyph and twin warning beacons
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <circle cx="50" cy="50" r="18" />
            <path d="M38,38 C58,38 62,50 62,50 C62,50 58,62 38,62 Z" />
            <rect x="20" y="35" width="6" height="30" />
            <rect x="74" y="35" width="6" height="30" />
            <circle cx="50" cy="18" r="2" fill={goldColor} />
            <circle cx="50" cy="82" r="2" fill={goldColor} />
          </svg>
        ),
        19: ( // The Sun: Glorious face inside radiant solar rays and sunflower
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <circle cx="50" cy="50" r="20" />
            <circle cx="50" cy="50" r="14" strokeDasharray="3,3" />
            <path d="M50,10 L50,22 M50,78 L50,90 M10,50 L22,50 M78,50 L90,50" />
            <path d="M22,22 L31,31 M69,69 L78,78 M22,78 L31,69 M69,31 L78,22" />
            <circle cx="50" cy="50" r="3.5" fill={goldColor} />
          </svg>
        ),
        20: ( // Judgement: Gabriel's trumpet waves and rising soul triangles
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M50,85 L50,30 L75,15" strokeLinecap="round" />
            <path d="M50,45 L70,35" />
            <path d="M20,60 Q35,50 50,60 T80,60" strokeWidth="1" />
            <path d="M20,70 Q35,60 50,70 T80,70" strokeWidth="1" />
            <polygon points="30,40 35,30 40,40" />
            <polygon points="65,55 70,45 75,55" />
          </svg>
        ),
        21: ( // The World: Eternal wreath mandorla and four corners of destiny
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <ellipse cx="50" cy="50" rx="20" ry="32" />
            <circle cx="50" cy="50" r="5" fill={goldColor} />
            <circle cx="20" cy="20" r="3" />
            <circle cx="80" cy="20" r="3" />
            <circle cx="20" cy="80" r="3" />
            <circle cx="80" cy="80" r="3" />
            <path d="M50,8 L50,15 M50,85 L50,92" strokeWidth="1" />
          </svg>
        )
      };

      return majorSymbols[card.value] || (
        <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
          <circle cx="50" cy="50" r="22" />
          <polygon points="50,20 59,38 78,41 64,54 67,74 50,65 33,74 36,54 22,41 41,38" fill="none" />
          <circle cx="50" cy="50" r="3" fill={goldColor} />
        </svg>
      );
    }

    // Minor Arcana Ornate Constellation/Grids (No card is generic or blank!)
    const val = card.value;
    
    if (card.suit === 'wands') {
      if (val === 1) { // Ace of Wands: Majestic central wand with dynamic rays
        return (
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M50,80 L50,20" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="50" cy="20" r="3" fill={goldColor} />
            <path d="M35,40 L45,45 M65,40 L55,45 M30,60 L45,60 M70,60 L55,60" strokeWidth="1" />
            <circle cx="50" cy="50" r="14" strokeDasharray="2,2" />
          </svg>
        );
      } else if (val >= 11) { // Court cards: Shield, wings and central staff
        return (
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <polygon points="50,18 75,35 68,75 50,88 32,75 25,35" fill="none" />
            <path d="M50,10 L50,82" strokeWidth="1.5" />
            <circle cx="50" cy="10" r="2.5" fill={goldColor} />
            <path d="M35,45 H65 M38,58 H62" />
          </svg>
        );
      } else { // Symmetric grids representing the wand count
        const dots = Array.from({ length: val }).map((_, idx) => {
          const angle = (idx * 360) / val;
          const r = 22;
          const x = 50 + r * Math.cos((angle * Math.PI) / 180);
          const y = 50 + r * Math.sin((angle * Math.PI) / 180);
          return { x, y };
        });
        return (
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1">
            <circle cx="50" cy="50" r="22" strokeDasharray="3,3" opacity="0.5" />
            {dots.map((d, i) => (
              <line key={i} x1="50" y1="50" x2={d.x} y2={d.y} />
            ))}
            {dots.map((d, i) => (
              <circle key={`c-${i}`} cx={d.x} cy={d.y} r="3" fill={goldColor} />
            ))}
            <circle cx="50" cy="50" r="4.5" fill={goldColor} />
          </svg>
        );
      }
    }

    if (card.suit === 'cups') {
      if (val === 1) { // Ace of Cups: Divine overflowing grail with water waves
        return (
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M30,30 C30,65 70,65 70,30 Z" strokeWidth="1.5" />
            <path d="M42,58 L42,78 M58,58 L58,78" />
            <path d="M25,78 L75,78" strokeWidth="1.5" />
            <path d="M20,30 C30,22 70,22 80,30" strokeWidth="1" />
            <path d="M50,14 C50,22 46,22 46,28" strokeWidth="1" />
            <circle cx="50" cy="14" r="2" fill={goldColor} />
          </svg>
        );
      } else if (val >= 11) { // Court cards: Royal goblet under double crescent moon
        return (
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <circle cx="50" cy="50" r="12" />
            <path d="M38,38 C38,62 62,62 62,38" />
            <path d="M50,62 L50,80 M35,80 L65,80" />
            <path d="M35,22 C45,22 50,30 50,30 C50,30 55,22 65,22" />
          </svg>
        );
      } else { // Intricate symmetric geometric constellations of chalice points
        const cols = val <= 4 ? val : Math.ceil(val / 2);
        const rows = val <= 4 ? 1 : 2;
        const cups = [];
        for (let r = 0; r < rows; r++) {
          const countInRow = r === 0 ? cols : val - cols;
          for (let c = 0; c < countInRow; c++) {
            const x = countInRow === 1 ? 50 : 30 + (c * 40) / (countInRow - 1);
            const y = rows === 1 ? 50 : 35 + r * 30;
            cups.push({ x, y });
          }
        }
        return (
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1">
            {cups.map((cp, i) => (
              <g key={i} transform={`translate(${cp.x - 7}, ${cp.y - 8}) scale(0.15)`}>
                <path d="M10,10 C10,35 40,35 40,10 Z" strokeWidth="8" />
                <path d="M25,30 L25,45 M10,45 L40,45" strokeWidth="8" />
              </g>
            ))}
            {/* Fine alignment vectors */}
            <path d="M15,50 L85,50 M50,15 L50,85" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
          </svg>
        );
      }
    }

    if (card.suit === 'swords') {
      if (val === 1) { // Ace of Swords: Crowned blade pointing upward
        return (
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M50,12 L50,72 M34,64 L66,64 M50,72 L50,85" strokeWidth="1.8" />
            <path d="M43,25 L50,12 L57,25" />
            <circle cx="50" cy="85" r="3" fill={goldColor} />
            <circle cx="50" cy="40" r="16" strokeDasharray="2,2" />
          </svg>
        );
      } else if (val >= 11) { // Court cards: Crest of wings surrounding royal broadsword
        return (
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <path d="M50,15 L50,82" strokeWidth="2.2" />
            <path d="M30,62 L70,62" strokeWidth="1.5" />
            <path d="M25,40 C35,45 45,35 50,55 C55,35 65,45 75,40" strokeWidth="1" />
            <circle cx="50" cy="15" r="2" fill={goldColor} />
          </svg>
        );
      } else { // Symmetric swords configuration
        return (
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1">
            <circle cx="50" cy="50" r="22" strokeDasharray="3,3" opacity="0.3" />
            {Array.from({ length: val }).map((_, idx) => {
              const angle = (idx * 180) / val - 90;
              const r = 24;
              const x2 = 50 + r * Math.cos((angle * Math.PI) / 180);
              const y2 = 50 + r * Math.sin((angle * Math.PI) / 180);
              const x1 = 50 - r * Math.cos((angle * Math.PI) / 180);
              const y1 = 50 - r * Math.sin((angle * Math.PI) / 180);
              return (
                <g key={idx}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1" />
                  <circle cx={x2} cy={y2} r="1.5" fill={goldColor} />
                </g>
              );
            })}
            <circle cx="50" cy="50" r="4.5" fill={goldColor} />
          </svg>
        );
      }
    }

    if (card.suit === 'pentacles') {
      if (val === 1) { // Ace of Pentacles: Giant golden coin with central pentagram star
        return (
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <circle cx="50" cy="50" r="24" strokeWidth="2" />
            <circle cx="50" cy="50" r="18" strokeDasharray="2,2" />
            <polygon points="50,28 55,42 70,42 59,51 63,65 50,56 37,65 41,51 30,42 45,42" fill="none" />
            <circle cx="50" cy="50" r="3" fill={goldColor} />
          </svg>
        );
      } else if (val >= 11) { // Court cards: Geometric cube-crest centering a pentacle
        return (
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
            <rect x="25" y="25" width="50" height="50" rx="1" />
            <circle cx="50" cy="50" r="14" />
            <polygon points="50,38 53,46 62,46 55,51 58,60 50,54 42,60 45,51 38,46 47,46" fill="none" />
            <path d="M15,15 L25,25 M85,15 L75,25 M15,85 L25,75 M85,85 L75,75" strokeWidth="1" />
          </svg>
        );
      } else { // Symmetric starry constellation coordinates
        const points = Array.from({ length: val }).map((_, idx) => {
          const angle = (idx * 360) / val;
          const r = 20;
          return {
            x: 50 + r * Math.cos((angle * Math.PI) / 180),
            y: 50 + r * Math.sin((angle * Math.PI) / 180)
          };
        });
        return (
          <svg className="w-20 h-20 stroke-[#c5a059]" viewBox="0 0 100 100" fill="none" strokeWidth="1">
            {points.map((p, i) => (
              <g key={i}>
                <line x1="50" y1="50" x2={p.x} y2={p.y} opacity="0.6" />
                <circle cx={p.x} cy={p.y} r="4" strokeWidth="1.2" />
                <circle cx={p.x} cy={p.y} r="1" fill={goldColor} />
              </g>
            ))}
            {val > 2 && (
              <polygon 
                points={points.map(p => `${p.x},${p.y}`).join(' ')} 
                fill="none" 
                strokeWidth="0.8" 
                strokeDasharray="2,2" 
                opacity="0.5" 
              />
            )}
            <circle cx="50" cy="50" r="4.5" fill={goldColor} />
          </svg>
        );
      }
    }

    return null;
  };

  return (
    <div
      className={`relative select-none rounded-[6px] font-sans transition-all duration-700 ease-out preserve-3d cursor-pointer ${sizeClasses} ${
        highlighted ? 'scale-105 shadow-[0_0_35px_rgba(197,160,89,0.45)] border-[#c5a059]' : 'shadow-[0_15px_35px_rgba(0,0,0,0.8)] border-transparent'
      }`}
      style={{
        transform: `rotateY(${faceDown ? '180deg' : '0deg'}) rotate(${isReversed ? '180deg' : '0deg'})`,
      }}
    >
      {/* CARD FRONT */}
      <div
        className="absolute inset-0 w-full h-full rounded-[6px] p-3 md:p-3.5 flex flex-col justify-between items-center overflow-hidden backface-hidden border-2"
        style={{
          borderImage: 'linear-gradient(135deg, #f5f2eb 0%, #c5a059 25%, #8c6a2c 50%, #5f1f2a 75%, #c5a059 100%) 2',
          backgroundImage: 'radial-gradient(circle at 50% 35%, #221f1d 0%, #110f0e 60%, #080707 100%)',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.9)',
        }}
      >
        {/* Subtle physical paper overlay texture */}
        <div className="absolute inset-0 opacity-[0.06] bg-repeat pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />
        
        {/* Ornate antique double gold foil borders and corners */}
        <div className="absolute inset-1 border-2 border-[#c5a059]/40 pointer-events-none rounded-[4px]" />
        <div className="absolute inset-[6px] border border-[#8c6a2c]/30 pointer-events-none rounded-[3px]" />
        <div className="absolute inset-[10px] border border-dashed border-[#c5a059]/15 pointer-events-none rounded-[2px]" />
        
        {/* Intricate Victorian corner floral motifs/brackets in SVG */}
        <svg className="absolute top-1.5 left-1.5 w-5 h-5 text-[#c5a059]/50 pointer-events-none" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M2,2 L10,2 M2,2 L2,10 M2,2 Q6,6 10,2 M2,2 Q6,6 2,10" />
        </svg>
        <svg className="absolute top-1.5 right-1.5 w-5 h-5 text-[#c5a059]/50 pointer-events-none transform rotate-90" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M2,2 L10,2 M2,2 L2,10 M2,2 Q6,6 10,2 M2,2 Q6,6 2,10" />
        </svg>
        <svg className="absolute bottom-1.5 left-1.5 w-5 h-5 text-[#c5a059]/50 pointer-events-none transform -rotate-90" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M2,2 L10,2 M2,2 L2,10 M2,2 Q6,6 10,2 M2,2 Q6,6 2,10" />
        </svg>
        <svg className="absolute bottom-1.5 right-1.5 w-5 h-5 text-[#c5a059]/50 pointer-events-none transform rotate-180" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M2,2 L10,2 M2,2 L2,10 M2,2 Q6,6 10,2 M2,2 Q6,6 2,10" />
        </svg>

        {/* Archival metadata/astrology markers in background corners */}
        <div className="absolute top-3 left-3 text-[7px] font-mono text-[#c5a059]/30 uppercase tracking-widest pointer-events-none">
          {card.type === 'major' ? `AR-I ${getRomanNumeral(card.value)}` : `EL-${card.suit.slice(0,2).toUpperCase()}`}
        </div>
        <div className="absolute top-3 right-3 text-[7px] font-mono text-[#c5a059]/30 uppercase tracking-widest pointer-events-none">
          {card.type === 'major' ? 'Ω' : 'Ψ'}
        </div>
        <div className="absolute bottom-3 left-3 text-[7px] font-mono text-[#c5a059]/30 uppercase tracking-widest pointer-events-none">
          F.M.D
        </div>
        <div className="absolute bottom-3 right-3 text-[7px] font-mono text-[#c5a059]/30 uppercase tracking-widest pointer-events-none">
          S-09
        </div>

        {/* Rank medallion at the top center */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-[#110f0e] border border-[#c5a059]/50 text-[8px] font-mono text-[#c5a059] tracking-widest uppercase rounded-full z-10 flex items-center gap-1 shadow-md">
          <span className="w-1 h-1 rounded-full bg-[#5f1f2a]" />
          {card.type === 'major' ? `ARCANA ${getRomanNumeral(card.value)}` : `${card.value} OF ${card.suit.toUpperCase()}`}
          <span className="w-1 h-1 rounded-full bg-[#5f1f2a]" />
        </div>

        {/* Card Header (Bilingual Arcana indicator with micro-typography) */}
        <div className="w-full flex justify-between items-center text-[7.5px] sm:text-[8px] tracking-[0.2em] uppercase text-[#c5a059]/80 font-mono z-10 mt-3 pt-2 px-1">
          <span className="font-light text-[#f5f2eb]/70">
            {card.type === 'major' ? 'Major Arcana' : `Suit of ${card.suit}`}
          </span>
          <span className="text-[#c5a059]/60 font-serif italic">
            {card.type === 'major' ? '秘传大阿卡纳' : '元素小阿卡纳'}
          </span>
        </div>

        {/* Central Symbol & Ornamentation - Astrolabe and Illustration Layer */}
        <div className="my-auto flex flex-col items-center justify-center relative w-full h-[52%] z-10 group-hover:scale-[1.02] transition-transform duration-700">
          
          {/* Cosmic lens / Astrolabe radial backing grids */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.25] pointer-events-none">
            {/* outer orbital ring with degrees notches */}
            <div className="w-28 h-28 rounded-full border border-[#c5a059]/80 flex items-center justify-center animate-spin" style={{ animationDuration: '60s' }}>
              <div className="absolute inset-0 rounded-full border-2 border-dotted border-[#c5a059]/50" />
            </div>
            {/* intermediate ring with double line */}
            <div className="absolute w-[96px] h-[96px] rounded-full border border-double border-[#8c6a2c]/60 flex items-center justify-center" />
            {/* inner coordinates ring */}
            <div className="absolute w-[76px] h-[76px] rounded-full border border-dashed border-[#c5a059]/40" />
            {/* solar rays backing */}
            <svg className="absolute w-24 h-24 stroke-[#c5a059]/15" viewBox="0 0 100 100">
              <path d="M50,10 L50,90 M10,50 L90,50 M22,22 L78,78 M22,78 L78,22" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Deep dark backing circle for central emblem illustration shadow */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#1c1917] to-[#0d0c0b] border border-[#c5a059]/30 flex items-center justify-center shadow-[inset_0_4px_16px_rgba(0,0,0,0.9),_0_4px_10px_rgba(0,0,0,0.5)] relative z-10">
            {/* Core procedural symbol */}
            <div className="relative transform hover:scale-[1.08] transition-transform duration-500 ease-out">
              {renderSuitSymbol()}
            </div>
          </div>
        </div>

        {/* Card Footer (Bilingual Titles, styled like luxury classical book layout) */}
        <div className="w-full text-center flex flex-col items-center gap-1 z-10 pb-1.5">
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mb-1" />
          <h3 className="font-serif font-light text-sm sm:text-base tracking-[0.08em] text-ivory drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {card.name}
          </h3>
          <p className="text-[9px] tracking-[0.25em] text-[#c5a059] font-serif font-medium uppercase leading-none">
            {card.nameZh}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-1.5 h-1.5 border border-[#c5a059]/40 rounded-full transform rotate-45" />
            <span className="text-[6.5px] font-mono uppercase text-[#c5a059]/50 tracking-[0.2em]">{card.keywordsZh.slice(0, 2).join(' • ')}</span>
            <span className="w-1.5 h-1.5 border border-[#c5a059]/40 rounded-full transform rotate-45" />
          </div>
        </div>
      </div>

      {/* CARD BACK */}
      <div
        className="absolute inset-0 w-full h-full rounded-[6px] p-3 md:p-3.5 flex flex-col items-center justify-center overflow-hidden backface-hidden border-2"
        style={{
          transform: 'rotateY(180deg)',
          borderImage: 'linear-gradient(135deg, #8c6a2c 0%, #4a3a1e 40%, #c5a059 50%, #251b0a 60%, #8c6a2c 100%) 2',
          backgroundImage: 'radial-gradient(circle at 50% 50%, #171514 0%, #0c0b0a 80%, #050404 100%)',
          boxShadow: 'inset 0 0 25px rgba(0,0,0,0.95)',
        }}
      >
        {/* Triple luxury gold foil borders with fine coordinate tick lines */}
        <div className="absolute inset-1 border border-[#8c6a2c]/50 pointer-events-none rounded-[4px]" />
        <div className="absolute inset-1.5 border border-[#c5a059]/15 pointer-events-none rounded-[3px]" />
        <div className="absolute inset-2.5 border-2 border-[#8c6a2c]/30 pointer-events-none rounded-[2px]" />
        <div className="absolute inset-3 border border-dotted border-[#c5a059]/10 pointer-events-none rounded-[1.5px]" />
        
        {/* Subtle linen texture overlay */}
        <div className="absolute inset-0 opacity-[0.05] bg-repeat pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }} />

        {/* Intricate geometric sigil back pattern - cosmic mirror & twin orbits */}
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          
          {/* Multiple concentric orbital coordinates backing */}
          <div className="absolute w-32 h-32 rounded-full border border-[#8c6a2c]/30 flex items-center justify-center animate-spin" style={{ animationDuration: '80s' }}>
            <div className="absolute inset-0 rounded-full border border-dashed border-[#c5a059]/20" />
            <div className="absolute w-[112px] h-[112px] rounded-full border border-double border-[#8c6a2c]/20" />
            <div className="absolute w-[96px] h-[96px] rounded-full border border-dotted border-[#c5a059]/15" />
          </div>

          <div className="absolute w-24 h-24 rounded-full bg-[#0e0d0d] border border-[#c5a059]/30 flex items-center justify-center shadow-2xl relative z-10">
            <div className="absolute w-20 h-20 rounded-full border border-dashed border-[#8c6a2c]/45" />
            <div className="absolute w-14 h-14 rounded-full border border-[#c5a059]/20 flex items-center justify-center bg-[#070606]">
              {/* Central Mirror/Eye motif representing Destiny Mirror */}
              <svg className="w-9 h-9 stroke-[#c5a059]/85" viewBox="0 0 100 100" fill="none" strokeWidth="2">
                <path d="M10,50 C30,20 70,20 90,50 C70,80 30,80 10,50 Z" />
                <circle cx="50" cy="50" r="16" />
                <circle cx="50" cy="50" r="7" fill="#c5a059" className="opacity-70 animate-pulse" />
                {/* fine celestial coordinates ticks inside mirror */}
                <line x1="50" y1="12" x2="50" y2="88" strokeDasharray="2,3" opacity="0.4" />
                <line x1="12" y1="50" x2="88" y2="50" strokeDasharray="2,3" opacity="0.4" />
                <path d="M35,35 L40,40 M65,35 L60,40 M35,65 L40,60 M65,65 L60,60" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>
          </div>
          
          {/* Subtle ornate corners */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t border-l border-[#8c6a2c]/50" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t border-r border-[#8c6a2c]/50" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-[#8c6a2c]/50" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-[#8c6a2c]/50" />
          
          <span className="text-[7.5px] font-mono tracking-[0.3em] text-[#c5a059]/50 uppercase absolute bottom-4">
            FATE MIRROR · 命运镜像
          </span>
          <span className="text-[5.5px] font-mono tracking-[0.4em] text-[#8c6a2c]/40 uppercase absolute bottom-1.5">
            SECTOR 09 • RITUAL CORE
          </span>
        </div>
      </div>
    </div>
  );
}
