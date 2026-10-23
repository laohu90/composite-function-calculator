import React, { useRef, useEffect } from 'react';
import { evaluateRaw, sanitizeMathExpr } from '../utils/mathParser';

interface InteractiveGraphProps {
  innerExpr: string;
  outerExpr: string;
  x0: number;
  onX0Change?: (newX: number) => void;
  innerVal: number | null;
  outerVal: number | null;
}

export const InteractiveGraph: React.FC<InteractiveGraphProps> = ({
  innerExpr,
  outerExpr,
  x0,
  onX0Change,
  innerVal,
  outerVal,
}) => {
  const canvasInnerRef = useRef<HTMLCanvasElement | null>(null);
  const canvasOuterRef = useRef<HTMLCanvasElement | null>(null);

  // Draw inner function u = g(x)
  useEffect(() => {
    const canvas = canvasInnerRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Coordinate settings
    const xMin = -6;
    const xMax = 6;
    const yMin = -6;
    const yMax = 8;

    const toCanvasX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const toCanvasY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

    // Draw grid
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(x), 0);
      ctx.lineTo(toCanvasX(x), height);
      ctx.stroke();
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      ctx.beginPath();
      ctx.moveTo(0, toCanvasY(y));
      ctx.lineTo(width, toCanvasY(y));
      ctx.stroke();
    }

    // Draw Axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;

    // X Axis
    ctx.beginPath();
    ctx.moveTo(0, toCanvasY(0));
    ctx.lineTo(width, toCanvasY(0));
    ctx.stroke();

    // Y Axis (represents u)
    ctx.beginPath();
    ctx.moveTo(toCanvasX(0), 0);
    ctx.lineTo(toCanvasX(0), height);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '11px sans-serif';
    ctx.fillText('x (自变量)', width - 55, toCanvasY(0) - 8);
    ctx.fillText('u (中间量)', toCanvasX(0) + 8, 14);

    // Plot curve u = g(x)
    ctx.strokeStyle = '#0284c7'; // Sky/Blue
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;

    const step = (xMax - xMin) / 200;
    for (let x = xMin; x <= xMax; x += step) {
      try {
        const u = evaluateRaw(innerExpr, { x });
        if (isFinite(u) && u >= yMin - 10 && u <= yMax + 10) {
          const cx = toCanvasX(x);
          const cy = toCanvasY(u);
          if (!started) {
            ctx.moveTo(cx, cy);
            started = true;
          } else {
            ctx.lineTo(cx, cy);
          }
        } else {
          started = false;
        }
      } catch {
        started = false;
      }
    }
    ctx.stroke();

    // Highlight current point (x0, innerVal)
    if (innerVal !== null && isFinite(innerVal)) {
      const cx = toCanvasX(x0);
      const cy = toCanvasY(innerVal);

      // Dashed lines to axes
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1.2;

      // Vertical line to x-axis
      ctx.beginPath();
      ctx.moveTo(cx, toCanvasY(0));
      ctx.lineTo(cx, cy);
      ctx.stroke();

      // Horizontal line to u-axis
      ctx.beginPath();
      ctx.moveTo(toCanvasX(0), cy);
      ctx.lineTo(cx, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Point circle
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.arc(cx, cy, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Tooltip label
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(
        `(${x0}, ${innerVal.toFixed(2)})`,
        Math.min(Math.max(cx + 8, 10), width - 80),
        Math.min(Math.max(cy - 8, 20), height - 10)
      );
    }
  }, [innerExpr, x0, innerVal]);

  // Draw outer function y = f(u)
  useEffect(() => {
    const canvas = canvasOuterRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Coordinate settings (horizontal is u, vertical is y)
    const uMin = -6;
    const uMax = 8;
    const yMin = -6;
    const yMax = 8;

    const toCanvasU = (u: number) => ((u - uMin) / (uMax - uMin)) * width;
    const toCanvasY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

    // Grid
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let u = Math.ceil(uMin); u <= Math.floor(uMax); u++) {
      ctx.beginPath();
      ctx.moveTo(toCanvasU(u), 0);
      ctx.lineTo(toCanvasU(u), height);
      ctx.stroke();
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      ctx.beginPath();
      ctx.moveTo(0, toCanvasY(y));
      ctx.lineTo(width, toCanvasY(y));
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;

    // Horizontal axis (u)
    ctx.beginPath();
    ctx.moveTo(0, toCanvasY(0));
    ctx.lineTo(width, toCanvasY(0));
    ctx.stroke();

    // Vertical axis (y)
    ctx.beginPath();
    ctx.moveTo(toCanvasU(0), 0);
    ctx.lineTo(toCanvasU(0), height);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#64748b';
    ctx.font = '11px sans-serif';
    ctx.fillText('u (中间量)', width - 55, toCanvasY(0) - 8);
    ctx.fillText('y (最终值)', toCanvasU(0) + 8, 14);

    // Plot curve y = f(u)
    ctx.strokeStyle = '#9333ea'; // Violet/Purple
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;

    const step = (uMax - uMin) / 200;
    for (let u = uMin; u <= uMax; u += step) {
      try {
        const y = evaluateRaw(outerExpr, { u, x: u });
        if (isFinite(y) && y >= yMin - 10 && y <= yMax + 10) {
          const cu = toCanvasU(u);
          const cy = toCanvasY(y);
          if (!started) {
            ctx.moveTo(cu, cy);
            started = true;
          } else {
            ctx.lineTo(cu, cy);
          }
        } else {
          started = false;
        }
      } catch {
        started = false;
      }
    }
    ctx.stroke();

    // Highlight current point (u0, outerVal)
    if (innerVal !== null && outerVal !== null && isFinite(outerVal) && isFinite(innerVal)) {
      const cu = toCanvasU(innerVal);
      const cy = toCanvasY(outerVal);

      // Dashed lines
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#9333ea';
      ctx.lineWidth = 1.2;

      // Vertical line to u-axis
      ctx.beginPath();
      ctx.moveTo(cu, toCanvasY(0));
      ctx.lineTo(cu, cy);
      ctx.stroke();

      // Horizontal line to y-axis
      ctx.beginPath();
      ctx.moveTo(toCanvasU(0), cy);
      ctx.lineTo(cu, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Point circle
      ctx.fillStyle = '#9333ea';
      ctx.beginPath();
      ctx.arc(cu, cy, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text label
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(
        `(${innerVal.toFixed(2)}, ${outerVal.toFixed(2)})`,
        Math.min(Math.max(cu + 8, 10), width - 85),
        Math.min(Math.max(cy - 8, 20), height - 10)
      );
    }
  }, [outerExpr, innerVal, outerVal]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
            函数图像联动传导视图（内层值作为外层输入）
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            观察当自变量 x 变化时，内层输出 u 如何实时作为外层函数的横坐标输入！
          </p>
        </div>
        {onX0Change && (
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="text-xs font-medium text-slate-600">自变量 x:</span>
            <input
              type="range"
              min="-4"
              max="4"
              step="0.1"
              value={x0}
              onChange={(e) => onX0Change(parseFloat(e.target.value))}
              className="w-24 sm:w-32 accent-indigo-600 cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-indigo-700 min-w-8">
              {x0.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        {/* Inner Graph */}
        <div className="border border-sky-100 rounded-lg p-3 bg-sky-50/20">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
              内层函数: u = g(x)
            </span>
            <span className="text-xs text-slate-500 font-mono">
              x = {x0} → u = {innerVal !== null && isFinite(innerVal) ? innerVal.toFixed(2) : '无解'}
            </span>
          </div>
          <div className="relative flex justify-center bg-white rounded-md border border-slate-100 p-1">
            <canvas
              ref={canvasInnerRef}
              width={340}
              height={220}
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* Outer Graph */}
        <div className="border border-purple-100 rounded-lg p-3 bg-purple-50/20">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
              外层函数: y = f(u)
            </span>
            <span className="text-xs text-slate-500 font-mono">
              u = {innerVal !== null && isFinite(innerVal) ? innerVal.toFixed(2) : '—'} → y = {outerVal !== null && isFinite(outerVal) ? outerVal.toFixed(2) : '无解'}
            </span>
          </div>
          <div className="relative flex justify-center bg-white rounded-md border border-slate-100 p-1">
            <canvas
              ref={canvasOuterRef}
              width={340}
              height={220}
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
