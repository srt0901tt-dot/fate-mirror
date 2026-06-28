import React, { useState } from 'react';
import { TarotCard, DrawnCard, DeepInterpretation, SpreadMode } from '../types';
import TarotCardVisual from './TarotCardVisual';
import { BookOpen, Calendar, HelpCircle, Heart, Flame, ShieldAlert, Sparkles, CheckCircle } from 'lucide-react';
import { useGlobalGestureControl } from '../context/GestureContext';

interface DeepInterpretationScreenProps {
  question: string;
  mode: SpreadMode;
  drawnCards: DrawnCard[];
  interpretation: DeepInterpretation;
  onRestart: () => void;
  onSaveToArchive: () => void;
  isSaved: boolean;
}

export default function DeepInterpretationScreen({
  question,
  mode,
  drawnCards,
  interpretation,
  onRestart,
  onSaveToArchive,
  isSaved
}: DeepInterpretationScreenProps) {
  // Track which card indexes have been flipped/revealed by the user for suspense
  const [revealedIndices, setRevealedIndices] = useState<Record<number, boolean>>({});
  const [selectedCardIdx, setSelectedCardIdx] = useState<number>(0);

  const toggleReveal = (idx: number) => {
    setRevealedIndices(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
    setSelectedCardIdx(idx);
  };

  const revealAll = () => {
    const all: Record<number, boolean> = {};
    drawnCards.forEach((_, idx) => {
      all[idx] = true;
    });
    setRevealedIndices(all);
  };

  // Bind global gestures
  useGlobalGestureControl({
    onLeft: () => {
      setSelectedCardIdx(prev => (prev === 0 ? drawnCards.length - 1 : prev - 1));
    },
    onRight: () => {
      setSelectedCardIdx(prev => (prev === drawnCards.length - 1 ? 0 : prev + 1));
    },
    onPinch: () => {
      // Pinch toggles the reveal state of the currently highlighted card
      toggleReveal(selectedCardIdx);
    },
    onOpenPalm: () => {
      // Auto-save to avoid data loss, then trigger restart
      if (!isSaved) {
        onSaveToArchive();
      }
      onRestart();
    }
  }, [drawnCards.length, selectedCardIdx, isSaved]);

  const selectedCardReading = interpretation.cardReadings[selectedCardIdx] || interpretation.cardReadings[0];
  const selectedDrawnCard = drawnCards[selectedCardIdx] || drawnCards[0];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-12 text-[#f5f2eb]">
      
      {/* Editorial Header */}
      <div className="text-center space-y-4 pt-6 border-b border-[#3c352a]/40 pb-8 relative">
        {/* Subtle decorative alignment brackets on outer corners of the header */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#c5a059]/30" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#c5a059]/30" />
        
        <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase bg-[#121110] px-3 py-1 border border-[#c5a059]/20 rounded-full">
          <BookOpen className="w-3 h-3 text-[#c5a059]/80" />
          The Revelation / 命运揭示
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-light tracking-[0.05em] text-ivory">
          Fate Mirror Reading
        </h1>
        <div className="flex flex-col items-center gap-1.5 pt-2">
          <div className="text-sm md:text-base font-serif font-light text-neutral-300 max-w-xl italic border-l-2 border-[#5f1f2a] pl-4 py-1">
            &ldquo;{question}&rdquo;
          </div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]/80 mt-2">
            Spread: {mode.nameZh} • {mode.cardCount} Cards / 牌阵：{mode.name} ({mode.cardCount}张)
          </p>
        </div>
      </div>

      {/* Grid of Drawn Cards */}
      <div className="space-y-6">
        <div className="flex justify-between items-end px-2">
          <div>
            <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-[#c5a059]">
              Drawn Deck Array / 启牌镜像
            </h3>
            <div className="w-12 h-[1px] bg-[#c5a059]/40 mt-1" />
          </div>
          {Object.keys(revealedIndices).length < drawnCards.length && (
            <button
              onClick={revealAll}
              className="text-[10px] font-mono tracking-widest text-[#c5a059]/80 hover:text-white uppercase transition-colors"
            >
              Reveal All Cards / 一键翻牌 ➔
            </button>
          )}
        </div>

        {/* Elegant flex layout of selected cards */}
        <div className="flex flex-wrap justify-center gap-6 py-4">
          {drawnCards.map((dc, idx) => {
            const isRevealed = !!revealedIndices[idx];
            const isSelected = selectedCardIdx === idx;
            
            return (
              <div
                key={idx}
                onClick={() => toggleReveal(idx)}
                className={`flex flex-col items-center gap-3 p-4 rounded-[4px] transition-all duration-500 cursor-pointer group relative overflow-hidden ${
                  isSelected 
                    ? 'bg-[#1c1a19] border-2 border-[#c5a059] shadow-[0_15px_30px_rgba(0,0,0,0.6)]' 
                    : 'bg-[#161514] border border-[#c5a059]/10 hover:border-[#c5a059]/40'
                }`}
              >
                {/* Micro gold lines for focused state */}
                {isSelected && <div className="absolute inset-0.5 border border-[#c5a059]/10 pointer-events-none rounded-[2px]" />}

                {/* Position Marker */}
                <div className="text-center font-mono space-y-0.5 relative z-10">
                  <span className="text-[10px] text-[#c5a059] font-medium uppercase tracking-wider">Slot {idx + 1}</span>
                  <h4 className="text-[11px] uppercase tracking-wider text-neutral-300 truncate w-36 font-serif">
                    {dc.positionNameZh}
                  </h4>
                </div>

                {/* Card representation */}
                <TarotCardVisual
                  card={dc.card}
                  isReversed={dc.isReversed}
                  faceDown={!isRevealed}
                  size="sm"
                  highlighted={isSelected}
                />

                <div className="text-center relative z-10">
                  <p className="text-[9px] font-mono text-[#c5a059] tracking-widest uppercase mt-1">
                    {isRevealed ? `${dc.card.nameZh} (${dc.isReversed ? '逆位' : '正位'})` : 'Click to Flip'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Card Focus detail pane (Awwwards-editorial styling) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-[#161514] p-6 md:p-8 rounded-[4px] border-2 border-[#c5a059]/20 relative overflow-hidden shadow-2xl">
        <div className="absolute inset-1 border border-[#c5a059]/5 pointer-events-none rounded-[2px]" />
        <div className="absolute top-0 left-0 w-2 h-full bg-[#5f1f2a]" />
        
        {/* Ambient background radial glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-radial from-[#c5a059]/5 to-transparent pointer-events-none rounded-full z-0" />

        {/* Left side card info */}
        <div className="md:col-span-4 flex flex-col justify-center items-center gap-4 border-b md:border-b-0 md:border-r border-[#3c352a]/40 pb-6 md:pb-0 md:pr-6 relative z-10">
          <TarotCardVisual
            card={selectedDrawnCard.card}
            isReversed={selectedDrawnCard.isReversed}
            faceDown={!revealedIndices[selectedCardIdx]}
            size="md"
          />
          <div className="text-center space-y-1">
            <h3 className="font-serif text-xl text-ivory font-light tracking-[0.05em]">
              {selectedDrawnCard.card.name}
            </h3>
            <p className="text-xs font-mono text-[#c5a059] tracking-[0.18em] uppercase font-light">
              {selectedDrawnCard.card.nameZh} • {selectedDrawnCard.isReversed ? '逆位 (Reversed)' : '正位 (Upright)'}
            </p>
          </div>
        </div>

        {/* Right side card details & specific reading */}
        <div className="md:col-span-8 flex flex-col justify-between space-y-4 relative z-10">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center text-[10px] font-mono uppercase tracking-[0.15em] text-[#c5a059] gap-1.5">
              <span>Card Position Insight / 槽位启示</span>
              <span className="text-neutral-300">{selectedDrawnCard.positionNameZh} (代表 {selectedDrawnCard.positionMeaningZh})</span>
            </div>
            <div className="h-[1.5px] bg-gradient-to-r from-[#c5a059]/60 via-[#c5a059]/10 to-transparent" />
            
            <div className="flex flex-wrap gap-2 pt-1">
              {selectedDrawnCard.card.keywordsZh.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 bg-[#121110] border border-[#c5a059]/30 rounded-full text-[9px] font-mono text-[#c5a059]/90 tracking-wide">
                  {kw} / {selectedDrawnCard.card.keywords[i]}
                </span>
              ))}
            </div>

            {revealedIndices[selectedCardIdx] ? (
              <div className="space-y-5 pt-2">
                {/* Specific interpretation output */}
                <div className="space-y-1.5">
                  <p className="text-[10px] text-[#c5a059] font-mono uppercase tracking-widest font-medium">Interactive Reading / 命运解读</p>
                  <p className="font-serif text-base text-[#f5f2eb] leading-relaxed font-light">
                    {selectedCardReading?.interpretationZh || '镜像能量正在酝酿...'}
                  </p>
                  <p className="text-xs text-neutral-400 font-sans font-light italic leading-relaxed pt-1.5 border-l border-[#c5a059]/30 pl-3">
                    {selectedCardReading?.interpretation || 'Translating ethereal vibrations...'}
                  </p>
                </div>

                <div className="border-t border-[#3c352a]/40 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 bg-[#121110]/60 p-3.5 rounded-[4px] border border-[#c5a059]/10 shadow-sm">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a059] font-medium">Emotional Anchor / 情感共鸣</span>
                    <p className="text-xs font-serif text-neutral-300 leading-relaxed font-light">
                      {selectedDrawnCard.card.emotionalMeaningZh}
                    </p>
                  </div>
                  <div className="space-y-1.5 bg-[#121110]/60 p-3.5 rounded-[4px] border border-[#c5a059]/10 shadow-sm">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a059] font-medium">Action Pathway / 行动指引</span>
                    <p className="text-xs font-serif text-neutral-300 leading-relaxed font-light">
                      {selectedDrawnCard.card.actionAdviceZh}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <p className="text-sm font-serif text-neutral-400">This card remains shrouded in mystery.</p>
                <button
                  onClick={() => toggleReveal(selectedCardIdx)}
                  className="px-6 py-2.5 bg-[#5f1f2a] border-2 border-[#c5a059]/50 hover:border-[#c5a059] hover:bg-[#802a36] text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-[2px]"
                >
                  Unveil Card Face / 翻牌照见
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-2 justify-end text-[10px] font-mono text-[#c5a059]/50">
            <span>Choose slots above to read detailed bicultural position insights.</span>
          </div>
        </div>
      </div>

      {/* Holistic Deep Interpretation Panel (Editorial style) */}
      <div className="space-y-8 bg-[#121110] border-2 border-[#c5a059]/20 p-6 md:p-10 rounded-[4px] shadow-2xl relative overflow-hidden">
        {/* Double background lines */}
        <div className="absolute inset-1.5 border border-[#3c352a]/20 pointer-events-none rounded-[2px]" />
        
        <div className="absolute top-0 right-10 text-[9px] font-mono tracking-[0.2em] text-[#c5a059]/30 uppercase select-none">
          Holistic Synthesis / 整合盘面
        </div>

        {/* 1. Synthesis Summary */}
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <h3 className="font-serif text-xl md:text-2xl tracking-wide text-ivory font-light">
              Synthesized Synthesis / 镜像总评
            </h3>
          </div>
          <div className="h-[1px] bg-[#c5a059]/20" />
          <p className="font-serif text-base md:text-lg text-[#f5f2eb] leading-relaxed first-letter:text-3xl first-letter:font-bold first-letter:text-[#c5a059] first-letter:float-left first-letter:mr-2 font-light">
            {interpretation.summaryZh}
          </p>
          <p className="text-xs text-neutral-400 font-sans font-light italic leading-relaxed pt-2 border-l border-[#c5a059]/20 pl-4">
            {interpretation.summary}
          </p>
        </div>

        {/* 2. Emotional and Action grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 relative z-10">
          
          {/* Subconscious Emotional patterns */}
          <div className="space-y-3.5 p-5 bg-[#161514] border border-[#c5a059]/10 rounded-[3px] relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center opacity-5">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">
              Subconscious Pattern / 潜意识阴影模式
            </span>
            <div className="w-8 h-[1px] bg-[#5f1f2a]" />
            <p className="font-serif text-sm md:text-base text-neutral-200 leading-relaxed font-light">
              {interpretation.emotionalPatternZh}
            </p>
            <p className="text-xs text-neutral-400 font-sans font-light italic leading-relaxed pt-1 border-t border-neutral-900 mt-2">
              {interpretation.emotionalPattern}
            </p>
          </div>

          {/* Action guidance */}
          <div className="space-y-3.5 p-5 bg-[#161514] border border-[#c5a059]/10 rounded-[3px] relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center opacity-5">
              <Flame className="w-10 h-10 text-white" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">
              Action Pathway / 现实行动指引
            </span>
            <div className="w-8 h-[1px] bg-[#5f1f2a]" />
            <p className="font-serif text-sm md:text-base text-neutral-200 leading-relaxed font-light">
              {interpretation.actionGuidanceZh}
            </p>
            <p className="text-xs text-neutral-400 font-sans font-light italic leading-relaxed pt-1 border-t border-neutral-900 mt-2">
              {interpretation.actionGuidance}
            </p>
          </div>

        </div>

        {/* 3. Soul Reflection journaling prompts */}
        <div className="bg-[#1c1a19] border-2 border-dashed border-[#c5a059]/20 p-6 rounded-[3px] text-center space-y-3.5 pt-7 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent" />
          <HelpCircle className="w-5 h-5 text-[#c5a059]/80 mx-auto" />
          
          <div className="space-y-1">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#c5a059]">Mirror Reflection Journal Prompt / 命运之镜自省之问</span>
            <h4 className="font-serif text-base md:text-lg text-[#f5f2eb] max-w-2xl mx-auto leading-relaxed font-light py-2">
              &ldquo;{interpretation.reflectionPromptZh}&rdquo;
            </h4>
            <p className="text-xs text-neutral-400 font-sans font-light italic leading-relaxed max-w-xl mx-auto">
              {interpretation.reflectionPrompt}
            </p>
          </div>
        </div>
      </div>

      {/* Persistent CTA actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-8 border-t border-[#3c352a]/30">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-10 py-3.5 border border-[#c5a059]/60 hover:border-white hover:text-white text-[#c5a059] font-serif tracking-[0.15em] text-xs uppercase transition-all duration-500 rounded-[2px]"
        >
          Begin New Ritual / 开启新占卜
        </button>

        <button
          id="save-archive-btn"
          onClick={onSaveToArchive}
          disabled={isSaved}
          className={`w-full sm:w-auto px-12 py-3.5 border-2 font-serif tracking-[0.15em] text-xs uppercase transition-all duration-500 rounded-[2px] flex items-center justify-center gap-2 ${
            isSaved
              ? 'bg-[#1c1a19] border-dashed border-neutral-700 text-neutral-500 cursor-default'
              : 'bg-[#5f1f2a] hover:bg-[#802a36] border-[#c5a059] text-ivory shadow-lg'
          }`}
        >
          {isSaved ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Saved to Archive / 已保存至归档
            </>
          ) : (
            'Commit to Archive / 保存至归档'
          )}
        </button>
      </div>

    </div>
  );
}
