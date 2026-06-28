import { TarotCard } from '../types';

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 'major_0',
    name: 'The Fool',
    nameZh: '愚人',
    type: 'major',
    suit: 'none',
    value: 0,
    keywords: ['Beginnings', 'Innocence', 'Spontaneity', 'Free Spirit'],
    keywordsZh: ['起点', '纯真', '自发性', '自由灵魂'],
    upright: 'A new adventure is beginning. Trust the universe, take a leap of faith, and embrace the unknown with an open heart.',
    uprightZh: '一段全新的冒险即将开始。信任宇宙，勇敢一跃，以开放的心态拥抱未知。',
    reversed: 'Recklessness, risk-taking, holding back, or fear of starting. Be cautious not to leap blindly without checking the ledge.',
    reversedZh: '鲁莽、冒险、止步不前或害怕开始。小心不要在没有看清悬崖边缘时盲目跃下。',
    emotionalMeaning: 'An open-minded relationship, ready to try new things, or a carefree attitude towards emotional commitment.',
    emotionalMeaningZh: '一段开放且轻松的关系，愿意尝试新事物，或对待情感承诺持有一种无拘无束的态度。',
    actionAdvice: 'Step forward without fear, let go of past baggage, and allow spontaneity to guide your path.',
    actionAdviceZh: '无畏前行，放下过去的包袱，让自发与纯真指引你的道路。'
  },
  {
    id: 'major_1',
    name: 'The Magician',
    nameZh: '魔术师',
    type: 'major',
    suit: 'none',
    value: 1,
    keywords: ['Manifestation', 'Willpower', 'Resourcefulness', 'Creation'],
    keywordsZh: ['显化', '意志力', '资源丰富', '创造力'],
    upright: 'You possess all the tools and resources needed to manifest your dreams. Focus your intention and take action.',
    uprightZh: '你拥有显化梦想所需的一切工具与资源。专注你的意图，立即采取行动。',
    reversed: 'Illusion, deception, wasted talent, or manipulated intentions. Guard against using your power for manipulative gains.',
    reversedZh: '幻象、欺骗、才华浪费或心怀诡计。防范为了操纵他人而使用自己的力量。',
    emotionalMeaning: 'Highly charismatic partner, skillful communication, or a deep connection forged through shared visions.',
    emotionalMeaningZh: '极具个人魅力的伴侣，巧妙的心灵沟通，或者通过共同愿景铸就的深厚连结。',
    actionAdvice: 'Focus your mind, utilize the resources on your table, and manifest your desires through decisive action.',
    actionAdviceZh: '集中念头，整合眼前的所有资源，通过果断的手腕显化你的渴望。'
  },
  {
    id: 'major_2',
    name: 'The High Priestess',
    nameZh: '女祭司',
    type: 'major',
    suit: 'none',
    value: 2,
    keywords: ['Intuition', 'Sacred Knowledge', 'Divine Feminine', 'Subconscious'],
    keywordsZh: ['直觉', '奥秘知识', '神圣女性', '潜意识'],
    upright: 'Listen to your intuition and inner voice. The answers you seek lie within, waiting to be revealed in silence.',
    uprightZh: '倾听你的直觉与内心深处的呼唤。你所寻求的答案在静默中自现。',
    reversed: 'Secret motives, ignoring intuition, surface-level focus, or hidden enemies. Take time to quiet the mind.',
    reversedZh: '隐藏动机、忽视直觉、流于表面或暗藏危机。花时间静下心来，倾听内在声音。',
    emotionalMeaning: 'Platonic love, silent spiritual connection, or hidden feelings that are not yet expressed.',
    emotionalMeaningZh: '柏拉图式的精神之爱，无声的心灵连结，或尚未吐露的心声。',
    actionAdvice: 'Withdraw from external noise, meditate, trust your dreams, and wait for the appropriate moment to act.',
    actionAdviceZh: '从外界喧嚣中退隐，静心冥想，信任你的梦境，等待恰当时机的到来。'
  },
  {
    id: 'major_3',
    name: 'The Empress',
    nameZh: '皇后',
    type: 'major',
    suit: 'none',
    value: 3,
    keywords: ['Femininity', 'Beauty', 'Nature', 'Nurturing', 'Abundance'],
    keywordsZh: ['女性特质', '美感', '自然', '滋养', '丰盛'],
    upright: 'A period of abundance, creativity, and nurturing growth. Connect with nature and pamper your senses.',
    uprightZh: '这是一个丰盛、创造与孕育生长的时期。与自然连结，滋养你的感官。',
    reversed: 'Creative block, dependence on others, stifling smothering, or domestic disharmony.',
    reversedZh: '创造力受阻、过度依赖他人、令人窒息的控制，或家庭不和。',
    emotionalMeaning: 'Deep maternal affection, nesting, pregnancy, or a rich, stable, and deeply satisfying relationship.',
    emotionalMeaningZh: '深厚温柔的关爱、筑巢期、孕育生命，或一段极其丰盛、稳定且令人满足的关系。',
    actionAdvice: 'Create beauty, nurture your current projects, and allow yourself to receive love and abundance.',
    actionAdviceZh: '创造美好，滋养当下的项目，允许自己接纳爱与世间丰盛。'
  },
  {
    id: 'major_4',
    name: 'The Emperor',
    nameZh: '皇帝',
    type: 'major',
    suit: 'none',
    value: 4,
    keywords: ['Authority', 'Structure', 'Solid Foundation', 'Protection'],
    keywordsZh: ['权威', '秩序结构', '坚实基础', '保护力量'],
    upright: 'Establish order, structure, and boundaries. Take charge of your life with confidence and strategic planning.',
    uprightZh: '建立秩序、结构与界限。以信心和战略规划来掌控你的生活与事业。',
    reversed: 'Tyranny, lack of discipline, power struggles, or loss of control. Re-evaluate rigid rules that stifle growth.',
    reversedZh: '暴政强权、缺乏纪律、权力斗争或失控。重新评估那些压制生长的僵化规则。',
    emotionalMeaning: 'Protective and stable partner, but sometimes emotionally restrictive or dominant.',
    emotionalMeaningZh: '极具保护欲和稳固的伴侣，但有时在情感上有些限制性或主导色彩。',
    actionAdvice: 'Organize your life systematically, declare firm boundaries, and take leadership of the situation.',
    actionAdviceZh: '系统性地整顿生活，确立坚定的边界，主动承担起当前局势的领袖职责。'
  },
  {
    id: 'major_5',
    name: 'The Hierophant',
    nameZh: '教皇',
    type: 'major',
    suit: 'none',
    value: 5,
    keywords: ['Tradition', 'Spiritual Wisdom', 'Conformity', 'Mentorship'],
    keywordsZh: ['传统教条', '精神智慧', '遵从共识', '导师指引'],
    upright: 'Seek knowledge from mentors or traditional paths. Follow established social structures or belief systems.',
    uprightZh: '向导师或传统路径寻求智慧。遵循既定的社会结构或信念系统。',
    reversed: 'Rebellion, restriction, unconventional pathways, or dogmatic thinking. It is time to create your own rules.',
    reversedZh: '叛逆、打破束缚、非传统道路，或教条思维。是时候创造属于你自己的规则了。',
    emotionalMeaning: 'Traditional relationship milestones, marriage, spiritual alignment, or shared moral standards.',
    emotionalMeaningZh: '传统的婚姻或关系里程碑，精神契合，或对共有道德规范的坚守。',
    actionAdvice: 'Consult a trusted advisor, honor tradition while seeking deeper wisdom, or join a community of practice.',
    actionAdviceZh: '咨询值得信赖的导师，在寻求更深奥秘的同时尊重传统，或融入修行的社群。'
  },
  {
    id: 'major_6',
    name: 'The Lovers',
    nameZh: '恋人',
    type: 'major',
    suit: 'none',
    value: 6,
    keywords: ['Love', 'Harmony', 'Relationships', 'Choices', 'Alignment'],
    keywordsZh: ['爱', '和谐相融', '亲密关系', '重大选择', '价值观对齐'],
    upright: 'A beautiful harmony is present. This card also signifies major choices about your path and personal values.',
    uprightZh: '一种美丽的和谐正在萦绕。此牌也象征着关于人生道路和个人核心价值的重大抉择。',
    reversed: 'Disharmony, misalignment of values, internal conflict, or poor choices. Seek to restore your inner balance.',
    reversedZh: '失和、价值观错位、内心冲突或草率的选择。努力恢复内在的平衡与统一。',
    emotionalMeaning: 'Mutual attraction, intense romantic bond, finding a soulmate, or aligning relationship values.',
    emotionalMeaningZh: '双向奔赴的吸引，热烈的浪漫纽带，邂逅灵魂伴侣，或在亲密关系中对齐价值观。',
    actionAdvice: 'Listen to your heart, make choices aligned with your true values, and welcome deep connections.',
    actionAdviceZh: '倾听心底深处的声音，做出符合你真实原则的抉择，并接纳深层的相互连结。'
  },
  {
    id: 'major_7',
    name: 'The Chariot',
    nameZh: '战车',
    type: 'major',
    suit: 'none',
    value: 7,
    keywords: ['Direction', 'Control', 'Willpower', 'Victory', 'Determination'],
    keywordsZh: ['方向感', '掌控力', '意志力量', '凯旋胜利', '坚定决心'],
    upright: 'Charge forward with willpower and focus. Harness opposing forces and steer them towards your victory.',
    uprightZh: '用意志力与专注意志冲锋。驯服对立的力量，并将它们导向属于你的胜利。',
    reversed: 'Lack of control, directionless, aggression, or hit by obstacles. Pull back the reins and recalibrate.',
    reversedZh: '失去控制、失去方向、盲目好斗或遭遇重重阻碍。收紧缰绳，重新校准航向。',
    emotionalMeaning: 'Conquering difficulties together, pursuing a love interest with great drive, or needing emotional control.',
    emotionalMeaningZh: '携手克服重重难关，带着强烈的驱动力追求心仪之人，或者在情感上需要适度自控。',
    actionAdvice: 'Stay highly disciplined, resolve conflicting aspects of your life, and drive forward with unwavering focus.',
    actionAdviceZh: '保持严明的自律，协调好生活中相互冲突的因素，以坚定的专注力奋勇向前。'
  },
  {
    id: 'major_8',
    name: 'Strength',
    nameZh: '力量',
    type: 'major',
    suit: 'none',
    value: 8,
    keywords: ['Courage', 'Inner Fortitude', 'Patience', 'Compassion'],
    keywordsZh: ['勇气', '内在坚韧', '耐心包容', '慈悲抚慰'],
    upright: 'True strength comes from quiet fortitude, patience, and compassion, not brute force. Calm the beast within.',
    uprightZh: '真正的力量源于内在的坚韧、耐心与慈悲，而非蛮力。以柔克刚，安抚心中的野兽。',
    reversed: 'Self-doubt, weakness, raw emotion, or abuse of power. Connect back to your core quiet resilience.',
    reversedZh: '自我怀疑、软弱无力、情绪失控或力量滥用。重新找回内在静默的抗压韧性。',
    emotionalMeaning: 'A bond based on deep patience, taming conflicts with gentle love, or soothing an anxious partner.',
    emotionalMeaningZh: '基于深厚耐心的纽带，用温柔的爱意化解冲突，或安抚情绪焦虑的一方。',
    actionAdvice: 'Approach the problem with gentle persuasion and patience. Trust in your quiet, enduring inner power.',
    actionAdviceZh: '用温和的劝导与极度的耐心来处理问题，信任你内心那股静水流深的坚韧力量。'
  },
  {
    id: 'major_9',
    name: 'The Hermit',
    nameZh: '隐士',
    type: 'major',
    suit: 'none',
    value: 9,
    keywords: ['Soul-searching', 'Inner Guidance', 'Solitude', 'Spiritual Truth'],
    keywordsZh: ['灵魂探索', '内在指引', '自我独处', '真理寻求'],
    upright: 'Withdraw from external distractions to seek inner truth. Solitude is a source of profound wisdom.',
    uprightZh: '从外界纷扰中抽身，去探索内在的真理。孤独在此刻是深奥智慧的源泉。',
    reversed: 'Loneliness, isolation, paranoia, or refusing counsel. Reconnect with the world once you have found quiet.',
    reversedZh: '孤立无援、离群索居的凄凉、偏执或拒绝良言。在寻得宁静后，适度重新融入世界。',
    emotionalMeaning: 'Needing space to understand your own emotional desires, or experiencing a spiritual, quiet phase.',
    emotionalMeaningZh: '需要独处空间来理解自身的情感需求，或者正处于一段安静、内省的精神期。',
    actionAdvice: 'Spend time alone, reflect deeply before deciding, and let your inner lantern light the dark path.',
    actionAdviceZh: '安排一段独处的时光，在做出抉择前深度沉淀，让你内在的心灯照亮黑暗的道路。'
  },
  {
    id: 'major_10',
    name: 'Wheel of Fortune',
    nameZh: '命运之轮',
    type: 'major',
    suit: 'none',
    value: 10,
    keywords: ['Luck', 'Karma', 'Cycles', 'Turning Point', 'Destiny'],
    keywordsZh: ['运势起伏', '因果业力', '循环往复', '命运转折', '宿命安排'],
    upright: 'The wheel is turning, bringing unexpected changes and shifts. Embrace the constant motion of destiny.',
    uprightZh: '命运的齿轮正在转动，带来不可预知的转变。顺应无常，安然接纳命运的起落。',
    reversed: 'Bad luck, resistance to change, breaking negative cycles, or repeating lessons. Realize this too shall pass.',
    reversedZh: '时运不济、抗拒改变、打破负面循环或重温旧课。明白这也是暂时的。',
    emotionalMeaning: 'Destined meeting, sudden changes in relationship dynamics, or learning to ride the ups and downs of love.',
    emotionalMeaningZh: '命中注定的相遇，伴侣关系维度的突然转变，或学会随情感的潮落而起伏。',
    actionAdvice: 'Accept changes gracefully, realize that life works in cycles, and seize the opportunities that arise.',
    actionAdviceZh: '优雅地顺应变化，体悟万事万物皆有周期，并在潮头涌起时把握新生的契机。'
  },
  {
    id: 'major_11',
    name: 'Justice',
    nameZh: '正义',
    type: 'major',
    suit: 'none',
    value: 11,
    keywords: ['Justice', 'Truth', 'Cause and Effect', 'Accountability'],
    keywordsZh: ['公平正义', '客观真理', '因果法则', '责任担当'],
    upright: 'Decisions must be made with objectivity, logic, and integrity. Karma ensures that truth prevails.',
    uprightZh: '决策必须保持客观公正、合乎逻辑且诚实正直。因果法则将昭示真相。',
    reversed: 'Injustice, lack of accountability, dishonesty, or unfair bias. Own your mistakes and seek balanced truth.',
    reversedZh: '不公待遇、逃避责任、不诚实或偏见。勇于承认过失，并寻求客观的平衡。',
    emotionalMeaning: 'Honest communication, resolving disagreements fairly, or contracts/marriage legalities.',
    emotionalMeaningZh: '诚实而平等的沟通，以公平的方式化解分歧，或者涉及契约、婚姻法律。',
    actionAdvice: 'Analyze the facts objectively, remain completely honest, and accept full accountability for your actions.',
    actionAdviceZh: '客观地分析事实，保持彻底的诚实，并对你的行为承担全部的责任。'
  },
  {
    id: 'major_12',
    name: 'The Hanged Man',
    nameZh: '倒吊人',
    type: 'major',
    suit: 'none',
    value: 12,
    keywords: ['Surrender', 'New Perspective', 'Letting Go', 'Sacrifice'],
    keywordsZh: ['顺从臣服', '全新视角', '学着放下', '奉献牺牲'],
    upright: 'Pause, let go of control, and look at the situation from an inverted perspective. True action comes from surrender.',
    uprightZh: '暂停下来，放下对掌控的执念，换个颠倒的视角审视现状。真正的作为往往源自全然的臣服。',
    reversed: 'Stalling, resistance, ego-clinging, or futile sacrifice. Stop holding yourself back in comfortable suffering.',
    reversedZh: '拖延停滞、抗拒改变、执着于小我，或无谓的牺牲。别让自己继续沉溺在习惯的痛苦中。',
    emotionalMeaning: 'A period of sacrifice for the relationship, waiting patiently, or seeing relationships in a completely new way.',
    emotionalMeaningZh: '为感情牺牲奉献的时期，耐心的等待，或者以全新的视角去理解亲密关系的真谛。',
    actionAdvice: 'Do not force decisions right now. Suspend your actions, meditate, and look at things from a different angle.',
    actionAdviceZh: '此时切勿强求结果。悬置你的行动，静观其变，尝试用全然不同于以往的眼光来看待事物。'
  },
  {
    id: 'major_13',
    name: 'Death',
    nameZh: '死神',
    type: 'major',
    suit: 'none',
    value: 13,
    keywords: ['Endings', 'Transformation', 'Transition', 'Rebirth'],
    keywordsZh: ['终结谢幕', '蜕变新生', '过渡阶段', '凤凰涅槃'],
    upright: 'A major phase of your life is ending, paving the way for a beautiful and necessary rebirth. Let go of the dead wood.',
    uprightZh: '你生命中的一个重要阶段即将谢幕，这在为更美丽、更必要的重生扫清道路。舍弃枯枝，拥抱新芽。',
    reversed: 'Resistance to change, fear of endings, decay, or repeating cycles. Holding on to what is already gone.',
    reversedZh: '抗拒改变、恐惧终结、在陈旧中腐朽，或停滞不前。死死抓着早已离去的事物不放。',
    emotionalMeaning: 'The natural end of a stagnant relationship pattern, a sudden transition, or a profound emotional rebirth.',
    emotionalMeaningZh: '一段死板感情模式的自然结束，突如其来的转变，或在情感层面的深刻涅槃。',
    actionAdvice: 'Accept the ending completely. Do not resist the natural cycles of decay and rebirth. Allow transformation.',
    actionAdviceZh: '全然接受这个谢幕，不要抗拒腐朽与重生的自然交替，放手让蜕变发生。'
  },
  {
    id: 'major_14',
    name: 'Temperance',
    nameZh: '节制',
    type: 'major',
    suit: 'none',
    value: 14,
    keywords: ['Balance', 'Moderation', 'Patience', 'Alchemy', 'Harmony'],
    keywordsZh: ['平衡中和', '适度克制', '耐心融合', '心灵炼金', '和谐融洽'],
    upright: 'Blend opposite elements harmoniously. Practice moderation, patience, and seek flow and emotional balance.',
    uprightZh: '将对立的要素和谐地融合。保持适度与耐心，寻求生命的流动与心境的平衡。',
    reversed: 'Imbalance, excess, clashing energies, or lack of inner harmony. You are pouring water into oil.',
    reversedZh: '失去平衡、过度沉溺、能量冲突，或缺乏内在和谐。你正在做将水与油强行调和的徒劳之事。',
    emotionalMeaning: 'A highly peaceful, balanced, and mutually healing connection. Blending hearts beautifully.',
    emotionalMeaningZh: '一段宁静、平等且能互相疗愈的连结。两颗心在水乳交融中找到完美的和谐。',
    actionAdvice: 'Practice middle-path moderation. Patiently blend ideas, avoid extremes, and maintain calm composure.',
    actionAdviceZh: '践行中庸之道。耐心地融合各方想法，避免走向任何极端，保持内心宁静泰然。'
  },
  {
    id: 'major_15',
    name: 'The Devil',
    nameZh: '恶魔',
    type: 'major',
    suit: 'none',
    value: 15,
    keywords: ['Shadow Self', 'Attachment', 'Addiction', 'Materialism', 'Illusion'],
    keywordsZh: ['阴暗自我', '执念束缚', '沉溺欲望', '物质主义', '虚幻枷锁'],
    upright: 'You may be chained to unhealthy habits, materialism, or self-limiting beliefs. The key to release is in your hands.',
    uprightZh: '你可能正受困于不健康的习惯、物质欲望或自我设限。解开锁链的钥匙其实一直握在你自己手中。',
    reversed: 'Release from attachments, confronting the shadow self, breaking free from addiction, or spiritual awakening.',
    reversedZh: '从执念中解脱，直面阴暗面，打破成瘾状态，或迎来精神觉醒。',
    emotionalMeaning: 'Codependency, unhealthy attachments, intense raw lust and chemistry, or possessiveness.',
    emotionalMeaningZh: '病态的相互依赖、执着无法抽身、强烈的原始肉体吸引力，或极强的占有欲。',
    actionAdvice: 'Confront your shadows. Identify the self-imposed chains holding you back, and plan your liberation.',
    actionAdviceZh: '直面你内在的阴影。认清那些自设的、阻碍你前行的精神锁链，并筹划属于你的解脱。'
  },
  {
    id: 'major_16',
    name: 'The Tower',
    nameZh: '高塔',
    type: 'major',
    suit: 'none',
    value: 16,
    keywords: ['Sudden Change', 'Upheaval', 'Chaos', 'Revelation', 'Awakening'],
    keywordsZh: ['骤然巨变', '颠覆动荡', '混乱失控', '真相揭示', '顿悟觉醒'],
    upright: 'False foundations are shattered by lightning. While chaotic and painful, this clearing is vital for true truth.',
    uprightZh: '虚假不实的基础瞬间被雷电击碎。虽然混乱且痛苦，但这种彻底的清理对迎接真理至关重要。',
    reversed: 'Avoiding disaster, fear of collapse, lingering in unstable conditions, or minor disruption.',
    reversedZh: '躲过灾难、害怕崩塌、在不稳定的危墙下勉强支撑，或受到轻微干扰。',
    emotionalMeaning: 'Sudden breakthroughs or breakups, shattering illusions about your partner, or a deep foundational crisis.',
    emotionalMeaningZh: '突如其来的崩盘或彻底突破，看清关于伴侣的某种幻象，或亲密关系基础的深层危机。',
    actionAdvice: 'Do not cling to the collapsing structures. Let them fall, clearing space to rebuild on solid bedrock.',
    actionAdviceZh: '切勿死守正在倒塌的危墙。任由其崩塌，清理废墟，以便在坚固的花岗岩岩基上重建一切。'
  },
  {
    id: 'major_17',
    name: 'The Star',
    nameZh: '星星',
    type: 'major',
    suit: 'none',
    value: 17,
    keywords: ['Hope', 'Faith', 'Purpose', 'Renewal', 'Serenity'],
    keywordsZh: ['希望微光', '信仰力量', '人生使命', '灵性重塑', '宁静致远'],
    upright: 'Hope shines through the dark. You are entered a quiet, beautiful phase of emotional healing, renewal, and divine protection.',
    uprightZh: '希望在最深的夜里闪耀。你正在步入一个平静安详、获得疗愈、重塑信心与得到神圣护佑的阶段。',
    reversed: 'Lack of faith, despair, discouragement, or feeling uninspired. Reconnect with your true cosmic guidance.',
    reversedZh: '丧失信念、陷入灰心丧气、感到灵感枯竭或迷失。重新试着与你真实的内在指南针建立连结。',
    emotionalMeaning: 'Healing from past heartbreak, feeling hopeful about a new love, or a gentle, highly inspirational connection.',
    emotionalMeaningZh: '从过去的伤痛中痊愈，对未来的情感满怀希冀，或拥有一段温柔且极具灵感滋养的精神连结。',
    actionAdvice: 'Keep absolute faith, allow yourself to heal in tranquility, and follow the quiet starlight of your inspiration.',
    actionAdviceZh: '保持绝对的信心，让自己在静谧中得以疗愈，跟随着灵感的点点星光指引前行。'
  },
  {
    id: 'major_18',
    name: 'The Moon',
    nameZh: '月亮',
    type: 'major',
    suit: 'none',
    value: 18,
    keywords: ['Illusion', 'Fear', 'Anxiety', 'Intuition', 'Wild Dreams'],
    keywordsZh: ['幻影迷茫', '恐惧不安', '焦虑情绪', '直觉波动', '奇异梦境'],
    upright: 'Not everything is as it appears. Navigate through anxiety and trust your deep intuition to guide you through the darkness.',
    uprightZh: '虚实难辨，雾霭重重。在焦虑与迷茫中穿行时，唯有信任你深层的直觉，方能穿透黑暗。',
    reversed: 'Releasing fear, unveiling secrets, overcoming anxiety, or truth coming to light.',
    reversedZh: '释放恐惧、秘密揭开、克服焦虑折磨，或隐藏的真相重见天日。',
    emotionalMeaning: 'Insecurity, unexpressed doubts, deep subconscious projections, or beautiful but confusing romantic illusion.',
    emotionalMeaningZh: '缺乏安全感、无法言说的疑虑、深层潜意识的投射，或一段美丽却让人摸不着头脑的幻觉式爱情。',
    actionAdvice: 'Pay attention to your subconscious and dreams. Do not act hastily when things are still shrouded in fog.',
    actionAdviceZh: '密切留意你的潜意识与梦境。在浓雾散去、局势大白之前，切忌鲁莽做出任何决定。'
  },
  {
    id: 'major_19',
    name: 'The Sun',
    nameZh: '太阳',
    type: 'major',
    suit: 'none',
    value: 19,
    keywords: ['Success', 'Radiance', 'Vitality', 'Joy', 'Enlightenment'],
    keywordsZh: ['功成名就', '光芒万丈', '生命活力', '纯粹喜悦', '心智开明'],
    upright: 'Abundance, joy, and vitality surround you. Success is guaranteed, and you radiate warmth and radiant positivity.',
    uprightZh: '丰盛、喜悦与无限生机将你环绕。成功指日可待，你正散发着温暖、明亮而极其积极的能量。',
    reversed: 'Temporary sadness, unrealistic optimism, blocked energy, or needing to find inner joy.',
    reversedZh: '一时的消沉、不切实际的盲目乐观、能量受到些许阻碍，或需要重新找回内在的纯粹快乐。',
    emotionalMeaning: 'Warm, open, and blissfully happy relationship. Clear, glowing, and completely honest communication.',
    emotionalMeaningZh: '温暖、坦诚、令人感到无比幸福融洽的关系。拥有澄澈、明亮且毫无遮掩的真诚沟通。',
    actionAdvice: 'Express yourself with full confidence, share your inner warmth, and enjoy the radiant vitality of this moment.',
    actionAdviceZh: '满怀信心地展现自我，慷慨分享你内心的炽热，纵情享受当下的光辉与生机。'
  },
  {
    id: 'major_20',
    name: 'Judgement',
    nameZh: '审判',
    type: 'major',
    suit: 'none',
    value: 20,
    keywords: ['Reckoning', 'Awakening', 'Calling', 'Inner Voice', 'Absolution'],
    keywordsZh: ['灵性觉醒', '天命召唤', '内在审判', '大彻大悟', '重获新生'],
    upright: 'A spiritual awakening is occurring. Answer your higher calling, resolve past karma, and step into your truest self.',
    uprightZh: '精神层面正迎来深刻的觉醒。回应你灵魂深处的更高召唤，清偿过去的业力，迈向崭新且真实的自我。',
    reversed: 'Self-doubt, ignoring the call, inner refusal, or dwelling on past regrets that stifle progress.',
    reversedZh: '自我怀疑、假装听不到宿命的召唤、内心抗拒，或沉溺于过去的悔恨中裹足不前。',
    emotionalMeaning: 'A critical turning point in relationships, resolving long-term patterns, or forgiving past relationship wounds.',
    emotionalMeaningZh: '亲密关系迎来关键的分水岭，长久以来的模式得以清算，或是对过去情感创伤的释怀与原谅。',
    actionAdvice: 'Reflect on your life journey, forgive yourself and others, and answer the calling of your true evolution.',
    actionAdviceZh: '深刻反思你的人生旅程，原谅自己与他人，勇敢地回应你真正进化成长的宿命召唤。'
  },
  {
    id: 'major_21',
    name: 'The World',
    nameZh: '世界',
    type: 'major',
    suit: 'none',
    value: 21,
    keywords: ['Completion', 'Integration', 'Accomplishment', 'Travel', 'Wholeness'],
    keywordsZh: ['圆满达成', '大成融合', '功德圆满', '寰宇视野', '完整划一'],
    upright: 'You have reached a point of absolute wholeness, completion, and deep understanding. Celebrate your successful journey.',
    uprightZh: '你已抵达全然圆满、功德完满与大彻大悟之境。为你的成功谢幕、为这一趟精彩旅途欢呼吧。',
    reversed: 'Incomplete cycles, shortcuts, delay in achievement, or feeling stuck. Close the loops that remain open.',
    reversedZh: '未能闭环的循环、试图投机取巧、成功有所推迟，或感到停滞。去把那些未尽的琐事妥善收尾。',
    emotionalMeaning: 'A harmonious, fully matured, and cosmic union. Reaching a state of complete emotional satisfaction.',
    emotionalMeaningZh: '一段和谐美满、高度成熟且极具宇宙契合感的结合。情感上迎来了极致的满足与归宿。',
    actionAdvice: 'Celebrate your achievements, integrate what you have learned, and prepare to embark on the next higher cycle.',
    actionAdviceZh: '庆祝你的大成，沉淀并内化这一路走来汲取的智慧，为迈向更高维度的下一段循环做好准备。'
  }
];

