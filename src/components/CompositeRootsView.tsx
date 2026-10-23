import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MathView } from './MathView';
import { useI18n } from '../i18n/context';
import { KeywordBadge } from './KeywordBadge';
import { Target, Layers, ArrowRight, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export const CompositeRootsView: React.FC = () => {
  const { lang, t } = useI18n();
  const isZh = lang === 'zh';

  // Inner function: quadratic g(x) = a x^2 + b x + c
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-4);
  const [c, setC] = useState<number>(3); // g(x) = x^2 - 4x + 3

  // Outer target roots u_targets: e.g. f(u) = 0 gives roots u1, u2
  const [targetRootsInput, setTargetRootsInput] = useState<string>('0, 3');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Parse target roots
  const targetRoots = useMemo(() => {
    return targetRootsInput
      .split(/[,，\s]+/)
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));
  }, [targetRootsInput]);

  // For each target root u_i, solve g(x) = u_i
  // a x^2 + b x + (c - u_i) = 0
  const rootsAnalysis = useMemo(() => {
    if (a === 0) {
      return { error: isZh ? '二次项系数 a 不能为 0' : 'Leading coefficient a cannot be 0' };
    }

    let totalRootsCount = 0;
    const details = targetRoots.map((u_i) => {
      const cPrime = c - u_i;
      const delta = b * b - 4 * a * cPrime;

      let xRoots: number[] = [];
      let explanation = '';

      if (delta > 0) {
        const x1 = (-b - Math.sqrt(delta)) / (2 * a);
        const x2 = (-b + Math.sqrt(delta)) / (2 * a);
        xRoots = [x1, x2].sort((m, n) => m - n);
        totalRootsCount += 2;
        explanation = isZh
          ? `判别式 Δ = ${delta.toFixed(2)} > 0，水平线 y = ${u_i} 与抛物线相交于 2 个不同实根`
          : `Discriminant Δ = ${delta.toFixed(2)} > 0: horizontal line y = ${u_i} intersects parabola at 2 real roots`;
      } else if (Math.abs(delta) < 1e-6) {
        const x1 = -b / (2 * a);
        xRoots = [x1];
        totalRootsCount += 1;
        explanation = isZh
          ? `判别式 Δ = 0，水平线 y = ${u_i} 恰好相切于抛物线顶点，有 1 个二重实根`
          : `Discriminant Δ = 0: horizontal line y = ${u_i} is tangent to the vertex, exactly 1 double real root`;
      } else {
        xRoots = [];
        explanation = isZh
          ? `判别式 Δ = ${delta.toFixed(2)} < 0，水平线 y = ${u_i} 与抛物线无交点`
          : `Discriminant Δ = ${delta.toFixed(2)} < 0: horizontal line y = ${u_i} has 0 intersections with the parabola`;
      }

      return {
        u_i,
        delta,
        xRoots,
        explanation,
      };
    });

    return { details, totalRootsCount };
  }, [a, b, c, targetRoots, isZh]);

  // Presets
  const presets = [
    {
      labelZh: '高考真题：u = 0, 3',
      labelEn: 'Standard: u = 0, 3',
      a: 1,
      b: -4,
      c: 3,
      roots: '0, 3',
    },
    {
      labelZh: '切点极值：u = -1, 3',
      labelEn: 'Tangent Vertex: u = -1, 3',
      a: 1,
      b: -2,
      c: 0,
      roots: '-1, 3',
    },
    {
      labelZh: '四根对称模型：u = -2, 0',
      labelEn: '4-Root Model: u = -2, 0',
      a: 1,
      b: 0,
      c: -4,
      roots: '-2, 0',
    },
  ];

  // Draw coordinate graph
  useEffect(() => {
    if ('error' in rootsAnalysis) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const vertexX = -b / (2 * a);
    const vertexY = (4 * a * c - b * b) / (4 * a);

    const xMin = vertexX - 5;
    const xMax = vertexX + 5;
    const allY = [vertexY, ...targetRoots, 0];
    const yMin = Math.min(...allY) - 3;
    const yMax = Math.max(...allY) + 4;

    const toCanvasX = (x: number) => ((x - xMin) / (xMax - xMin)) * (width - 40) + 20;
    const toCanvasY = (y: number) => height - 25 - ((y - yMin) / (yMax - yMin)) * (height - 50);

    // Axes
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    const cyZero = toCanvasY(0);
    if (cyZero >= 0 && cyZero <= height) {
      ctx.beginPath();
      ctx.moveTo(10, cyZero);
      ctx.lineTo(width - 10, cyZero);
      ctx.stroke();
    }
    const cxZero = toCanvasX(0);
    if (cxZero >= 0 && cxZero <= width) {
      ctx.beginPath();
      ctx.moveTo(cxZero, 10);
      ctx.lineTo(cxZero, height - 10);
      ctx.stroke();
    }

    // Draw Parabola
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;
    const step = (xMax - xMin) / 160;
    for (let x = xMin; x <= xMax; x += step) {
      const y = a * x * x + b * x + c;
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

    // Draw target root horizontal lines
    if ('details' in rootsAnalysis) {
      rootsAnalysis.details.forEach((item) => {
        const cyLine = toCanvasY(item.u_i);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(15, cyLine);
        ctx.lineTo(width - 15, cyLine);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#b45309';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(`y = ${item.u_i}`, width - 50, cyLine - 4);

        // Intersections
        item.xRoots.forEach((xRoot) => {
          const cx = toCanvasX(xRoot);
          const cy = toCanvasY(item.u_i);

          ctx.fillStyle = '#dc2626';
          ctx.beginPath();
          ctx.arc(cx, cy, 5.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#991b1b';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText(`x=${xRoot.toFixed(1)}`, cx - 14, cy + 18);
        });
      });
    }
  }, [a, b, c, targetRoots, rootsAnalysis]);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700">
                <Target className="w-3.5 h-3.5" />
                {isZh ? '高考高频压轴题型 · 方程零点个数' : 'High Frequency Topic: Equation Roots & Zeros'}
              </span>
              <KeywordBadge type="inner" />
              <KeywordBadge type="outer" />
              <KeywordBadge type="vertex" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {t.rootsTitle}
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {t.rootsSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setA(p.a);
                  setB(p.b);
                  setC(p.c);
                  setTargetRootsInput(p.roots);
                }}
                className="text-xs sm:text-sm bg-slate-50 hover:bg-rose-50 hover:text-rose-700 text-slate-700 border border-slate-200 hover:border-rose-200 px-3 py-1.5 rounded-lg transition-all font-medium text-left cursor-pointer"
              >
                {isZh ? p.labelZh : p.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Form controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-5 border-t border-slate-100">
          <div className="space-y-2">
            <span className="text-sm font-bold text-slate-800 block">
              {isZh ? '① 内层二次函数 g(x) = ax² + bx + c' : '① Inner Quadratic Function g(x) = ax² + bx + c'}
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-slate-500 font-mono block">a</label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(parseFloat(e.target.value) || 0)}
                  className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-mono block">b</label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(parseFloat(e.target.value) || 0)}
                  className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-mono block">c</label>
                <input
                  type="number"
                  value={c}
                  onChange={(e) => setC(parseFloat(e.target.value) || 0)}
                  className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>
            </div>
            <div className="text-xs text-slate-600 font-mono mt-1">
              {isZh ? '当前解析式: ' : 'Formula: '} <MathView math={`g(x) = ${a}x^2 ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`} />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-bold text-slate-800 block">
              {t.rootsTargetInputLabel}
            </span>
            <input
              type="text"
              value={targetRootsInput}
              onChange={(e) => setTargetRootsInput(e.target.value)}
              placeholder={t.rootsTargetInputSub}
              className="w-full text-sm font-mono border border-slate-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-rose-500 outline-none"
            />
            <div className="text-xs text-slate-500">
              {t.rootsTargetInputSub}
            </div>
          </div>
        </div>
      </div>

      {/* Results & Visual Canvas */}
      {'error' in rootsAnalysis ? (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm">
          {rootsAnalysis.error}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 gap-2">
                <span className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  {isZh ? '数形结合分步解题报告' : 'Step-by-Step Root Analysis Report'}
                </span>
                <span className="text-sm bg-rose-100 text-rose-800 font-bold px-3.5 py-1 rounded-full border border-rose-200">
                  {t.rootsTotalCount} {rootsAnalysis.totalRootsCount}
                </span>
              </div>

              {/* Step 1 */}
              <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 text-sm space-y-1.5">
                <div className="font-bold text-slate-900">
                  {isZh ? '第一阶段：换元法降次转化' : 'Phase 1: Substitution Variable Reduction'}
                </div>
                <div className="text-slate-700 leading-relaxed text-xs md:text-sm">
                  {isZh ? '令中间变量 ' : 'Let intermediate variable '}
                  <MathView math="u = g(x)" />
                  {isZh ? '，原复合方程转化为外层方程。解得外层中间根：' : ', solving outer equation gives roots:'}
                  <span className="font-mono font-bold text-indigo-700 ml-1">
                    {targetRoots.map((u, i) => `u_${i + 1} = ${u}`).join(', ')}
                  </span>
                </div>
              </div>

              {/* Step 2: Details per root */}
              <div className="space-y-3">
                <span className="text-sm font-bold text-slate-800 block">
                  {isZh ? '第二阶段：分别求解水平割线内层方程 g(x) = u_i' : 'Phase 2: Solve g(x) = u_i for each horizontal line'}
                </span>
                {rootsAnalysis.details.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-indigo-900 font-mono">
                        {isZh ? `方程 ${idx + 1}` : `Equation ${idx + 1}`}: {a}x² + ({b})x + ({c}) = {item.u_i}
                      </span>
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded font-mono">
                        {isZh ? `贡献实根: ${item.xRoots.length} 个` : `${item.xRoots.length} root(s)`}
                      </span>
                    </div>
                    <div className="text-xs md:text-sm text-slate-700">
                      {isZh ? '标准形式: ' : 'Standard form: '}
                      <MathView math={`${a}x^2 ${b >= 0 ? '+' : ''}${b}x ${c - item.u_i >= 0 ? '+' : ''}${c - item.u_i} = 0`} />
                    </div>
                    <div className="text-xs md:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      {item.explanation}
                      {item.xRoots.length > 0 && (
                        <div className="mt-1 font-mono font-bold text-emerald-800 text-sm">
                          {isZh ? '实数解: ' : 'Roots: '}
                          {item.xRoots.map((xr) => `x = ${xr.toFixed(3)}`).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Step 3: Final statement */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <span className="text-xs md:text-sm font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  {isZh ? '高考大题标准答题总结' : 'Exam Solution Conclusion'}
                </span>
                <p className="text-sm text-emerald-950 leading-relaxed font-serif">
                  {isZh ? (
                    <>
                      综上所述，原复合方程在实数域内共有 <strong className="text-lg text-emerald-950 font-mono mx-1">{rootsAnalysis.totalRootsCount}</strong> 个相异实数根。
                    </>
                  ) : (
                    <>
                      In conclusion, the composite equation has <strong className="text-lg text-emerald-950 font-mono mx-1">{rootsAnalysis.totalRootsCount}</strong> distinct real roots.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Visual plot */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                {t.rootsCanvasTitle}
              </h4>
              <div className="bg-slate-50/80 p-2 rounded-lg border border-slate-100 flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={240}
                  className="max-w-full h-auto"
                />
              </div>
              <div className="mt-3 text-xs text-slate-600 space-y-1.5 font-medium">
                <div>• <span className="text-blue-600 font-bold">{isZh ? '蓝线' : 'Blue Curve'}</span>: {isZh ? '内层函数抛物线 y = g(x)' : 'Inner parabola y = g(x)'}</div>
                <div>• <span className="text-amber-600 font-bold">{isZh ? '黄虚线' : 'Yellow Dashed'}</span>: {isZh ? '外层方程解出的水平截线 y = u_i' : 'Horizontal lines y = u_i'}</div>
                <div>• <span className="text-red-600 font-bold">{isZh ? '红实心点' : 'Red Dots'}</span>: {isZh ? '原复合方程的全部实数根交点' : 'Real root intersection points'}</div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm space-y-1.5 text-slate-700">
              <span className="font-bold text-slate-800 block">💡 {isZh ? '考题核心拆解技巧' : 'Key Exam Strategy'}</span>
              <p className="leading-relaxed">
                {isZh
                  ? '这是新高考数学卷最热门的压轴选择与填空压轴题。解题秘诀就在于“化整为零”：先解外层求出所有中间根，再用水平割线去切内层抛物线！'
                  : 'Key technique: Solve the outer equation first to identify all intermediate roots u_i, then count intersection points with horizontal lines y = u_i on the inner parabola.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
