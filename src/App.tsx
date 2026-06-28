import React, { useState, useEffect } from 'react';
import { SPREAD_MODES } from './data/spreads';
import { TAROT_DATABASE } from './data/tarot';
import { TarotCard, SpreadMode, DrawnCard, DeepInterpretation, ReadingSession, QuestionAnalysis } from './types';
import SensingScreen from './components/SensingScreen';
import OrbitalCarousel from './components/OrbitalCarousel';
import DeepInterpretationScreen from './components/DeepInterpretationScreen';
import ArchiveScreen from './components/ArchiveScreen';
import CosmicBackground from './components/CosmicBackground';
import { GestureProvider, useGlobalGestureControl, useGestureContext } from './context/GestureContext';
import GestureStatusHUD from './components/GestureStatusHUD';
import { 
  Sparkles, 
  HelpCircle, 
  Compass, 
  Eye, 
  History, 
  RefreshCw, 
  ArrowRight, 
  Volume2, 
  VolumeX,
  BookOpen,
  Info
} from 'lucide-react';

// Premium miniature card layout diagrams for Spread Mode Selection
const renderMiniatureDiagram = (count: number) => {
  const cardW = 9;
  const cardH = 14;
  const strokeColor = "#c5a059";
  
  if (count === 1) {
    return (
      <svg className="w-14 h-8 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 60 30" fill="none">
        <rect x="25.5" y="8" width={cardW} height={cardH} rx="0.5" stroke={strokeColor} strokeWidth="0.8" />
        <circle cx="30" cy="15" r="1" fill={strokeColor} className="opacity-40" />
      </svg>
    );
  } else if (count === 2) {
    return (
      <svg className="w-14 h-8 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 60 30" fill="none">
        <rect x="18" y="8" width={cardW} height={cardH} rx="0.5" stroke={strokeColor} strokeWidth="0.8" />
        <rect x="33" y="8" width={cardW} height={cardH} rx="0.5" stroke={strokeColor} strokeWidth="0.8" />
        <line x1="27" y1="15" x2="33" y2="15" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="1,1" />
      </svg>
    );
  } else if (count === 3) {
    return (
      <svg className="w-14 h-8 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 60 30" fill="none">
        <rect x="11" y="8" width={cardW} height={cardH} rx="0.5" stroke={strokeColor} strokeWidth="0.8" />
        <rect x="25.5" y="8" width={cardW} height={cardH} rx="0.5" stroke={strokeColor} strokeWidth="0.8" />
        <rect x="40" y="8" width={cardW} height={cardH} rx="0.5" stroke={strokeColor} strokeWidth="0.8" />
      </svg>
    );
  } else if (count === 4) {
    return (
      <svg className="w-14 h-8 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 60 30" fill="none">
        <rect x="25.5" y="2" width={cardW} height={cardH} rx="0.5" stroke={strokeColor} strokeWidth="0.8" />
        <rect x="12" y="8" width={cardW} height={cardH} rx="0.5" stroke={strokeColor} strokeWidth="0.6" />
        <rect x="39" y="8" width={cardW} height={cardH} rx="0.5" stroke={strokeColor} strokeWidth="0.6" />
        <rect x="25.5" y="14" width={cardW} height={cardH} rx="0.5" stroke={strokeColor} strokeWidth="0.8" />
      </svg>
    );
  } else {
    return (
      <svg className="w-14 h-8 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 60 30" fill="none">
        <rect x="25.5" y="2" width={cardW} height={cardH} rx="0.5" stroke={strokeColor} strokeWidth="0.8" />
        <rect x="8" y="8" width={cardW} height={cardH} rx="0.5" stroke={strokeColor} strokeWidth="0.6" />
        <rect x="43" y="8" width={cardW} height={cardH} rx="0.5" stroke={strokeColor} strokeWidth="0.6" />
        <rect x="25.5" y="14" width={cardW} height={cardH} rx="0.5" stroke={strokeColor} strokeWidth="0.8" />
        <circle cx="30" cy="15" r="1" stroke={strokeColor} strokeWidth="0.5" strokeDasharray="1,1" />
      </svg>
    );
  }
};

