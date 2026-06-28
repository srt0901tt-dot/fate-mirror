import { SpreadMode } from '../types';

export const SPREAD_MODES: SpreadMode[] = [
  {
    id: 'daily',
    name: 'Daily One Card',
    nameZh: '每日单牌',
    description: 'A single mirror reflection of your current state, ideal for daily alignment and quick clarity.',
    descriptionZh: '一面映照当下心境的单牌镜面，适合每日指引与快速明晰。',
    cardCount: 1,
    positions: [
      {
        name: 'The Focus',
        nameZh: '焦点核心',
        meaning: 'Your central energy, current theme, and immediate mirror message.',
        meaningZh: '你当下的核心能量、今日主题及直接的镜像昭示。'
      }
    ]
  },
  {
    id: 'problem',
    name: 'Problem / Obstacle / Advice',
    nameZh: '问题 / 阻碍 / 建议',
    description: 'A structural diagnostic spread for parsing a specific challenge, its blockages, and how to act.',
    descriptionZh: '诊断特定现实挑战、核心症结以及可行性指引的经典三牌排阵。',
    cardCount: 3,
    positions: [
      {
        name: 'The Present Problem',
        nameZh: '问题现状',
        meaning: 'The objective truth of the issue as it stands right now.',
        meaningZh: '该问题的客观真实状况。'
      },
      {
        name: 'The Obstacle',
        nameZh: '核心阻碍',
        meaning: 'What is blocking your flow, standing in your path, or clouding your sight.',
        meaningZh: '阻碍你能量流动、横亘在道路中或遮蔽你视线的核心障碍。'
      },
      {
        name: 'The Advice',
        nameZh: '行动建议',
        meaning: 'The recommended course of action to resolve the tension and restore harmony.',
        meaningZh: '化解僵局、回复内心与现实和谐的建设性行动指南。'
      }
    ]
  },
  {
    id: 'timeline',
    name: 'Past / Present / Future',
    nameZh: '过去 / 现在 / 未来',
    description: 'Follow the timeline of your question to understand how history shaped today and where it leads.',
    descriptionZh: '顺应时间之流，洞悉过去如何塑造现在，以及当下决断将指引何种未来。',
    cardCount: 3,
    positions: [
      {
        name: 'The Past Foundation',
        nameZh: '过去根基',
        meaning: 'The historical factors, background forces, or foundation of this situation.',
        meaningZh: '历史因素、背景力量或该现状的初始根源。'
      },
      {
        name: 'The Present Reality',
        nameZh: '当下现实',
        meaning: 'Your current energetic state and what you are experiencing in this exact moment.',
        meaningZh: '你当前的能量状态以及你此时此刻正在经历的现实。'
      },
      {
        name: 'The Future Horizon',
        nameZh: '未来方向',
        meaning: 'Where the situation naturally flows next, if current energies remain unchanged.',
        meaningZh: '如果当前的能量轨道不发生重大干预，局势自然发展的下一个落点。'
      }
    ]
  },
  {
    id: 'relationship',
    name: 'Relationship Mirror',
    nameZh: '关系镜像',
    description: 'Look deep into a relationship with another soul, showing self, other, connection, and path.',
    descriptionZh: '深入透视你与另一个灵魂的关系，照见自我、对方、深度连结与未来走向。',
    cardCount: 4,
    positions: [
      {
        name: 'Your Stance',
        nameZh: '你的立场',
        meaning: 'Your true feelings, underlying desires, and subconscious contribution to the bond.',
        meaningZh: '你内心的真实渴望、情感态度以及你在关系中投射的力量。'
      },
      {
        name: 'Their Stance',
        nameZh: '对方立场',
        meaning: 'Their true feelings, thoughts, and how they perceive you from their perspective.',
        meaningZh: '对方心底的真切感受、核心想法，以及他们从其视角如何看待你。'
      },
      {
        name: 'The Connection',
        nameZh: '核心连结',
        meaning: 'The energetic bridge between you, the current chemistry, or friction points.',
        meaningZh: '你们之间的能量桥梁、当下的火花、或急需处理的分歧。'
      },
      {
        name: 'The Resolution Path',
        nameZh: '终极走向',
        meaning: 'The potential evolution of your relationship, and the highest lesson you share.',
        meaningZh: '伴侣关系潜在的演变轨迹，以及你们彼此共同承担的更高生命课题。'
      }
    ]
  },
  {
    id: 'celtic',
    name: 'Celtic Cross',
    nameZh: '凯尔特十字',
    description: 'The ancient 10-card comprehensive spread mapping heart, obstacles, past, future, fears, and outcomes.',
    descriptionZh: '古老经典的十牌凯尔特十字，全维排阵，直击核心、交汇点、深层潜意识及终极结局。',
    cardCount: 10,
    positions: [
      {
        name: 'The Present Situation',
        nameZh: '中心现状',
        meaning: 'The current status and immediate core topic of the inquiry.',
        meaningZh: '所求问之事的直观现状与当下核心主题。'
      },
      {
        name: 'The Crossing Force',
        nameZh: '交叉力量',
        meaning: 'What immediately assists or opposes you, indicating the direct conflict.',
        meaningZh: '直接作用于现状的辅佐力或对抗力，预示冲突焦点。'
      },
      {
        name: 'The Subconscious',
        nameZh: '潜意识根基',
        meaning: 'Underlying subconscious roots, deep urges, or hidden factors.',
        meaningZh: '潜在的潜意识根基、沉淀的渴望，或未曾察觉的影响因素。'
      },
      {
        name: 'The Recent Past',
        nameZh: '近景过去',
        meaning: 'Recent events that have directly shaped the current circumstances.',
        meaningZh: '刚刚退场、直接塑造了当前周遭局势的最近事件。'
      },
      {
        name: 'The Conscious Goal',
        nameZh: '意识焦点',
        meaning: 'Your conscious thoughts, desired outcomes, and ideal goals.',
        meaningZh: '你清醒状态下的想法、渴望达成的理想走向，以及明处的期望。'
      },
      {
        name: 'The Near Future',
        nameZh: '近景未来',
        meaning: 'The immediate next step or transition as the situation begins to shift.',
        meaningZh: '局势开始演化后的第一个落点或过渡关卡。'
      },
      {
        name: 'The Self Attitude',
        nameZh: '自我立场',
        meaning: 'How you perceive yourself in this situation, your power or self-imposed limits.',
        meaningZh: '你在此局势中对自我的认知、你调用的力量或自设的限度。'
      },
      {
        name: 'The Environment',
        nameZh: '外界环境',
        meaning: 'External factors, family, friends, work culture, or others’ opinions.',
        meaningZh: '外部客观因素、家人朋友、职场人文，或他人对你该处境的观点。'
      },
      {
        name: 'Hopes or Fears',
        nameZh: '希望与恐惧',
        meaning: 'Your deepest aspirations and your paralyzing anxieties combined.',
        meaningZh: '你内心深沉的崇高抱负与拉扯你的负面恐惧的交织体。'
      },
      {
        name: 'The Ultimate Outcome',
        nameZh: '终极结果',
        meaning: 'The long-term realization, ultimate advice, and culminating direction.',
        meaningZh: '长期发展的最终落幕点、最终的宿命式启示与圆满指引。'
      }
    ]
  }
];

export function getSpreadById(id: string): SpreadMode | undefined {
  return SPREAD_MODES.find(m => m.id === id);
}
