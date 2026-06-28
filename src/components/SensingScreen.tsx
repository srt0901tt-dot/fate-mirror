import React, { useEffect, useState } from 'react';
import { Camera, Eye, ShieldCheck, Waves } from 'lucide-react';
import { useGestureContext, useGlobalGestureControl } from '../context/GestureContext';

interface SensingScreenProps {
  onCalibrationComplete: (hasCamera: boolean) => void;
}

export default function SensingScreen({ onCalibrationComplete }: SensingScreenProps) {
  const { cameraStatus, currentGesture, startGlobalCamera } = useGestureContext();
  const [status, setStatus] = useState<'requesting' | 'sensing' | 'detected' | 'recognized' | 'ready'>('requesting');
  const [error, setError] = useState<string | null>(null);

  // Status updates in sequence for a ritual feeling
  const [cameraSensing, setCameraSensing] = useState(false);
  const [presenceDetected, setPresenceDetected] = useState(false);
  const [palmRecognized, setPalmRecognized] = useState(false);
  const [gestureReady, setGestureReady] = useState(false);

  // Handle global camera status changes
  useEffect(() => {
    if (cameraStatus === 'active') {
      setStatus('sensing');
      setCameraSensing(true);
    } else if (cameraStatus === 'denied') {
      setError('Webcam blocked or not found. Fate Mirror has successfully activated high-fidelity pointer and mouse tracking.');
      runSimulatedCalibration(false);
    } else if (cameraStatus === 'error') {
      setError('Camera unavailable. Fate Mirror has successfully activated high-fidelity pointer and mouse tracking.');
      runSimulatedCalibration(false);
    }
  }, [cameraStatus]);

  // Subscribe to global gesture events
  useGlobalGestureControl({
    onHandDetected: () => {
      setPresenceDetected(true);
      if (status === 'requesting' || status === 'sensing') {
        setStatus('detected');
      }
    },
    onOpenPalm: () => {
      setPresenceDetected(true);
      setPalmRecognized(true);
      setStatus('recognized');
      
      const timer = setTimeout(() => {
        setGestureReady(true);
        setStatus('ready');
      }, 1000);

      return () => clearTimeout(timer);
    },
    onPinch: () => {
      // Pinch confirms and continues to Draw page once hand is detected
      if (presenceDetected || status === 'ready') {
        onCalibrationComplete(true);
      }
    },
    onNoHand: () => {
      // Don't fully reset states to avoid flickering, but can update status if wanted
    }
  }, [presenceDetected, status]);

  const runSimulatedCalibration = (hasCam: boolean) => {
    setStatus('sensing');
    setCameraSensing(true);
    
    setTimeout(() => {
      setStatus('detected');
      setPresenceDetected(true);
      
      setTimeout(() => {
        setStatus('recognized');
        setPalmRecognized(true);
        
        setTimeout(() => {
          setStatus('ready');
          setGestureReady(true);
          
          setTimeout(() => {
            onCalibrationComplete(hasCam);
          }, 1000);
        }, 1200);
      }, 1500);
    }, 1500);
  };

  const handleManualStart = async () => {
    await startGlobalCamera();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-[#f5f2eb] relative overflow-hidden z-10">
      
      {/* Thin elegant border around the calibration stage */}
      <div className="absolute inset-4 md:inset-8 border border-[#c5a059]/10 rounded-[4px] pointer-events-none" />
      {/* Dynamic compass ticks on corners */}
      <div className="absolute top-10 left-10 text-[9px] font-mono tracking-[0.25em] text-[#c5a059]/40 uppercase select-none">
        ⌜ ritual calibration ⌝
      </div>
      <div className="absolute top-10 right-10 text-[9px] font-mono tracking-[0.25em] text-[#c5a059]/40 uppercase select-none">
        ⌜ sector 04 / mode 09 ⌝
      </div>
      <div className="absolute bottom-10 left-10 text-[9px] font-mono tracking-[0.25em] text-[#c5a059]/40 uppercase select-none">
        ⌞ lat 31.2304 / lng 121.4737 ⌟
      </div>
      <div className="absolute bottom-10 right-10 text-[9px] font-mono tracking-[0.25em] text-[#c5a059]/40 uppercase select-none">
        ⌞ fate mirror system ⌟
      </div>

      <div className="max-w-xl w-full text-center flex flex-col items-center gap-12 bg-[#161514]/90 p-8 md:p-12 border-2 border-[#c5a059]/15 rounded-[4px] shadow-[0_30px_70px_rgba(0,0,0,0.85)] relative overflow-hidden">
        {/* Double hairline inner boundary */}
        <div className="absolute inset-1 border border-[#c5a059]/5 pointer-events-none rounded-[2px]" />
        
        {/* Mystic Focal Sigil */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Animated concentric gold rings with slow, elegant motion */}
          <div className="absolute inset-0 rounded-full border border-[#c5a059]/20 animate-spin" style={{ animationDuration: '30s' }} />
          <div className="absolute inset-2 rounded-full border border-dashed border-[#c5a059]/30 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
          <div className="absolute inset-6 rounded-full border border-[#c5a059]/10" />
          <div className="absolute inset-10 rounded-full border-2 border-[#8c6a2c]/30" />
          
          {/* Faint crosshairs */}
          <div className="absolute w-full h-[1px] bg-[#c5a059]/10 pointer-events-none" />
          <div className="absolute h-full w-[1px] bg-[#c5a059]/10 pointer-events-none" />
          
          {/* Central Pulsing Mirror Eye */}
          <div className="w-16 h-16 rounded-full bg-[#121110] border-2 border-[#c5a059]/60 flex items-center justify-center z-10 shadow-[0_0_25px_rgba(197,160,89,0.2)] transition-all">
            <Eye className={`w-6 h-6 text-[#c5a059] transition-all duration-1000 ${cameraStatus !== 'idle' ? 'scale-110 opacity-100 drop-shadow-[0_0_8px_rgba(197,160,89,0.6)]' : 'opacity-60'}`} />
          </div>
        </div>

        <div className="space-y-3 relative z-10">
          <h2 className="font-serif text-2xl md:text-3xl tracking-[0.08em] font-light text-ivory">
            Sensing Calibration
          </h2>
          <div className="w-12 h-[1px] bg-[#c5a059]/40 mx-auto" />
          <p className="text-[10px] font-mono tracking-[0.2em] text-[#c5a059] uppercase">
            感知与手势校准仪式
          </p>
        </div>

        {cameraStatus === 'idle' ? (
          <div className="space-y-6 w-full max-w-sm relative z-10 text-center">
            <p className="text-xs font-sans font-light text-[#f5f2eb]/75 leading-relaxed">
              Fate Mirror aligns your reading using subtle pointer tracking or hand presence. Grant camera access to enable tactile space rotation. No image data will ever be stored or visible.
            </p>
            <p className="text-[11px] font-sans font-light text-[#c5a059]/70 italic leading-relaxed">
              命运之镜通过摄像头或指针微调命运齿轮。授权摄像头以开启掌心空间交互，我们绝不收集任何画面，亦无预览显示。
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <button
                id="grant-camera-btn"
                onClick={handleManualStart}
                className="group relative w-full py-4 bg-[#5f1f2a]/95 hover:bg-[#5f1f2a] border-2 border-[#c5a059]/40 hover:border-[#c5a059] text-ivory font-serif tracking-[0.2em] text-xs transition-all duration-700 uppercase rounded-[2px] shadow-lg"
              >
                <span className="relative z-10">Calibrate via Palm Camera / 开启摄像头感知</span>
                <div className="absolute inset-0.5 border border-[#c5a059]/10 group-hover:border-[#c5a059]/30 transition-colors pointer-events-none" />
              </button>
              
              <button
                id="bypass-camera-btn"
                onClick={() => onCalibrationComplete(false)}
                className="w-full py-2.5 bg-transparent hover:bg-[#121110] text-[#c5a059]/60 hover:text-[#c5a059] text-[10px] font-mono tracking-[0.2em] uppercase border border-transparent hover:border-[#c5a059]/10 rounded-[2px] transition-all duration-500"
              >
                Use Mouse / Pointer Fallback / 跳过并使用指针鼠标
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-sm space-y-5 relative z-10 text-left">
            {/* Status Bars with elegant double borders & gold progress */}
            <div className="space-y-3.5">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-[#f5f2eb]/70">1. Camera Sensing / 摄像头感知</span>
                  <span className={cameraSensing ? 'text-[#c5a059] font-medium' : 'text-[#f5f2eb]/20'}>
                    {cameraSensing ? 'ACTIVE / 开启' : 'PENDING'}
                  </span>
                </div>
                <div className="w-full h-[3px] bg-[#121110] border border-[#c5a059]/10 rounded-[1px] relative overflow-hidden">
                  <div className={`absolute top-0 left-0 h-full bg-gradient-to-r from-[#8c6a2c] to-[#c5a059] transition-all duration-1000 ${cameraSensing ? 'w-full' : 'w-0'}`} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-[#f5f2eb]/70">2. Presence Detected / 检测人体存在</span>
                  <span className={presenceDetected ? 'text-[#c5a059] font-medium' : 'text-[#f5f2eb]/20'}>
                    {presenceDetected ? 'DETECTED / 检测成功' : 'PENDING'}
                  </span>
                </div>
                <div className="w-full h-[3px] bg-[#121110] border border-[#c5a059]/10 rounded-[1px] relative overflow-hidden">
                  <div className={`absolute top-0 left-0 h-full bg-gradient-to-r from-[#8c6a2c] to-[#c5a059] transition-all duration-1000 ${presenceDetected ? 'w-full' : 'w-0'}`} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-[#f5f2eb]/70">3. Open Palm Recognized / 张开手掌确认</span>
                  <span className={palmRecognized ? 'text-[#c5a059] font-medium' : 'text-[#f5f2eb]/20'}>
                    {palmRecognized ? 'CONFIRMED / 已识别' : 'PENDING'}
                  </span>
                </div>
                <div className="w-full h-[3px] bg-[#121110] border border-[#c5a059]/10 rounded-[1px] relative overflow-hidden">
                  <div className={`absolute top-0 left-0 h-full bg-gradient-to-r from-[#8c6a2c] to-[#c5a059] transition-all duration-1000 ${palmRecognized ? 'w-full' : 'w-0'}`} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px] font-mono">
                  <span className="text-[#f5f2eb]/70">4. Gesture Ready / 手势反馈就绪</span>
                  <span className={gestureReady ? 'text-[#c5a059] font-medium animate-pulse' : 'text-[#f5f2eb]/20'}>
                    {gestureReady ? 'CALIBRATED / 就绪' : 'PENDING'}
                  </span>
                </div>
                <div className="w-full h-[3px] bg-[#121110] border border-[#c5a059]/10 rounded-[1px] relative overflow-hidden">
                  <div className={`absolute top-0 left-0 h-full bg-gradient-to-r from-[#8c6a2c] to-[#c5a059] transition-all duration-1000 ${gestureReady ? 'w-full' : 'w-0'}`} />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-[#5f1f2a]/10 border border-[#c5a059]/20 rounded-[2px] mt-4">
                <p className="text-[10px] font-mono text-[#c5a059]/80 leading-relaxed">
                  {error}
                </p>
              </div>
            )}

            {/* Mouse Fallback Continue Button */}
            <div className="pt-4 flex flex-col gap-2">
              <button
                id="calibration-continue-btn"
                onClick={() => onCalibrationComplete(presenceDetected)}
                className="group relative w-full py-3 bg-[#5f1f2a]/90 hover:bg-[#5f1f2a] border-2 border-[#c5a059]/40 hover:border-[#c5a059] text-ivory font-serif tracking-[0.2em] text-xs transition-all duration-300 uppercase rounded-[2px]"
              >
                <span className="relative z-10">Continue / 继续 ➔</span>
                <div className="absolute inset-0.5 border border-[#c5a059]/10 group-hover:border-[#c5a059]/30 transition-colors pointer-events-none" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
