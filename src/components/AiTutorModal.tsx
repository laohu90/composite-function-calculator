import React, { useState } from 'react';
import { MathView } from './MathView';
import { useI18n } from '../i18n/context';
import { Sparkles, Send, Loader2, Bot, AlertCircle, RefreshCw, Lightbulb } from 'lucide-react';

export const AiTutorModal: React.FC = () => {
  const { lang, t } = useI18n();

  const defaultProblemByLang: Record<string, string> = {
    en: 'Given the composite function f(x) = log2(x² - 2x + 5), please complete the square on the quadratic inner function, find the range on [0, 4], and determine the monotonicity.',
    es: 'Dada la función compuesta f(x) = log2(x² - 2x + 5), complete el cuadrado de la función cuadrática interna, halle el rango en [0, 4] y determine la monotonía.',
    fr: 'Soit la fonction composée f(x) = log2(x² - 2x + 5), veuillez mettre le trinôme sous forme canonique, trouver l\'image sur [0, 4] et étudier les variations.',
    pt: 'Dada a função composta f(x) = log2(x² - 2x + 5), complete os quadrados da função interna, determine a imagem em [0, 4] e analise a monotonia.',
    zh: '已知函数 f(x) = log2(x^2 - 2x + 5)，请用配方法详细写出拆解内层与外层的过程，并求当 x ∈ [0, 4] 时该函数的值域与极值点。',
  };

  const [problem, setProblem] = useState<string>(defaultProblemByLang[lang] || defaultProblemByLang.en);
  const [questionType, setQuestionType] = useState<string>('Completing Square & Range');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const samplePromptsByLang: Record<string, string[]> = {
    en: [
      'Why is the composite monotonicity rule called "Same increases, different decreases"?',
      'Given f(3x+1) = 9x² + 1, how to find f(x) using substitution method?',
      'For piecewise f(x)={x²-1 (x≥0); 2x+1 (x<0)}, how to compute f(f(f(-1)))?',
    ],
    es: [
      '¿Por qué la composición de dos funciones decrecientes resulta en una creciente?',
      'Dada f(3x+1) = 9x² + 1, ¿cómo hallar f(x) mediante el método de sustitución?',
      'Para f(x) a trozos {x²-1 (x≥0); 2x+1 (x<0)}, ¿cómo calcular f(f(f(-1)))?',
    ],
    fr: [
      'Pourquoi la composée de deux fonctions décroissantes est-elle croissante ?',
      'Sachant que f(3x+1) = 9x² + 1, comment trouver f(x) par changement de variable ?',
      'Pour f(x) par morceaux, comment évaluer pas à pas f(f(f(-1))) ?',
    ],
    pt: [
      'Por que a composição de duas funções decrescentes é uma função crescente?',
      'Sendo f(3x+1) = 9x² + 1, como determinar f(x) pelo método da substituição?',
      'Para a função definida por partes, como calcular f(f(f(-1)))?',
    ],
    zh: [
      '为什么复合函数的单调性口诀叫“同增异减”？请用严谨的数学逻辑推导并举例。',
      '已知 f(3x+1) = 9x^2 + 1，如何用换元法求出 f(x) 和 f(g(x))？',
      '对于分段函数 f(x)={x^2-1, x≥0; 2x+1, x<0}，怎样快速求 f(f(f(-1)))？',
    ],
  };

  const samplePrompts = samplePromptsByLang[lang] || samplePromptsByLang.en;

  const categoriesByLang: Record<string, { value: string; label: string }[]> = {
    en: [
      { value: 'Completing Square & Range', label: 'Completing Square & Range' },
      { value: 'Inner & Outer Decomposition', label: 'Inner & Outer Decomposition' },
      { value: 'Piecewise & Nested Functions', label: 'Piecewise & Nested Functions' },
      { value: 'Monotonicity Composition Rule', label: 'Monotonicity Composition Rule' },
      { value: 'Substitution Method', label: 'Substitution Method' },
      { value: 'Advanced Problem Diagnosis', label: 'Advanced Problem Diagnosis' },
    ],
    es: [
      { value: 'Completing Square & Range', label: 'Completar Cuadrados y Rango' },
      { value: 'Inner & Outer Decomposition', label: 'Descomposición Interna y Externa' },
      { value: 'Piecewise & Nested Functions', label: 'Funciones a Trozos y Anidadas' },
      { value: 'Monotonicity Composition Rule', label: 'Regla de Monotonía' },
      { value: 'Substitution Method', label: 'Método de Sustitución' },
      { value: 'Advanced Problem Diagnosis', label: 'Diagnóstico de Problemas' },
    ],
    fr: [
      { value: 'Completing Square & Range', label: 'Forme Canonique & Image' },
      { value: 'Inner & Outer Decomposition', label: 'Décomposition Interne / Externe' },
      { value: 'Piecewise & Nested Functions', label: 'Fonctions par Morceaux' },
      { value: 'Monotonicity Composition Rule', label: 'Règle de Monotonie' },
      { value: 'Substitution Method', label: 'Changement de Variable' },
      { value: 'Advanced Problem Diagnosis', label: 'Diagnostic de Problème' },
    ],
    pt: [
      { value: 'Completing Square & Range', label: 'Completar Quadrados e Imagem' },
      { value: 'Inner & Outer Decomposition', label: 'Decomposição Interna e Externa' },
      { value: 'Piecewise & Nested Functions', label: 'Funções por Partes' },
      { value: 'Monotonicity Composition Rule', label: 'Regra de Monotonia' },
      { value: 'Substitution Method', label: 'Método de Substituição' },
      { value: 'Advanced Problem Diagnosis', label: 'Diagnóstico Avançado' },
    ],
    zh: [
      { value: '配方法拆解与复合函数值域', label: '配方法拆解与复合函数值域' },
      { value: '复合函数内层与外层拆分', label: '复合函数内层与外层拆分' },
      { value: '分段函数复合与多次嵌套', label: '分段函数复合与多次嵌套' },
      { value: '同增异减单调性推导', label: '同增异减单调性推导' },
      { value: '换元法求解析式', label: '换元法求解析式' },
      { value: '综合压轴题诊断', label: '综合压轴题诊断' },
    ],
  };

  const categories = categoriesByLang[lang] || categoriesByLang.en;

  const handleSolve = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/gemini/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problem,
          questionType,
          lang,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Request failed');
      }
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || 'Error communicating with AI service');
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedText = (text: string) => {
    const paragraphs = text.split('\n\n');
    return paragraphs.map((para, idx) => {
      const trimmed = para.trim();
      if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
        const mathContent = trimmed.slice(2, -2).trim();
        return <MathView key={idx} math={mathContent} block />;
      }
      if (trimmed.startsWith('#')) {
        const headingText = trimmed.replace(/^#+\s*/, '');
        return (
          <h4 key={idx} className="text-sm font-bold text-indigo-900 mt-3 mb-1 border-b border-indigo-100 pb-1">
            {headingText}
          </h4>
        );
      }
      const parts = para.split(/(\$[^$]+\$)/g);
      return (
        <p key={idx} className="text-xs text-slate-700 leading-relaxed my-2">
          {parts.map((part, pIdx) => {
            if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
              return <MathView key={pIdx} math={part.slice(1, -1)} inline />;
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg">
            <Bot className="w-4 h-4" />
          </span>
          <h2 className="text-xl font-bold text-slate-900">
            {lang === 'zh'
              ? 'AI 高中数学特级教师 · 复合函数深度精讲'
              : lang === 'es'
              ? 'Tutor IA de Matemáticas: Explicación Detallada'
              : lang === 'fr'
              ? 'Tuteur Mathématique IA : Explications Détaillées'
              : lang === 'pt'
              ? 'Tutor de Matemática com IA: Explicação Avançada'
              : 'AI Math Master Teacher: In-Depth Tutoring'}
          </h2>
        </div>
        <p className="text-xs text-slate-600">
          {lang === 'zh'
            ? '遇到任何搞不懂的复合函数难题、作业题或配方法细节？输入题目内容，AI 导师将按照高考标准规范，为你提供内层外层分步剖析、配方全过程以及易错避坑指南。'
            : 'Have a tricky composite function question? Ask AI tutor for step-by-step guidance, inner/outer layer breakdown, and completing square analysis.'}
        </p>

        {/* Input Box */}
        <div className="mt-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-bold text-slate-700">
              {lang === 'zh' ? '题目内容或数学疑问：' : 'Problem statement or mathematical question:'}
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500">{lang === 'zh' ? '题型分类:' : 'Category:'}</span>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="text-xs border border-slate-300 rounded px-2 py-1 bg-white font-medium"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows={4}
            className="w-full text-xs font-mono p-3 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
            placeholder={lang === 'zh' ? '在此输入复合函数题目...' : 'Type composite function problem here...'}
          />

          {/* Quick Prompts */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-amber-500" />
              {lang === 'zh' ? '常见疑问试一试：' : 'Try sample questions:'}
            </span>
            {samplePrompts.map((sp, idx) => (
              <button
                key={idx}
                onClick={() => setProblem(sp)}
                className="text-[11px] bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 px-2.5 py-1 rounded border border-slate-200 transition-colors"
              >
                {sp.slice(0, 22)}...
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleSolve}
              disabled={loading || !problem.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {lang === 'zh' ? '特级教师正在推导中...' : 'AI Teacher is calculating...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {lang === 'zh' ? '提交 AI 详细拆解' : 'Submit to AI Tutor'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="bg-white border border-indigo-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-indigo-600" />
              {lang === 'zh' ? 'AI 深度精讲与分步解析' : 'AI Step-by-Step Pedagogical Report'}
            </span>
            <button
              onClick={handleSolve}
              className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {lang === 'zh' ? '重新生成' : 'Regenerate'}
            </button>
          </div>

          <div className="prose prose-sm max-w-none text-slate-700 space-y-3 bg-indigo-50/30 p-4 rounded-xl border border-indigo-100">
            {renderFormattedText(result)}
          </div>
        </div>
      )}
    </div>
  );
};
