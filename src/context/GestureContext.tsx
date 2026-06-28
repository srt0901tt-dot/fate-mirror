import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export interface GestureCallbacks {
  onLeft?: () => void;
  onRight?: () => void;
  onPinch?: () => void;
  onOpenPalm?: () => void;
  onHandDetected?: () => void;
  onNoHand?: () => void;
}

interface GestureContextType {
  cameraStatus: 'idle' | 'initializing' | 'active' | 'denied' | 'error';
  currentGesture: 'none' | 'hand-detected' | 'open-palm' | 'pinch';
  rawX: number;
  rawY: number;
  dx: number;
  dy: number;
  scrollStatus: 'idle' | 'Scroll up' | 'Scroll down';
  gestureActive: boolean;
  setGestureActive: (active: boolean) => void;
  startGlobalCamera: () => Promise<void>;
  registerCallbacks: (callbacks: GestureCallbacks) => void;
  unregisterCallbacks: (callbacks: GestureCallbacks) => void;
  controlMode: 'gesture' | 'mouse';
  setControlMode: (mode: 'gesture' | 'mouse') => void;
}

const GestureContext = createContext<GestureContextType | null>(null);

export function useGestureContext() {
  const context = useContext(GestureContext);
  if (!context) {
    throw new Error('useGestureContext must be used within a GestureProvider');
  }
  return context;
}

export function useGlobalGestureControl(callbacks: GestureCallbacks, dependencies: any[] = []) {
  const { registerCallbacks, unregisterCallbacks } = useGestureContext();
  const savedCallbacks = useRef(callbacks);

  useEffect(() => {
    savedCallbacks.current = callbacks;
  }, [callbacks]);

  useEffect(() => {
    const cb: GestureCallbacks = {
      onLeft: () => savedCallbacks.current.onLeft?.(),
      onRight: () => savedCallbacks.current.onRight?.(),
      onPinch: () => savedCallbacks.current.onPinch?.(),
      onOpenPalm: () => savedCallbacks.current.onOpenPalm?.(),
      onHandDetected: () => savedCallbacks.current.onHandDetected?.(),
      onNoHand: () => savedCallbacks.current.onNoHand?.(),
    };
    registerCallbacks(cb);
    return () => {
      unregisterCallbacks(cb);
    };
  }, [registerCallbacks, unregisterCallbacks, ...dependencies]);
}

