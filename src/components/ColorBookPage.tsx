import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Eraser, 
  Paintbrush,
  Ship,
  School,
  Cat,
  Home,
  TrainFront,
  PenTool,
  Pencil,
  Highlighter,
  Trophy,
  RotateCcw,
  Home as HomeIcon,
  Palette,
  Undo2
} from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { AdBanner } from './AdBanner';

interface ColorBookPageProps {
  onBack: () => void;
}

type BrushStyle = 'marker' | 'pencil' | 'neon' | 'sparkle' | 'smudge' | 'gradient';

const PAGES = [
  { id: 'boat', name: 'Magic Boat', icon: Ship, color: 'bg-indigo-400' },
  { id: 'school', name: 'Dream School', icon: School, color: 'bg-amber-400' },
  { id: 'cat', name: 'Cool Cat', icon: Cat, color: 'bg-rose-400' },
  { id: 'hut', name: 'Secret Hut', icon: Home, color: 'bg-emerald-400' },
  { id: 'train', name: 'Fast Train', icon: TrainFront, color: 'bg-violet-400' },
];

const COLORS = [
  { name: 'Berry', value: '#FF4D6D' },
  { name: 'Sky', value: '#4361EE' },
  { name: 'Mint', value: '#06D6A0' },
  { name: 'Lemon', value: '#FFD166' },
  { name: 'Orange', value: '#FB8500' },
  { name: 'Lavender', value: '#B79CED' },
  { name: 'Coral', value: '#FF9E00' },
  { name: 'Cloud', value: '#FFFFFF' },
  { name: 'Coal', value: '#1A1A1A' },
  { name: 'Gold', value: '#FFD700' },
];

const BRUSH_STYLES = [
  { id: 'marker', name: 'Pro Marker', icon: PenTool, desc: 'Smooth & Bold' },
  { id: 'pencil', name: 'Art Pencil', icon: Pencil, desc: 'Textured & Fine' },
  { id: 'neon', name: 'Glow Pen', icon: Highlighter, desc: 'Magic Light' },
  { id: 'sparkle', name: 'Sparkle', icon: Sparkles, desc: 'Fairy Dust' },
  { id: 'smudge', name: 'Smudge', icon: RotateCcw, desc: 'Blend Colors' },
  { id: 'gradient', name: 'Prism', icon: Palette, desc: 'Color Flow' },
];