// Dynamically generate the 56 Minor Arcana cards for rich completeness
const SUIT_INFO = {
  wands: {
    nameZh: '权杖',
    element: 'Fire (Action, Willpower, Creative drive)',
    elementZh: '火元素 (行动力、意志力、创造驱动)',
    keywords: ['Action', 'Energy', 'Passion', 'Willpower'],
    keywordsZh: ['行动', '精力', '激情', '意志']
  },
  cups: {
    nameZh: '圣杯',
    element: 'Water (Emotion, Feeling, Love, Relationship)',
    elementZh: '水元素 (情感、感受、爱意、人际纽带)',
    keywords: ['Emotion', 'Intimacy', 'Intuition', 'Creativity'],
    keywordsZh: ['情感', '亲密', '直觉', '创造力']
  },
  swords: {
    nameZh: '宝剑',
    element: 'Air (Intellect, Thought, Conflict, Truth)',
    elementZh: '风元素 (心智、思想、冲突折磨、真理)',
    keywords: ['Mind', 'Truth', 'Conflict', 'Resolution'],
    keywordsZh: ['思想', '真相', '冲突', '解决']
  },
  pentacles: {
    nameZh: '星币',
    element: 'Earth (Material, Money, Body, Stability)',
    elementZh: '土元素 (物质、财富、身体、稳固根基)',
    keywords: ['Material', 'Wealth', 'Stability', 'Manifestation'],
    keywordsZh: ['物质', '财富', '稳固', '显化']
  }
};