export function GestureProvider({ children }: { children: React.ReactNode }) {
  const [controlMode, setControlModeState] = useState<'gesture' | 'mouse'>('mouse');
  const [cameraStatus, setCameraStatusState] = useState<'idle' | 'initializing' | 'active' | 'denied' | 'error'>('idle');
  const [currentGesture, setCurrentGesture] = useState<'none' | 'hand-detected' | 'open-palm' | 'pinch'>('none');
  const [gestureActive, setGestureActiveState] = useState<boolean>(true);
  
  const [rawX, setRawX] = useState<number>(0.5);
  const [rawY, setRawY] = useState<number>(0.5);
  const [dx, setDx] = useState<number>(0);
  const [dy, setDy] = useState<number>(0);
  const [scrollStatus, setScrollStatusState] = useState<'idle' | 'Scroll up' | 'Scroll down'>('idle');

  // To prevent closures over state causing camera recreate/restarts, use refs for loop values
  const gestureActiveRef = useRef(gestureActive);
  useEffect(() => {
    gestureActiveRef.current = gestureActive;
  }, [gestureActive]);

  const cameraStatusRef = useRef<'idle' | 'initializing' | 'active' | 'denied' | 'error'>('idle');
  const setCameraStatus = useCallback((status: 'idle' | 'initializing' | 'active' | 'denied' | 'error') => {
    cameraStatusRef.current = status;
    setCameraStatusState(status);
  }, []);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const handsRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);

  // Set of registered callbacks
  const callbacksRef = useRef<Set<GestureCallbacks>>(new Set());

  const registerCallbacks = useCallback((cb: GestureCallbacks) => {
    callbacksRef.current.add(cb);
  }, []);

  const unregisterCallbacks = useCallback((cb: GestureCallbacks) => {
    callbacksRef.current.delete(cb);
  }, []);

  const setGestureActive = useCallback((active: boolean) => {
    setGestureActiveState(active);
  }, []);

  // Trigger actions
  const triggerLeft = useCallback(() => {
    callbacksRef.current.forEach(cb => cb.onLeft?.());
  }, []);

  const triggerRight = useCallback(() => {
    callbacksRef.current.forEach(cb => cb.onRight?.());
  }, []);

  const triggerPinch = useCallback(() => {
    callbacksRef.current.forEach(cb => cb.onPinch?.());
  }, []);

  const triggerOpenPalm = useCallback(() => {
    callbacksRef.current.forEach(cb => cb.onOpenPalm?.());
  }, []);

  const triggerHandDetected = useCallback(() => {
    callbacksRef.current.forEach(cb => cb.onHandDetected?.());
  }, []);

  const triggerNoHand = useCallback(() => {
    callbacksRef.current.forEach(cb => cb.onNoHand?.());
  }, []);

  const lastXCoord = useRef<number | null>(null);
  const lastYCoord = useRef<number | null>(null);
  const smoothedX = useRef<number | null>(null);
  const smoothedY = useRef<number | null>(null);
  const lastSwipeTime = useRef<number>(0);
  const accumulatedDelta = useRef<number>(0);
  
  const lastPinchTime = useRef<number>(0);
  const lastOpenPalmTime = useRef<number>(0);

  const targetScrollVelocity = useRef<number>(0);
  const currentScrollVelocity = useRef<number>(0);

  useEffect(() => {
    let rafId: number;
    const updateScroll = () => {
      currentScrollVelocity.current = currentScrollVelocity.current * 0.85 + targetScrollVelocity.current * 0.15;
      
      if (Math.abs(currentScrollVelocity.current) > 0.1) {
        window.scrollBy({ top: currentScrollVelocity.current, behavior: 'auto' });
        
        if (currentScrollVelocity.current > 1.2) {
          setScrollStatusState('Scroll down');
        } else if (currentScrollVelocity.current < -1.2) {
          setScrollStatusState('Scroll up');
        } else {
          setScrollStatusState('idle');
        }
      } else {
        setScrollStatusState('idle');
      }
      
      rafId = requestAnimationFrame(updateScroll);
    };
    
    rafId = requestAnimationFrame(updateScroll);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const startGlobalCamera = useCallback(async () => {
    if (cameraStatusRef.current === 'active' || cameraStatusRef.current === 'initializing') {
      return;
    }

    setCameraStatus('initializing');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise<void>((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play().then(() => resolve());
            };
          }
        });
      }

      const win = window as any;
      if (win.Hands && win.Camera) {
        const hands = new win.Hands({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.55,
          minTrackingConfidence: 0.55
        });

        hands.onResults((results: any) => {
          if (!gestureActiveRef.current) {
            setCurrentGesture('none');
            return;
          }

          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            triggerHandDetected();
            const landmarks = results.multiHandLandmarks[0];

            // 1. Open palm detection based on fingertip vs knuckle y position
            const indexExtended = landmarks[8].y < landmarks[6].y;
            const middleExtended = landmarks[12].y < landmarks[10].y;
            const ringExtended = landmarks[16].y < landmarks[14].y;
            const pinkyExtended = landmarks[20].y < landmarks[18].y;

            let extendedFingers = 0;
            if (indexExtended) extendedFingers++;
            if (middleExtended) extendedFingers++;
            if (ringExtended) extendedFingers++;
            if (pinkyExtended) extendedFingers++;

            const isOpenPalm = extendedFingers >= 3;

            // 2. Pinch detection (Thumb tip 4 vs Index tip 8)
            const thumbTip = landmarks[4];
            const indexTip = landmarks[8];
            const dist = Math.sqrt(
              Math.pow(thumbTip.x - indexTip.x, 2) +
              Math.pow(thumbTip.y - indexTip.y, 2)
            );
            const isPinch = dist < 0.04;

            // Set gesture state based on priority rules
            let resolvedGesture: 'none' | 'hand-detected' | 'open-palm' | 'pinch' = 'hand-detected';
            if (isPinch) {
              resolvedGesture = 'pinch';
            } else if (isOpenPalm) {
              resolvedGesture = 'open-palm';
            }
            setCurrentGesture(resolvedGesture);

            // Cooldown logic for page transitions
            const now = Date.now();
            if (resolvedGesture === 'pinch') {
              if (now - lastPinchTime.current > 1500) { // 1.5s cooldown
                lastPinchTime.current = now;
                triggerPinch();
              }
            } else if (resolvedGesture === 'open-palm') {
              if (now - lastOpenPalmTime.current > 1500) { // 1.5s cooldown
                lastOpenPalmTime.current = now;
                triggerOpenPalm();
              }
            }

            // 3. Coordinate smoothing & Horizontal / Vertical tracking
            const rawXVal = 1 - landmarks[9].x; // Mirroring x coordinate
            const rawYVal = landmarks[9].y;

            const alpha = 0.35;
            if (smoothedX.current === null) {
              smoothedX.current = rawXVal;
            } else {
              smoothedX.current = smoothedX.current * (1 - alpha) + rawXVal * alpha;
            }

            if (smoothedY.current === null) {
              smoothedY.current = rawYVal;
            } else {
              smoothedY.current = smoothedY.current * (1 - alpha) + rawYVal * alpha;
            }

            setRawX(smoothedX.current);
            setRawY(smoothedY.current);

            if (lastXCoord.current !== null && lastYCoord.current !== null) {
              const localDx = smoothedX.current - lastXCoord.current;
              const localDy = smoothedY.current - lastYCoord.current;
              
              setDx(localDx);
              setDy(localDy);

              // Distinguish horizontal vs vertical
              const isMostlyHorizontal = Math.abs(localDx) > Math.abs(localDy) * 1.3;
              const isMostlyVertical = Math.abs(localDy) > Math.abs(localDx) * 1.3;

              if (isMostlyHorizontal && Math.abs(localDx) > 0.001) {
                accumulatedDelta.current += localDx;
                
                if (now - lastSwipeTime.current > 800) { // 800ms swipe cooldown
                  if (accumulatedDelta.current > 0.07) {
                    triggerRight();
                    lastSwipeTime.current = now;
                    accumulatedDelta.current = 0;
                  } else if (accumulatedDelta.current < -0.07) {
                    triggerLeft();
                    lastSwipeTime.current = now;
                    accumulatedDelta.current = 0;
                  }
                }
              }

              // Decay swipe accumulation
              accumulatedDelta.current *= 0.85;

              // Vertical page scrolling
              if (isMostlyVertical && Math.abs(localDy) > 0.002) {
                targetScrollVelocity.current = localDy * -2200; // Hand up scrolls down
              } else {
                targetScrollVelocity.current = 0;
              }
            } else {
              setDx(0);
              setDy(0);
              targetScrollVelocity.current = 0;
            }

            lastXCoord.current = smoothedX.current;
            lastYCoord.current = smoothedY.current;

          } else {
            setCurrentGesture('none');
            setDx(0);
            setDy(0);
            targetScrollVelocity.current = 0;
            lastXCoord.current = null;
            lastYCoord.current = null;
            smoothedX.current = null;
            smoothedY.current = null;
            triggerNoHand();
          }
        });

        const cameraInstance = new win.Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current && gestureActiveRef.current) {
              try {
                await hands.send({ image: videoRef.current });
              } catch (e) {
                // Ignore silent errors
              }
            }
          },
          width: 640,
          height: 480
        });

        await cameraInstance.start();

        handsRef.current = hands;
        cameraRef.current = cameraInstance;
        setCameraStatus('active');
      } else {
        setCameraStatus('error');
      }

    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraStatus('denied');
      } else {
        setCameraStatus('error');
      }
      setControlModeState('mouse');
    }
  }, [triggerHandDetected, triggerNoHand, triggerPinch, triggerOpenPalm, triggerLeft, triggerRight, setCameraStatus]);

  const stopGlobalCamera = useCallback(() => {
    if (cameraRef.current) {
      try { cameraRef.current.stop(); } catch(e) {}
      cameraRef.current = null;
    }
    if (handsRef.current) {
      try { handsRef.current.close(); } catch(e) {}
      handsRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraStatus('idle');
  }, [setCameraStatus]);

  const setControlMode = useCallback((mode: 'gesture' | 'mouse') => {
    setControlModeState(mode);
  }, []);

  // Manage camera based on controlMode ONLY when controlMode changes to prevent cyclic re-evaluation of camera initialization
  useEffect(() => {
    if (controlMode === 'gesture') {
      startGlobalCamera();
    } else {
      stopGlobalCamera();
    }
  }, [controlMode, startGlobalCamera, stopGlobalCamera]);

  // Handle unmount cleanup
  useEffect(() => {
    return () => {
      if (cameraRef.current) {
        try { cameraRef.current.stop(); } catch(e) {}
      }
      if (handsRef.current) {
        try { handsRef.current.close(); } catch(e) {}
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <GestureContext.Provider
      value={{
        cameraStatus,
        currentGesture,
        rawX,
        rawY,
        dx,
        dy,
        scrollStatus,
        gestureActive,
        setGestureActive,
        startGlobalCamera,
        registerCallbacks,
        unregisterCallbacks,
        controlMode,
        setControlMode
      }}
    >
      {children}
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        playsInline
        muted
      />
    </GestureContext.Provider>
  );
}