function AppContent() {
  const { controlMode, setControlMode, cameraStatus } = useGestureContext();
  const [step, setStep] = useState<number>(1);
  const [question, setQuestion] = useState<string>('');
  const [analysis, setAnalysis] = useState<QuestionAnalysis | null>(null);
  const [selectedMode, setSelectedMode] = useState<SpreadMode | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean>(false);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [interpretation, setInterpretation] = useState<DeepInterpretation | null>(null);
  
  // State for archives
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<{ en: string; zh: string }>({ en: '', zh: '' });

  // Play celestial ambient chime for feedback
  const playChime = (type: 'draw' | 'reveal' | 'success' | 'ritual') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      if (type === 'draw') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else if (type === 'reveal') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.6);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.3); // G5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.8);
      } else if (type === 'ritual') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
        osc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 1.2); // Low A2
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
      }
    } catch (e) {
      // Audio context might be blocked by browser autoplay rules
    }
  };

  // Shared safe question submission and analysis with robust local fallback
  const safeSubmitQuestion = async () => {
    if (loading || !question.trim()) return;

    setLoading(true);
    setLoadingMessage({
      en: 'Peering into the mirrors of eternity... reading current frequencies...',
      zh: '正在拨开迷雾，窥探命运镜像中的潜意识涟漪...'
    });
    playChime('reveal');

    const navigateToModePage = (analysisData: QuestionAnalysis) => {
      setAnalysis(analysisData);
      const recMode = SPREAD_MODES.find(m => m.id === analysisData.recommendedMode) || SPREAD_MODES[0];
      setSelectedMode(recMode);
      setStep(3);
      playChime('success');
    };

    const getFallbackAnalysis = (): QuestionAnalysis => {
      const qLower = question.toLowerCase();
      let questionType = 'General Self-Reflective';
      let questionTypeZh = '综合自我探索';
      let emotionalSignal = 'Searching for Clarity';
      let emotionalSignalZh = '探求清晰感';
      let recommendedMode: 'daily' | 'problem' | 'timeline' | 'relationship' | 'celtic' = 'daily';
      let interpretationTone = 'Philosophical & Objective';
      let interpretationToneZh = '哲思与客观';

      if (qLower.includes('love') || qLower.includes('relationship') || qLower.includes('partner') || qLower.includes('marry') || qLower.includes('爱') || qLower.includes('情') || qLower.includes('伴侣') || qLower.includes('结婚')) {
        questionType = 'Love & Relationships';
        questionTypeZh = '情感与亲密关系';
        emotionalSignal = 'Confused or Yearning';
        emotionalSignalZh = '迷茫与期盼';
        recommendedMode = 'relationship';
        interpretationTone = 'Compassionate & Warm';
        interpretationToneZh = '温暖与疗愈';
      } else if (qLower.includes('job') || qLower.includes('career') || qLower.includes('work') || qLower.includes('money') || qLower.includes('business') || qLower.includes('工作') || qLower.includes('事业') || qLower.includes('财') || qLower.includes('项目')) {
        questionType = 'Career & Abundance';
        questionTypeZh = '事业与财富显化';
        emotionalSignal = 'Anxious or Driven';
        emotionalSignalZh = '焦虑或渴望掌控';
        recommendedMode = 'problem';
        interpretationTone = 'Direct & Insightful';
        interpretationToneZh = '犀利与透彻';
      } else if (qLower.includes('future') || qLower.includes('plan') || qLower.includes('what to do') || qLower.includes('未来') || qLower.includes('打算') || qLower.includes('选择') || qLower.includes('选')) {
        questionType = 'Life Direction & Path';
        questionTypeZh = '人生方向与抉择';
        emotionalSignal = 'Indecisive or Uncertain';
        emotionalSignalZh = '徘徊与不确定';
        recommendedMode = 'timeline';
        interpretationTone = 'Philosophical & Objective';
        interpretationToneZh = '哲思与客观';
      }

      return {
        questionType,
        questionTypeZh,
        emotionalSignal,
        emotionalSignalZh,
        recommendedMode,
        interpretationTone,
        interpretationToneZh
      };
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('/api/analyze-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid analysis data returned from server');
      }

      navigateToModePage(data);
    } catch (err: any) {
      console.warn('AI analysis unavailable, using local high-fidelity fallback analysis. Detail:', err?.message || err);
      const fallback = getFallbackAnalysis();
      navigateToModePage(fallback);
    } finally {
      setLoading(false);
    }
  };

  // Global Gesture Controller for step 1, 2, 3, 6, 7 page actions
  useGlobalGestureControl({
    onOpenPalm: () => {
      if (controlMode !== 'gesture') return;
      if (step === 1) {
        setStep(2);
        playChime('draw');
      } else if (step === 2) {
        // Focus question input field
        const el = document.getElementById('user-inquiry-input');
        if (el) {
          (el as HTMLTextAreaElement).focus();
        }
      }
    },
    onPinch: () => {
      if (controlMode !== 'gesture') return;
      if (step === 1) {
        setStep(2);
        playChime('draw');
      } else if (step === 2) {
        if (question.trim()) {
          safeSubmitQuestion();
        }
      } else if (step === 3) {
        if (selectedMode) {
          setStep(4);
          playChime('reveal');
        }
      }
    },
    onLeft: () => {
      if (controlMode !== 'gesture') return;
      if (step === 3) {
        setSelectedMode((prev) => {
          const currentIdx = SPREAD_MODES.findIndex(m => m.id === prev?.id);
          const nextIdx = currentIdx <= 0 ? SPREAD_MODES.length - 1 : currentIdx - 1;
          playChime('draw');
          return SPREAD_MODES[nextIdx];
        });
      }
    },
    onRight: () => {
      if (controlMode !== 'gesture') return;
      if (step === 3) {
        setSelectedMode((prev) => {
          const currentIdx = SPREAD_MODES.findIndex(m => m.id === prev?.id);
          const nextIdx = currentIdx === -1 || currentIdx === SPREAD_MODES.length - 1 ? 0 : currentIdx + 1;
          playChime('draw');
          return SPREAD_MODES[nextIdx];
        });
      }
    }
  }, [step, question, selectedMode, controlMode, loading]);

  // Perform full tarot reading interpretation via Gemini with client-side fallback
  const handleInterpretReading = async () => {
    if (loading) return;
    setLoading(true);
    setLoadingMessage({
      en: 'Translating energetic alignments into cosmic advice... aligning bilingual streams...',
      zh: '命运之轮正在对齐，双语奥秘引擎正在以你之求问，重塑宿命镜像...'
    });
    playChime('ritual');

    const getFallbackInterpretation = (): DeepInterpretation => {
      const mode = selectedMode || SPREAD_MODES[0];
      const cardReadings = drawnCards.map((dc, index) => {
        const card = TAROT_DATABASE.find(c => c.id === dc.card.id) || dc.card;
        const pos = mode.positions[index] || { name: 'Position', nameZh: '位置', meaning: 'General aspect', meaningZh: '综合维度' };
        
        const keywordStr = card.keywords.join(', ');
        const keywordStrZh = card.keywordsZh.join('、');
        const orientation = dc.isReversed ? 'Reversed (逆位)' : 'Upright (正位)';
        const orientationZh = dc.isReversed ? '【逆位】' : '【正位】';
        
        const meaning = dc.isReversed ? card.reversed : card.upright;
        const meaningZh = dc.isReversed ? card.reversedZh : card.uprightZh;

        const interpretation = `In the position of "${pos.name}" (${pos.meaning}), you have drawn ${card.name} in the ${orientation} stance. Keywords: [${keywordStr}]. This indicates: ${meaning} Furthermore, regarding your question, this suggests you must look inward. ${card.emotionalMeaning}`;
        const interpretationZh = `在【${pos.nameZh}】（代表 ${pos.meaningZh}）的位置上，你抽到了${card.nameZh}的${orientationZh}。核心牌意为：[${keywordStrZh}]。这象征着：${meaningZh} 在对待你提问的这桩心事上，这张牌在悄然提示你：${card.emotionalMeaningZh}`;

        return {
          cardId: card.id,
          interpretation,
          interpretationZh
        };
      });

      const cardNames = drawnCards.map(dc => {
        const card = TAROT_DATABASE.find(c => c.id === dc.card.id) || dc.card;
        return `${card.nameZh} (${dc.isReversed ? '逆位' : '正位'})`;
      }).join(' ➔ ');

      return {
        summary: `The mirror reflects a tapestry of shifting energies concerning "${question}". Your spread [${mode.name}] highlights a crucial transition. The tension reveals that answers lie not in external events, but in aligning your subconscious intentions with conscious action.`,
        summaryZh: `针对你的求问“${question}”，命运之镜映照出了一幅交织流动的能量图卷。你所启用的【${mode.nameZh}】牌阵展现了当前局势的幽微脉络（${cardNames}）。其深层张力表明：你所探寻的答案并非悬于外界的偶然，而取决于你如何将潜意识的内在阴影与显意识的踏实行动相统一。`,
        cardReadings,
        emotionalPattern: `You are showing a state of "${analysis?.emotionalSignal || 'Searching'}". The cards indicate an underlying pattern of seeking external validation while neglecting intuitive self-honesty.`,
        emotionalPatternZh: `你当前流露出“${analysis?.emotionalSignalZh || '探求'}”的心灵频率。镜像牌阵揭示了你内心深处某种长久的认知模式：习惯于向外寻找印证和安全的锚点，却在不经意间忽视了对自身直觉的深度诚实。`,
        actionGuidance: `Based on the final guidance of this reading, you are advised to pause, establish structural boundaries, and act on the wisdom of the drawn advice. Avoid impulsive moves.`,
        actionGuidanceZh: `综合本次镜像的终极启示，建议你在接下来的周期里：放慢呼吸，确立现实的心理或物理边界；遵照牌面所给的指引，将灵感化为具体的微小行动。避免意气用事或仓促做出不理智的决断。`,
        reflectionPrompt: `What is the shadow belief you are holding on to that prevents you from surrendering to this natural rebirth?`,
        reflectionPromptZh: `在阻碍你顺应当前的蜕变与新生前，你内心深处究竟死死抓着一个怎样不切实际的“幻象信念”不愿放手？`
      };
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 seconds timeout

      const response = await fetch('/api/interpret-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          modeId: selectedMode?.id,
          drawnCards: drawnCards.map(dc => ({ cardId: dc.card.id, isReversed: dc.isReversed })),
          analysis
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid interpretation data returned from server');
      }
      
      setInterpretation(data);
      setStep(6);
      setIsSaved(false); // Reset saved state for new reading
      playChime('success');
    } catch (err: any) {
      console.warn('AI reading interpretation unavailable, using local high-fidelity fallback advice. Detail:', err?.message || err);
      const fallback = getFallbackInterpretation();
      setInterpretation(fallback);
      setStep(6);
      setIsSaved(false);
      playChime('success');
    } finally {
      setLoading(false);
    }
  };

  // Save current completed session to local storage archive
  const handleSaveToArchive = () => {
    if (!interpretation || !selectedMode) return;
    
    const newSession: ReadingSession = {
      id: Math.random().toString(36).substring(2, 9) + '_' + Date.now(),
      timestamp: new Date().toISOString(),
      question,
      analysis: analysis || {
        questionType: 'General / 综合自我探索',
        questionTypeZh: '综合自我探索',
        emotionalSignal: 'Curious / 好奇',
        emotionalSignalZh: '好奇',
        recommendedMode: selectedMode.id,
        interpretationTone: 'Philosophical / 哲思',
        interpretationToneZh: '哲思'
      },
      mode: selectedMode,
      drawnCards,
      interpretation
    };

    // Load existing sessions
    const existing = localStorage.getItem('fate_mirror_readings');
    let list: ReadingSession[] = [];
    if (existing) {
      try {
        list = JSON.parse(existing);
      } catch (e) {
        // ignore
      }
    }

    list.unshift(newSession); // add most recent to top
    localStorage.setItem('fate_mirror_readings', JSON.stringify(list));
    setIsSaved(true);
    playChime('success');
  };

  // Open historical session in the main interpretation screen
  const handleViewHistoricalSession = (session: ReadingSession) => {
    setQuestion(session.question);
    setSelectedMode(session.mode);
    setDrawnCards(session.drawnCards);
    setInterpretation(session.interpretation);
    setAnalysis(session.analysis);
    setIsSaved(true); // already in storage
    setStep(6); // directly open interpretation view
    playChime('reveal');
  };

  const handleRestart = () => {
    setStep(1);
    setQuestion('');
    setAnalysis(null);
    setSelectedMode(null);
    setDrawnCards([]);
    setInterpretation(null);
    setIsSaved(false);
  };

  return (
    <div className="min-h-screen bg-[#121110] paper-texture flex flex-col justify-between selection:bg-[#5f1f2a] selection:text-[#f5f2eb] relative overflow-x-hidden">
      <CosmicBackground step={step} />
      
      {/* Global Immersive Navigation Bar */}
      <header className="w-full border-b border-[#c5a059]/15 py-4 px-6 md:px-12 flex justify-between items-center bg-[#121110]/95 backdrop-blur-md sticky top-0 z-50">
        {/* Brand Bilingual Emblem */}
        <div 
          onClick={handleRestart}
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full border border-[#c5a059] flex items-center justify-center relative bg-gradient-to-br from-[#1c1a19] to-[#121110]">
            <span className="text-[10px] font-serif font-medium text-[#c5a059] animate-pulse">镜</span>
            <div className="absolute inset-0 rounded-full border border-dashed border-[#c5a059]/20 animate-spin" style={{ animationDuration: '40s' }} />
          </div>
          <div className="text-left">
            <h1 className="font-serif font-medium text-sm md:text-base tracking-[0.15em] text-[#f5f2eb] uppercase">
              Fate Mirror
            </h1>
            <p className="text-[9px] font-mono tracking-wider text-[#c5a059] uppercase leading-none">
              命运镜像
            </p>
          </div>
        </div>

        {/* Dynamic step tracker (Only shown during active sessions) */}
        {step > 1 && step < 7 && (
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-neutral-500">
            <span className={step === 2 ? 'text-[#c5a059]' : ''}>1. Ask 提问</span>
            <span>➔</span>
            <span className={step === 3 ? 'text-[#c5a059]' : ''}>2. Mode 牌阵</span>
            <span>➔</span>
            <span className={step === 4 ? 'text-[#c5a059]' : ''}>3. Sense 感知</span>
            <span>➔</span>
            <span className={step === 5 ? 'text-[#c5a059]' : ''}>4. Draw 抽牌</span>
            <span>➔</span>
            <span className={step === 6 ? 'text-[#c5a059]' : ''}>5. Read 解读</span>
          </div>
        )}

        {/* Global Controls */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 border border-[#c5a059]/20 hover:border-[#c5a059]/60 hover:bg-[#161514] text-[#c5a059]/80 hover:text-[#c5a059] transition-all rounded-[2px]"
            title={soundEnabled ? 'Mute Celestial Sounds' : 'Unmute Celestial Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Quick Access to Archive */}
          <button
            id="view-archives-nav-btn"
            onClick={() => setStep(7)}
            className={`px-3 py-1.5 border flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 rounded-[2px] ${
              step === 7 
                ? 'bg-[#5f1f2a] border-[#c5a059] text-[#f5f2eb]' 
                : 'bg-transparent border-[#c5a059]/30 hover:border-[#c5a059] text-[#c5a059] hover:text-[#f5f2eb]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            Archive / 归档
          </button>
        </div>
      </header>

      {/* Main Core Router Stage */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-center py-8 px-4 md:px-8">
        
        {loading ? (
          /* High-fidelity ritual loading screen */
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8 text-center animate-pulse">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#c5a059]/20 animate-spin" style={{ animationDuration: '6s' }} />
              <div className="absolute inset-3 rounded-full border border-dashed border-[#c5a059]/40 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
              <Compass className="w-10 h-10 text-[#c5a059] animate-pulse" />
            </div>
            <div className="space-y-2 max-w-lg">
              <h3 className="font-serif text-lg md:text-xl text-ivory tracking-wide">
                {loadingMessage.zh}
              </h3>
              <p className="text-xs text-neutral-400 font-sans font-light italic">
                {loadingMessage.en}
              </p>
            </div>
          </div>
        ) : (
          /* Step router rendering */
          (() => {
            switch (step) {
              case 1:
                /* STEP 1: Home / Enter */
                return (
                  <div className="text-center max-w-2xl mx-auto space-y-12 py-8 relative z-10">
                    {/* Immersive centerpiece: Eclipse/Mirror composition */}
                    <div className="relative w-48 h-48 mx-auto flex items-center justify-center mb-4 select-none pointer-events-none">
                      {/* Outer concentric lines */}
                      <div className="absolute inset-0 rounded-full border border-[#c5a059]/15 animate-pulse" />
                      <div className="absolute inset-2 rounded-full border border-dashed border-[#c5a059]/10 animate-spin" style={{ animationDuration: '90s' }} />
                      <div className="absolute inset-8 rounded-full border border-double border-[#8c6a2c]/30" />
                      
                      {/* Golden solar eclipse corona aura */}
                      <div className="absolute w-28 h-28 rounded-full bg-gradient-to-br from-[#c5a059]/10 to-transparent blur-md animate-pulse" style={{ animationDuration: '4s' }} />
                      
                      {/* Main obsidian mirror plate with gold hairline rim */}
                      <div className="absolute w-28 h-28 rounded-full bg-[#161514] border-2 border-[#c5a059]/40 shadow-[0_12px_36px_rgba(0,0,0,0.9)] flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border border-[#c5a059]/10 flex items-center justify-center">
                          {/* Inner double circular engraving */}
                          <div className="w-20 h-20 rounded-full border border-dashed border-[#8c6a2c]/20" />
                        </div>
                      </div>

                      {/* Mystic vertical/horizontal axis lines */}
                      <div className="absolute h-48 w-[1px] bg-gradient-to-b from-transparent via-[#c5a059]/35 to-transparent" />
                      <div className="absolute w-48 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/35 to-transparent" />
                    </div>

                    <div className="space-y-4">
                      {/* Floating glowing foil ornament */}
                      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto" />
                      <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#c5a059] animate-pulse">
                        Sequential Tarot Self-Analysis / 秩序之境 • 塔罗自省仪式
                      </div>
                      
                      <h1 className="font-serif font-light text-4xl sm:text-6xl tracking-[0.1em] text-[#f5f2eb] select-none leading-none pt-2">
                        FATE MIRROR
                      </h1>
                      <h2 className="font-serif font-light text-xl sm:text-2xl text-[#c5a059]/90 tracking-[0.2em] select-none">
                        命运镜像
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm font-sans font-light text-[#f5f2eb]/70 leading-relaxed max-w-lg mx-auto px-4">
                      Fate Mirror is not a cheap game of predictions. It is an immersive editorial self-interrogation ritual. By mapping your subconscious through structural tarot archetypes, you align the mirror within to reveal clear, actionable pathways through chaos.
                    </p>
                    <p className="text-xs font-sans font-light text-[#c5a059]/70 italic leading-relaxed max-w-md mx-auto px-4">
                      命运之镜并非市井占卜，而是一场旨在探索潜意识深渊的镜像对话。借助塔罗象征物，梳理情绪之网，将内心困局与外在秩序契合对齐。
                    </p>
 
                    {/* Interaction Mode Selection */}
                    <div className="max-w-md mx-auto space-y-4 pt-4 select-none">
                      <div className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#c5a059]/80">
                        Choose Interaction Mode / 选择智能交互方式：
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {/* Option 1: Mouse/Trackpad Mode */}
                        <button
                          onClick={() => {
                            setControlMode('mouse');
                            playChime('draw');
                          }}
                          className={`p-4 rounded-[2px] border transition-all duration-300 flex flex-col items-center justify-center gap-1.5 relative w-full ${
                            controlMode === 'mouse'
                              ? 'bg-[#5f1f2a]/20 border-[#c5a059] shadow-[0_4px_12px_rgba(197,160,89,0.1)]'
                              : 'bg-[#161514]/60 border-[#c5a059]/15 hover:border-[#c5a059]/40 hover:bg-[#1a1918]'
                          }`}
                        >
                          <span className={`text-[11px] font-serif uppercase tracking-wider font-medium ${controlMode === 'mouse' ? 'text-ivory' : 'text-[#f5f2eb]/60'}`}>
                            Mouse Mode / 鼠标操控
                          </span>
                          <span className="text-[9px] text-[#c5a059]/70 font-mono text-center leading-tight">
                            Pointer, drag, & click controls
                          </span>
                          {controlMode === 'mouse' && (
                            <div className="absolute inset-0.5 border border-[#c5a059]/20 pointer-events-none rounded-[1px]" />
                          )}
                        </button>

                        {/* Option 2: Gesture Mode */}
                        <button
                          onClick={() => {
                            setControlMode('gesture');
                            playChime('draw');
                          }}
                          className={`p-4 rounded-[2px] border transition-all duration-300 flex flex-col items-center justify-center gap-1.5 relative w-full ${
                            controlMode === 'gesture'
                              ? 'bg-[#5f1f2a]/20 border-[#c5a059] shadow-[0_4px_12px_rgba(197,160,89,0.1)]'
                              : 'bg-[#161514]/60 border-[#c5a059]/15 hover:border-[#c5a059]/40 hover:bg-[#1a1918]'
                          }`}
                        >
                          <span className={`text-[11px] font-serif uppercase tracking-wider font-medium ${controlMode === 'gesture' ? 'text-ivory' : 'text-[#f5f2eb]/60'}`}>
                            Gesture Mode / 手势操控
                          </span>
                          <span className="text-[9px] text-[#c5a059]/70 font-mono text-center leading-tight">
                            Requires webcam spatial sensing
                          </span>
                          {controlMode === 'gesture' && (
                            <div className="absolute inset-0.5 border border-[#c5a059]/20 pointer-events-none rounded-[1px]" />
                          )}
                        </button>
                      </div>

                      {/* Dynamic status helper for selected mode */}
                      <div className="text-[10px] font-mono min-h-[16px] flex items-center justify-center">
                        {controlMode === 'gesture' ? (
                          cameraStatus === 'initializing' ? (
                            <span className="text-amber-400 animate-pulse">Initializing webcam sensor... / 正在启动手势传感器...</span>
                          ) : cameraStatus === 'active' ? (
                            <span className="text-emerald-500">Camera ready / 摄像头已准备就绪</span>
                          ) : cameraStatus === 'denied' || cameraStatus === 'error' ? (
                            <span className="text-rose-400">Webcam blocked. Mouse mode automatically activated. / 摄像头不可用，已切换鼠标模式</span>
                          ) : (
                            <span className="text-amber-300/80 animate-pulse">Awaiting camera permission... / 等待获取摄像头授权...</span>
                          )
                        ) : (
                          <span className="text-neutral-500">Traditional cursor and click navigation active / 传统鼠标与点击交互已就绪</span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        id="open-palm-start-btn"
                        onClick={() => {
                          setStep(2);
                          playChime('draw');
                        }}
                        className="group relative px-10 py-4 overflow-hidden border border-[#c5a059] bg-[#161514] text-[#c5a059] hover:text-[#f5f2eb] font-serif tracking-[0.25em] text-xs uppercase transition-all duration-700 hover:scale-105 rounded-[1px] shadow-[0_12px_28px_rgba(0,0,0,0.8)]"
                      >
                        {/* Shimmer line inside */}
                        <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-[#f5f2eb]/10 to-transparent skew-x-12 group-hover:left-[150%] transition-all duration-1000 ease-out" />
                        
                        <span className="relative z-10 flex items-center justify-center gap-2.5">
                          {controlMode === 'gesture' ? 'Open Palm to Start / 张掌启动' : 'Begin Ritual / 启动自省'}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#c5a059] group-hover:text-[#f5f2eb]" />
                        </span>
                        {/* Double inner line */}
                        <div className="absolute inset-0.5 border border-[#c5a059]/15 group-hover:border-[#c5a059]/40 transition-colors" />
                      </button>
                    </div>

                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto pt-4" />
                  </div>
                );

              case 2:
                /* STEP 2: Ask / 提问 */
                return (
                  <div className="max-w-xl mx-auto space-y-8 text-center py-8 px-6 bg-[#161514]/90 border-2 border-[#c5a059]/20 rounded-[4px] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden z-10">
                    {/* Double decorative thin border lines */}
                    <div className="absolute inset-1 border border-[#c5a059]/10 pointer-events-none rounded-[3px]" />
                    {/* Corner decorative marks */}
                    <div className="absolute top-2 left-2 text-[9px] text-[#c5a059]/40 pointer-events-none">⌜ 01 ⌝</div>
                    <div className="absolute top-2 right-2 text-[9px] text-[#c5a059]/40 pointer-events-none">⌞ TR ⌟</div>
                    
                    <div className="space-y-2.5 relative z-10">
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase">
                        <HelpCircle className="w-3.5 h-3.5" />
                        Phase One / 第一阶段：心念载入
                      </div>
                      <h2 className="font-serif text-2xl md:text-3xl font-light text-ivory tracking-wide leading-tight">
                        Inquire the Looking Glass
                      </h2>
                      <p className="text-[10px] font-mono text-[#c5a059]/80 tracking-widest uppercase">
                        凝视命运镜像 · 吐露内心真实困惑
                      </p>
                    </div>

                    <div className="space-y-3 text-left relative z-10">
                      <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059]/70">
                        Central Inquiry or Dilemma / 载入提问或现时困局：
                      </label>
                      
                      {/* Tactile editorial container with hairline guides */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#121110] rounded-[2px] pointer-events-none" />
                        <textarea
                          id="user-inquiry-input"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                              e.preventDefault();
                              safeSubmitQuestion();
                            }
                          }}
                          className="w-full p-5 bg-transparent border-2 border-[#c5a059]/15 focus:border-[#c5a059]/60 focus:outline-none rounded-[2px] text-sm md:text-base text-[#f5f2eb] placeholder-neutral-600 font-sans font-light leading-relaxed min-h-[150px] relative z-10 transition-all focus:shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]"
                          placeholder="e.g. Will our relationship resolve this communication barrier, and what is our path? / 例如：我与伴侣该如何化解最近的沟通隔阂，未来的相处脉络在哪里？"
                        />
                        {/* Tiny corner crosshairs in textarea */}
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-[#c5a059]/20 pointer-events-none z-20" />
                        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-[#c5a059]/20 pointer-events-none z-20" />
                      </div>
                    </div>

                    <button
                      id="peer-mirror-btn"
                      onClick={safeSubmitQuestion}
                      disabled={loading || !question.trim()}
                      className="group relative w-full py-4 bg-[#5f1f2a]/90 hover:bg-[#5f1f2a] disabled:bg-[#1a1918] disabled:text-neutral-600 disabled:border-neutral-800 border-2 border-[#c5a059]/40 hover:border-[#c5a059] text-ivory font-serif tracking-[0.2em] text-xs transition-all duration-700 uppercase rounded-[2px] z-10 shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
                    >
                      <span className="relative z-10">Peer into Mirror / 凝视镜面，起卦 ➔</span>
                      {/* Double inner lines for premium aesthetic */}
                      <div className="absolute inset-0.5 border border-[#c5a059]/10 group-hover:border-[#c5a059]/30 transition-colors pointer-events-none" />
                    </button>
                  </div>
                );

              case 3:
                /* STEP 3: Mode / 牌阵展示与选择 */
                return (
                  <div className="max-w-4xl mx-auto space-y-10 text-center py-4 relative z-10">
                    <div className="space-y-2.5">
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.25em] text-[#c5a059] uppercase">
                        <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '40s' }} />
                        Phase Two / 第二阶段：牌阵 Resonance
                      </div>
                      <h2 className="font-serif text-2xl md:text-3xl font-light text-ivory tracking-wide">
                        Subconscious Resonance
                      </h2>
                      <p className="text-[10px] font-mono text-[#c5a059]/80 tracking-widest uppercase">
                        命运之镜已映射出你的潜意识频率
                      </p>
                    </div>

                    {/* Question analysis parameters display */}
                    {analysis && (
                      <div className="bg-[#161514]/90 p-6 rounded-[4px] border-2 border-[#c5a059]/20 text-left relative shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col gap-5">
                        {/* Double inner border lines */}
                        <div className="absolute inset-1 border border-[#c5a059]/5 pointer-events-none rounded-[2px]" />
                        
                        <div className="z-10 self-start">
                          <span className="inline-block px-2.5 py-1.5 bg-[#5f1f2a] border border-[#c5a059]/40 text-[11px] font-mono text-ivory tracking-normal uppercase rounded-[2px] shadow-sm max-w-fit whitespace-nowrap">
                            Insight Analysis / 洞察分析
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 z-10">
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono uppercase text-[#c5a059]/65 tracking-wider">Inquiry Type / 问题分类</span>
                            <h4 className="font-serif text-base text-ivory font-light">{analysis.questionTypeZh}</h4>
                            <p className="text-[10px] text-[#c5a059]/60 font-sans italic">{analysis.questionType}</p>
                          </div>

                          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-[#c5a059]/15 pt-4 sm:pt-0 sm:pl-6">
                            <span className="text-[10px] font-mono uppercase text-[#c5a059]/65 tracking-wider">Subconscious Signal / 潜意识情绪</span>
                            <h4 className="font-serif text-base text-ivory font-light">{analysis.emotionalSignalZh}</h4>
                            <p className="text-[10px] text-[#c5a059]/60 font-sans italic">{analysis.emotionalSignal}</p>
                          </div>

                          <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-[#c5a059]/15 pt-4 sm:pt-0 sm:pl-6">
                            <span className="text-[10px] font-mono uppercase text-[#c5a059]/65 tracking-wider">Interpretation Tone / 解读调性</span>
                            <h4 className="font-serif text-base text-ivory font-light">{analysis.interpretationToneZh}</h4>
                            <p className="text-[10px] text-[#c5a059]/60 font-sans italic">{analysis.interpretationTone}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Spread Mode Selection */}
                    <div className="space-y-4 text-left">
                      <h3 className="text-[10px] font-mono uppercase tracking-[0.20em] text-[#c5a059]/80 px-1">
                        Select Spread Mode / 选择启用的牌阵：
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                        {SPREAD_MODES.map((mode) => {
                          const isRecommended = analysis?.recommendedMode === mode.id;
                          const isSelected = selectedMode?.id === mode.id;

                          return (
                            <div
                              key={mode.id}
                              onClick={() => {
                                setSelectedMode(mode);
                                playChime('draw');
                              }}
                              className={`group p-3.5 bg-[#161514]/90 rounded-[4px] border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[230px] relative overflow-hidden ${
                                isSelected 
                                  ? 'border-[#c5a059] bg-[#5f1f2a]/10 shadow-[0_12px_28px_rgba(197,160,89,0.15)]' 
                                  : 'border-[#c5a059]/15 hover:border-[#c5a059]/40 hover:bg-[#1a1918]'
                              }`}
                            >
                              {/* Selection overlay border decoration */}
                              {isSelected && (
                                <div className="absolute inset-0.5 border border-[#c5a059]/20 pointer-events-none rounded-[2px]" />
                              )}
                              
                              <div className="space-y-3.5 z-10">
                                <div className="flex flex-wrap items-center justify-between gap-1.5">
                                  <span className="px-1.5 py-0.5 bg-[#121110] border border-[#c5a059]/20 text-[8px] sm:text-[9px] font-mono text-[#c5a059] uppercase tracking-wide rounded-[2px] whitespace-nowrap">
                                    {mode.cardCount} {mode.cardCount === 1 ? 'card' : 'cards'}
                                  </span>
                                  {isRecommended && (
                                    <span className="px-2 py-0.5 bg-[#5f1f2a] border border-[#c5a059]/30 text-[8.5px] font-mono text-ivory tracking-wide uppercase rounded-[2px] whitespace-nowrap font-medium shadow-sm">
                                      Rec / 推荐
                                    </span>
                                  )}
                                </div>
                                
                                <div className="space-y-1">
                                  <h4 className="font-serif text-xs sm:text-sm font-medium text-neutral-100 leading-snug">
                                    {mode.nameZh}
                                  </h4>
                                  <p className="text-[8.5px] sm:text-[9px] text-[#c5a059]/80 uppercase font-mono leading-tight tracking-wider break-words whitespace-normal">
                                    {mode.name}
                                  </p>
                                </div>
                              </div>

                              {/* Miniature Wireframe Spread Diagram */}
                              <div className="my-2.5 flex justify-center py-1.5 border-y border-[#c5a059]/5 z-10">
                                {renderMiniatureDiagram(mode.cardCount)}
                              </div>

                              <p className="text-[10px] sm:text-[10.5px] text-neutral-400 font-sans leading-relaxed line-clamp-3 z-10">
                                {mode.descriptionZh}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      id="proceed-sensing-btn"
                      onClick={() => {
                        if (controlMode === 'mouse') {
                          setHasCamera(false);
                          setStep(5);
                          playChime('success');
                        } else {
                          setStep(4);
                          playChime('reveal');
                        }
                      }}
                      className="group relative w-full py-4 bg-[#5f1f2a]/90 hover:bg-[#5f1f2a] border-2 border-[#c5a059]/40 hover:border-[#c5a059] text-ivory font-serif tracking-[0.25em] text-xs transition-all duration-700 uppercase rounded-[2px] shadow-[0_12px_28px_rgba(0,0,0,0.8)]"
                    >
                      <span className="relative z-10">
                        {controlMode === 'mouse' 
                          ? 'Enter Shuffling Ritual / 进入洗牌仪式 ➔' 
                          : 'Calibrate Space Sensing / 进入手势校准 ➔'}
                      </span>
                      {/* Double inner lines */}
                      <div className="absolute inset-0.5 border border-[#c5a059]/10 group-hover:border-[#c5a059]/30 transition-colors pointer-events-none" />
                    </button>
                  </div>
                );

              case 4:
                /* STEP 4: Sense / 感知 calibration screen */
                return (
                  <SensingScreen 
                    onCalibrationComplete={(calibratedCamera) => {
                      setHasCamera(calibratedCamera);
                      setStep(5);
                      playChime('success');
                    }}
                  />
                );

              case 5:
                /* STEP 5: Shuffle & Draw orbital carousel */
                return (
                  <OrbitalCarousel
                    mode={selectedMode || SPREAD_MODES[0]}
                    onSelectionComplete={(drawn) => {
                      setDrawnCards(drawn);
                      handleInterpretReading();
                    }}
                    gestureEnabled={hasCamera}
                  />
                );

              case 6:
                /* STEP 6: Interpret / 深度解读 screen */
                return (
                  <DeepInterpretationScreen
                    question={question}
                    mode={selectedMode || SPREAD_MODES[0]}
                    drawnCards={drawnCards}
                    interpretation={interpretation || {
                      summary: '',
                      summaryZh: '',
                      cardReadings: [],
                      emotionalPattern: '',
                      emotionalPatternZh: '',
                      actionGuidance: '',
                      actionGuidanceZh: '',
                      reflectionPrompt: '',
                      reflectionPromptZh: ''
                    }}
                    onRestart={handleRestart}
                    onSaveToArchive={handleSaveToArchive}
                    isSaved={isSaved}
                  />
                );

              case 7:
                /* STEP 7: Archive / 归档 database */
                return (
                  <ArchiveScreen
                    onRestart={handleRestart}
                    onSelectHistoricalSession={handleViewHistoricalSession}
                  />
                );

              default:
                return null;
            }
          })()
        )}

      </main>

      <GestureStatusHUD step={step} />

      {/* Luxury Editorial Footer */}
      <footer className="w-full border-t border-[#c5a059]/10 py-6 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 bg-[#121110] relative z-40">
        <div className="flex gap-4">
          <span>Fate Mirror / 命运镜像 © 2026</span>
          <span className="hidden md:inline">|</span>
          <span className="hidden md:inline">Bilingual Tarot Self-Analysis Ritual</span>
        </div>
        
        <div className="flex items-center gap-2 mt-3 md:mt-0 text-[9px] text-[#c5a059]/60">
          <Info className="w-3.5 h-3.5" />
          <span>FWA / Awwwards Editorial Artistry Style</span>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <GestureProvider>
      <AppContent />
    </GestureProvider>
  );
}