const NUMBER_MEANINGS: Record<number, {
  name: string;
  nameZh: string;
  concept: string;
  conceptZh: string;
}> = {
  1: { name: 'Ace', nameZh: '首牌', concept: 'New spark, source, inspiration, portal', conceptZh: '全新火花、源头、灵感大门开启' },
  2: { name: 'Two', nameZh: '二号', concept: 'Decision, balance, duality, connection', conceptZh: '决策抉择、平衡协调、二元对立' },
  3: { name: 'Three', nameZh: '三号', concept: 'Expansion, creative expression, initial growth', conceptZh: '向外拓展、创意表达、初步成果' },
  4: { name: 'Four', nameZh: '四号', concept: 'Stability, structure, boundaries, rest', conceptZh: '稳固结构、边界确立、休养生息' },
  5: { name: 'Five', nameZh: '五号', concept: 'Conflict, loss, struggle, chaotic challenges', conceptZh: '内在冲突、失落伤痛、混乱挑战' },
  6: { name: 'Six', nameZh: '六号', concept: 'Harmony, assistance, transition, victory', conceptZh: '和谐平稳、互助疗愈、过渡转型' },
  7: { name: 'Seven', nameZh: '七号', concept: 'Assessment, secrets, choice, inner effort', conceptZh: '评估审视、隐秘心思、试探抗争' },
  8: { name: 'Eight', nameZh: '八号', concept: 'Diligence, movement, change, hyper-focus', conceptZh: '精益求精、顺势流动、改变或专注' },
  9: { name: 'Nine', nameZh: '九号', concept: 'Culmination, self-sufficiency, final approach', conceptZh: '达到顶点、自给自足、最后的准备' },
  10: { name: 'Ten', nameZh: '十号', concept: 'Completion, legacy, burden, final outcome', conceptZh: '终极闭环、传承延续、过度负重或大成' },
  11: { name: 'Page', nameZh: '侍从', concept: 'Explorer, youthful messenger, eager learner', conceptZh: '探索先锋、年轻使者、好学的新手' },
  12: { name: 'Knight', nameZh: '骑士', concept: 'Active dynamic driver, intense executor', conceptZh: '跃跃欲试的执行者、风风火火的骑士' },
  13: { name: 'Queen', nameZh: '皇后', concept: 'Mature receptive ruler, emotional master', conceptZh: '成熟内敛的掌控者、情感与智慧的主宰' },
  14: { name: 'King', nameZh: '国王', concept: 'Authority, complete mastery, systemic power', conceptZh: '权威统领、终极掌控、建制性的力量' }
};

