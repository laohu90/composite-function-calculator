import React, { useState } from 'react';
import { MathView } from './MathView';
import { useI18n } from '../i18n/context';
import { exprToLatex, toFractionString } from '../utils/mathParser';
import { ArrowRight, AlertTriangle, CheckCircle2, HelpCircle, Layers, ArrowLeftRight } from 'lucide-react';

interface CompositeStepVisualizerProps {
  innerExpr: string;
  outerExpr: string;
  x0: number;
  innerVal: number | null;
  outerVal: number | null;
  domainError?: string | null;
  reverseVal: number | null;
  reverseDomainError?: string | null;
}

export const CompositeStepVisualizer: React.FC<CompositeStepVisualizerProps> = ({
  innerExpr,
  outerExpr,
  x0,
  innerVal,
  outerVal,
  domainError,
  reverseVal,
  reverseDomainError,
}) => {
  const { lang, t } = useI18n();
  const [showReverseComparison, setShowReverseComparison] = useState(true);
  const [copiedSteps, setCopiedSteps] = useState(false);

  const innerLatex = exprToLatex(innerExpr, 'x');
  const outerLatex = exprToLatex(outerExpr, 'u');

  // Fractions
  const innerFraction = innerVal !== null ? toFractionString(innerVal) : null;
  const outerFraction = outerVal !== null ? toFractionString(outerVal) : null;
  const reverseFraction = reverseVal !== null ? toFractionString(reverseVal) : null;

  return (
    <div className="space-y-6">
      {/* Visual Pipeline Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <span className="text-sm font-bold tracking-wider text-slate-700 uppercase flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            {t.pipelineTitle}
          </span>
          <span className="text-xs sm:text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-semibold border border-indigo-100">
            {t.pipelineBadge}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          {/* Step 1 input */}
          <div className="flex flex-col items-center p-4 bg-sky-50/70 rounded-xl border border-sky-200 w-full md:w-1/4 text-center">
            <span className="text-xs sm:text-sm font-bold text-sky-900 mb-1">
              {t.sourceInput}
            </span>
            <div className="text-xl font-bold font-mono text-sky-950">
              x = {x0}
            </div>
            <span className="text-xs text-sky-600 mt-1 font-medium">{t.evalPointSub}</span>
          </div>

          <div className="flex flex-col items-center text-slate-400">
            <ArrowRight className="w-6 h-6 hidden md:block text-sky-500" />
            <span className="text-xs text-sky-700 font-semibold">{t.step2Pass}</span>
          </div>

          {/* Inner function block */}
          <div className="flex flex-col items-center p-4 bg-blue-50/70 rounded-xl border border-blue-200 w-full md:w-1/3 text-center">
            <span className="text-xs sm:text-sm font-bold text-blue-900 mb-1">
              {t.step1Inner}
            </span>
            <div className="text-base font-medium text-slate-900 my-1">
              <MathView math={`u = g(x) = ${innerLatex}`} />
            </div>
            <div className="mt-2 text-sm font-mono font-bold text-blue-900 bg-blue-100/90 px-3 py-1 rounded-md">
              u = {innerVal !== null ? (innerFraction ? `${innerFraction} (${innerVal.toFixed(3)})` : innerVal.toFixed(3)) : 'NaN'}
            </div>
          </div>

          <div className="flex flex-col items-center text-slate-400">
            <ArrowRight className="w-6 h-6 hidden md:block text-purple-500" />
            <span className="text-xs text-purple-700 font-semibold">{t.step2Pass}</span>
          </div>

          {/* Outer function block */}
          <div className="flex flex-col items-center p-4 bg-purple-50/70 rounded-xl border border-purple-200 w-full md:w-1/3 text-center">
            <span className="text-xs sm:text-sm font-bold text-purple-900 mb-1">
              {t.step3Outer}
            </span>
            <div className="text-base font-medium text-slate-900 my-1">
              <MathView math={`y = f(u) = ${outerLatex}`} />
            </div>
            <div className="mt-2 text-sm font-mono font-bold text-purple-900 bg-purple-100/90 px-3 py-1 rounded-md">
              y = {outerVal !== null ? (outerFraction ? `${outerFraction} (${outerVal.toFixed(3)})` : outerVal.toFixed(3)) : 'NaN'}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Step-by-Step Card Flow */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            {t.stepsHeader}
          </h3>
          <button
            onClick={() => {
              const text = `【Composite Function Step-by-Step Solution】
Inner Function: u = g(x) = ${innerExpr}
Outer Function: y = f(u) = ${outerExpr}
Evaluation point: x = ${x0}

Step 1: Separate inner u = g(x) and outer y = f(u).
Step 2: Evaluate inner layer: u = g(${x0}) = ${innerVal !== null ? (innerFraction || innerVal.toFixed(4)) : 'undefined'}
Step 3: Check domain: ${domainError ? domainError : 'Valid'}
Step 4: Evaluate outer layer: y = f(u) = ${outerVal !== null ? (outerFraction || outerVal.toFixed(4)) : 'undefined'}

Result: f(g(${x0})) = ${outerVal !== null ? (outerFraction || outerVal.toFixed(4)) : 'undefined'}`;
              navigator.clipboard.writeText(text);
              setCopiedSteps(true);
              setTimeout(() => setCopiedSteps(false), 2000);
            }}
            className="text-xs sm:text-sm text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl font-semibold transition-colors cursor-pointer border border-indigo-200 shrink-0"
          >
            {copiedSteps ? t.copiedBtn : t.copyStepsBtn}
          </button>
        </div>

        {/* Step 1 */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
              1
            </span>
            <h4 className="text-base font-bold text-slate-900">
              {t.step1Title}
            </h4>
          </div>
          <p className="text-sm text-slate-600 mb-3 pl-10">
            {t.step1Desc}
          </p>
          <div className="pl-10 bg-white p-4 rounded-xl border border-slate-200 text-sm sm:text-base font-serif">
            <div>
              {lang === 'zh' ? '设中间变量' : lang === 'es' ? 'Sea la variable intermedia' : lang === 'fr' ? 'Soit la variable intermédiaire' : lang === 'pt' ? 'Seja a variável intermediária' : 'Let intermediate variable'}{' '}
              <MathView math="u = g(x)" />:
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-sky-50 rounded-lg border border-sky-100">
                <span className="font-bold text-sky-900 block mb-1">
                  {lang === 'zh' ? '内层函数：' : lang === 'es' ? 'Función Interna:' : lang === 'fr' ? 'Fonction Interne :' : lang === 'pt' ? 'Função Interna:' : 'Inner Function:'}
                </span>
                <MathView math={`g(x) = ${innerLatex}`} block />
                <span className="text-slate-500 text-xs block mt-1">{t.innerFuncSub}</span>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                <span className="font-bold text-purple-900 block mb-1">
                  {lang === 'zh' ? '外层函数：' : lang === 'es' ? 'Función Externa:' : lang === 'fr' ? 'Fonction Externe :' : lang === 'pt' ? 'Função Externa:' : 'Outer Function:'}
                </span>
                <MathView math={`f(u) = ${outerLatex}`} block />
                <span className="text-slate-500 text-xs block mt-1">{t.outerFuncSub}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
              2
            </span>
            <h4 className="text-base font-bold text-slate-900">
              {t.step2Title}
            </h4>
          </div>
          <div className="pl-10 bg-white p-4 rounded-xl border border-slate-200 text-sm sm:text-base">
            <div className="text-slate-700">
              {lang === 'zh' ? `将自变量数值 x₀ = ${x0} 代入内层解析式：` : `Substitute input value x₀ = ${x0} into inner function:`}
            </div>
            <div className="mt-2 text-center py-3 bg-slate-50 rounded-lg font-mono text-base">
              <MathView
                math={`u_0 = g(${x0}) = ${innerLatex.replace(/x/g, `(${x0})`)} = ${innerVal !== null ? (innerFraction ? `${innerFraction} \\approx ${innerVal.toFixed(3)}` : innerVal.toFixed(3)) : 'undefined'}`}
                block
              />
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
              3
            </span>
            <h4 className="text-base font-bold text-slate-900">
              {t.step3Title}
            </h4>
          </div>
          <div className="pl-10 bg-white p-4 rounded-xl border border-slate-200 text-sm sm:text-base">
            {domainError ? (
              <div className="flex items-start gap-3 p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-sm">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{t.domainInvalid} </span>
                  {domainError}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  {t.domainValid} <MathView math={`u = ${innerVal !== null ? (innerFraction || innerVal.toFixed(2)) : ''}`} />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Step 4 */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
              4
            </span>
            <h4 className="text-base font-bold text-slate-900">
              {t.step4Title}
            </h4>
          </div>
          <div className="pl-10 bg-white p-4 rounded-xl border border-slate-200 text-sm sm:text-base">
            {outerVal !== null ? (
              <>
                <div className="text-slate-700">
                  {lang === 'zh' ? `将中间变量 u 代入外层函数解析式：` : `Substitute intermediate value u into outer function:`}
                </div>
                <div className="mt-2 text-center py-3 bg-slate-50 rounded-lg font-mono text-base">
                  <MathView
                    math={`y = f(u_0) = f(${innerVal !== null ? (innerFraction || innerVal.toFixed(2)) : ''}) = ${outerLatex.replace(/u/g, `(${innerVal !== null ? (innerFraction || innerVal.toFixed(2)) : ''})`)} = ${outerFraction ? `${outerFraction} \\approx ${outerVal.toFixed(3)}` : outerVal.toFixed(3)}`}
                    block
                  />
                </div>
              </>
            ) : (
              <div className="text-rose-600 text-sm font-semibold">
                {lang === 'zh' ? '由于外层定义域限制，无法完成外层计算。' : 'Due to outer domain constraints, computation cannot be completed.'}
              </div>
            )}
          </div>
        </div>

        {/* Final Conclusion Box */}
        <div className="p-5 rounded-xl bg-indigo-50 border border-indigo-200 text-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-700">
              {t.finalConclusion}
            </span>
            <span className="text-xs sm:text-sm text-indigo-600 font-mono">
              f(g({x0}))
            </span>
          </div>
          <div className="mt-2 text-xl font-bold text-slate-900 font-mono text-center">
            {outerVal !== null ? (
              <MathView
                math={`f(g(${x0})) = ${outerFraction ? `${outerFraction} \\quad (\\approx ${outerVal.toFixed(4)})` : outerVal.toFixed(4)}`}
                block
              />
            ) : (
              <span className="text-rose-600 text-base font-sans font-medium">
                {lang === 'zh' ? '该点无意义（超出定义域）' : 'Undefined at this point (Domain violation)'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Contrast Box */}
      <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">
              {t.contrastTitle}
            </h3>
          </div>
          <button
            onClick={() => setShowReverseComparison(!showReverseComparison)}
            className="text-xs sm:text-sm text-amber-700 hover:text-amber-900 font-semibold underline cursor-pointer"
          >
            {showReverseComparison ? t.foldComparison : t.expandComparison}
          </button>
        </div>

        <p className="text-sm text-slate-600 mb-4">
          {t.contrastDesc}
        </p>

        {showReverseComparison && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl">
              <div className="text-sm font-bold text-blue-900 mb-2">
                {t.currentOrder}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 space-y-1.5">
                <div>① {lang === 'zh' ? '内层：' : 'Inner:'} <MathView math={`u = g(${x0}) = ${innerVal !== null ? (innerFraction || innerVal.toFixed(2)) : 'NaN'}`} /></div>
                <div>② {lang === 'zh' ? '外层：' : 'Outer:'} <MathView math={`f(${innerVal !== null ? (innerFraction || innerVal.toFixed(2)) : ''}) = ${outerVal !== null ? (outerFraction || outerVal.toFixed(2)) : 'NaN'}`} /></div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-blue-200 font-mono text-sm font-bold text-blue-950">
                {lang === 'zh' ? '结果：' : 'Result: '} {outerVal !== null ? (outerFraction || outerVal.toFixed(3)) : 'undefined'}
              </div>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl">
              <div className="text-sm font-bold text-amber-900 mb-2">
                {t.reverseOrder}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 space-y-1.5">
                {reverseDomainError ? (
                  <div className="text-rose-600 text-xs">{reverseDomainError}</div>
                ) : (
                  <>
                    <div>① {lang === 'zh' ? '内层：' : 'Inner:'} <MathView math={`v = f(${x0})`} /></div>
                    <div>② {lang === 'zh' ? '外层：' : 'Outer:'} <MathView math={`g(v)`} /></div>
                  </>
                )}
              </div>
              <div className="mt-3 pt-2.5 border-t border-amber-200 font-mono text-sm font-bold text-amber-950">
                {lang === 'zh' ? '反向结果：' : 'Reverse Result: '} {reverseVal !== null ? (reverseFraction || reverseVal.toFixed(3)) : 'undefined'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
