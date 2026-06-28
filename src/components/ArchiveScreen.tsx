import React, { useState, useEffect } from 'react';
import { ReadingSession, TarotCard } from '../types';
import { TAROT_DATABASE } from '../data/tarot';
import { SPREAD_MODES } from '../data/spreads';
import { Archive, Calendar, Trash2, Edit3, Save, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { useGlobalGestureControl } from '../context/GestureContext';

interface ArchiveScreenProps {
  onRestart: () => void;
  onSelectHistoricalSession: (session: ReadingSession) => void;
}

export default function ArchiveScreen({ onRestart, onSelectHistoricalSession }: ArchiveScreenProps) {
  const [sessions, setSessions] = useState<ReadingSession[]>([]);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesTempText, setNotesTempText] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('fate_mirror_readings');
    if (saved) {
      try {
        setSessions(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse archive sessions:', e);
      }
    }
  }, []);

  // Bind global gestures
  useGlobalGestureControl({
    onLeft: () => {
      if (sessions.length > 0) {
        setFocusedIndex(prev => (prev === 0 ? sessions.length - 1 : prev - 1));
      }
    },
    onRight: () => {
      if (sessions.length > 0) {
        setFocusedIndex(prev => (prev === sessions.length - 1 ? 0 : prev + 1));
      }
    },
    onPinch: () => {
      if (sessions.length > 0 && sessions[focusedIndex]) {
        onSelectHistoricalSession(sessions[focusedIndex]);
      }
    },
    onOpenPalm: () => {
      onRestart();
    }
  }, [sessions, focusedIndex]);

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent clicking card to trigger reload
    if (!window.confirm('Are you sure you want to let this mirror reflection dissolve into the void? 此删除不可撤销。')) return;

    const updated = sessions.filter(s => s.id !== id);
    setSessions(updated);
    localStorage.setItem('fate_mirror_readings', JSON.stringify(updated));
  };

  const startEditingNotes = (id: string, currentNotes: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingNotesId(id);
    setNotesTempText(currentNotes || '');
  };

  const saveNotes = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = sessions.map(s => {
      if (s.id === id) {
        return {
          ...s,
          reflectionNotes: notesTempText // dynamically injected note field
        };
      }
      return s;
    });
    setSessions(updated);
    localStorage.setItem('fate_mirror_readings', JSON.stringify(updated));
    setEditingNotesId(null);
  };

  // Helper: calculate recurring cards
  const getRecurringCards = (): { card: TarotCard; count: number }[] => {
    const counts: Record<string, number> = {};
    sessions.forEach(s => {
      s.drawnCards.forEach(dc => {
        counts[dc.card.id] = (counts[dc.card.id] || 0) + 1;
      });
    });

    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3); // top 3 recurring cards

    return sorted
      .map(([id, count]) => {
        const card = TAROT_DATABASE.find(c => c.id === id);
        return card ? { card, count } : null;
      })
      .filter((item): item is { card: TarotCard; count: number } => item !== null);
  };

  // Helper: calculate emotional signal trend
  const getEmotionalTrend = (): { signal: string; signalZh: string; count: number }[] => {
    const counts: Record<string, { count: number; zh: string }> = {};
    sessions.forEach(s => {
      const sig = s.analysis.emotionalSignal;
      const sigZh = s.analysis.emotionalSignalZh;
      if (sig) {
        if (!counts[sig]) {
          counts[sig] = { count: 0, zh: sigZh || sig };
        }
        counts[sig].count += 1;
      }
    });

    return Object.entries(counts).map(([signal, info]) => ({
      signal,
      signalZh: info.zh,
      count: info.count
    })).sort((a, b) => b.count - a.count);
  };

  const recurringCards = getRecurringCards();
  const emotionalTrend = getEmotionalTrend();

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-10 text-[#f5f2eb]">
      
      {/* Archive Header */}
      <div className="text-center space-y-4 pt-6 border-b border-[#3c352a]/40 pb-8 relative">
        {/* Subtle decorative alignment brackets on outer corners of the header */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#c5a059]/30" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#c5a059]/30" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161514] border border-[#c5a059]/30 rounded-full text-[10px] font-mono uppercase tracking-[0.25em] text-[#c5a059]">
          <Archive className="w-3 h-3 text-[#c5a059]/80" />
          The Temple Archives / 镜之馆归档
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-light tracking-[0.05em] text-ivory">
          Fate Mirror Archives
        </h1>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]/80">
          Chronology of Self-Reflections / 历次镜像自省记录
        </p>
      </div>

      {sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 max-w-md mx-auto relative p-6 border border-[#c5a059]/10 rounded-[4px] bg-[#161514]/40">
          {/* Alignment ticks inside blank state box */}
          <div className="absolute top-1 left-1 text-[8px] text-[#c5a059]/35 font-mono">⌜</div>
          <div className="absolute top-1 right-1 text-[8px] text-[#c5a059]/35 font-mono">⌝</div>
          <div className="absolute bottom-1 left-1 text-[8px] text-[#c5a059]/35 font-mono">⌞</div>
          <div className="absolute bottom-1 right-1 text-[8px] text-[#c5a059]/35 font-mono">⌟</div>

          <div className="w-16 h-16 rounded-full border border-dashed border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]/40 bg-[#121110]">
            <Archive className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-lg text-neutral-300 font-light">The Archive is Quiet</h3>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              No sessions have been committed to local memory yet. Complete a Tarot ritual and save it to begin building your personal destiny map.
            </p>
            <p className="text-[11px] text-[#c5a059]/60 font-sans italic pt-2">
              镜面澄空，尚无归档。开启一轮命运之镜的对话，并将其记录在此，以此测绘你的内在潜意识星图。
            </p>
          </div>
          <button
            onClick={onRestart}
            className="w-full py-3 bg-[#5f1f2a] hover:bg-[#802a36] border border-[#c5a059] text-ivory font-serif tracking-[0.15em] text-xs uppercase transition-all duration-300 rounded-[2px]"
          >
            Start First Ritual / 开启首次占卜
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          
          {/* Statistical Insights Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left: Recurring Card symbols (representing repeating sub-conscious cycles) */}
            <div className="md:col-span-7 bg-[#161514] border-2 border-[#c5a059]/20 p-5 rounded-[4px] space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute inset-1 border border-[#c5a059]/5 pointer-events-none rounded-[2px]" />
              
              <div className="space-y-1 relative z-10">
                <span className="text-[9px] font-mono tracking-widest uppercase text-[#c5a059]">Recurring Archetypes / 循环显现的潜意识意象</span>
                <h3 className="font-serif text-lg text-ivory font-light">Subconscious Loops</h3>
              </div>
              <div className="h-[1px] bg-[#c5a059]/15 relative z-10" />
              
              {recurringCards.length === 0 ? (
                <p className="text-xs text-neutral-400 relative z-10 font-sans">Multiple readings required to map subconscious trends.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 relative z-10">
                  {recurringCards.map(({ card, count }) => (
                    <div key={card.id} className="p-3 bg-[#121110] border border-[#c5a059]/25 hover:border-[#c5a059] rounded-[2px] text-center space-y-2 flex flex-col justify-between transition-colors duration-300">
                      <div className="text-[8.5px] font-mono text-[#c5a059] tracking-wider uppercase">
                        Seen {count} {count === 1 ? 'Time' : 'Times'} / {count}次
                      </div>
                      <div>
                        <h4 className="font-serif text-xs text-ivory font-light">{card.name}</h4>
                        <p className="text-[10px] text-[#c5a059] font-mono font-light mt-0.5">{card.nameZh}</p>
                      </div>
                      <div className="text-[8px] text-neutral-500 font-mono truncate border-t border-neutral-900 pt-1.5 mt-1">
                        {card.keywordsZh.slice(0, 2).join(' • ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Emotional Waveform / Trend counters */}
            <div className="md:col-span-5 bg-[#161514] border-2 border-[#c5a059]/20 p-5 rounded-[4px] space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute inset-1 border border-[#c5a059]/5 pointer-events-none rounded-[2px]" />
              
              <div className="space-y-1 relative z-10">
                <span className="text-[9px] font-mono tracking-widest uppercase text-[#c5a059]">Emotional Frequency / 潜意识情绪频率分布</span>
                <h3 className="font-serif text-lg text-ivory font-light">Emotional Waves</h3>
              </div>
              <div className="h-[1px] bg-[#c5a059]/15 relative z-10" />

              <div className="space-y-3 pt-1 max-h-36 overflow-y-auto pr-1 relative z-10">
                {emotionalTrend.map(({ signal, signalZh, count }) => {
                  const maxCount = Math.max(...emotionalTrend.map(t => t.count));
                  const percentage = `${(count / maxCount) * 100}%`;
                  return (
                    <div key={signal} className="space-y-1 text-xs">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-ivory font-light">{signalZh} ({signal})</span>
                        <span className="text-[#c5a059]">{count} {count === 1 ? 'log' : 'logs'}</span>
                      </div>
                      <div className="w-full h-1 bg-[#121110] rounded-full overflow-hidden">
                        <div className="h-full bg-[#5f1f2a] rounded-full transition-all duration-1000" style={{ width: percentage }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Historical Readings Timeline Bento Grid */}
          <div className="space-y-5">
            <div className="flex justify-between items-end px-2">
              <div>
                <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-[#c5a059]">
                  Chronology Grid / 历史镜像列表
                </h3>
                <div className="w-12 h-[1px] bg-[#c5a059]/40 mt-1" />
              </div>
              <button
                onClick={onRestart}
                className="text-[10px] font-mono tracking-widest text-[#c5a059]/80 hover:text-white uppercase transition-colors"
              >
                + Cast New Reading / 开启新仪式
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sessions.map((session, sIdx) => {
                const dateStr = new Date(session.timestamp).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });
                const isEditingNotes = editingNotesId === session.id;
                const isFocused = sIdx === focusedIndex;

                return (
                  <div
                    key={session.id}
                    onClick={() => {
                      setFocusedIndex(sIdx);
                      onSelectHistoricalSession(session);
                    }}
                    className={`relative p-5 transition-all duration-500 rounded-[4px] text-left shadow-lg group cursor-pointer flex flex-col justify-between min-h-[230px] ${
                      isFocused
                        ? 'bg-[#1c1a19] border-2 border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                        : 'bg-[#161514] hover:bg-[#1c1a19] border-2 border-[#c5a059]/10 hover:border-[#c5a059]/60'
                    }`}
                  >
                    <div className="absolute inset-1 border border-[#c5a059]/5 pointer-events-none rounded-[2px]" />
                    
                    {/* Floating Delete button */}
                    <button
                      onClick={(e) => deleteSession(session.id, e)}
                      className="absolute top-4 right-4 text-neutral-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 z-10 p-1"
                      title="Dissolve from Archive / 销毁此镜像"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="space-y-3.5 relative z-10">
                      <div className="flex justify-between items-center text-[9px] font-mono text-[#c5a059]/70 tracking-widest uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#c5a059]/50" /> {dateStr}
                        </span>
                        <span>{session.mode.nameZh}</span>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="font-serif text-base text-ivory line-clamp-1 leading-snug font-light">
                          &ldquo;{session.question}&rdquo;
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {session.drawnCards.map((dc, i) => (
                            <span key={i} className="text-[8px] font-mono px-2 py-0.5 bg-[#121110] border border-[#c5a059]/20 text-[#c5a059] rounded-full">
                              {dc.card.nameZh}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="h-[1px] bg-[#c5a059]/10" />

                      {/* Brief bilingual summary clipping */}
                      <p className="text-xs text-neutral-400 font-serif leading-relaxed line-clamp-2 italic font-light">
                        {session.interpretation.summaryZh}
                      </p>
                    </div>

                    {/* Private Reflections Notes persistent text-field */}
                    <div className="mt-4 pt-3.5 border-t border-[#3c352a]/40 space-y-2 relative z-10" onClick={e => e.stopPropagation()}>
                      <div className="flex justify-between items-center text-[9px] font-mono text-[#c5a059]/80 uppercase">
                        <span>Personal Reflections / 自省笔录</span>
                        {isEditingNotes ? (
                          <button
                            onClick={(e) => saveNotes(session.id, e)}
                            className="flex items-center gap-1 text-emerald-600 hover:text-emerald-500 font-medium"
                          >
                            <Save className="w-3 h-3" /> Save / 保存
                          </button>
                        ) : (
                          <button
                            onClick={(e) => startEditingNotes(session.id, (session as any).reflectionNotes, e)}
                            className="flex items-center gap-1 text-neutral-500 hover:text-[#c5a059] transition-colors"
                          >
                            <Edit3 className="w-2.5 h-2.5" /> Write Notes / 记录
                          </button>
                        )}
                      </div>

                      {isEditingNotes ? (
                        <textarea
                          value={notesTempText}
                          onChange={(e) => setNotesTempText(e.target.value)}
                          className="w-full p-2.5 bg-[#121110] border-2 border-[#c5a059]/40 text-xs text-neutral-200 font-sans focus:outline-none focus:border-[#c5a059] rounded-[2px]"
                          rows={2}
                          placeholder="Record private thoughts and life feedback..."
                        />
                      ) : (
                        <p className="text-xs text-neutral-500 font-sans italic line-clamp-1 leading-normal pl-1">
                          {(session as any).reflectionNotes || 'No notes added yet. Record private thoughts and life realizations here...'}
                        </p>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
