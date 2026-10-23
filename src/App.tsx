import React, { useState, useMemo, useEffect } from 'react';
import { evaluateRaw, checkDomainValidity, toFractionString } from './utils/mathParser';
import {
  getCalcHistory,
  saveCalcRecord,
  toggleBookmark,
  clearHistory,
  CalculationRecord,
} from './utils/historyStorage';
import { useI18n, LANG_OPTIONS } from './i18n/context';
import { SupportedLang } from './i18n/translations';
import { KeywordBadge } from './components/KeywordBadge';
import { CompositeStepVisualizer } from './components/CompositeStepVisualizer';
import { CompletingSquareView } from './components/CompletingSquareView';
import { DynamicAxisClassificationView } from './components/DynamicAxisClassificationView';
import { CompositeRootsView } from './components/CompositeRootsView';
import { ChainRuleDerivativesView } from './components/ChainRuleDerivativesView';
import { PiecewiseCompositeView } from './components/PiecewiseCompositeView';
import { InteractiveQuizMode } from './components/InteractiveQuizMode';
import { ClassicProblems } from './components/ClassicProblems';
import { InteractiveGraph } from './components/InteractiveGraph';
import { AiTutorModal } from './components/AiTutorModal';
import { MathKeypad } from './components/MathKeypad';
import { MathView } from './components/MathView';
import { PhotoOcrModal } from './components/PhotoOcrModal';
import {
  Layers,
  Compass,
  GitBranch,
  BookOpen,
  Bot,
  Calculator,
  Sparkles,
  Sliders,
  Target,
  History,
  Star,
  Trash2,
  X,
  Keyboard,
  ArrowRight,
  Camera,
  Network,
  Trophy,
  Globe,
} from 'lucide-react';

