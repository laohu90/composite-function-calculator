import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MathView } from './MathView';
import { formatNum } from '../utils/completingSquare';
import { useI18n } from '../i18n/context';
import { KeywordBadge } from './KeywordBadge';
import { Network, Activity, ArrowRight, CheckCircle2, AlertTriangle, Compass } from 'lucide-react';

export const ChainRuleDerivativesView: React.FC = () => {
  const { lang, t } = useI18n();
  const isZh = lang === 'zh';
  const isEs = lang === 'es';
  const isFr = lang === 'fr';
  const isPt = lang === 'pt';

  // Inner function: quadratic g(x) = a x^2 + b x + c
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(-2);
  const [c, setC] = useState<number>(3); // g(x) = x^2 - 2x + 3

  // Outer function choice
  const [outerType, setOuterType] = useState<'ln' | 'sqrt' | 'sq' | 'exp' | 'sin' | 'inv'>('ln');

  // Point x0
  const [x0, setX0] = useState<number>(2);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Chain rule calculations
  const calc = useMemo(() => {
    // 1. Inner function & derivative
    const u0 = a * x0 * x0 + b * x0 + c;
    const gPrime0 = 2 * a * x0 + b;

    // 2. Outer function value & derivative
    let outerName = '';
    let outerLatex = '';
    let outerDerivLatex = '';
    let y0: number | null = null;
    let fPrimeU0: number | null = null;
    let domainValid = true;
    let domainReason = '';

    switch (outerType) {
      case 'ln':
        outerName = isZh ? '自然对数函数 y = ln(u)' : 'Natural Log y = ln(u)';
        outerLatex = 'y = \\ln(u)';
        outerDerivLatex = "f'(u) = \\frac{1}{u}";
        if (u0 <= 0) {
          domainValid = false;
          domainReason = isZh
            ? `中间量 u₀ = ${u0.toFixed(2)} ≤ 0，对数真数必须为正数！`
            : `Intermediate u₀ = ${u0.toFixed(2)} ≤ 0, logarithm domain requires u > 0!`;
        } else {
          y0 = Math.log(u0);
          fPrimeU0 = 1 / u0;
        }
        break;

      case 'sqrt':
        outerName = isZh ? '二次根式函数 y = √u' : 'Square Root y = √u';
        outerLatex = 'y = \\sqrt{u}';
        outerDerivLatex = "f'(u) = \\frac{1}{2\\sqrt{u}}";
        if (u0 <= 0) {
          domainValid = false;
          domainReason = isZh
            ? `中间量 u₀ = ${u0.toFixed(2)} ≤ 0，根号内导数分母必须大于零！`
            : `Intermediate u₀ = ${u0.toFixed(2)} ≤ 0, denominator in derivative requires u > 0!`;
        } else {
          y0 = Math.sqrt(u0);
          fPrimeU0 = 1 / (2 * Math.sqrt(u0));
        }
        break;

      case 'sq':
        outerName = isZh ? '二次多项式 y = u²' : 'Square Outer y = u²';
        outerLatex = 'y = u^2';
        outerDerivLatex = "f'(u) = 2u";
        y0 = u0 * u0;
        fPrimeU0 = 2 * u0;
        break;

      case 'exp':
        outerName = isZh ? '自然指数函数 y = e^u' : 'Exponential y = e^u';
        outerLatex = 'y = e^u';
        outerDerivLatex = "f'(u) = e^u";
        y0 = Math.exp(u0);
        fPrimeU0 = Math.exp(u0);
        break;

      case 'sin':
        outerName = isZh ? '正弦函数 y = sin(u)' : 'Sine Function y = sin(u)';
        outerLatex = 'y = \\sin(u)';
        outerDerivLatex = "f'(u) = \\cos(u)";
        y0 = Math.sin(u0);
        fPrimeU0 = Math.cos(u0);
        break;

      case 'inv':
        outerName = isZh ? '反比例函数 y = 1/u' : 'Reciprocal Function y = 1/u';
        outerLatex = 'y = \\frac{1}{u}';
        outerDerivLatex = "f'(u) = -\\frac{1}{u^2}";
        if (Math.abs(u0) < 1e-6) {
          domainValid = false;
          domainReason = isZh ? '分母 u₀ = 0，无意义！' : 'Denominator u₀ = 0, undefined!';
        } else {
          y0 = 1 / u0;
          fPrimeU0 = -1 / (u0 * u0);
        }
        break;
    }

    let overallSlope: number | null = null;
    let tangentEq = '';
    if (domainValid && y0 !== null && fPrimeU0 !== null) {
      overallSlope = fPrimeU0 * gPrime0;
      const bIntercept = y0 - overallSlope * x0;
      const signB = bIntercept >= 0 ? `+ ${formatNum(bIntercept)}` : `- ${formatNum(Math.abs(bIntercept))}`;
      tangentEq = `y = ${formatNum(overallSlope)}x ${signB}`;
    }

    return {
      u0,
      gPrime0,
      outerName,
      outerLatex,
      outerDerivLatex,
      y0,
      fPrimeU0,
      overallSlope,
      domainValid,
      domainReason,
      tangentEq,
    };
  }, [a, b, c, outerType, x0, isZh]);

  // Compute curve function
  const evalComposite = (xVal: number): number | null => {
    const u = a * xVal * xVal + b * xVal + c;
    switch (outerType) {
      case 'ln':
        return u > 0 ? Math.log(u) : null;
      case 'sqrt':
        return u >= 0 ? Math.sqrt(u) : null;
      case 'sq':
        return u * u;
      case 'exp':
        return Math.exp(u);
      case 'sin':
        return Math.sin(u);
      case 'inv':
        return Math.abs(u) > 1e-4 ? 1 / u : null;
    }
  };

  // Draw tangent canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const xMin = x0 - 4;
    const xMax = x0 + 4;
    const yMin = (calc.y0 ?? 0) - 4;
    const yMax = (calc.y0 ?? 0) + 6;

    const toCanvasX = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const toCanvasY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

    // Grid
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 1;

    // Axes
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.2;
    const cyZero = toCanvasY(0);
    if (cyZero >= 0 && cyZero <= height) {
      ctx.beginPath();
      ctx.moveTo(0, cyZero);
      ctx.lineTo(width, cyZero);
      ctx.stroke();
    }
    const cxZero = toCanvasX(0);
    if (cxZero >= 0 && cxZero <= width) {
      ctx.beginPath();
      ctx.moveTo(cxZero, 0);
      ctx.lineTo(cxZero, height);
      ctx.stroke();
    }

    // Curve
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;
    const step = (xMax - xMin) / 160;
    for (let x = xMin; x <= xMax; x += step) {
      const y = evalComposite(x);
      if (y !== null && isFinite(y) && y >= yMin - 10 && y <= yMax + 10) {
        const cx = toCanvasX(x);
        const cy = toCanvasY(y);
        if (!started) {
          ctx.moveTo(cx, cy);
          started = true;
        } else {
          ctx.lineTo(cx, cy);
        }
      } else {
        started = false;
      }
    }
    ctx.stroke();

    // Tangent line
    if (calc.domainValid && calc.overallSlope !== null && calc.y0 !== null) {
      const slope = calc.overallSlope;
      const tanY = (x: number) => calc.y0! + slope * (x - x0);

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(toCanvasX(xMin), toCanvasY(tanY(xMin)));
      ctx.lineTo(toCanvasX(xMax), toCanvasY(tanY(xMax)));
      ctx.stroke();

      // Tangent point
      const cxPoint = toCanvasX(x0);
      const cyPoint = toCanvasY(calc.y0);
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(cxPoint, cyPoint, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#991b1b';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(
        isZh ? `切点 (${x0}, ${calc.y0.toFixed(2)})` : `P(${x0}, ${calc.y0.toFixed(2)})`,
        cxPoint + 8,
        cyPoint - 8
      );
    }
  }, [calc, outerType, x0, a, b, c, isZh]);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                <Network className="w-3.5 h-3.5" />
                {isZh ? '高二选修/高考微积分必考 · 链式法则' : 'Calculus Foundation: Chain Rule'}
              </span>
              <KeywordBadge type="chain" />
              <KeywordBadge type="inner" />
              <KeywordBadge type="outer" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {t.chainTitle}
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {t.chainSubtitle}
            </p>
          </div>
        </div>

        {/* Input Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-5 border-t border-slate-100">
          <div className="space-y-2">
            <span className="text-sm font-bold text-slate-800 block">
              {t.chainInnerLabel}
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-slate-500 font-mono block">a</label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(parseFloat(e.target.value) || 0)}
                  className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-mono block">b</label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(parseFloat(e.target.value) || 0)}
                  className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-mono block">c</label>
                <input
                  type="number"
                  value={c}
                  onChange={(e) => setC(parseFloat(e.target.value) || 0)}
                  className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
            <div className="text-xs text-slate-600 font-mono mt-1">
              {isZh ? '内层导数: ' : "Inner Deriv: "}
              <MathView math={`g'(x) = ${2 * a}x ${b >= 0 ? '+' : ''}${b}`} />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-bold text-slate-800 block">
              {t.chainOuterLabel}
            </span>
            <select
              value={outerType}
              onChange={(e) => setOuterType(e.target.value as any)}
              className="w-full text-sm font-medium border border-slate-300 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
            >
              <option value="ln">y = ln(u) → f'(u) = 1/u</option>
              <option value="sqrt">y = √u → f'(u) = 1/(2√u)</option>
              <option value="sq">y = u² → f'(u) = 2u</option>
              <option value="exp">y = e^u → f'(u) = e^u</option>
              <option value="sin">y = sin(u) → f'(u) = cos(u)</option>
              <option value="inv">y = 1/u → f'(u) = -1/u²</option>
            </select>
            <div className="text-xs text-slate-600 font-mono mt-1">
              {isZh ? '外层导数公式: ' : 'Outer Formula: '} <MathView math={calc.outerDerivLatex} />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-bold text-slate-800 block">
              {t.chainPointLabel}
            </span>
            <input
              type="number"
              value={x0}
              onChange={(e) => setX0(parseFloat(e.target.value) || 0)}
              className="w-full text-sm font-mono font-bold border border-slate-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <div className="text-xs text-slate-500 mt-1">
              {isZh ? '计算该点瞬时切线斜率' : 'Point x₀ for slope & tangent equation'}
            </div>
          </div>
        </div>
      </div>

      {/* Derivative Step-by-Step Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h3 className="text-base md:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              {isZh ? '链式法则全流程拆解 (Chain Rule Step-by-Step)' : 'Chain Rule Step-by-Step Derivation'}
            </h3>

            {!calc.domainValid ? (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                <span>{calc.domainReason}</span>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 text-sm space-y-2">
                  <div className="font-bold text-slate-900">
                    {isZh ? '第一步：计算内层函数值 u₀ 与内层导数值 g\'(x₀)' : "Step 1: Compute inner value u₀ and inner derivative g'(x₀)"}
                  </div>
                  <div className="text-slate-600 text-xs md:text-sm">
                    {isZh ? `代入自变量 x₀ = ${x0}：` : `Substitute x₀ = ${x0}:`}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                    <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-sm text-slate-800">
                      u₀ = g({x0}) = {calc.u0.toFixed(2)}
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-sm text-slate-800">
                      g'({x0}) = {calc.gPrime0.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 text-sm space-y-2">
                  <div className="font-bold text-slate-900">
                    {isZh ? '第二步：外层对中间量求导，并将 u₀ 代入 f\'(u)' : "Step 2: Differentiate outer function with respect to u"}
                  </div>
                  <div className="text-slate-600 text-xs md:text-sm">
                    {isZh ? '外层导数公式为 ' : 'Outer derivative formula: '}
                    <MathView math={calc.outerDerivLatex} />
                    {isZh ? `，代入 u = ${calc.u0.toFixed(2)}：` : `, substitute u = ${calc.u0.toFixed(2)}:`}
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-sm mt-1 text-slate-800">
                    f'(u₀) = f'({calc.u0.toFixed(2)}) = {calc.fPrimeU0 !== null ? calc.fPrimeU0.toFixed(4) : 'NaN'}
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 text-sm space-y-2">
                  <div className="font-bold text-slate-900">
                    {isZh ? '第三步：链式法则相乘得出复合函数导数 [f(g(x))]\'' : "Step 3: Multiply derivatives via the Chain Rule"}
                  </div>
                  <div className="text-slate-600 text-xs md:text-sm">
                    <MathView math="[f(g(x_0))]' = f'(u_0) \cdot g'(x_0)" />
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg font-mono font-bold text-emerald-950 text-sm md:text-base mt-1">
                    {t.chainSlope}: k = {calc.fPrimeU0?.toFixed(4)} × {calc.gPrime0.toFixed(2)} = {calc.overallSlope?.toFixed(4)}
                  </div>
                </div>

                {/* Step 4 Tangent */}
                <div className="p-5 bg-indigo-50 border border-indigo-200 rounded-xl space-y-2">
                  <span className="text-xs md:text-sm font-bold text-indigo-900 uppercase tracking-wider block">
                    {isZh ? '切点坐标与切线方程' : 'Point of Tangency & Line Equation'}
                  </span>
                  <div className="text-sm text-indigo-950 space-y-1">
                    <div>
                      {isZh ? '切点坐标 P: ' : 'Tangent Point P: '}
                      <span className="font-mono font-bold">({x0}, {calc.y0?.toFixed(3)})</span>
                    </div>
                    <div className="text-base font-mono font-bold text-indigo-900">
                      {t.chainTangentEq}: {calc.tangentEq}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tangent Canvas Visualizer */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" />
              {isZh ? '导数几何意义：切线动态图示' : 'Geometric Tangent Line Visualization'}
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
              <div>• <span className="text-indigo-600 font-bold">{isZh ? '蓝线' : 'Blue Curve'}</span>: y = f(g(x))</div>
              <div>• <span className="text-amber-500 font-bold">{isZh ? '黄线' : 'Yellow Tangent'}</span>: {isZh ? `在 x₀ = ${x0} 处的切线` : `Tangent at x₀ = ${x0}`}</div>
              <div>• <span className="text-red-600 font-bold">{isZh ? '红点' : 'Red Dot'}</span>: {isZh ? '切点 P(x₀, y₀)' : 'Point of Tangency'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
