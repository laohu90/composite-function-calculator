import React, { useState, useRef, useEffect } from 'react';
import { MathView } from './MathView';
import { useI18n } from '../i18n/context';
import { KeywordBadge } from './KeywordBadge';
import { Sliders, Copy, Check, Sparkles, BookOpen } from 'lucide-react';

export const DynamicAxisClassificationView: React.FC = () => {
  const { lang, t } = useI18n();

  // Interval [m, n]
  const [m, setM] = useState<number>(0);
  const [n, setN] = useState<number>(3);

  // Parabola: g(x) = (x - a)^2 + k
  // where 'a' is the axis of symmetry parameter
  const [axisA, setAxisA] = useState<number>(1.5);
  const [k, setK] = useState<number>(1);

  const [copied, setCopied] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const midpoint = (m + n) / 2;

  // Current case analysis
  const currentCase =
    axisA < m ? 'left' : axisA > n ? 'right' : 'inside';

  // Minimum value at current parameter
  let currentMin = 0;
  let minPointText = '';
  if (currentCase === 'inside') {
    currentMin = k;
    minPointText = `顶点处取得最小值 g(${axisA.toFixed(1)}) = ${k}`;
  } else if (currentCase === 'left') {
    currentMin = Math.pow(m - axisA, 2) + k;
    minPointText = `左端点处取得最小值 g(${m}) = ${currentMin.toFixed(2)}`;
  } else {
    currentMin = Math.pow(n - axisA, 2) + k;
    minPointText = `右端点处取得最小值 g(${n}) = ${currentMin.toFixed(2)}`;
  }

  // Maximum value at current parameter
  const valLeft = Math.pow(m - axisA, 2) + k;
  const valRight = Math.pow(n - axisA, 2) + k;
  const currentMax = Math.max(valLeft, valRight);
  const maxPointText =
    axisA <= midpoint
      ? `右端点距离对称轴更远，取得最大值 g(${n}) = ${valRight.toFixed(2)}`
      : `左端点距离对称轴更远，取得最大值 g(${m}) = ${valLeft.toFixed(2)}`;

  // Generate standard 3-case exam text
  const standardExamSolution = lang === 'zh'
    ? `【标准高考规范大题解答：含参二次函数闭区间最值分类讨论】

解：设二次函数解析式为 g(x) = (x - a)² + ${k}，其对称轴为直线 x = a，开口向上。
对于自变量 x ∈ [${m}, ${n}]，对称轴与区间的相对位置有以下三种情形：

① 当 a < ${m} 时（对称轴在区间左侧）：
函数 g(x) 在区间 [${m}, ${n}] 上单调递增。
故最小值在左端点取得：g(x)_min = g(${m}) = (${m} - a)² + ${k}；
最大值在右端点取得：g(x)_max = g(${n}) = (${n} - a)² + ${k}。

② 当 ${m} ≤ a ≤ ${n} 时（对称轴在区间内部）：
由于开口向上，函数的最小值在顶点处取得：
g(x)_min = g(a) = ${k}；
最大值取两端点离对称轴较远者：
当 a ≤ ${(m + n) / 2} 时，g(x)_max = g(${n}) = (${n} - a)² + ${k}；
当 a > ${(m + n) / 2} 时，g(x)_max = g(${m}) = (${m} - a)² + ${k}。

③ 当 a > ${n} 时（对称轴在区间右侧）：
函数 g(x) 在区间 [${m}, ${n}] 上单调递减。
故最小值在右端点取得：g(x)_min = g(${n}) = (${n} - a)² + ${k}；
最大值在左端点取得：g(x)_max = g(${m}) = (${m} - a)² + ${k}。

综上所述，最值函数随参数 a 的变化分类讨论完毕。`
    : lang === 'es'
    ? `[Solución estándar de examen: Extremos de función cuadrática en intervalo cerrado con eje variable]

Sea g(x) = (x - a)² + ${k}, con eje de simetría en la recta x = a, parábola cóncava hacia arriba.
Para x ∈ [${m}, ${n}], se consideran tres casos según la posición relativa del eje:

1) Si a < ${m} (Eje a la izquierda del intervalo):
g(x) es estrictamente creciente en [${m}, ${n}].
Mínimo en x = ${m}: g(${m}) = (${m} - a)² + ${k}.
Máximo en x = ${n}: g(${n}) = (${n} - a)² + ${k}.

2) Si ${m} ≤ a ≤ ${n} (Eje dentro del intervalo):
El mínimo absoluto ocurre en el vértice: g(a) = ${k}.
El máximo ocurre en el extremo más alejado del eje:
Si a ≤ ${(m + n) / 2}: g_max = g(${n}) = (${n} - a)² + ${k};
Si a > ${(m + n) / 2}: g_max = g(${m}) = (${m} - a)² + ${k}.

3) Si a > ${n} (Eje a la derecha del intervalo):
g(x) es estrictamente decreciente en [${m}, ${n}].
Máximo en x = ${m}: g(${m}) = (${m} - a)² + ${k}.
Mínimo en x = ${n}: g(${n}) = (${n} - a)² + ${k}.`
    : lang === 'fr'
    ? `[Solution type d'examen : Extremums d'une fonction quadratique sur un intervalle fermé avec axe mobile]

Soit g(x) = (x - a)² + ${k}, avec axe de symétrie x = a, parabole tournée vers le haut.
Pour x ∈ [${m}, ${n}], distinguons trois cas :

1) Si a < ${m} (Axe à gauche de l'intervalle) :
g est strictement croissante sur [${m}, ${n}].
Minimum en x = ${m} : g(${m}) = (${m} - a)² + ${k}.
Maximum en x = ${n} : g(${n}) = (${n} - a)² + ${k}.

2) Si ${m} ≤ a ≤ ${n} (Axe à l'intérieur de l'intervalle) :
Minimum au sommet : g(a) = ${k}.
Maximum à la borne la plus éloignée de a :
Si a ≤ ${(m + n) / 2} : max = g(${n}) = (${n} - a)² + ${k};
Si a > ${(m + n) / 2} : max = g(${m}) = (${m} - a)² + ${k}.

3) Si a > ${n} (Axe à droite de l'intervalle) :
g est strictement décroissante sur [${m}, ${n}].
Maximum en x = ${m} : g(${m}) = (${m} - a)² + ${k}.
Minimum en x = ${n} : g(${n}) = (${n} - a)² + ${k}.`
    : lang === 'pt'
    ? `[Solução padrão de exame: Extremos de função quadrática em intervalo fechado com eixo móvel]

Seja g(x) = (x - a)² + ${k}, com eixo de simetria na reta x = a, parábola voltada para cima.
Para x ∈ [${m}, ${n}], temos três casos:

1) Se a < ${m} (Eixo à esquerda do intervalo):
g(x) é estritamente crescente em [${m}, ${n}].
Mínimo em x = ${m}: g(${m}) = (${m} - a)² + ${k}.
Máximo em x = ${n}: g(${n}) = (${n} - a)² + ${k}.

2) Se ${m} ≤ a ≤ ${n} (Eixo dentro do intervalo):
Mínimo no vértice: g(a) = ${k}.
Máximo na extremidade mais distante de a:
Se a ≤ ${(m + n) / 2}: g_max = g(${n}) = (${n} - a)² + ${k};
Se a > ${(m + n) / 2}: g_max = g(${m}) = (${m} - a)² + ${k}.

3) Se a > ${n} (Eixo à direita do intervalo):
g(x) é estritamente decrescente em [${m}, ${n}].
Máximo em x = ${m}: g(${m}) = (${m} - a)² + ${k}.
Mínimo em x = ${n}: g(${n}) = (${n} - a)² + ${k}.`
    : `[Standard Exam Solution: Quadratic Function Extrema on Closed Interval with Varying Axis]

Let quadratic function g(x) = (x - a)² + ${k}, with axis of symmetry x = a, opening upward.
For domain x ∈ [${m}, ${n}], classify into three cases:

Case 1: a < ${m} (Axis is to the left of [${m}, ${n}]):
g(x) is strictly increasing on [${m}, ${n}].
Minimum is at left boundary: g_min = g(${m}) = (${m} - a)² + ${k};
Maximum is at right boundary: g_max = g(${n}) = (${n} - a)² + ${k}.

Case 2: ${m} ≤ a ≤ ${n} (Axis lies within [${m}, ${n}]):
Since opening is upward, minimum is at vertex: g_min = g(a) = ${k};
Maximum is at the boundary point furthest from axis:
When a ≤ ${(m + n) / 2}: g_max = g(${n}) = (${n} - a)² + ${k};
When a > ${(m + n) / 2}: g_max = g(${m}) = (${m} - a)² + ${k}.

Case 3: a > ${n} (Axis is to the right of [${m}, ${n}]):
g(x) is strictly decreasing on [${m}, ${n}].
Maximum is at left boundary: g_max = g(${m}) = (${m} - a)² + ${k};
Minimum is at right boundary: g_min = g(${n}) = (${n} - a)² + ${k}.

Conclusion: Complete piecewise extrema analyzed with respect to parameter a.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(standardExamSolution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Draw dynamic canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const xMin = Math.min(m - 2, axisA - 2, -2);
    const xMax = Math.max(n + 2, axisA + 2, 5);
    const yMin = 0;
    const yMax = Math.max(valLeft, valRight, k + 6, 8);

    const toCanvasX = (x: number) => ((x - xMin) / (xMax - xMin)) * (width - 40) + 20;
    const toCanvasY = (y: number) => height - 25 - ((y - yMin) / (yMax - yMin)) * (height - 50);

    // Axes
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(10, toCanvasY(0));
    ctx.lineTo(width - 10, toCanvasY(0));
    ctx.stroke();

    // Highlight interval [m, n]
    const cxM = toCanvasX(m);
    const cxN = toCanvasX(n);
    ctx.fillStyle = 'rgba(238, 242, 255, 0.7)';
    ctx.fillRect(cxM, 10, cxN - cxM, height - 35);

    ctx.strokeStyle = '#6366f1';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(cxM, 10);
    ctx.lineTo(cxM, height - 25);
    ctx.moveTo(cxN, 10);
    ctx.lineTo(cxN, height - 25);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#4f46e5';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`m=${m}`, cxM - 12, height - 8);
    ctx.fillText(`n=${n}`, cxN - 10, height - 8);

    // Plot axis of symmetry line x = a
    const cxA = toCanvasX(axisA);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(cxA, 10);
    ctx.lineTo(cxA, height - 25);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`对称轴 x=a (${axisA.toFixed(1)})`, cxA + 4, 25);

    // Plot full curve
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    let started = false;
    const step = (xMax - xMin) / 160;
    for (let x = xMin; x <= xMax; x += step) {
      const y = Math.pow(x - axisA, 2) + k;
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

    // Plot interval curve (bold blue)
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    started = false;
    const intStep = (n - m) / 100;
    for (let x = m; x <= n; x += intStep) {
      const y = Math.pow(x - axisA, 2) + k;
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

    // Vertex Point
    const cyVertex = toCanvasY(k);
    ctx.fillStyle = currentCase === 'inside' ? '#dc2626' : '#94a3b8';
    ctx.beginPath();
    ctx.arc(cxA, cyVertex, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [m, n, axisA, k, valLeft, valRight, currentCase]);

  // Localized texts based on current language
  const isZh = lang === 'zh';
  const isEs = lang === 'es';
  const isFr = lang === 'fr';
  const isPt = lang === 'pt';

  const badgeCaseLabel =
    currentCase === 'inside'
      ? (isZh ? `情形②：对称轴在区间内 (${m} ≤ a ≤ ${n})` : `${t.axisCase2}`)
      : currentCase === 'left'
      ? (isZh ? `情形①：对称轴在区间左侧 (a < ${m})` : `${t.axisCase1}`)
      : (isZh ? `情形③：对称轴在区间右侧 (a > ${n})` : `${t.axisCase3}`);

  const localizedMinText = currentCase === 'inside'
    ? (isZh ? `顶点处取得最小值 g(${axisA.toFixed(1)}) = ${k}` : `Vertex minimum g(${axisA.toFixed(1)}) = ${k}`)
    : currentCase === 'left'
    ? (isZh ? `左端点处取得最小值 g(${m}) = ${currentMin.toFixed(2)}` : `Left boundary minimum g(${m}) = ${currentMin.toFixed(2)}`)
    : (isZh ? `右端点处取得最小值 g(${n}) = ${currentMin.toFixed(2)}` : `Right boundary minimum g(${n}) = ${currentMin.toFixed(2)}`);

  const localizedMaxText = axisA <= midpoint
    ? (isZh ? `右端点距离对称轴更远，取得最大值 g(${n}) = ${valRight.toFixed(2)}` : `Right endpoint further from axis: max g(${n}) = ${valRight.toFixed(2)}`)
    : (isZh ? `左端点距离对称轴更远，取得最大值 g(${m}) = ${valLeft.toFixed(2)}` : `Left endpoint further from axis: max g(${m}) = ${valLeft.toFixed(2)}`);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                <Sliders className="w-3.5 h-3.5" />
                {isZh ? '高中大题满分杀手锏 · 动轴定区间演练' : 'High School Core Topic: Varying Axis Classification'}
              </span>
              <KeywordBadge type="axis" />
              <KeywordBadge type="vertex" />
              <KeywordBadge type="monotonicity" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {t.axisTitle}
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {t.axisSubtitle}
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-sm font-semibold rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? t.axisCopiedExam : t.axisCopyExam}
          </button>
        </div>

        {/* Dynamic Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-5 border-t border-slate-100">
          {/* Slider for axis a */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800">
                {t.axisSliderLabel}
              </label>
              <span className="text-sm font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                x = a = {axisA.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={m - 2}
              max={n + 2}
              step="0.1"
              value={axisA}
              onChange={(e) => setAxisA(parseFloat(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>{isZh ? `左侧 (a < ${m})` : `Left (a < ${m})`}</span>
              <span className="text-indigo-600 font-semibold">{isZh ? `区间内 (${m} ≤ a ≤ ${n})` : `Inside (${m} ≤ a ≤ ${n})`}</span>
              <span>{isZh ? `右侧 (a > ${n})` : `Right (a > ${n})`}</span>
            </div>
          </div>

          {/* Interval m, n */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                {isZh ? '固定区间下限 m' : (isEs ? 'Límite inferior m' : isFr ? 'Borne inférieure m' : isPt ? 'Limite inferior m' : 'Lower Bound m')}
              </label>
              <input
                type="number"
                value={m}
                onChange={(e) => setM(parseFloat(e.target.value) || 0)}
                className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                {isZh ? '固定区间上限 n' : (isEs ? 'Límite superior n' : isFr ? 'Borne supérieure n' : isPt ? 'Limite superior n' : 'Upper Bound n')}
              </label>
              <input
                type="number"
                value={n}
                onChange={(e) => setN(parseFloat(e.target.value) || 0)}
                className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Vertex height k */}
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              {isZh ? '顶点纵坐标常数 k' : (isEs ? 'Constante vértice k' : isFr ? 'Constante sommet k' : isPt ? 'Constante vértice k' : 'Vertex y-constant k')}
            </label>
            <input
              type="number"
              value={k}
              onChange={(e) => setK(parseFloat(e.target.value) || 0)}
              className="w-full text-sm font-mono font-semibold border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <span className="text-xs text-slate-500 mt-1.5 block">
              {isZh ? '当前内层函数: ' : 'Inner function: '} <MathView math={`g(x) = (x - a)^2 + ${k}`} />
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic State Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <span className="text-base md:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                {isZh ? '当前实时状态判定：' : 'Current State Status:'}
              </span>
              <span
                className={`text-xs md:text-sm px-3 py-1 rounded-full font-bold shadow-xs ${
                  currentCase === 'inside'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : currentCase === 'left'
                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                    : 'bg-purple-100 text-purple-800 border border-purple-300'
                }`}
              >
                {badgeCaseLabel}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl">
                <span className="font-bold text-emerald-900 block mb-1">
                  {t.axisCurrentMin}
                </span>
                <div className="text-base font-mono font-bold text-emerald-950">
                  g_min = {currentMin.toFixed(2)}
                </div>
                <div className="text-xs text-emerald-700 mt-1 font-medium">
                  {localizedMinText}
                </div>
              </div>

              <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-xl">
                <span className="font-bold text-indigo-900 block mb-1">
                  {t.axisCurrentMax}
                </span>
                <div className="text-base font-mono font-bold text-indigo-950">
                  g_max = {currentMax.toFixed(2)}
                </div>
                <div className="text-xs text-indigo-700 mt-1 font-medium">
                  {localizedMaxText}
                </div>
              </div>
            </div>

            {/* Standard 3-case breakdown tabs */}
            <div className="space-y-3 pt-2">
              <span className="text-sm font-bold text-slate-800 block">
                {isZh ? '【高考考场标准三段式分类讨论范本】' : '[Standard 3-Case Exam Solution Structure]'}
              </span>

              <div
                className={`p-4 rounded-xl border transition-all ${
                  currentCase === 'left'
                    ? 'border-blue-400 bg-blue-50/60 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60'
                }`}
              >
                <div className="text-sm font-bold text-blue-900 mb-1">
                  {t.axisCase1}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {isZh
                    ? `函数在 [${m}, ${n}] 上单调递增，最小值在左端点取得 g(${m}) = (${m}-a)² + ${k}，最大值在右端点取得 g(${n}) = (${n}-a)² + ${k}。`
                    : `Since axis is to the left, g(x) is strictly increasing on [${m}, ${n}]. Min occurs at left boundary x=${m}, max at right boundary x=${n}.`}
                </p>
              </div>

              <div
                className={`p-4 rounded-xl border transition-all ${
                  currentCase === 'inside'
                    ? 'border-emerald-400 bg-emerald-50/60 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60'
                }`}
              >
                <div className="text-sm font-bold text-emerald-900 mb-1">
                  {t.axisCase2}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {isZh
                    ? `函数在顶点处取得全局最小值 g(a) = ${k}。最大值比较两端点：当 a ≤ ${(m + n) / 2} 时最大值为 g(${n})，当 a > ${(m + n) / 2} 时最大值为 g(${m})。`
                    : `Axis is inside [${m}, ${n}]. Minimum is at vertex g(a) = ${k}. Maximum is at the endpoint further from a: when a ≤ ${(m + n) / 2}, max is g(${n}); when a > ${(m + n) / 2}, max is g(${m}).`}
                </p>
              </div>

              <div
                className={`p-4 rounded-xl border transition-all ${
                  currentCase === 'right'
                    ? 'border-purple-400 bg-purple-50/60 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60'
                }`}
              >
                <div className="text-sm font-bold text-purple-900 mb-1">
                  {t.axisCase3}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {isZh
                    ? `函数在 [${m}, ${n}] 上单调递减，最大值在左端点取得 g(${m}) = (${m}-a)² + ${k}，最小值在右端点取得 g(${n}) = (${n}-a)² + ${k}。`
                    : `Since axis is to the right, g(x) is strictly decreasing on [${m}, ${n}]. Max occurs at left boundary x=${m}, min at right boundary x=${n}.`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual graphic */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              {isZh ? '抛物线与区间动态几何相对位置' : 'Parabola vs. Closed Interval Geometry'}
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
              <div>• <span className="text-indigo-600 font-bold">{isZh ? '紫色背景区域' : 'Violet Zone'}</span>: {isZh ? `指定闭区间 [${m}, ${n}]` : `Target interval [${m}, ${n}]`}</div>
              <div>• <span className="text-amber-600 font-bold">{isZh ? '黄色虚线' : 'Yellow Dashed'}</span>: {isZh ? '动态滑动的对称轴 x = a' : 'Dynamic symmetry axis x = a'}</div>
              <div>• <span className="text-blue-600 font-bold">{isZh ? '蓝色加粗线段' : 'Blue Curve Segment'}</span>: {isZh ? '区间内有效抛物线' : 'Parabola restricted to interval'}</div>
            </div>
          </div>

          <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-xl text-sm space-y-2 text-amber-950">
            <span className="font-bold flex items-center gap-1.5 text-amber-800">
              <BookOpen className="w-4 h-4 text-amber-700" />
              {isZh ? '考前口诀速记' : 'Quick Study Memory Rule'}
            </span>
            <p className="leading-relaxed text-xs md:text-sm">
              {isZh ? (
                <>
                  <strong>“轴在左，递增单调看端点；轴在内，顶点极小两头争；轴在右，反向递减易得分”</strong>。分类讨论大题只要抓住这三段，就能稳拿满分步骤分！
                </>
              ) : (
                <>
                  <strong>"Axis Left: Monotonic up, check bounds; Axis Inside: Vertex is minimum, endpoints contest max; Axis Right: Monotonic down."</strong> Master these 3 partitions for full marks on exams!
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
