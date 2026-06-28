import React from 'react';
import { useGestureContext } from '../context/GestureContext';
import { Eye } from 'lucide-react';

interface GestureStatusHUDProps {
  step: number;
}

export default function GestureStatusHUD({ step }: GestureStatusHUDProps) {
  const { cameraStatus, currentGesture, scrollStatus, controlMode } = useGestureContext();

  const getCommandText = () => {
    if (controlMode === 'mouse') {
      switch (step) {
        case 1:
          return { en: "Click start button to begin", zh: "点击启动按钮以开启仪式" };
        case 2:
          return { en: "Click text area to write question, then click Analyze", zh: "点击文本框输入困惑，点击分析按钮进行心念解译" };
        case 3:
          return { en: "Click any card layout to select spread mode", zh: "点击任一牌阵卡片以进行选择" };
        case 4:
          return { en: "Mouse Mode ready, click to proceed", zh: "鼠标模式就绪，点击继续下一步" };
        case 5:
          return { en: "Drag or scroll to spin the orbital, click card to draw", zh: "左右拖拽/滚轮拨动星轨，点击卡牌完成抽取" };
        case 6:
          return { en: "Click card to flip, hover to zoom, click Restart to reset", zh: "点击卡牌进行翻牌，悬停放大细节，可点击重启" };
        case 7:
          return { en: "Click archives to view history, click restart to reset", zh: "点击列表条目浏览仪式归档，点击重启返回" };
        default:
          return { en: "Pointer control active", zh: "鼠标指针操控已激活" };
      }
    }

    switch (step) {
      case 1:
        return { en: "Open Palm or Pinch to begin", zh: "张掌或捏合启动仪式" };
      case 2:
        return { en: "Open Palm: Focus, Pinch: Confirm question", zh: "张掌：聚焦输入，捏合：确认提问" };
      case 3:
        return { en: "Swipe Left/Right: Cycle, Pinch: Select spread", zh: "左右摆手：循环，捏合：选择牌阵" };
      case 4:
        return { en: "Open Palm: Ready, Pinch: Continue to Draw", zh: "张掌：就绪，捏合：继续开始启牌" };
      case 5:
        return { en: "Swipe Left/Right: Rotate deck, Pinch: Draw card", zh: "左右摆手：拨动，捏合：抽牌放入槽位" };
      case 6:
        return { en: "Swipe: Cycle cards, Pinch: Unveil, Palm: Restart", zh: "左右摆手：浏览，捏合：翻牌，张掌：重置" };
      case 7:
        return { en: "Swipe: Cycle list, Pinch: View card, Palm: Restart", zh: "左右摆手：浏览归档，捏合：查看，张掌：重置" };
      default:
        return { en: "Gestures active", zh: "手势感应已激活" };
    }
  };

  const command = getCommandText();

  // Mapping status translations
  const statusLabels = {
    idle: { label: 'Idle / 待机', color: 'text-neutral-500' },
    initializing: { label: 'Initializing / 初始化...', color: 'text-amber-400 animate-pulse' },
    active: { label: 'Calibrated / 运行中', color: 'text-emerald-500' },
    denied: { label: 'Camera Blocked / 摄像头已阻断', color: 'text-rose-400 font-light' },
    error: { label: 'Unavailable / 故障', color: 'text-rose-500' },
  };

  const gestureLabels = {
    none: 'Awaiting hand / 等待手势',
    'hand-detected': 'Hand detected / 已检测到手',
    'open-palm': 'Open palm active / 张掌已启动',
    'pinch': 'Pinch confirm / 捏合确认',
  };

  if (controlMode === 'mouse') {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 mt-2 mb-4 z-40">
        <div className="bg-[#161514]/90 border border-[#c5a059]/20 rounded-[2px] p-4 md:p-3.5 shadow-md relative overflow-hidden backdrop-blur-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 text-[11px] font-mono tracking-wider">
          <div className="absolute inset-0.5 border border-[#c5a059]/5 pointer-events-none rounded-[1px]" />
          
          {/* Left status group with clear spacing and wrapping */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <div className="flex items-center gap-2 min-w-[160px]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c5a059]"></span>
              </span>
              <span className="text-[#c5a059]/60 uppercase text-[9px]">CONTROL:</span>
              <span className="text-ivory font-medium">Pointer Mode / 鼠标操控</span>
            </div>

            <div className="flex items-center gap-2 min-w-[180px] md:border-l md:border-[#c5a059]/15 md:pl-5">
              <span className="text-[#c5a059]/60 uppercase text-[9px]">INTERACTION:</span>
              <span className="text-neutral-400">Mouse & Keyboard / 键鼠触控</span>
            </div>
          </div>

          {/* Center dynamic guidance command, expands comfortably */}
          <div className="flex items-center gap-2.5 flex-1 min-w-[280px] border-t md:border-t-0 md:border-l border-[#c5a059]/15 pt-3 md:pt-0 md:pl-5">
            <Eye className="w-3.5 h-3.5 text-[#c5a059]/50 flex-shrink-0" />
            <span className="text-[#c5a059] font-light leading-relaxed">
              {command.zh} <span className="text-neutral-400 italic text-[10px] ml-1">({command.en})</span>
            </span>
          </div>

          {/* Right helper */}
          <div className="text-[#c5a059]/40 text-[9px] border-t md:border-t-0 md:border-l border-[#c5a059]/15 pt-3 md:pt-0 md:pl-5 self-start md:self-center min-w-[150px] md:text-right">
            Camera remains disabled / 摄像头未占用
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-2 mb-4 z-40">
      <div className="bg-[#161514]/90 border border-[#c5a059]/20 rounded-[2px] p-4 md:p-3.5 shadow-md relative overflow-hidden backdrop-blur-sm flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 text-[11px] font-mono tracking-wider">
        {/* Fine gold frame inside */}
        <div className="absolute inset-0.5 border border-[#c5a059]/5 pointer-events-none rounded-[1px]" />
        
        {/* Left status indicators grouped together */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {/* Sensor/Camera Status */}
          <div className="flex items-center gap-2 min-w-[150px]">
            <span className="relative flex h-1.5 w-1.5">
              {cameraStatus === 'active' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                cameraStatus === 'active' ? 'bg-emerald-500' :
                cameraStatus === 'initializing' ? 'bg-amber-400' :
                cameraStatus === 'denied' || cameraStatus === 'error' ? 'bg-rose-500' : 'bg-neutral-600'
              }`}></span>
            </span>
            <span className="text-[#c5a059]/60 uppercase text-[9px]">SENSOR:</span>
            <span className={`${statusLabels[cameraStatus]?.color} font-medium`}>
              {statusLabels[cameraStatus]?.label}
            </span>
          </div>

          {/* Active gesture */}
          <div className="flex items-center gap-2 min-w-[170px] sm:border-l sm:border-[#c5a059]/15 sm:pl-5">
            <span className="text-[#c5a059]/60 uppercase text-[9px]">GESTURE:</span>
            <span className={`${currentGesture !== 'none' ? 'text-white font-medium' : 'text-neutral-500'}`}>
              {gestureLabels[currentGesture]}
            </span>
          </div>

          {/* Scroll status */}
          <div className="flex items-center gap-2 min-w-[170px] sm:border-l sm:border-[#c5a059]/15 sm:pl-5">
            <span className="text-[#c5a059]/60 uppercase text-[9px]">SCROLL:</span>
            <span className={`${scrollStatus !== 'idle' ? 'text-[#c5a059] font-medium animate-pulse' : 'text-neutral-500'}`}>
              {scrollStatus === 'Scroll up' ? 'Scroll up / 向上滚动' : scrollStatus === 'Scroll down' ? 'Scroll down / 向下滚动' : 'Idle / 静止'}
            </span>
          </div>
        </div>

        {/* Dynamic dynamic guidance command */}
        <div className="flex items-center gap-2.5 flex-1 min-w-[280px] border-t lg:border-t-0 lg:border-l border-[#c5a059]/15 pt-3 lg:pt-0 lg:pl-5">
          <Eye className="w-3.5 h-3.5 text-[#c5a059]/50 flex-shrink-0" />
          <span className="text-[#c5a059] font-light leading-relaxed">
            {command.zh} <span className="text-neutral-400 italic text-[10px] ml-1">({command.en})</span>
          </span>
        </div>

        {/* Fallback info */}
        <div className="text-[#c5a059]/40 text-[9px] border-t lg:border-t-0 lg:border-l border-[#c5a059]/15 pt-3 lg:pt-0 lg:pl-5 self-start lg:self-center min-w-[150px] lg:text-right">
          Mouse and trackpad still available / 鼠标及触控板长效可用
        </div>
      </div>
    </div>
  );
}
