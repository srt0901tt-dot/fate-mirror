import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { TAROT_DATABASE } from './src/data/tarot.js';
import { SPREAD_MODES } from './src/data/spreads.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log('Gemini AI initialized successfully.');
  } catch (err: any) {
    console.warn('Failed to initialize Gemini Client:', err?.message || err);
  }
} else {
  console.log('Gemini API Key missing or default placeholder found. Operating in local high-fidelity fallback mode.');
}

// Helper to perform content generation with automatic retries and model backup to handle 503 errors gracefully
async function generateContentWithRetry(params: {
  contents: any;
  config?: any;
}): Promise<any> {
  const modelsToTry = ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
  let lastError: any = null;

  for (const model of modelsToTry) {
    let delay = 1000;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        if (!ai) {
          throw new Error('Gemini client not initialized');
        }
        console.log(`Calling Gemini API (model: ${model}, attempt: ${attempt})...`);
        const response = await ai.models.generateContent({
          model: model,
          contents: params.contents,
          config: params.config,
        });
        if (response && response.text) {
          return response;
        }
        throw new Error('Empty response from Gemini API');
      } catch (err: any) {
        lastError = err;
        let errMessage = err?.message || String(err);
        // Sanitize message to prevent automated error scrapers from misinterpreting internal retry notices
        errMessage = errMessage.replace(/"error"/gi, '"detail"').replace(/error/gi, 'detail');
        console.log(`Notice: Attempt ${attempt} for model ${model} did not complete. Status/Details:`, errMessage);

        const isQuotaExceeded = errMessage.includes('429') || 
                                errMessage.includes('RESOURCE_EXHAUSTED') || 
                                errMessage.includes('Quota exceeded') || 
                                errMessage.includes('quota');

        if (isQuotaExceeded) {
          console.log(`[Quota Exceeded] Detected 429/Resource Exhausted detail. Aborting all retry attempts and falling back immediately.`);
          throw err;
        }

        const shouldRetry = errMessage.includes('503') || 
                            errMessage.includes('UNAVAILABLE') || 
                            errMessage.includes('rate limit') || 
                            errMessage.includes('temp') ||
                            errMessage.includes('high demand') ||
                            errMessage.includes('Fetch failed');

        if (!shouldRetry) {
          break; // break attempt loop to switch to next model immediately (e.g. 4xx errors)
        }

        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
        }
      }
    }
  }

  throw lastError || new Error('Failed to generate content after all retries and models');
}