export const ColorBookPage = ({ onBack }: ColorBookPageProps) => {
  const { playSound } = useSound();
  const [currentPage, setCurrentPage] = useState(0);
  const [brushColor, setBrushColor] = useState(COLORS[0].value);
  const [brushSize, setBrushSize] = useState(12);
  const [brushStyle, setBrushStyle] = useState<BrushStyle>('marker');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showTrophy, setShowTrophy] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const lastX = useRef(0);
  const lastY = useRef(0);

  const current = PAGES[currentPage];

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.toDataURL();
    setHistory(prev => [...prev.slice(-10), data]); // Keep last 10 steps
  };

  const undo = () => {
    if (history.length === 0) return;
    playSound('pop');
    const newHistory = [...history];
    const lastState = newHistory.pop();
    setHistory(newHistory);

    const canvas = canvasRef.current;
    if (!canvas || !lastState) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.src = newHistory.length > 0 ? newHistory[newHistory.length - 1] : '';
    img.onload = () => {
      if (newHistory.length > 0) {
        ctx.drawImage(img, 0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      }
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const ratio = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    ctx.scale(ratio, ratio);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setHistory([]);
  }, [currentPage]);

  const applyBrushProperties = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    ctx.setLineDash([]);
    ctx.filter = 'none';

    if (brushStyle === 'neon') {
      ctx.shadowBlur = 15;
      ctx.shadowColor = brushColor;
      ctx.lineWidth = brushSize * 1.5;
    } else if (brushStyle === 'pencil') {
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = Math.max(1, brushSize / 4);
    } else if (brushStyle === 'sparkle') {
      ctx.globalAlpha = 0.8;
      ctx.setLineDash([1, 10]);
    } else if (brushStyle === 'smudge') {
      ctx.globalAlpha = 0.4;
      ctx.lineWidth = brushSize * 2;
      ctx.filter = 'blur(4px)';
    } else if (brushStyle === 'gradient') {
      ctx.lineWidth = brushSize;
    }
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'targetTouches' in e ? e.targetTouches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'targetTouches' in e ? e.targetTouches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    saveToHistory();
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    lastX.current = x;
    lastY.current = y;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    
    applyBrushProperties(ctx);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    if (brushStyle === 'sparkle') {
      const dist = Math.hypot(x - lastX.current, y - lastY.current);
      if (dist > 5) {
        ctx.fillStyle = brushColor;
        ctx.beginPath();
        ctx.arc(x, y, brushSize / 3, 0, Math.PI * 2);
        ctx.fill();
        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = brushColor;
        ctx.fill();
        lastX.current = x;
        lastY.current = y;
      }
    } else if (brushStyle === 'smudge') {
      // Simple smudge: draw a blurry version of the path using current colors as a blend
      ctx.strokeStyle = brushColor;
      ctx.lineCap = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
      lastX.current = x;
      lastY.current = y;
    } else if (brushStyle === 'gradient') {
      const gradient = ctx.createLinearGradient(lastX.current, lastY.current, x, y);
      gradient.addColorStop(0, brushColor);
      gradient.addColorStop(1, '#FFFFFF'); // Fade to white for luxury feel
      ctx.strokeStyle = gradient;
      ctx.lineTo(x, y);
      ctx.stroke();
      lastX.current = x;
      lastY.current = y;
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => setIsDrawing(false);

  const clear = () => {
    playSound('pop');
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const next = () => {
    playSound('pop');
    setCurrentPage((prev) => (prev + 1) % PAGES.length);
  };

  const prev = () => {
    playSound('pop');
    setCurrentPage((prev) => (prev - 1 + PAGES.length) % PAGES.length);
  };

  const PageIcon = current.icon;

  return (
    <div className="h-full flex flex-col bg-[#FAF9FF] relative overflow-hidden font-sans">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />

      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9, translateY: 2 }}
            onClick={() => { playSound('pop'); onBack(); }}
            className="bg-white/80 backdrop-blur-md text-gray-800 p-2.5 rounded-2xl shadow-sm border border-white/50"
          >
            <ChevronLeft size={22} strokeWidth={3} />
          </motion.button>
          <div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              Studio <Palette size={18} className="text-kids-purple" />
            </h1>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest -mt-1">Creator Mode</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex bg-white/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/50 font-black text-[10px] text-gray-400 gap-3 mr-2">
            <span>P{currentPage + 1}</span>
            <div className="w-px h-3 bg-gray-200" />
            <span>HQ CANVAS</span>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => { playSound('sparkle'); setShowTrophy(true); }}
            className="bg-black text-white px-4 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 shadow-lg shadow-black/10 active:scale-95"
          >
            <Sparkles size={14} className="text-yellow-400 fill-current" />
            PUBLISH
          </motion.button>
        </div>
      </div>

      {/* Main UI */}
      <div className="flex-1 flex flex-col px-4 min-h-0 relative">
        
        {/* Floating Top Control Bar */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex gap-2">
             <motion.button
               whileTap={{ scale: 0.9 }}
               onClick={prev}
               className="bg-white/90 backdrop-blur-sm p-1.5 rounded-xl shadow-sm border border-white/50 text-gray-500"
             >
               <ChevronLeft size={18} />
             </motion.button>
             <motion.button
               whileTap={{ scale: 0.9 }}
               onClick={next}
               className="bg-white/90 backdrop-blur-sm p-1.5 rounded-xl shadow-sm border border-white/50 text-gray-500"
             >
               <ChevronRight size={18} />
             </motion.button>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={undo}
              disabled={history.length === 0}
              className={`p-1.5 rounded-xl transition-all shadow-sm border border-white/50 flex items-center gap-1.5 px-3 font-bold text-[10px] ${history.length > 0 ? 'bg-white/90 text-gray-800' : 'bg-gray-50 text-gray-300'}`}
            >
              <Undo2 size={14} /> UNDO
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={clear}
              className="bg-rose-50/90 backdrop-blur-sm text-rose-500 p-1.5 px-3 rounded-xl shadow-sm border border-white/50 font-bold text-[10px] flex items-center gap-1.5"
            >
              <RotateCcw size={14} /> CLEAR
            </motion.button>
          </div>
        </div>

        {/* Canvas Area Container */}
        <div className="flex-1 flex gap-4 min-h-0 relative">
          {/* Left Sidebar: Specialized Tools */}
          <div className="flex flex-col gap-3 w-16 sm:w-20">
            <div className="flex-1 bg-white/60 backdrop-blur-xl rounded-[32px] p-2.5 shadow-xl border border-white/60 flex flex-col items-center justify-between py-6">
               <div className="flex flex-col gap-3 items-center">
                 {BRUSH_STYLES.map((tool) => (
                   <div key={tool.id} className="relative group">
                     <motion.button
                       whileTap={{ scale: 0.85 }}
                       onClick={() => {
                         playSound('pop');
                         setBrushStyle(tool.id as BrushStyle);
                       }}
                       className={`p-3.5 rounded-2xl transition-all duration-300 ${brushStyle === tool.id ? 'bg-black text-white shadow-xl shadow-black/20' : 'bg-white/40 text-gray-400 hover:bg-white'}`}
                     >
                       <tool.icon size={22} strokeWidth={2.5} />
                     </motion.button>
                     <div className="absolute left-full ml-3 px-2 py-1 bg-black text-white text-[8px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[100] uppercase tracking-tighter">
                       {tool.name}
                     </div>
                   </div>
                 ))}
               </div>

               <div className="flex flex-col gap-4 items-center">
                 {[10, 20, 30].map((size) => (
                   <motion.button
                     key={size}
                     whileTap={{ scale: 0.8 }}
                     onClick={() => setBrushSize(size)}
                     className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${brushSize === size ? 'border-black bg-white shadow-sm' : 'border-transparent bg-gray-100 grayscale'}`}
                   >
                     <div 
                      className={`rounded-full ${brushSize === size ? 'bg-black' : 'bg-gray-300'}`} 
                      style={{ width: size/4.5, height: size/4.5 }} 
                     />
                   </motion.button>
                 ))}
               </div>
            </div>
          </div>

          {/* Luxury Canvas area */}
          <div className="flex-1 relative bg-white rounded-[48px] shadow-2xl border-4 border-white/50 overflow-hidden cursor-crosshair group studio-canvas-wrap">
            <div className="absolute inset-0 bg-[#fdfdfd]" />
            
            {/* Guide Image - Styled more like a luxury outline */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none select-none transition-opacity group-hover:opacity-[0.05]">
               <PageIcon size={320} strokeWidth={1.5} />
            </div>

            <canvas
              ref={canvasRef}
              className="w-full h-full touch-none relative z-10"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />

            {/* Current Active Brush Indicator Overlay */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
               <motion.div
                 animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="bg-white/40 backdrop-blur-xl p-3 rounded-2xl border border-white/30 shadow-lg"
               >
                 <div className="text-[8px] font-black text-gray-400 mb-1 leading-none uppercase tracking-widest text-center">Active</div>
                 {(() => {
                   const ActiveStyle = BRUSH_STYLES.find(s => s.id === brushStyle);
                   const ActiveIcon = ActiveStyle?.icon || Paintbrush;
                   return (
                     <div className="flex items-center justify-center relative">
                        <ActiveIcon size={24} style={{ color: brushColor }} strokeWidth={3} />
                        {brushStyle === 'neon' && (
                          <div className="absolute inset-0 blur-md opacity-50" style={{ backgroundColor: brushColor }} />
                        )}
                     </div>
                   );
                 })()}
               </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Color Palette */}
        <div className="my-4 mt-6">
          <div className="relative group">
            <div className="absolute -top-4 left-6 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[8px] font-black text-gray-400 border border-white/50 uppercase tracking-widest shadow-sm">
              Pigment Library
            </div>
            
            <div className="bg-white/60 backdrop-blur-xl rounded-[40px] p-5 shadow-2xl border border-white/70 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-4 min-w-max px-2">
                {COLORS.map((c) => (
                  <motion.button
                    key={c.name}
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => {
                      playSound('pop');
                      setBrushColor(c.value);
                    }}
                    className={`relative w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center transition-all ${brushColor === c.value ? 'scale-110' : ''}`}
                  >
                    <div 
                      className={`w-full h-full rounded-2xl shadow-lg transition-all duration-300 ${brushColor === c.value ? 'ring-offset-2 ring-2 ring-black' : 'hover:shadow-xl'}`}
                      style={{ backgroundColor: c.value }}
                    />
                    {brushColor === c.value && (
                      <motion.div 
                        layoutId="activeColor"
                        className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-black"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Section - More subtle padding */}
      <div className="px-5 pb-4 relative z-[60]">
        <AdBanner />
      </div>

      <AnimatePresence>
        {showTrophy && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 bg-kids-purple/90 flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.2, type: "spring" }}
              className="bg-kids-yellow p-8 rounded-[50px] shadow-2xl border-8 border-white mb-8"
            >
              <Trophy size={100} className="text-white" strokeWidth={3} />
            </motion.div>
            <h2 className="text-5xl font-black text-white mb-2">BEAUTIFUL!</h2>
            <p className="text-white/80 font-bold text-xl mb-12 uppercase tracking-widest">Your masterpiece is ready!</p>
            
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <motion.button
                whileTap={{ scale: 0.9, translateY: 4 }}
                onClick={() => setShowTrophy(false)}
                className="bg-white text-kids-purple px-8 py-4 rounded-full font-black text-xl shadow-xl border-b-8 border-purple-100 flex items-center justify-center gap-3"
              >
                <Sparkles className="fill-current" />
                KEEP COLORING
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.9, translateY: 4 }}
                onClick={() => { playSound('pop'); onBack(); }}
                className="bg-kids-blue text-white px-8 py-4 rounded-full font-black text-xl shadow-xl border-b-8 border-blue-700 flex items-center justify-center gap-3"
              >
                <HomeIcon className="fill-current" />
                GO HOME
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
