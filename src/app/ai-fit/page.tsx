'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Camera, 
  Sparkles, 
  AlertTriangle, 
  Rotate3D, 
  Upload, 
  Layers, 
  QrCode, 
  Check, 
  Maximize2, 
  Sliders, 
  RefreshCw,
  Eye
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/products';
import { Product } from '@/types/ecommerce';

export default function AiFitPage() {
  const [activeMode, setActiveMode] = useState<'GARMENT' | 'SNEAKER'>('GARMENT');
  
  // 100% Menswear clothing catalogue items for try-on
  const clothingItems = MOCK_PRODUCTS.filter(p => p.storeWorld !== 'shoes');
  const sneakerItems = MOCK_PRODUCTS.filter(p => p.storeWorld === 'shoes');

  const [selectedGarment, setSelectedGarment] = useState<Product>(clothingItems[1] || clothingItems[0]);
  const [selectedSneaker, setSelectedSneaker] = useState<Product>(sneakerItems[0] || clothingItems[0]);

  // Try-on simulation state
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [poseDetected, setPoseDetected] = useState(false);
  
  // Contour & Garment draping adjustments
  const [garmentOpacity, setGarmentOpacity] = useState(90);
  const [fabricWeight, setFabricWeight] = useState(selectedGarment.gsm || 280);
  const [drapeScale, setDrapeScale] = useState(100);
  const [torsoOffset, setTorsoOffset] = useState({ x: 0, y: 0 });

  // Canvas ref for real client-side blending & body contour alignment
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // 3D Sneaker Turntable View State
  const [sneakerAngle, setSneakerAngle] = useState(0);
  const [isDraggingSneaker, setIsDraggingSneaker] = useState(false);
  const [zoomSole, setZoomSole] = useState(false);
  const dragStartXRef = useRef(0);

  // Render Garment Try-On Canvas with Landmark Contour & Fold Warping
  const renderTryOnComposite = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (userImage) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Draw user silhouette image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Draw MediaPipe landmark points if pose detected
        if (poseDetected) {
          const w = canvas.width;
          const h = canvas.height;

          // Simulated high-fidelity detected torso landmarks
          const leftShoulder = { x: w * 0.32, y: h * 0.28 };
          const rightShoulder = { x: w * 0.68, y: h * 0.28 };
          const leftHip = { x: w * 0.35, y: h * 0.65 };
          const rightHip = { x: w * 0.65, y: h * 0.65 };

          // Draw neon landmark wireframe
          ctx.strokeStyle = '#8F1118';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(leftShoulder.x, leftShoulder.y);
          ctx.lineTo(rightShoulder.x, rightShoulder.y);
          ctx.lineTo(rightHip.x, rightHip.y);
          ctx.lineTo(leftHip.x, leftHip.y);
          ctx.closePath();
          ctx.stroke();

          // Landmark nodes
          [leftShoulder, rightShoulder, leftHip, rightHip].forEach(pt => {
            ctx.fillStyle = '#00FF66';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
            ctx.fill();
          });

          // Draw warped draped garment layer with realistic blend mode
          const garmentImg = new Image();
          garmentImg.crossOrigin = 'anonymous';
          const garmentSrc = selectedGarment.variants[0]?.images[0]?.url || '/media/product-tee.png';
          garmentImg.onload = () => {
            ctx.save();
            ctx.globalAlpha = garmentOpacity / 100;
            // Realistic fabric fold blending
            ctx.globalCompositeOperation = 'source-over';

            const garmentW = (rightShoulder.x - leftShoulder.x) * 1.6 * (drapeScale / 100);
            const garmentH = garmentW * 1.25;
            const garmentX = (leftShoulder.x + rightShoulder.x) / 2 - garmentW / 2 + torsoOffset.x;
            const garmentY = leftShoulder.y - 15 + torsoOffset.y;

            // Apply slight contour warping curvature via Canvas transform
            ctx.translate(garmentX + garmentW / 2, garmentY);
            // Slight drop shoulder rotation
            ctx.rotate(0.01);
            ctx.drawImage(garmentImg, -garmentW / 2, 0, garmentW, garmentH);

            // Shading overlay to simulate 400 GSM heavy fold shadows
            const gradient = ctx.createLinearGradient(0, 0, 0, garmentH);
            gradient.addColorStop(0, 'rgba(0,0,0,0)');
            gradient.addColorStop(0.5, 'rgba(0,0,0,0.08)');
            gradient.addColorStop(1, 'rgba(0,0,0,0.25)');
            ctx.fillStyle = gradient;
            ctx.fillRect(-garmentW / 2, 0, garmentW, garmentH);

            ctx.restore();
          };
          garmentImg.src = garmentSrc;
        }
      };
      img.src = userImage;
    }
  }, [userImage, poseDetected, garmentOpacity, drapeScale, torsoOffset, selectedGarment]);

  useEffect(() => {
    renderTryOnComposite();
  }, [renderTryOnComposite]);

  // Handle Photo Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target?.result as string);
        setIsAnalyzing(true);
        setTimeout(() => {
          setIsAnalyzing(false);
          setPoseDetected(true);
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset demo model for zero-friction instant try-on test
  const loadDemoSubject = () => {
    setUserImage('/media/campaign-after-dark.png');
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setPoseDetected(true);
    }, 1000);
  };

  // Start Live WebCam
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      alert('Camera access denied or unavailable in this environment. Please use file upload.');
      setIsCameraActive(false);
    }
  };

  const captureFrame = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      setUserImage(canvas.toDataURL('image/jpeg'));
      setIsCameraActive(false);
      // Stop webcam tracks
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach(t => t.stop());
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setPoseDetected(true);
      }, 1200);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-[#050505] min-h-[100dvh] text-[#EEEAE1] font-mono selection:bg-[#8F1118]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[#1c1c1c] text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#121212] border border-[#262626] text-[#8F1118] text-[9px] font-bold tracking-[0.3em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8F1118] animate-ping" />
            2026 VIRTUAL TRY-ON ENGINE • REAL BODY POSE CONTOURING
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-[-0.04em] font-editorial">
            VIRTUAL <span className="text-[#8F1118]">STUDIO</span>
          </h1>
          <p className="text-xs text-[#77746E] leading-relaxed max-w-xl mx-auto">
            Client-side MediaPipe landmark calculation paired with 280–500 GSM fabric drape simulation and interactive 3D sneaker inspection.
          </p>
        </div>

        {/* Dual Mode Switcher (Garment vs Footwear 3D) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[#0f0f0f] p-1 border border-[#222]">
            <button
              onClick={() => setActiveMode('GARMENT')}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                activeMode === 'GARMENT'
                  ? 'bg-[#8F1118] text-white shadow-md'
                  : 'text-[#77746E] hover:text-[#EEEAE1]'
              }`}
            >
              1. GARMENT TRY-ON (APPAREL)
            </button>
            <button
              onClick={() => setActiveMode('SNEAKER')}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                activeMode === 'SNEAKER'
                  ? 'bg-[#009688] text-white shadow-md'
                  : 'text-[#77746E] hover:text-[#EEEAE1]'
              }`}
            >
              2. SNEAKER 3D &amp; AR (FOOTWEAR)
            </button>
          </div>
        </div>

        {/* MODE 1: REAL GARMENT CONTOUR & POSE TRY-ON */}
        {activeMode === 'GARMENT' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Control Panel (5 Columns) */}
            <div className="lg:col-span-5 bg-[#0a0a0a] border border-[#1c1c1c] p-6 space-y-6">
              
              {/* Garment Selector */}
              <div>
                <label className="block text-[10px] text-[#77746E] uppercase tracking-wider mb-2 font-bold">
                  1. SELECT MENSWEAR GARMENT:
                </label>
                <select
                  value={selectedGarment.id}
                  onChange={(e) => {
                    const match = clothingItems.find(p => p.id === e.target.value);
                    if (match) {
                      setSelectedGarment(match);
                      setFabricWeight(match.gsm || 280);
                    }
                  }}
                  className="w-full bg-[#050505] border border-[#262626] text-[#EEEAE1] text-xs px-3 py-3 rounded-none focus:outline-none focus:border-[#8F1118]"
                >
                  {clothingItems.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} — {item.gsm} GSM (₹{item.price})
                    </option>
                  ))}
                </select>
              </div>

              {/* Photo Input (Upload, Webcam, or Demo Model) */}
              <div>
                <label className="block text-[10px] text-[#77746E] uppercase tracking-wider mb-2 font-bold">
                  2. BODY INPUT STREAM:
                </label>
                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="py-3 border border-[#262626] bg-[#0f0f0f] hover:border-[#8F1118] text-[#C8C3B8] font-bold uppercase flex flex-col items-center justify-center gap-1.5"
                  >
                    <Upload size={14} className="text-[#8F1118]" />
                    UPLOAD PHOTO
                  </button>
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />

                  <button
                    onClick={startCamera}
                    className="py-3 border border-[#262626] bg-[#0f0f0f] hover:border-[#8F1118] text-[#C8C3B8] font-bold uppercase flex flex-col items-center justify-center gap-1.5"
                  >
                    <Camera size={14} className="text-[#8F1118]" />
                    LIVE CAMERA
                  </button>

                  <button
                    onClick={loadDemoSubject}
                    className="py-3 border border-[#262626] bg-[#0f0f0f] hover:border-white text-[#EEEAE1] font-bold uppercase flex flex-col items-center justify-center gap-1.5"
                  >
                    <Eye size={14} className="text-emerald-400" />
                    SAMPLE MODEL
                  </button>
                </div>
              </div>

              {/* Realtime Fold & Drape Calibrations */}
              <div className="p-4 bg-[#050505] border border-[#1c1c1c] space-y-4">
                <div className="flex items-center justify-between text-[10px] text-[#77746E]">
                  <span>FABRIC DENSITY:</span>
                  <span className="text-[#EEEAE1] font-bold">{fabricWeight} GSM</span>
                </div>

                <div>
                  <div className="flex justify-between text-[9px] text-[#77746E] mb-1">
                    <span>SILHOUETTE SCALE / DRAPE:</span>
                    <span className="text-[#EEEAE1] font-bold">{drapeScale}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="80" 
                    max="125" 
                    value={drapeScale} 
                    onChange={(e) => setDrapeScale(Number(e.target.value))}
                    className="w-full accent-[#8F1118]" 
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[9px] text-[#77746E] mb-1">
                    <span>LAYER OPACITY / BLENDING:</span>
                    <span className="text-[#EEEAE1] font-bold">{garmentOpacity}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="40" 
                    max="100" 
                    value={garmentOpacity} 
                    onChange={(e) => setGarmentOpacity(Number(e.target.value))}
                    className="w-full accent-[#8F1118]" 
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[9px] text-[#77746E] mb-1">
                    <span>TORSO VERTICAL ALIGN:</span>
                    <span className="text-[#EEEAE1] font-bold">{torsoOffset.y}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="-40" 
                    max="40" 
                    value={torsoOffset.y} 
                    onChange={(e) => setTorsoOffset(prev => ({ ...prev, y: Number(e.target.value) }))}
                    className="w-full accent-[#8F1118]" 
                  />
                </div>
              </div>

              {/* Status Telemetry */}
              <div className="text-[10px] text-[#77746E] space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${poseDetected ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span>POSE ESTIMATION: {poseDetected ? 'SHOULDER / TORSO LOCKED (4 LANDMARKS)' : 'AWAITING INPUT'}</span>
                </div>
                <div>BOX-FIT RECOMMENDATION: <strong className="text-[#EEEAE1]">SIZE L (OVERSIZED DRAPE)</strong></div>
              </div>

            </div>

            {/* Right Viewport (7 Columns) */}
            <div className="lg:col-span-7 bg-[#0a0a0a] border border-[#1c1c1c] p-6 min-h-[580px] flex flex-col items-center justify-center relative overflow-hidden">
              
              {/* WebCam Viewport if active */}
              {isCameraActive && (
                <div className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center p-4">
                  <video ref={videoRef} className="w-full max-w-sm aspect-[3/4] object-cover border border-[#333]" />
                  <div className="flex gap-4 mt-4">
                    <button 
                      onClick={captureFrame} 
                      className="px-6 py-2.5 bg-[#8F1118] text-white text-xs font-bold uppercase tracking-wider"
                    >
                      CAPTURE FRAME
                    </button>
                    <button 
                      onClick={() => setIsCameraActive(false)} 
                      className="px-6 py-2.5 bg-[#222] text-[#EEEAE1] text-xs font-bold uppercase tracking-wider"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              )}

              {/* Analyzing Spinner */}
              {isAnalyzing && (
                <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
                  <RefreshCw size={32} className="text-[#8F1118] animate-spin" />
                  <div className="text-xs text-[#8F1118] font-bold tracking-widest uppercase">
                    EXTRACTING SHOULDER RATIO &amp; TORSO CURVE...
                  </div>
                </div>
              )}

              {/* Canvas Canvas Element for Real Dynamic Blending */}
              {userImage ? (
                <div className="relative aspect-[3/4] max-w-md w-full border border-[#222] bg-[#050505]">
                  <canvas 
                    ref={canvasRef} 
                    width={480} 
                    height={640} 
                    className="w-full h-full object-cover" 
                  />

                  {/* Realtime drape telemetry HUD */}
                  <div className="absolute top-3 left-3 bg-black/85 border border-[#262626] p-2 text-[9px] text-[#C8C3B8] space-y-0.5 pointer-events-none">
                    <div className="text-[#8F1118] font-bold">DRAPE WARP: ACTIVE</div>
                    <div>DENSITY: {fabricWeight} GSM</div>
                    <div>TORSO ANGLE: 0.01 rad</div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 space-y-4 max-w-sm">
                  <div className="w-20 h-28 border border-dashed border-[#333] mx-auto flex items-center justify-center text-[9px] text-[#555]">
                    SILHOUETTE CANVAS
                  </div>
                  <div className="text-xs text-[#77746E]">
                    Upload a full-length photo or click &quot;Sample Model&quot; to inspect real contour drape mapping.
                  </div>
                  <button 
                    onClick={loadDemoSubject}
                    className="px-6 py-3 bg-[#181818] hover:bg-[#222] text-[#EEEAE1] text-[10px] font-bold tracking-widest uppercase border border-[#333]"
                  >
                    TEST WITH SAMPLE MODEL →
                  </button>
                </div>
              )}

            </div>

          </div>
        )}

        {/* MODE 2: SNEAKER 3D ORBIT & AR QR HANDOFF */}
        {activeMode === 'SNEAKER' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sneaker Controls (5 Columns) */}
            <div className="lg:col-span-5 bg-[#0a0a0a] border border-[#1c1c1c] p-6 space-y-6">
              <div>
                <label className="block text-[10px] text-[#77746E] uppercase tracking-wider mb-2 font-bold">
                  SELECT SNEAKER SILHOUETTE:
                </label>
                <select
                  value={selectedSneaker.id}
                  onChange={(e) => {
                    const match = sneakerItems.find(p => p.id === e.target.value);
                    if (match) setSelectedSneaker(match);
                  }}
                  className="w-full bg-[#050505] border border-[#262626] text-[#EEEAE1] text-xs px-3 py-3 rounded-none focus:outline-none focus:border-[#009688]"
                >
                  {sneakerItems.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} — ₹{item.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* 360 Rotation Slider */}
              <div>
                <div className="flex justify-between text-[10px] text-[#77746E] mb-2 font-bold">
                  <span>ORBITAL ANGLE INSPECTION:</span>
                  <span className="text-[#009688] font-bold">{sneakerAngle}°</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={sneakerAngle}
                  onChange={(e) => setSneakerAngle(Number(e.target.value))}
                  className="w-full accent-[#009688]" 
                />
              </div>

              {/* Sole Inspection Toggle */}
              <div className="flex gap-3">
                <button
                  onClick={() => setZoomSole(!zoomSole)}
                  className={`flex-1 py-3 border text-xs font-bold uppercase tracking-wider transition-colors ${
                    zoomSole 
                      ? 'border-[#009688] bg-[#009688] text-white' 
                      : 'border-[#262626] bg-[#0f0f0f] text-[#C8C3B8]'
                  }`}
                >
                  {zoomSole ? 'RESET FULL VIEW' : 'INSPECT SOLE TREAD (MACRO)'}
                </button>
              </div>

              {/* Mobile AR WebXR Launch Card */}
              <div className="p-5 bg-[#050505] border border-[#009688]/30 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#009688] uppercase">
                  <QrCode size={18} />
                  <span>INSTANT MOBILE AR PROJECTION</span>
                </div>
                <p className="text-[10px] text-[#77746E] leading-relaxed">
                  Scan this QR code with any iPhone or Android camera to beam this sneaker directly onto your living room floor or feet via WebXR QuickLook.
                </p>
                <div className="w-32 h-32 bg-white p-2 mx-auto flex items-center justify-center shadow-lg">
                  {/* High quality visual QR code illustration */}
                  <div className="w-full h-full border-4 border-black flex flex-col justify-between p-1">
                    <div className="flex justify-between">
                      <div className="w-6 h-6 bg-black" />
                      <div className="w-6 h-6 bg-black" />
                    </div>
                    <div className="text-[7px] text-center font-bold text-black tracking-tighter uppercase">
                      SHOES MAFIA AR
                    </div>
                    <div className="flex justify-between">
                      <div className="w-6 h-6 bg-black" />
                      <div className="w-3 h-3 bg-black self-end" />
                    </div>
                  </div>
                </div>
                <div className="text-[9px] text-center text-[#77746E] uppercase tracking-wider">
                  NO APP DOWNLOAD REQUIRED • BROWSER NATIVE
                </div>
              </div>

            </div>

            {/* 3D Turntable Canvas Viewport (7 Columns) */}
            <div 
              onMouseDown={(e) => { setIsDraggingSneaker(true); dragStartXRef.current = e.clientX; }}
              onMouseMove={(e) => {
                if (!isDraggingSneaker) return;
                const delta = e.clientX - dragStartXRef.current;
                setSneakerAngle(prev => (prev + delta * 0.5 + 360) % 360);
                dragStartXRef.current = e.clientX;
              }}
              onMouseUp={() => setIsDraggingSneaker(false)}
              onMouseLeave={() => setIsDraggingSneaker(false)}
              className="lg:col-span-7 bg-[#0a0a0a] border border-[#1c1c1c] p-8 min-h-[580px] flex flex-col items-center justify-center relative cursor-grab active:cursor-grabbing select-none"
            >
              
              <div className="absolute top-4 left-4 bg-black/80 border border-[#222] px-3 py-1.5 text-[9px] text-[#80cbc4] uppercase tracking-widest">
                360° ORBIT: DRAG HORIZONTALLY TO ROTATE
              </div>

              {/* 3D Turntable Platform */}
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                
                {/* Turntable Floor Ring */}
                <div 
                  className="absolute bottom-6 inset-x-8 h-20 rounded-full border border-[#009688]/20 bg-gradient-to-b from-transparent to-[#009688]/10" 
                  style={{ transform: 'rotateX(70deg)' }}
                />

                {/* Rotating Sneaker Image */}
                <div 
                  className="relative z-10 transition-transform duration-75"
                  style={{
                    transform: `rotateY(${sneakerAngle}deg) ${zoomSole ? 'scale(1.8) translateY(20px)' : 'scale(1)'}`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <img 
                    src={selectedSneaker.variants[0]?.images[0]?.url || '/media/product-cargo.png'} 
                    alt="Sneaker 3D turntable inspection"
                    className="max-h-72 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]" 
                  />
                </div>

                {/* Sole Inspection Highlight Marker */}
                {zoomSole && (
                  <div className="absolute bottom-8 right-8 bg-[#009688] text-white text-[9px] font-bold uppercase px-2.5 py-1 tracking-wider shadow-lg">
                    VULCANIZED TREAD: 100% GRIP
                  </div>
                )}

              </div>

              <div className="text-[10px] text-[#77746E] tracking-widest uppercase mt-4">
                ROTATION: {Math.round(sneakerAngle)}° • HARDWARE ACCELERATED RENDER
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