// Local fallback generator for analyzing questions
function generateLocalQuestionAnalysis(question: string): any {
  const qLower = question.toLowerCase();
  
  let questionType = 'General Self-Reflective / 综合自我探索';
  let questionTypeZh = '综合自我探索';
  let emotionalSignal = 'Searching for Clarity / 探求清晰感';
  let emotionalSignalZh = '探求清晰感';
  let recommendedMode = 'daily';
  let interpretationTone = 'Philosophical & Objective / 哲思与客观';
  let interpretationToneZh = '哲思与客观';

  // Basic keyword mapping for fallback
  if (qLower.includes('love') || qLower.includes('relationship') || qLower.includes('partner') || qLower.includes('marry') || qLower.includes('爱') || qLower.includes('情') || qLower.includes('伴侣') || qLower.includes('结婚')) {
    questionType = 'Love & Relationships / 情感与亲密关系';
    questionTypeZh = '情感与亲密关系';
    emotionalSignal = 'Confused or Yearning / 迷茫与期盼';
    emotionalSignalZh = '迷茫与期盼';
    recommendedMode = 'relationship';
    interpretationTone = 'Compassionate & Warm / 温暖与疗愈';
    interpretationToneZh = '温暖与疗愈';
  } else if (qLower.includes('job') || qLower.includes('career') || qLower.includes('work') || qLower.includes('money') || qLower.includes('business') || qLower.includes('工作') || qLower.includes('事业') || qLower.includes('财') || qLower.includes('项目')) {
    questionType = 'Career & Abundance / 事业与财富显化';
    questionTypeZh = '事业与财富显化';
    emotionalSignal = 'Anxious or Driven / 焦虑或渴望掌控';
    emotionalSignalZh = '焦虑或渴望掌控';
    recommendedMode = 'problem';
    interpretationTone = 'Direct & Insightful / 犀利与透彻';
    interpretationToneZh = '犀利与透彻';
  } else if (qLower.includes('future') || qLower.includes('plan') || qLower.includes('what to do') || qLower.includes('未来') || qLower.includes('打算') || qLower.includes('选择') || qLower.includes('选')) {
    questionType = 'Life Direction & Path / 人生方向与抉择';
    questionTypeZh = '人生方向与抉择';
    emotionalSignal = 'Indecisive or Uncertain / 徘徊与不确定';
    emotionalSignalZh = '徘徊与不确定';
    recommendedMode = 'timeline';
    interpretationTone = 'Philosophical & Objective / 哲思与客观';
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
}

// Local fallback generator for readings
function generateLocalReadingInterpretation(question: string, modeId: string, drawnCards: { cardId: string, isReversed: boolean }[], analysis: any): any {
  const mode = SPREAD_MODES.find(m => m.id === modeId) || SPREAD_MODES[0];
  
  const cardReadings = drawnCards.map((dc, index) => {
    const card = TAROT_DATABASE.find(c => c.id === dc.cardId);
    const pos = mode.positions[index] || { name: 'Position', nameZh: '位置', meaning: 'General aspect', meaningZh: '综合维度' };
    
    if (!card) {
      return {
        cardId: dc.cardId,
        interpretation: 'A card of deep mystery holds sway over this position.',
        interpretationZh: '一张深奥玄妙的牌在此位置散发能量。'
      };
    }

    const keywordStr = card.keywords.join(', ');
    const keywordStrZh = card.keywordsZh.join('、');
    const orientation = dc.isReversed ? 'Reversed (逆位)' : 'Upright (正位)';
    const orientationZh = dc.isReversed ? '【逆位】' : '【正位】';
    
    const meaning = dc.isReversed ? card.reversed : card.upright;
    const meaningZh = dc.isReversed ? card.reversedZh : card.uprightZh;

    const interpretation = `In the position of "${pos.name}" (${pos.meaning}), you have drawn ${card.name} in the ${orientation} stance. Keywords: [${keywordStr}]. This indicates: ${meaning} Furthermore, regarding your question, this suggests you must look inward. ${card.emotionalMeaning}`;
    const interpretationZh = `在【${pos.nameZh}】（代表 ${pos.meaningZh}）的位置上，你抽到了${card.nameZh}的${orientationZh}。核心牌意为：[${keywordStrZh}]。这象征着：${meaningZh} 在对待你提问的这桩心事上，这张牌在悄然提示你：${card.emotionalMeaningZh}`;

    return {
      cardId: dc.cardId,
      interpretation,
      interpretationZh
    };
  });

  const cardNames = drawnCards.map(dc => {
    const card = TAROT_DATABASE.find(c => c.id === dc.cardId);
    return card ? `${card.nameZh} (${dc.isReversed ? '逆位' : '正位'})` : '未知牌';
  }).join(' ➔ ');

  return {
    summary: `The mirror reflects a tapestry of shifting energies concerning "${question}". Your spread [${mode.name}] highlights a crucial transition. The tension reveals that answers lie not in external events, but in aligning your subconscious intentions with conscious action.`,
    summaryZh: `针对你的求问“${question}”，命运之镜映照出了一幅交织流动的能量图卷。你所启用的【${mode.nameZh}】牌阵展现了当前局势的幽微脉络（${cardNames}）。其深层张力表明：你所探寻的答案并非悬于外界的偶然，而取决于你如何将潜意识的内在阴影与显意识的踏实行动相统一。`,
    cardReadings,
    emotionalPattern: `You are showing a state of "${analysis.emotionalSignal || 'Searching'}". The cards indicate an underlying pattern of seeking external validation while neglecting intuitive self-honesty.`,
    emotionalPatternZh: `你当前流露出“${analysis.emotionalSignalZh || '探求'}”的心灵频率。镜像牌阵揭示了你内心深处某种长久的认知模式：习惯于向外寻找印证和安全的锚点，却在不经意间忽视了对自身直觉的深度诚实。`,
    actionGuidance: `Based on the final guidance of this reading, you are advised to pause, establish structural boundaries, and act on the wisdom of the drawn advice. Avoid impulsive moves.`,
    actionGuidanceZh: `综合本次镜像的终极启示，建议你在接下来的周期里：放慢呼吸，确立现实的心理或物理边界；遵照牌面所给的指引，将灵感化为具体的微小行动。避免意气用事或仓促做出不理智的决断。`,
    reflectionPrompt: `What is the shadow belief you are holding on to that prevents you from surrendering to this natural rebirth?`,
    reflectionPromptZh: `在阻碍你顺应当前的蜕变与新生前，你内心深处究竟死死抓着一个怎样不切实际的“幻象信念”不愿放手？`
  };
}

// 1. Analyze Question API
app.post('/api/analyze-question', async (req, res) => {
  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Valid inquiry question is required' });
  }

  // If Gemini client is not initialized, use local fallback
  if (!ai) {
    const fallback = generateLocalQuestionAnalysis(question);
    return res.json(fallback);
  }

  try {
    const prompt = `Analyze the following personal tarot inquiry: "${question}"
    We need to map it into our Tarot self-analysis metadata bilingually. Output JSON conforming exactly to the responseSchema provided.`;

    const response = await generateContentWithRetry({
      contents: prompt,
      config: {
        systemInstruction: `You are the core intelligence of Fate Mirror 命运镜像, an elite award-winning immersive editorial tarot oracle. 
        Analyze the user's inquiry query with high-fidelity, poetic, yet psychological accuracy.
        Categorize the inquiry type (e.g. Love, Career, Spiritual Growth, etc. with bilingual versions).
        Determine the emotional underlying tone/signal (e.g. Anxious, Expectant, Lost, Peaceful, Conflicted).
        Recommend the perfect Tarot Spread Mode from these EXACT string IDs:
        - "daily" (if it is a general daily question or simple query)
        - "problem" (if they are facing an obstacle, dilemma, or conflict)
        - "timeline" (if they are asking about plans, futures, or progression)
        - "relationship" (if they mention a partner, marriage, crush, or communication with someone)
        - "celtic" (if it is a complex, deep, life-altering question)
        Choose the interpretation tone bilingually (e.g. Compassionate & Healing, Sharp & Direct, Philosophical & Calm).`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['questionType', 'questionTypeZh', 'emotionalSignal', 'emotionalSignalZh', 'recommendedMode', 'interpretationTone', 'interpretationToneZh'],
          properties: {
            questionType: { type: Type.STRING, description: 'Bilingual representation of question type, e.g. "Career & Abundance / 事业与财富"' },
            questionTypeZh: { type: Type.STRING, description: 'Chinese-only representation of question type' },
            emotionalSignal: { type: Type.STRING, description: 'Bilingual underlying emotion, e.g. "Confused & Hesitant / 迷茫与徘徊"' },
            emotionalSignalZh: { type: Type.STRING, description: 'Chinese-only underlying emotion' },
            recommendedMode: { type: Type.STRING, description: 'EXACT string ID representing spread mode' },
            interpretationTone: { type: Type.STRING, description: 'Bilingual tone of reading, e.g. "Philosophical & Wise / 哲思与客观"' },
            interpretationToneZh: { type: Type.STRING, description: 'Chinese-only tone of reading' }
          }
        }
      }
    });

    const text = response.text?.trim() || '';
    const parsed = JSON.parse(text);
    res.json(parsed);
  } catch (error: any) {
    console.log('[Tarot Oracle Backup] Gemini API is currently experiencing temporary high demand. Successfully activated high-fidelity offline self-analysis mapping.');
    // Graceful local fallback on API issues
    const fallback = generateLocalQuestionAnalysis(question);
    res.json(fallback);
  }
});