export const MINOR_ARCANA: TarotCard[] = [];

Object.entries(SUIT_INFO).forEach(([suit, suitData]) => {
  for (let val = 1; val <= 14; val++) {
    const numData = NUMBER_MEANINGS[val];
    const isCourt = val >= 11;
    
    // Create elegant card names
    const name = isCourt 
      ? `${numData.name} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`
      : `${numData.name} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`;
      
    const nameZh = `${suitData.nameZh}${numData.nameZh}`;

    const id = `minor_${suit}_${val}`;

    // Poetic custom meanings based on suit + number alchemy
    let upright = '';
    let uprightZh = '';
    let reversed = '';
    let reversedZh = '';
    let emotionalMeaning = '';
    let emotionalMeaningZh = '';
    let actionAdvice = '';
    let actionAdviceZh = '';

    if (suit === 'wands') {
      if (val === 1) {
        upright = 'A burst of creative inspiration, intense energy, and a fresh path of action.';
        uprightZh = '创造性灵感的爆发，强烈的意志能量，一条蓄势待发的新道路。';
        reversed = 'Delayed starts, creative blocks, hesitation, or passion fading away.';
        reversedZh = '启动延迟、创意阻塞、犹豫不决或热情在拖延中消逝。';
        emotionalMeaning = 'Exciting, highly passionate physical chemistry, spark of new romance.';
        emotionalMeaningZh = '令人心跳加速的极佳身体火花，新恋情火速点燃。';
        actionAdvice = 'Act immediately, seize this new inspiration, and channel it into action.';
        actionAdviceZh = '立即行动，抓住当下的全新灵感，将其转化为切实的作为。';
      } else if (val === 10) {
        upright = 'Carrying an immense weight, burnout, and extreme over-commitment.';
        uprightZh = '肩负巨大的精神重担，身心俱疲，以及超负荷的过度承诺。';
        reversed = 'Dropping the burden, delegation, refusing to break, or collapse.';
        reversedZh = '卸下包袱、学会授权他人、拒绝被压垮，或彻底体力透支。';
        emotionalMeaning = 'Feeling completely weighed down by duties or an over-demanding partner.';
        emotionalMeaningZh = '感到在情感关系中被重重义务压得喘不过气。';
        actionAdvice = 'Re-evaluate your commitments. Delegate tasks, and put down some wands.';
        actionAdviceZh = '重新评估你的付出与承诺。学会适度放手，卸下一些没必要的心理负担。';
      } else {
        upright = `High fire-element energy focused on ${numData.concept.toLowerCase()}.`;
        uprightZh = `火元素的高昂能量作用于【${numData.conceptZh}】。`;
        reversed = 'Misdirected actions, impatience, or inner creative conflict.';
        reversedZh = '行动方向错误、失去耐心，或内在的创造性冲突。';
        emotionalMeaning = 'Dynamic, energetic, but sometimes unstable emotional dynamics.';
        emotionalMeaningZh = '富有朝气与活力、但有时稍显不稳定的情感互动。';
        actionAdvice = 'Harness your fire, maintain disciplined execution, and do not act in haste.';
        actionAdviceZh = '掌控好你内心的火焰，保持有纪律的执行力，切忌鲁莽冲动。';
      }
    } else if (suit === 'cups') {
      if (val === 1) {
        upright = 'A pure spring of love, emotional clarity, spiritual peace, and deep empathy.';
        uprightZh = '一汪纯净的爱之泉水，情感层面的觉醒，精神宁静与深层的通情达理。';
        reversed = 'Emotional blocks, coldness, unrequited love, or hidden hurt.';
        reversedZh = '情感封锁、冷漠以对、单相思或隐藏在内心的哀伤。';
        emotionalMeaning = 'Unconditional affection, beautiful spiritual alignment, a heart fully opening.';
        emotionalMeaningZh = '无条件的深厚爱意，美丽的心灵共鸣，一颗正在敞开的心扉。';
        actionAdvice = 'Open your heart fully, allow yourself to feel, and express your empathy.';
        actionAdviceZh = '全然敞开你的心扉，允许自己去感受，并大方流露你的悲悯与体贴。';
      } else if (val === 10) {
        upright = 'Absolute domestic bliss, emotional satisfaction, family harmony, and loving peace.';
        uprightZh = '极致的情感慰藉，家合万事兴的圆满，大爱环绕以及内心宁静。';
        reversed = 'Disrupted home life, family friction, emotional distance, or broken dreams.';
        reversedZh = '家庭生活受到干扰、亲密隔阂、情感渐行渐远，或幻灭。';
        emotionalMeaning = 'The peak of relationship alignment, absolute shared happiness, and long-term security.';
        emotionalMeaningZh = '亲密关系的极致殿堂，分享绝对的幸福喜悦，以及长久的归宿。';
        actionAdvice = 'Celebrate your close circles, express your gratitude for love, and protect this peace.';
        actionAdviceZh = '珍惜你身边的小确幸，向所爱之人表达无尽的感激，并守护这份安宁。';
      } else {
        upright = `Deep water-element emotional energy flowing through ${numData.concept.toLowerCase()}.`;
        uprightZh = `水元素的温润情感流动于【${numData.conceptZh}】。`;
        reversed = 'Emotional vulnerability, overflow of sentiment, or feeling detached.';
        reversedZh = '情感脆弱泛滥、沉溺于无谓的情绪，或感到冷漠抽离。';
        emotionalMeaning = 'Deep feeling, intuitive reading of each other, rich relational landscape.';
        emotionalMeaningZh = '深刻的柔情，心灵福至般的默契，极其丰盛的心路历程。';
        actionAdvice = 'Honor your emotional signals, but do not let yourself drown in subjective feelings.';
        actionAdviceZh = '尊重你内心的情感信号，但也绝不要让自己在主观情绪的洪流中溺水。';
      }
    } else if (suit === 'swords') {
      if (val === 1) {
        upright = 'A breakthrough of mental clarity, objective truth, clear logic, and justice.';
        uprightZh = '心智拨云见日的瞬间，客观真理降临，澄澈的逻辑与正义必彰。';
        reversed = 'Confusion, distorted truth, misuse of intelligence, or severe chaos.';
        reversedZh = '混乱迷糊、真相被扭曲、搬弄聪明，或处于严重的心力交瘁中。';
        emotionalMeaning = 'Cutting through confusing feelings, deciding with logic, or honest painful chats.';
        emotionalMeaningZh = '斩断纠缠不清的乱麻，理智做出决断，或展开坦诚但刺痛的深谈。';
        actionAdvice = 'Speak the truth courageously, cut through illusions, and make decisions with dry logic.';
        actionAdviceZh = '勇敢地戳破谎言，用干燥理性的逻辑斩断纷乱，做出符合事实的决策。';
      } else if (val === 10) {
        upright = 'Hit bottom, absolute defeat, collapse of thoughts, but also indicating new dawn.';
        uprightZh = '跌落谷底、思绪的彻底崩塌、痛苦至极，但也预示着最黑暗的夜即将迎来黎明。';
        reversed = 'Recovery, surviving disaster, refusing to stay defeated, or lingering pain.';
        reversedZh = '触底反弹、在灾难中幸存、拒绝继续沉沦，或残留的隐痛挥之不去。';
        emotionalMeaning = 'A devastating heartbreak, betrayal, or realizing a relationship is irrevocably over.';
        emotionalMeaningZh = '痛彻心扉的失恋、背叛的撕裂，或猛然意识到感情已彻底终结、无可挽回。';
        actionAdvice = 'Accept the complete end. Rest in the quiet. The dawn always breaks after the ten.';
        actionAdviceZh = '全然接纳这落幕，在静默中修剪伤口。请记住，十号牌之后，曙光终将刺破黑暗。';
      } else {
        upright = `Sharp air-element intellect and challenges surrounding ${numData.concept.toLowerCase()}.`;
        uprightZh = `风元素的冷冽理智与心智考验证考验着【${numData.conceptZh}】。`;
        reversed = 'Anxiety, communication breakdown, or internal mental prison.';
        reversedZh = '思虑过度引起的焦虑、沟通机制断裂，或自己把自己关进思维的囚笼。';
        emotionalMeaning = 'Rationalizing feelings, complex arguments, or needing intellectual common ground.';
        emotionalMeaningZh = '理智化情绪、面临口舌摩擦，或需要在精神层面寻得彼此契合。';
        actionAdvice = 'Look at the facts without emotional filter, remain completely objective, and solve logically.';
        actionAdviceZh = '剔除情绪滤镜来看待事实，保持彻底的客观，用逻辑手段解决核心矛盾。';
      }
    } else { // pentacles
      if (val === 1) {
        upright = 'A physical gift, financial opportunity, healthy physical start, or material seed.';
        uprightZh = '一份物质的馈赠，财务维度的崭新机遇，健康的体魄起点，或一颗富足的种子。';
        reversed = 'Missed material opportunities, waste, financial insecurity, or poor planning.';
        reversedZh = '错失物质良机、挥霍浪费、缺乏财务安全感或缺乏长远规划。';
        emotionalMeaning = 'A highly grounded, secure connection, physically safe partner, or sensual love.';
        emotionalMeaningZh = '极其踏实稳健的感情纽带，让人倍感安全感的伴侣，或丰足的肉体愉悦。';
        actionAdvice = 'Invest in the real world, sow the seed of your projects, and maintain physical habits.';
        actionAdviceZh = '把精力投资于真实的世界，为你的项目种下踏实的种子，并保持健康的生活习惯。';
      } else if (val === 10) {
        upright = 'Ultimate financial security, ancestral legacy, stable community, and lifetime wealth.';
        uprightZh = '极致的财务安全，家族长久基业的传承，稳固安定的社群，以及享之不竭的富足。';
        reversed = 'Financial ruin, family disputes, loss of stability, or short-sighted pursuits.';
        reversedZh = '财务流失、家族纷争、痛失稳固的依靠，或追求短视的物质利益。';
        emotionalMeaning = 'A deeply established lineage, reliable life support, or stable marriage with good security.';
        emotionalMeaningZh = '长久稳固的关系网，极其靠谱的人生后盾，或拥有雄厚物质保障的婚姻。';
        actionAdvice = 'Focus on the long-term legacy. Think about stability for the future, not just short wins.';
        actionAdviceZh = '专注于构建长久的基业。思考未来的稳健发展，而不是只盯着眼前的蝇头小利。';
      } else {
        upright = `Solid earth-element manifestation and physical reality grounding ${numData.concept.toLowerCase()}.`;
        uprightZh = `土元素的稳健显化与真实质感奠定着【${numData.conceptZh}】的基础。`;
        reversed = 'Material delays, physical laziness, greed, or instability of foundation.';
        reversedZh = '物质进度迟缓、身体惰性、贪心不足，或现实根基不稳。';
        emotionalMeaning = 'Loyal, physical, stable, and practical relationship dynamics.';
        emotionalMeaningZh = '忠诚、注重现实感、稳重且极其务实的情感状态。';
        actionAdvice = 'Proceed with patience, build step-by-step, and value physical, real accomplishments.';
        actionAdviceZh = '保持极大的耐心，一步一个脚印，珍视实实在在、能看得见摸得着的现实成果。';
      }
    }

    MINOR_ARCANA.push({
      id,
      name,
      nameZh,
      type: 'minor',
      suit: suit as any,
      value: val,
      keywords: isCourt 
        ? [numData.name, suitData.keywords[1], suitData.keywords[2], 'Mastery'] 
        : [numData.name, suitData.keywords[1], suitData.keywords[2]],
      keywordsZh: isCourt
        ? [numData.nameZh, suitData.keywordsZh[1], suitData.keywordsZh[2], '掌控']
        : [numData.nameZh, suitData.keywordsZh[1], suitData.keywordsZh[2]],
      upright,
      uprightZh,
      reversed,
      reversedZh,
      emotionalMeaning,
      emotionalMeaningZh,
      actionAdvice,
      actionAdviceZh
    });
  }
});

export const TAROT_DATABASE: TarotCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export function getCardById(id: string): TarotCard | undefined {
  return TAROT_DATABASE.find(c => c.id === id);
}

export function getRandomCards(count: number): { card: TarotCard; isReversed: boolean }[] {
  const shuffled = [...TAROT_DATABASE].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(card => ({
    card,
    isReversed: Math.random() > 0.8 // 20% chance of reversal for realistic readings
  }));
}
