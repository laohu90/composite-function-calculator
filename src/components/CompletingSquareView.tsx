import React, { useState, useMemo, useRef, useEffect } from 'react';
import { analyzeCompletingSquare, CompletingSquareResult } from '../utils/completingSquare';
import { MathView } from './MathView';
import { useI18n } from '../i18n/context';
import { KeywordBadge } from './KeywordBadge';
import {
  Compass,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Flame,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const CompletingSquareView: React.FC = () => {
  const { lang, t } = useI18n();

  // Quadratic coefficients: a x^2 + b x + c
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-4);
  const [c, setC] = useState<number>(12);

  // Interval
  const [useInterval, setUseInterval] = useState<boolean>(true);
  const [xMin, setXMin] = useState<number>(1);
  const [xMax, setXMax] = useState<number>(5);

  // Outer function
  const [outerType, setOuterType] = useState<
    'none' | 'log2' | 'ln' | 'sqrt' | 'exp2' | 'expHalf' | 'inv'
  >('log2');

  // Canvas for parabola
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculate analysis
  const analysis: CompletingSquareResult | { error: string } = useMemo(() => {
    try {
      if (a === 0) {
        return { error: '二次项系数 a 不能为 0（否则退化为一次函数）' };
      }
      const interval =
        useInterval && xMin < xMax ? { xMin, xMax } : null;
      return analyzeCompletingSquare(a, b, c, interval, outerType);
    } catch (e: any) {
      return { error: e.message || '计算出错' };
    }
  }, [a, b, c, useInterval, xMin, xMax, outerType]);

  // Quick preset loader
  const presets = [
    {
      label: '高考经典：y = log₂(x² - 4x + 12), x ∈ [1, 5]',
      a: 1,
      b: -4,
      c: 12,
      useInterval: true,
      xMin: 1,
      xMax: 5,
      outerType: 'log2' as const,
    },
    {
      label: '同增异减陷阱：y = (1/2)^(x² - 2x - 3), x ∈ [0, 4]',
      a: 1,
      b: -2,
      c: -3,
      useInterval: true,
      xMin: 0,
      xMax: 4,
      outerType: 'expHalf' as const,
    },
    {
      label: '根式复合：y = √( -x² + 4x + 5 ), 开口向下',
      a: -1,
      b: 4,
      c: 5,
      useInterval: true,
      xMin: -1,
      xMax: 5,
      outerType: 'sqrt' as const,
    },
    {
      label: '带分数配方：g(x) = 2x² - 8x + 7',
      a: 2,
      b: -8,
      c: 7,
      useInterval: false,
      xMin: 0,
      xMax: 4,
      outerType: 'none' as const,
    },
  ];

  const loadPreset = (p: typeof presets[0]) => {
    setA(p.a);
    setB(p.b);
    setC(p.c);
    setUseInterval(p.useInterval);
    setXMin(p.xMin);
    setXMax(p.xMax);
    setOuterType(p.outerType);
  };

  // Draw parabola preview
  useEffect(() => {
    if ('error' in analysis) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const { h, k, isOpenUpward } = analysis;
    const drawXMin = Math.min(h - 4, useInterval ? xMin - 1 : -4);
    const drawXMax = Math.max(h + 4, useInterval ? xMax + 1 : 4);

    // Compute y extent
    const f = (xVal: number) => a * xVal * xVal + b * xVal + c;
    const yVals = [f(drawXMin), f(drawXMax), k];
    if (useInterval) {
      yVals.push(f(xMin), f(xMax));
    }
    const drawYMin = Math.min(...yVals) - 2;
    const drawYMax = Math.max(...yVals) + 2;

    const toCanvasX = (x: number) =>
      ((x - drawXMin) / (drawXMax - drawXMin)) * (width - 60) + 30;
    const toCanvasY = (y: number) =>
      height - 30 - ((y - drawYMin) / (drawYMax - drawYMin)) * (height - 60);

    // Grid
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 1;

    // Draw coordinate axes
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.2;

    // X-axis
    const cyZero = toCanvasY(0);
    if (cyZero >= 0 && cyZero <= height) {
      ctx.beginPath();
      ctx.moveTo(10, cyZero);
      ctx.lineTo(width - 10, cyZero);
      ctx.stroke();
    }

    // Y-axis
    const cxZero = toCanvasX(0);
    if (cxZero >= 0 && cxZero <= width) {
      ctx.beginPath();
      ctx.moveTo(cxZero, 10);
      ctx.lineTo(cxZero, height - 10);
      ctx.stroke();
    }

    // Draw axis of symmetry (dashed)
    const cxAxis = toCanvasX(h);
    ctx.setLineDash([5, 4]);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cxAxis, 15);
    ctx.lineTo(cxAxis, height - 15);
    ctx.stroke();
    ctx.setLineDash([]);

    // Label axis of symmetry
    ctx.fillStyle = '#b45309';
    ctx.font = '11px sans-serif';
    ctx.fillText(`对称轴 x=${h.toFixed(1)}`, cxAxis + 4, 25);

    // Highlight interval region on background if enabled
    if (useInterval && xMin < xMax) {
      const cxLeft = toCanvasX(xMin);
      const cxRight = toCanvasX(xMax);
      ctx.fillStyle = 'rgba(238, 242, 255, 0.6)';
      ctx.fillRect(cxLeft, 10, cxRight - cxLeft, height - 20);

      ctx.strokeStyle = '#6366f1';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(cxLeft, 10);
      ctx.lineTo(cxLeft, height - 10);
      ctx.moveTo(cxRight, 10);
      ctx.lineTo(cxRight, height - 10);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#4f46e5';
      ctx.fillText(`[${xMin}`, cxLeft - 10, height - 10);
      ctx.fillText(`${xMax}]`, cxRight - 5, height - 10);
    }

    // Plot parabola curve
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    let started = false;
    const step = (drawXMax - drawXMin) / 160;

    for (let x = drawXMin; x <= drawXMax; x += step) {
      const y = f(x);
      const cx = toCanvasX(x);
      const cy = toCanvasY(y);
      if (!started) {
        ctx.moveTo(cx, cy);
        started = true;
      } else {
        ctx.lineTo(cx, cy);
      }
    }
    ctx.stroke();

    // Plot highlighted interval curve if enabled
    if (useInterval && xMin < xMax) {
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      started = false;
      const intStep = (xMax - xMin) / 100;
      for (let x = xMin; x <= xMax; x += intStep) {
        const y = f(x);
        const cx = toCanvasX(x);
        const cy = toCanvasY(y);
        if (!started) {
          ctx.moveTo(cx, cy);
          started = true;
        } else {
          ctx.lineTo(cx, cy);
        }
      }
      ctx.stroke();
    }

    // Vertex Point
    const cxVertex = toCanvasX(h);
    const cyVertex = toCanvasY(k);
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(cxVertex, cyVertex, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#991b1b';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(
      `顶点 (${h.toFixed(1)}, ${k.toFixed(1)})`,
      cxVertex + 6,
      cyVertex - 6
    );
  }, [analysis, a, b, c, useInterval, xMin, xMax]);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-indigo-50 text-indigo-700 mb-2.5">
              <Compass className="w-4 h-4" />
              <span>{t.tabCompletingSquare}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {t.sqTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {t.sqSubtitle}
            </p>
          </div>

          {/* Quick Presets Buttons */}
          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => loadPreset(p)}
                className="text-xs sm:text-sm bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200 hover:border-indigo-300 px-3 py-1.5 rounded-lg transition-all font-medium text-left cursor-pointer"
              >
                {p.label.split(/[:：]/)[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs row with larger fonts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 pt-5 border-t border-slate-100">
          {/* Inner quadratic params */}
          <div className="space-y-3">
            <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              {t.sqParamSection}
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-slate-500 font-mono block">a (≠0)</label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(parseFloat(e.target.value) || 0)}
                  className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-md p-1.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 font-mono block">系数 b</label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(parseFloat(e.target.value) || 0)}
                  className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-md p-1.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 font-mono block">常数 c</label>
                <input
                  type="number"
                  value={c}
                  onChange={(e) => setC(parseFloat(e.target.value) || 0)}
                  className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-md p-1.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              当前内层式: <MathView math={`g(x) = ${a}x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`} />
            </div>
          </div>

          {/* Interval constraint */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                ② 自变量限定区间 x ∈ [m, n]
              </span>
              <label className="text-xs text-indigo-600 font-medium flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useInterval}
                  onChange={(e) => setUseInterval(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                启用区间限制
              </label>
            </div>

            {useInterval ? (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-500 font-mono block">区间下限 m</label>
                  <input
                    type="number"
                    value={xMin}
                    onChange={(e) => setXMin(parseFloat(e.target.value) || 0)}
                    className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-md p-1.5"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 font-mono block">区间上限 n</label>
                  <input
                    type="number"
                    value={xMax}
                    onChange={(e) => setXMax(parseFloat(e.target.value) || 0)}
                    className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-md p-1.5"
                  />
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 p-2 bg-slate-50 rounded border border-dashed border-slate-200">
                未启用区间限制，将在全体实数域 ℝ 上分析抛物线极值。
              </div>
            )}
          </div>

          {/* Outer function wrapper */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-700 block">
              ③ 外层复合函数 y = f(u)
            </span>
            <select
              value={outerType}
              onChange={(e) => setOuterType(e.target.value as any)}
              className="w-full text-xs font-medium border border-slate-300 rounded-md p-2 bg-white focus:border-indigo-500"
            >
              <option value="none">仅拆解配方过程（不复合外层）</option>
              <option value="log2">y = log₂(u) (对数增函数，底数2 &gt; 1)</option>
              <option value="ln">y = ln(u) (自然对数增函数)</option>
              <option value="sqrt">y = √u (二次根式函数)</option>
              <option value="exp2">y = 2^u (指数增函数)</option>
              <option value="expHalf">y = (1/2)^u (指数减函数，经典同增异减考题)</option>
              <option value="inv">y = 1/u (反比例函数)</option>
            </select>
            <div className="text-[11px] text-slate-500">
              💡 复合外层将自动检验真数/根号定义域及“同增异减”单调性推导
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Content */}
      {'error' in analysis ? (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-500" />
          {analysis.error}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Step-by-Step Completing the Square */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  配方法完整推导步骤 (Step-by-Step Breakdown)
                </span>
                <span className="text-xs font-normal text-slate-500">
                  标准高考大题规范
                </span>
              </h3>

              <div className="space-y-4">
                {analysis.steps.map((st, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="space-y-1.5 flex-1">
                        <div className="text-xs font-semibold text-slate-900">
                          {st.title}
                        </div>
                        <div className="text-xs text-slate-600">
                          {st.description}
                        </div>
                        <div className="py-1 px-3 bg-white rounded border border-slate-200 overflow-x-auto">
                          <MathView math={st.latex} block />
                        </div>
                        {st.note && (
                          <div className="text-[11px] text-indigo-700 font-medium">
                            📝 {st.note}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interval Extrema Analysis */}
            {analysis.intervalAnalysis && (
              <div className="bg-white rounded-xl border border-blue-200 p-6 shadow-xs">
                <h3 className="text-sm font-bold text-blue-950 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  区间 [x_min, x_max] 内层值域分析（极值讨论）
                </h3>
                <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-2">
                  <p className="leading-relaxed">
                    {analysis.intervalAnalysis.explanation}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-blue-100 font-mono text-[11px]">
                    <div className="bg-white p-2 rounded border border-blue-100">
                      左端点: g({analysis.intervalAnalysis.xMin}) = {analysis.intervalAnalysis.yLeft.toFixed(2)}
                    </div>
                    <div className="bg-white p-2 rounded border border-blue-100">
                      右端点: g({analysis.intervalAnalysis.xMax}) = {analysis.intervalAnalysis.yRight.toFixed(2)}
                    </div>
                    <div className="bg-white p-2 rounded border border-blue-100 font-bold text-blue-900">
                      顶点: g({analysis.h.toFixed(2)}) = {analysis.k.toFixed(2)}
                    </div>
                  </div>
                  <div className="pt-2 text-center bg-white rounded p-2 border border-blue-200">
                    <span className="text-xs font-semibold text-slate-600 mr-2">内层函数值域：</span>
                    <MathView math={analysis.intervalAnalysis.rangeLatex} />
                  </div>
                </div>
              </div>
            )}

            {/* Outer Function Monotonicity Chain */}
            {analysis.outerAnalysis && (
              <div className="bg-white rounded-xl border border-purple-200 p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                  <span className="text-sm font-bold text-purple-950 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-purple-600" />
                    外层复合联动：{analysis.outerAnalysis.outerName}
                  </span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded font-mono">
                    <MathView math={analysis.outerAnalysis.outerFormula} />
                  </span>
                </div>

                {!analysis.outerAnalysis.isValidDomain ? (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <div>
                      <span className="font-bold">复合失败（超出定义域）：</span>
                      {analysis.outerAnalysis.domainViolationReason}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs text-slate-700">
                    <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-100 leading-relaxed">
                      <span className="font-bold text-purple-900">“同增异减”判定口诀：</span>
                      {analysis.outerAnalysis.monotonicityExplanation}
                    </div>

                    {analysis.outerAnalysis.finalRange && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
                        <span className="text-xs font-semibold text-emerald-800 mr-2">
                          最终复合函数的值域：
                        </span>
                        <span className="font-mono font-bold text-emerald-950 text-sm">
                          <MathView math={analysis.outerAnalysis.finalRange.latex} />
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Col: Geometric Visualizer & Summary Cards */}
          <div className="space-y-4">
            {/* Parabola Canvas */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                二次抛物线几何图像与区间映射
              </h4>
              <div className="bg-slate-50/70 p-2 rounded-lg border border-slate-100 flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={240}
                  className="max-w-full h-auto"
                />
              </div>
              <div className="mt-2 text-[11px] text-slate-500 space-y-1">
                <div>• <span className="text-red-600 font-bold">红点</span>：抛物线顶点坐标</div>
                <div>• <span className="text-amber-600 font-bold">虚线</span>：对称轴方程</div>
                <div>• <span className="text-blue-600 font-bold">蓝实线</span>：所选区间内的函数图像</div>
              </div>
            </div>

            {/* Quick Summary Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2.5">
              <span className="font-bold text-slate-800 block text-xs">
                【核心几何特征速查】
              </span>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">开口方向：</span>
                <span className="font-semibold text-slate-900">
                  {analysis.isOpenUpward ? '开口向上 (a > 0)' : '开口向下 (a < 0)'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">对称轴方程：</span>
                <span className="font-mono font-bold text-amber-700">
                  {analysis.axisOfSymmetry}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">顶点坐标：</span>
                <span className="font-mono font-bold text-red-700">
                  {analysis.vertex}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">单调转折点：</span>
                <span className="font-mono text-slate-700">
                  x = {analysis.h.toFixed(2)}
                </span>
              </div>
            </div>

            {/* High school exam tips */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-1.5">
              <span className="font-bold flex items-center gap-1 text-amber-800">
                <HelpCircle className="w-3.5 h-3.5" />
                高中生易错题型解题秘诀
              </span>
              <p className="text-[11px] leading-relaxed text-amber-800">
                <strong>秘诀1：</strong> 求解复合函数值域时，必须先求出内层函数的值域作为外层函数的“新自变量定义域”，切勿直接求导或忽视中间取值限制！
              </p>
              <p className="text-[11px] leading-relaxed text-amber-800">
                <strong>秘诀2：</strong> 二次函数在闭区间 <MathView math="[m, n]" /> 上的最值，首要看对称轴 <MathView math="x = -\frac{b}{2a}" /> 是否在区间内部，分类讨论是高考大题的最高频得分点！
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