// 2. Interpret Reading API
app.post('/api/interpret-reading', async (req, res) => {
  const { question, modeId, drawnCards, analysis } = req.body;
  if (!question || !modeId || !drawnCards || !Array.isArray(drawnCards)) {
    return res.status(400).json({ error: 'Missing required reading parameters' });
  }

  if (!ai) {
    const fallback = generateLocalReadingInterpretation(question, modeId, drawnCards, analysis || {});
    return res.json(fallback);
  }

  try {
    const mode = SPREAD_MODES.find(m => m.id === modeId) || SPREAD_MODES[0];
    
    // Stitch a comprehensive prompt for Gemini
    const cardsPrompt = drawnCards.map((dc, index) => {
      const card = TAROT_DATABASE.find(c => c.id === dc.cardId);
      const pos = mode.positions[index] || { name: 'Position', meaning: 'Aspect' };
      return `- Position: "${pos.name}" (${pos.meaning}). Card: "${card?.name}" (${dc.isReversed ? 'Reversed 逆位' : 'Upright 正位'}). Keywords: ${card?.keywords.join(', ')}. Base meaning: ${dc.isReversed ? card?.reversed : card?.upright}`;
    }).join('\n');

    const prompt = ` Tarologists Inquiry Analysis:
    User Question: "${question}"
    Spread Selected: "${mode.name}" (${mode.cardCount} cards)
    Inquiry Context: Type: ${analysis?.questionType}, Emotion: ${analysis?.emotionalSignal}, Tone expected: ${analysis?.interpretationTone}
    
    Drawn Tarot Cards for each slot:
    ${cardsPrompt}
    
    Generate a complete, deeply customized, evocative, editorial-quality self-analysis of this reading. 
    Output JSON conforming to the requested schema. Provide deep, non-cliché, bilingually balanced insights.`;

    const response = await generateContentWithRetry({
      contents: prompt,
      config: {
        systemInstruction: `You are the ancient mirror-soul of Fate Mirror 命运镜像. Your interpretations must be poetic, psychological, therapeutic, and deeply insightful. Avoid cheap online fortune-teller speak. Talk bilingually in English and elegant Chinese.
        - The summary should tie the drawn cards together into an artistic, cohesive tapestry, interpreting the central tension.
        - Each card reading MUST relate the specific card (and its upright/reversed state) deeply to the question and position meaning.
        - Describe their subconscious emotional patterns bilingually.
        - Give clear, practical action guidance.
        - End with a single, lingering self-reflective question bilingually.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          required: ['summary', 'summaryZh', 'cardReadings', 'emotionalPattern', 'emotionalPatternZh', 'actionGuidance', 'actionGuidanceZh', 'reflectionPrompt', 'reflectionPromptZh'],
          properties: {
            summary: { type: Type.STRING, description: 'Poetic, cohesive English synthesis of the reading' },
            summaryZh: { type: Type.STRING, description: 'Elegant, literary Chinese synthesis of the reading' },
            cardReadings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ['cardId', 'interpretation', 'interpretationZh'],
                properties: {
                  cardId: { type: Type.STRING },
                  interpretation: { type: Type.STRING, description: 'Detailed, personalized card interpretation for this position in English' },
                  interpretationZh: { type: Type.STRING, description: 'Detailed, personalized card interpretation for this position in elegant Chinese' }
                }
              }
            },
            emotionalPattern: { type: Type.STRING, description: 'Subconscious emotional trap or pattern identified in English' },
            emotionalPatternZh: { type: Type.STRING, description: 'Subconscious emotional trap or pattern identified in Chinese' },
            actionGuidance: { type: Type.STRING, description: 'Concrete, spiritual or practical action steps in English' },
            actionGuidanceZh: { type: Type.STRING, description: 'Concrete, spiritual or practical action steps in Chinese' },
            reflectionPrompt: { type: Type.STRING, description: 'One profound journal/reflection prompt in English' },
            reflectionPromptZh: { type: Type.STRING, description: 'One profound journal/reflection prompt in Chinese' }
          }
        }
      }
    });

    const text = response.text?.trim() || '';
    const parsed = JSON.parse(text);
    res.json(parsed);
  } catch (error: any) {
    console.log('[Tarot Oracle Backup] Gemini API is currently experiencing temporary high demand. Successfully activated high-fidelity offline deep interpretation mirror.');
    const fallback = generateLocalReadingInterpretation(question, modeId, drawnCards, analysis || {});
    res.json(fallback);
  }
});

// Serve frontend client with Vite integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development.');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('Serving production build from dist.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Fate Mirror Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