export default function App() {
  const { lang, setLang, t } = useI18n();

  // Navigation tabs
  const [activeTab, setActiveTab] = useState<
    | 'evaluator'
    | 'completing_square'
    | 'axis_classification'
    | 'roots'
    | 'chain_derivatives'
    | 'piecewise'
    | 'quiz'
    | 'classic'
    | 'ai_tutor'
  >('evaluator');

  // Evaluator state
  const [innerExpr, setInnerExpr] = useState<string>('x^2 - 4*x + 3');
  const [outerExpr, setOuterExpr] = useState<string>('log2(u)');
  const [x0, setX0] = useState<number>(5);

  // Virtual Keypad toggle & target
  const [showKeypad, setShowKeypad] = useState<boolean>(false);
  const [keypadTarget, setKeypadTarget] = useState<'inner' | 'outer'>('inner');

  // Photo OCR Modal toggle
  const [showOcrModal, setShowOcrModal] = useState<boolean>(false);

  // History modal toggle
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<CalculationRecord[]>([]);

  // Load history on mount
  useEffect(() => {
    setHistoryList(getCalcHistory());
  }, []);

  // Localized presets
  const quickPresets = useMemo(() => {
    const map: Record<SupportedLang, { name: string; inner: string; outer: string; x: number }[]> = {
      en: [
        { name: 'Log Quadratic: log₂(x² - 4x + 3), x=5', inner: 'x^2 - 4*x + 3', outer: 'log2(u)', x: 5 },
        { name: 'Exponential: (1/2)^(x² - 2x), x=1', inner: 'x^2 - 2*x', outer: '(1/2)^u', x: 1 },
        { name: 'Square Root: √(2x + 6), x=5', inner: '2*x + 6', outer: 'sqrt(u)', x: 5 },
        { name: 'Reciprocal: 1/(x - 2), x=4', inner: 'x - 2', outer: '1/u', x: 4 },
        { name: 'Self-Composition: f(f(x)) where f(x)=2x-1, x=3', inner: '2*x - 1', outer: '2*u - 1', x: 3 },
      ],
      es: [
        { name: 'Logarítmica Cuadrática: log₂(x² - 4x + 3), x=5', inner: 'x^2 - 4*x + 3', outer: 'log2(u)', x: 5 },
        { name: 'Exponencial: (1/2)^(x² - 2x), x=1', inner: 'x^2 - 2*x', outer: '(1/2)^u', x: 1 },
        { name: 'Raíz Cuadrada: √(2x + 6), x=5', inner: '2*x + 6', outer: 'sqrt(u)', x: 5 },
        { name: 'Racional / Inversa: 1/(x - 2), x=4', inner: 'x - 2', outer: '1/u', x: 4 },
        { name: 'Auto-composición: f(f(x)) con f(x)=2x-1, x=3', inner: '2*x - 1', outer: '2*u - 1', x: 3 },
      ],
      fr: [
        { name: 'Logarithmique Quadratique : log₂(x² - 4x + 3), x=5', inner: 'x^2 - 4*x + 3', outer: 'log2(u)', x: 5 },
        { name: 'Exponentielle : (1/2)^(x² - 2x), x=1', inner: 'x^2 - 2*x', outer: '(1/2)^u', x: 1 },
        { name: 'Racine Carrée : √(2x + 6), x=5', inner: '2*x + 6', outer: 'sqrt(u)', x: 5 },
        { name: 'Inverse : 1/(x - 2), x=4', inner: 'x - 2', outer: '1/u', x: 4 },
        { name: 'Auto-composition : f(f(x)) avec f(x)=2x-1, x=3', inner: '2*x - 1', outer: '2*u - 1', x: 3 },
      ],
      pt: [
        { name: 'Logarítmica Quadrática: log₂(x² - 4x + 3), x=5', inner: 'x^2 - 4*x + 3', outer: 'log2(u)', x: 5 },
        { name: 'Exponencial: (1/2)^(x² - 2x), x=1', inner: 'x^2 - 2*x', outer: '(1/2)^u', x: 1 },
        { name: 'Raiz Quadrada: √(2x + 6), x=5', inner: '2*x + 6', outer: 'sqrt(u)', x: 5 },
        { name: 'Inversa: 1/(x - 2), x=4', inner: 'x - 2', outer: '1/u', x: 4 },
        { name: 'Auto-composição: f(f(x)) com f(x)=2x-1, x=3', inner: '2*x - 1', outer: '2*u - 1', x: 3 },
      ],
      zh: [
        { name: '经典对数二次：log₂(x² - 4x + 3), x=5', inner: 'x^2 - 4*x + 3', outer: 'log2(u)', x: 5 },
        { name: '指数复合二次：(1/2)^(x² - 2x), x=1', inner: 'x^2 - 2*x', outer: '(1/2)^u', x: 1 },
        { name: '根式复合：√(2x + 6), x=5', inner: '2*x + 6', outer: 'sqrt(u)', x: 5 },
        { name: '反比例复合：1/(x - 2), x=4', inner: 'x - 2', outer: '1/u', x: 4 },
        { name: '双重自复合：f(f(x)) 其中 f(x) = 2x - 1, x=3', inner: '2*x - 1', outer: '2*u - 1', x: 3 },
      ],
    };
    return map[lang] || map.en;
  }, [lang]);

  // Load preset handler
  const loadPreset = (preset: { inner: string; outer: string; x: number }) => {
    setInnerExpr(preset.inner);
    setOuterExpr(preset.outer);
    setX0(preset.x);
    setActiveTab('evaluator');
  };

  // Compute forward composite f(g(x0))
  const forwardCalc = useMemo(() => {
    try {
      // Step 1: inner g(x0)
      const domainCheckInner = checkDomainValidity(innerExpr, 'x', x0);
      if (!domainCheckInner.valid) {
        return {
          innerVal: null,
          outerVal: null,
          domainError: `${t.domainInvalid} ${domainCheckInner.reason}`,
        };
      }

      const innerVal = evaluateRaw(innerExpr, { x: x0 });

      // Step 2: outer f(innerVal)
      const domainCheckOuter = checkDomainValidity(outerExpr, 'u', innerVal);
      if (!domainCheckOuter.valid) {
        return {
          innerVal,
          outerVal: null,
          domainError: `${t.domainInvalid} u = ${innerVal.toFixed(2)} (${domainCheckOuter.reason})`,
        };
      }

      const outerVal = evaluateRaw(outerExpr, { u: innerVal, x: innerVal });
      return {
        innerVal,
        outerVal,
        domainError: null,
      };
    } catch (e: any) {
      return {
        innerVal: null,
        outerVal: null,
        domainError: e.message || 'Expression evaluation error',
      };
    }
  }, [innerExpr, outerExpr, x0, t]);

  // Auto save valid record to history
  useEffect(() => {
    if (forwardCalc.outerVal !== null && isFinite(forwardCalc.outerVal)) {
      saveCalcRecord({
        innerExpr,
        outerExpr,
        x0,
        innerVal: forwardCalc.innerVal,
        outerVal: forwardCalc.outerVal,
      });
      setHistoryList(getCalcHistory());
    }
  }, [innerExpr, outerExpr, x0, forwardCalc.outerVal, forwardCalc.innerVal]);

  // Compute reverse comparison g(f(x0)) for contrast
  const reverseCalc = useMemo(() => {
    try {
      const domainCheck1 = checkDomainValidity(outerExpr, 'u', x0);
      if (!domainCheck1.valid) {
        return {
          val: null,
          error: `${t.domainInvalid} x = ${x0}`,
        };
      }
      const v0 = evaluateRaw(outerExpr, { u: x0, x: x0 });

      const domainCheck2 = checkDomainValidity(innerExpr, 'x', v0);
      if (!domainCheck2.valid) {
        return {
          val: null,
          error: `${t.domainInvalid} v = ${v0.toFixed(2)}`,
        };
      }
      const res = evaluateRaw(innerExpr, { x: v0 });
      return { val: res, error: null };
    } catch (e: any) {
      return { val: null, error: e.message || 'Error' };
    }
  }, [innerExpr, outerExpr, x0, t]);

  // Insert token from keypad
  const handleKeypadInsert = (token: string) => {
    if (keypadTarget === 'inner') {
      setInnerExpr((prev) => prev + token);
    } else {
      setOuterExpr((prev) => prev + token);
    }
  };

  const handleKeypadBackspace = () => {
    if (keypadTarget === 'inner') {
      setInnerExpr((prev) => prev.slice(0, -1));
    } else {
      setOuterExpr((prev) => prev.slice(0, -1));
    }
  };

  const handleKeypadClear = () => {
    if (keypadTarget === 'inner') {
      setInnerExpr('');
    } else {
      setOuterExpr('');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans text-sm sm:text-base">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-3 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex flex-wrap items-center gap-2">
                  <span>{t.appName}</span>
                  <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-100">
                    STEM Edu
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 hidden sm:block mt-0.5">
                  {t.appSubtitle}
                </p>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Language Selector Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
                <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as SupportedLang)}
                  className="bg-transparent text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer focus:outline-hidden"
                >
                  {LANG_OPTIONS.map((opt) => (
                    <option key={opt.code} value={opt.code}>
                      {opt.flag} {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* OCR Button */}
              <button
                onClick={() => setShowOcrModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold border border-indigo-200 transition-colors cursor-pointer shadow-2xs"
              >
                <Camera className="w-4 h-4 text-indigo-600" />
                <span>{t.ocrBtn}</span>
              </button>

              {/* History Button */}
              <button
                onClick={() => setShowHistoryModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs sm:text-sm text-slate-700 font-medium transition-colors cursor-pointer"
              >
                <History className="w-4 h-4 text-indigo-600" />
                <span>{t.historyBtn} ({historyList.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Core Mathematical Keyword Strip */}
        <div className="bg-slate-50/70 border-t border-b border-slate-200 py-2 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-slate-600 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              {lang === 'zh' ? '核心概念高亮:' : lang === 'es' ? 'Conceptos Clave:' : lang === 'fr' ? 'Concepts Clés :' : lang === 'pt' ? 'Conceitos Chave:' : 'Core Concepts:'}
            </span>
            <KeywordBadge type="inner" label={t.keywordInner} math="u = g(x)" />
            <KeywordBadge type="outer" label={t.keywordOuter} math="y = f(u)" />
            <KeywordBadge type="axis" label={t.keywordAxis} math="x = -b/(2a)" />
            <KeywordBadge type="vertex" label={t.keywordVertex} math="a(x-h)² + k" />
            <KeywordBadge type="monotonicity" label={t.keywordMonotonicity} />
            <KeywordBadge type="chain" label={t.keywordChainRule} math="f'(g(x)) · g'(x)" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-1.5 scrollbar-none">
            <button
              onClick={() => setActiveTab('evaluator')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'evaluator'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4" />
              {t.tabEvaluator}
            </button>

            <button
              onClick={() => setActiveTab('completing_square')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'completing_square'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              {t.tabCompletingSquare}
            </button>

            <button
              onClick={() => setActiveTab('axis_classification')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'axis_classification'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sliders className="w-4 h-4 text-amber-300" />
              {t.tabAxisClassification}
            </button>

            <button
              onClick={() => setActiveTab('roots')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'roots'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Target className="w-4 h-4 text-rose-300" />
              {t.tabRoots}
            </button>

            <button
              onClick={() => setActiveTab('chain_derivatives')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'chain_derivatives'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Network className="w-4 h-4 text-cyan-300" />
              {t.tabChainDerivatives}
            </button>

            <button
              onClick={() => setActiveTab('piecewise')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'piecewise'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              {t.tabPiecewise}
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              {t.tabQuiz}
            </button>

            <button
              onClick={() => setActiveTab('classic')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'classic'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {t.tabClassic}
            </button>

            <button
              onClick={() => setActiveTab('ai_tutor')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'ai_tutor'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              {t.tabAiTutor}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Evaluator */}
        {activeTab === 'evaluator' && (
          <div className="space-y-6">
            {/* Input Config Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
                    {t.evaluatorTitle}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {t.evaluatorSubtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowKeypad(!showKeypad)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-lg border border-indigo-200 transition-colors cursor-pointer"
                  >
                    <Keyboard className="w-4 h-4" />
                    {showKeypad ? t.keyboardToggleClose : t.keyboardToggleOpen}
                  </button>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 mb-5 pb-4 border-b border-slate-100">
                <span className="text-xs sm:text-sm font-bold text-slate-500 py-1 mr-1">
                  {t.quickPresetsLabel}
                </span>
                {quickPresets.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadPreset(qp)}
                    className="text-xs sm:text-sm bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200 hover:border-indigo-300 px-3 py-1.5 rounded-lg transition-all font-medium text-left cursor-pointer"
                  >
                    {qp.name.split(/[:：]/)[0]}
                  </button>
                ))}
              </div>

              {/* Input Form with Larger Fonts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Inner input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm sm:text-base font-bold text-sky-950 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                      {t.innerFuncLabel}
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setKeypadTarget('inner');
                        setShowKeypad(true);
                      }}
                      className="text-xs text-sky-600 hover:underline font-mono"
                    >
                      {t.innerFuncSub}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={innerExpr}
                    onFocus={() => setKeypadTarget('inner')}
                    onChange={(e) => setInnerExpr(e.target.value)}
                    placeholder="e.g.: x^2 - 4*x + 3"
                    className="w-full text-base font-mono p-3 border border-sky-300 rounded-xl focus:ring-2 focus:ring-sky-500 bg-sky-50/20 font-semibold"
                  />
                  <div className="text-xs text-slate-500">
                    {lang === 'zh' ? '支持: x^2, 2*x+1, sqrt(x), sin(x)' : 'Supports: x^2, 2*x+1, sqrt(x), sin(x)'}
                  </div>
                </div>

                {/* Outer input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm sm:text-base font-bold text-purple-950 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                      {t.outerFuncLabel}
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setKeypadTarget('outer');
                        setShowKeypad(true);
                      }}
                      className="text-xs text-purple-600 hover:underline font-mono"
                    >
                      {t.outerFuncSub}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={outerExpr}
                    onFocus={() => setKeypadTarget('outer')}
                    onChange={(e) => setOuterExpr(e.target.value)}
                    placeholder="e.g.: log2(u) or u^2 or (1/2)^u"
                    className="w-full text-base font-mono p-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 bg-purple-50/20 font-semibold"
                  />
                  <div className="text-xs text-slate-500">
                    {lang === 'zh' ? '支持: log2(u), ln(u), sqrt(u), (1/2)^u' : 'Supports: log2(u), ln(u), sqrt(u), (1/2)^u'}
                  </div>
                </div>

                {/* Input point x0 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm sm:text-base font-bold text-slate-900">
                      {t.evalPointLabel}
                    </label>
                    <span className="text-xs text-slate-400">{t.evalPointSub}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.5"
                      value={x0}
                      onChange={(e) => setX0(parseFloat(e.target.value) || 0)}
                      className="w-full text-base font-mono font-bold p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => setX0((prev) => prev + 1)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-md"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => setX0((prev) => prev - 1)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-md"
                      >
                        -1
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {t.calcRealtime} <MathView math={`f(g(${x0}))`} />
                  </div>
                </div>
              </div>

              {/* Math Virtual Keypad Box */}
              {showKeypad && (
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <MathKeypad
                    onInsert={handleKeypadInsert}
                    onBackspace={handleKeypadBackspace}
                    onClear={handleKeypadClear}
                    targetVar={keypadTarget === 'inner' ? 'x' : 'u'}
                  />
                </div>
              )}
            </div>

            {/* Interactive Graph Projection Visualizer */}
            <InteractiveGraph
              innerExpr={innerExpr}
              outerExpr={outerExpr}
              x0={x0}
              onX0Change={setX0}
              innerVal={forwardCalc.innerVal}
              outerVal={forwardCalc.outerVal}
            />

            {/* Step-by-Step Layer Solution Flow */}
            <CompositeStepVisualizer
              innerExpr={innerExpr}
              outerExpr={outerExpr}
              x0={x0}
              innerVal={forwardCalc.innerVal}
              outerVal={forwardCalc.outerVal}
              domainError={forwardCalc.domainError}
              reverseVal={reverseCalc.val}
              reverseDomainError={reverseCalc.error}
            />
          </div>
        )}

        {/* Tab 2: Completing the Square */}
        {activeTab === 'completing_square' && <CompletingSquareView />}

        {/* Tab 3: Dynamic Axis Classification */}
        {activeTab === 'axis_classification' && <DynamicAxisClassificationView />}

        {/* Tab 4: Composite Roots & Zeros Counter */}
        {activeTab === 'roots' && <CompositeRootsView />}

        {/* Tab 5: Chain Rule Derivatives & Tangent */}
        {activeTab === 'chain_derivatives' && <ChainRuleDerivativesView />}

        {/* Tab 6: Piecewise Composite */}
        {activeTab === 'piecewise' && <PiecewiseCompositeView />}

        {/* Tab 7: Interactive Quiz Mode */}
        {activeTab === 'quiz' && <InteractiveQuizMode />}

        {/* Tab 8: Classic Problems */}
        {activeTab === 'classic' && (
          <ClassicProblems
            onLoadToCalculator={(inner, outer, x) =>
              loadPreset({ inner, outer, x })
            }
          />
        )}

        {/* Tab 9: AI Tutor */}
        {activeTab === 'ai_tutor' && <AiTutorModal />}
      </main>

      {/* History & Bookmarks Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full border border-slate-200 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">
                  {t.historyModalTitle}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                {historyList.length > 0 && (
                  <button
                    onClick={() => {
                      clearHistory();
                      setHistoryList([]);
                    }}
                    className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    {t.historyClearBtn}
                  </button>
                )}
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5 max-h-96 overflow-y-auto space-y-2.5">
              {historyList.length === 0 ? (
                <div className="text-center py-8 text-sm text-slate-400">
                  {t.historyEmpty}
                </div>
              ) : (
                historyList.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white flex items-center justify-between text-sm transition-all"
                  >
                    <div className="space-y-1">
                      <div className="font-mono font-semibold text-slate-900">
                        f(u) = {item.outerExpr}, \quad g(x) = {item.innerExpr}
                      </div>
                      <div className="text-slate-500 font-mono text-xs">
                        x = {item.x0} → y = {item.outerVal !== null ? item.outerVal.toFixed(3) : 'undefined'}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const updated = toggleBookmark(item.id);
                          setHistoryList(updated);
                        }}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-amber-500 cursor-pointer"
                        title={item.isBookmarked ? 'Unstar' : 'Star'}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            item.isBookmarked ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => {
                          loadPreset({
                            inner: item.innerExpr,
                            outer: item.outerExpr,
                            x: item.x0,
                          });
                          setShowHistoryModal(false);
                        }}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        {t.historyLoadBtn}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Photo OCR Modal */}
      {showOcrModal && (
        <PhotoOcrModal
          onClose={() => setShowOcrModal(false)}
          onImportToCalculator={(inner, outer, x) => {
            loadPreset({ inner, outer, x });
            setShowOcrModal(false);
          }}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 mt-12 text-center text-xs sm:text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1.5">
          <p className="font-semibold text-slate-700">
            {t.footerText}
          </p>
          <p className="text-xs text-slate-400">
            {t.footerCore}
          </p>
        </div>
      </footer>
    </div>
  );
}
