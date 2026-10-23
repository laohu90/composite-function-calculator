import React, { useState } from 'react';
import { MathView } from './MathView';
import { useI18n } from '../i18n/context';
import { KeywordBadge } from './KeywordBadge';
import { Trophy, CheckCircle2, XCircle, ArrowRight, RotateCcw, Star } from 'lucide-react';

interface QuizQuestion {
  id: number;
  stageName: string;
  problem: string;
  latexProblem: string;
  options: {
    label: string;
    text: string;
  }[];
  correctIndex: number;
  explanation: string;
}

export const InteractiveQuizMode: React.FC = () => {
  const { lang, t } = useI18n();

  const questionsByLang: Record<string, QuizQuestion[]> = {
    zh: [
      {
        id: 1,
        stageName: '第一关：内外层透视眼',
        problem: '对于复合函数 y = log₂(3x² - 6x + 5)，下列关于内层与外层拆分正确的是：',
        latexProblem: 'y = \\log_2(3x^2 - 6x + 5)',
        options: [
          { label: 'A', text: '内层为 u = log₂(x)，外层为 y = 3u² - 6u + 5' },
          { label: 'B', text: '内层为 u = 3x² - 6x + 5，外层为 y = log₂(u)' },
          { label: 'C', text: '内层为 u = 3x²，外层为 y = log₂(u - 6x + 5)' },
          { label: 'D', text: '内层为 u = x² - 2x，外层为 y = 3·log₂(u)' },
        ],
        correctIndex: 1,
        explanation: '【解析】“洋葱法”从外向内剥：最外层的作用机制是对数运算 y = \\log_2(u)；内层括号里的整体作为自变量，即中间量 u = 3x^2 - 6x + 5。先算内层二次式的值，再算外层对数。',
      },
      {
        id: 2,
        stageName: '第二关：配方法对称轴与区间最值',
        problem: '二次函数 g(x) = x² - 4x + 6 在闭区间 x ∈ [3, 6] 上的最小值与最大值分别是：',
        latexProblem: 'g(x) = x^2 - 4x + 6, \\quad x \\in [3, 6]',
        options: [
          { label: 'A', text: '最小值 2 (在顶点 x=2 处)，最大值 18 (在 x=6 处)' },
          { label: 'B', text: '最小值 3 (在端点 x=3 处)，最大值 18 (在端点 x=6 处)' },
          { label: 'C', text: '最小值 3 (在端点 x=3 处)，最大值 6 (在端点 x=6 处)' },
          { label: 'D', text: '最小值 2 (在顶点 x=2 处)，最大值 3 (在 x=3 处)' },
        ],
        correctIndex: 1,
        explanation: '【解析】配方得 g(x) = (x - 2)^2 + 2，对称轴为直线 x = 2。注意：对称轴 x = 2 并不在区间 [3, 6] 内部（2 < 3）！因此函数在 [3, 6] 上单调递增，最小值必在左端点 g(3) = 3；最大值在右端点 g(6) = 18。许多同学盲目套用顶点公式选 A 导致丢分！',
      },
      {
        id: 3,
        stageName: '第三关：“同增异减”单调性口诀决断',
        problem: '已知复合函数 y = (1/3)^(x² - 2x)，则该函数的单调递增区间是：',
        latexProblem: 'y = \\left(\\frac{1}{3}\\right)^{x^2 - 2x}',
        options: [
          { label: 'A', text: '[1, +∞)' },
          { label: 'B', text: '(-∞, 1]' },
          { label: 'C', text: '(-∞, 0]' },
          { label: 'D', text: '[0, 2]' },
        ],
        correctIndex: 1,
        explanation: '【解析】外层函数 y = (1/3)^u 的底数 0 < 1/3 < 1 为减函数。根据“同增异减”口诀：外层为减时，若要求复合函数单调递增，内层函数 u = x^2 - 2x 必须单调递减（异减 → 复合增）！内层抛物线对称轴为 x = 1，其单调递减区间为 (-∞, 1]。因此复合函数的增区间即为 (-∞, 1]。',
      },
      {
        id: 4,
        stageName: '第四关：分段函数复合分支精准穿透',
        problem: '设 f(x) = { 2x + 1 (x < 1); x² - 2 (x ≥ 1) }，则 f(f(0)) 的值等于：',
        latexProblem: 'f(x) = \\begin{cases} 2x + 1, & x < 1 \\\\ x^2 - 2, & x \\ge 1 \\end{cases}',
        options: [
          { label: 'A', text: '-1' },
          { label: 'B', text: '3' },
          { label: 'C', text: '1' },
          { label: 'D', text: '-2' },
        ],
        correctIndex: 0,
        explanation: '【解析】先算内层：自变量 x = 0 < 1，符合上分支条件，故 f(0) = 2(0) + 1 = 1。得到中间值 u = 1。再算外层 f(1)：此时中间变量 u = 1 ≥ 1，符合下分支条件！代入下分支解析式：f(1) = 1² - 2 = -1。故 f(f(0)) = -1。',
      },
    ],
    en: [
      {
        id: 1,
        stageName: 'Level 1: Inner vs. Outer Layer Decomposition',
        problem: 'For the composite function y = log₂(3x² - 6x + 5), which decomposition is correct?',
        latexProblem: 'y = \\log_2(3x^2 - 6x + 5)',
        options: [
          { label: 'A', text: 'Inner: u = log₂(x), Outer: y = 3u² - 6u + 5' },
          { label: 'B', text: 'Inner: u = 3x² - 6x + 5, Outer: y = log₂(u)' },
          { label: 'C', text: 'Inner: u = 3x², Outer: y = log₂(u - 6x + 5)' },
          { label: 'D', text: 'Inner: u = x² - 2x, Outer: y = 3·log₂(u)' },
        ],
        correctIndex: 1,
        explanation: 'The outermost operation is the logarithm base 2, y = \\log_2(u). The expression inside parentheses acts as the intermediate input: u = 3x^2 - 6x + 5. First compute the quadratic inner layer, then evaluate the logarithm.',
      },
      {
        id: 2,
        stageName: 'Level 2: Completing the Square & Interval Extrema Trap',
        problem: 'For g(x) = x² - 4x + 6 on the closed interval x ∈ [3, 6], what are the minimum and maximum values?',
        latexProblem: 'g(x) = x^2 - 4x + 6, \\quad x \\in [3, 6]',
        options: [
          { label: 'A', text: 'Min 2 (at vertex x=2), Max 18 (at x=6)' },
          { label: 'B', text: 'Min 3 (at left bound x=3), Max 18 (at right bound x=6)' },
          { label: 'C', text: 'Min 3 (at left bound x=3), Max 6 (at right bound x=6)' },
          { label: 'D', text: 'Min 2 (at vertex x=2), Max 3 (at x=3)' },
        ],
        correctIndex: 1,
        explanation: 'Completing the square gives g(x) = (x - 2)^2 + 2. The axis of symmetry is x = 2. Crucially, x = 2 is NOT inside [3, 6] (2 < 3)! Therefore, g(x) is strictly increasing on [3, 6]. The minimum is at x=3: g(3)=3; maximum is at x=6: g(6)=18.',
      },
      {
        id: 3,
        stageName: 'Level 3: Monotonicity Composition Rule',
        problem: 'For the composite function y = (1/3)^(x² - 2x), what is its interval of increase?',
        latexProblem: 'y = \\left(\\frac{1}{3}\\right)^{x^2 - 2x}',
        options: [
          { label: 'A', text: '[1, +∞)' },
          { label: 'B', text: '(-∞, 1]' },
          { label: 'C', text: '(-∞, 0]' },
          { label: 'D', text: '[0, 2]' },
        ],
        correctIndex: 1,
        explanation: 'The outer base is 0 < 1/3 < 1, which is strictly decreasing. By the composition rule: if the outer function is decreasing, the composite function increases when the inner function u = x^2 - 2x decreases! The axis of the parabola is x = 1, decreasing on (-∞, 1]. Hence the increasing interval is (-∞, 1].',
      },
      {
        id: 4,
        stageName: 'Level 4: Piecewise Composition Branch Tracking',
        problem: 'Given f(x) = { 2x + 1 (x < 1); x² - 2 (x ≥ 1) }, what is the value of f(f(0))?',
        latexProblem: 'f(x) = \\begin{cases} 2x + 1, & x < 1 \\\\ x^2 - 2, & x \\ge 1 \\end{cases}',
        options: [
          { label: 'A', text: '-1' },
          { label: 'B', text: '3' },
          { label: 'C', text: '1' },
          { label: 'D', text: '-2' },
        ],
        correctIndex: 0,
        explanation: 'Step 1 (inner): x = 0 < 1, so use upper branch: f(0) = 2(0) + 1 = 1. Intermediate result u = 1. Step 2 (outer): u = 1 ≥ 1, which now falls into the lower branch! Therefore f(1) = 1² - 2 = -1. Thus f(f(0)) = -1.',
      },
    ],
    es: [
      {
        id: 1,
        stageName: 'Nivel 1: Descomposición en Capa Interna y Externa',
        problem: 'Para la función compuesta y = log₂(3x² - 6x + 5), ¿cuál descomposición es correcta?',
        latexProblem: 'y = \\log_2(3x^2 - 6x + 5)',
        options: [
          { label: 'A', text: 'Interna: u = log₂(x), Externa: y = 3u² - 6u + 5' },
          { label: 'B', text: 'Interna: u = 3x² - 6x + 5, Externa: y = log₂(u)' },
          { label: 'C', text: 'Interna: u = 3x², Externa: y = log₂(u - 6x + 5)' },
          { label: 'D', text: 'Interna: u = x² - 2x, Externa: y = 3·log₂(u)' },
        ],
        correctIndex: 1,
        explanation: 'La operación exterior es el logaritmo en base 2: y = log₂(u). Lo que está entre paréntesis es la variable intermedia: u = 3x² - 6x + 5.',
      },
      {
        id: 2,
        stageName: 'Nivel 2: Completar Cuadrados y Extremos en Intervalo',
        problem: 'Para g(x) = x² - 4x + 6 en el intervalo cerrado [3, 6], ¿cuáles son el mínimo y el máximo?',
        latexProblem: 'g(x) = x^2 - 4x + 6, \\quad x \\in [3, 6]',
        options: [
          { label: 'A', text: 'Mínimo 2 (en vértice x=2), Máximo 18 (en x=6)' },
          { label: 'B', text: 'Mínimo 3 (en x=3), Máximo 18 (en x=6)' },
          { label: 'C', text: 'Mínimo 3 (en x=3), Máximo 6 (en x=6)' },
          { label: 'D', text: 'Mínimo 2 (en vértice x=2), Máximo 3 (en x=3)' },
        ],
        correctIndex: 1,
        explanation: 'Completando el cuadrado: g(x) = (x - 2)² + 2. El eje de simetría es x = 2, ¡que NO está dentro de [3, 6]! La función es creciente en [3, 6]. Mínimo en x=3: g(3)=3; máximo en x=6: g(6)=18.',
      },
      {
        id: 3,
        stageName: 'Nivel 3: Regla de Monotonía Compuesta',
        problem: 'Para y = (1/3)^(x² - 2x), ¿cuál es el intervalo de crecimiento?',
        latexProblem: 'y = \\left(\\frac{1}{3}\\right)^{x^2 - 2x}',
        options: [
          { label: 'A', text: '[1, +∞)' },
          { label: 'B', text: '(-∞, 1]' },
          { label: 'C', text: '(-∞, 0]' },
          { label: 'D', text: '[0, 2]' },
        ],
        correctIndex: 1,
        explanation: 'La base exterior 1/3 < 1 es decreciente. Para que la función compuesta sea creciente, la interna u = x² - 2x debe ser decreciente. El eje es x = 1, decreciente en (-∞, 1].',
      },
      {
        id: 4,
        stageName: 'Nivel 4: Composición de Función a Trozos',
        problem: 'Sea f(x) = { 2x + 1 (x < 1); x² - 2 (x ≥ 1) }, ¿cuánto vale f(f(0))?',
        latexProblem: 'f(x) = \\begin{cases} 2x + 1, & x < 1 \\\\ x^2 - 2, & x \\ge 1 \\end{cases}',
        options: [
          { label: 'A', text: '-1' },
          { label: 'B', text: '3' },
          { label: 'C', text: '1' },
          { label: 'D', text: '-2' },
        ],
        correctIndex: 0,
        explanation: 'Paso 1: x = 0 < 1, rama superior: f(0) = 2(0) + 1 = 1. Paso 2: u = 1 ≥ 1, rama inferior: f(1) = 1² - 2 = -1. Por tanto f(f(0)) = -1.',
      },
    ],
    fr: [
      {
        id: 1,
        stageName: 'Niveau 1 : Décomposition couche interne / couche externe',
        problem: 'Pour la fonction composée y = log₂(3x² - 6x + 5), quelle décomposition est correcte ?',
        latexProblem: 'y = \\log_2(3x^2 - 6x + 5)',
        options: [
          { label: 'A', text: 'Interne : u = log₂(x), Externe : y = 3u² - 6u + 5' },
          { label: 'B', text: 'Interne : u = 3x² - 6x + 5, Externe : y = log₂(u)' },
          { label: 'C', text: 'Interne : u = 3x², Externe : y = log₂(u - 6x + 5)' },
          { label: 'D', text: 'Interne : u = x² - 2x, Externe : y = 3·log₂(u)' },
        ],
        correctIndex: 1,
        explanation: 'L\'opération la plus externe est le logarithme en base 2 : y = log₂(u). La quantité entre parenthèses forme la variable intermédiaire u = 3x² - 6x + 5.',
      },
      {
        id: 2,
        stageName: 'Niveau 2 : Forme canonique et extremums sur intervalle fermé',
        problem: 'Pour g(x) = x² - 4x + 6 sur [3, 6], quelles sont les valeurs minimale et maximale ?',
        latexProblem: 'g(x) = x^2 - 4x + 6, \\quad x \\in [3, 6]',
        options: [
          { label: 'A', text: 'Min 2 (au sommet x=2), Max 18 (en x=6)' },
          { label: 'B', text: 'Min 3 (en x=3), Max 18 (en x=6)' },
          { label: 'C', text: 'Min 3 (en x=3), Max 6 (en x=6)' },
          { label: 'D', text: 'Min 2 (au sommet x=2), Max 3 (en x=3)' },
        ],
        correctIndex: 1,
        explanation: 'Forme canonique : g(x) = (x - 2)² + 2. L\'axe de symétrie est x = 2, qui est hors de [3, 6]. La fonction est croissante sur [3, 6]. Min en x=3 : g(3)=3 ; Max en x=6 : g(6)=18.',
      },
      {
        id: 3,
        stageName: 'Niveau 3 : Règle de monotonie d\'une fonction composée',
        problem: 'Pour y = (1/3)^(x² - 2x), quel est l\'intervalle de croissance ?',
        latexProblem: 'y = \\left(\\frac{1}{3}\\right)^{x^2 - 2x}',
        options: [
          { label: 'A', text: '[1, +∞)' },
          { label: 'B', text: '(-∞, 1]' },
          { label: 'C', text: '(-∞, 0]' },
          { label: 'D', text: '[0, 2]' },
        ],
        correctIndex: 1,
        explanation: 'La base 1/3 < 1 est strictement décroissante. Pour que la fonction composée soit croissante, la fonction interne u = x² - 2x doit être décroissante. L\'axe est x = 1, décroissante sur (-∞, 1].',
      },
      {
        id: 4,
        stageName: 'Niveau 4 : Composition de fonctions par morceaux',
        problem: 'Soit f(x) = { 2x + 1 (x < 1) ; x² - 2 (x ≥ 1) }, quelle est la valeur de f(f(0)) ?',
        latexProblem: 'f(x) = \\begin{cases} 2x + 1, & x < 1 \\\\ x^2 - 2, & x \\ge 1 \\end{cases}',
        options: [
          { label: 'A', text: '-1' },
          { label: 'B', text: '3' },
          { label: 'C', text: '1' },
          { label: 'D', text: '-2' },
        ],
        correctIndex: 0,
        explanation: 'Étape 1 : x = 0 < 1, branche supérieure f(0) = 2(0)+1 = 1. Étape 2 : u = 1 ≥ 1, branche inférieure f(1) = 1² - 2 = -1. Donc f(f(0)) = -1.',
      },
    ],
    pt: [
      {
        id: 1,
        stageName: 'Nível 1: Decomposição de Camada Interna e Externa',
        problem: 'Para a função composta y = log₂(3x² - 6x + 5), qual decomposição está correta?',
        latexProblem: 'y = \\log_2(3x^2 - 6x + 5)',
        options: [
          { label: 'A', text: 'Interna: u = log₂(x), Externa: y = 3u² - 6u + 5' },
          { label: 'B', text: 'Interna: u = 3x² - 6x + 5, Externa: y = log₂(u)' },
          { label: 'C', text: 'Interna: u = 3x², Externa: y = log₂(u - 6x + 5)' },
          { label: 'D', text: 'Interna: u = x² - 2x, Externa: y = 3·log₂(u)' },
        ],
        correctIndex: 1,
        explanation: 'A operação mais externa é o logaritmo de base 2: y = log₂(u). A expressão dentro dos parênteses é a variável intermediária: u = 3x² - 6x + 5.',
      },
      {
        id: 2,
        stageName: 'Nível 2: Completamento de Quadrados e Extremos em Intervalo',
        problem: 'Para g(x) = x² - 4x + 6 no intervalo fechado [3, 6], quais são o valor mínimo e máximo?',
        latexProblem: 'g(x) = x^2 - 4x + 6, \\quad x \\in [3, 6]',
        options: [
          { label: 'A', text: 'Mínimo 2 (no vértice x=2), Máximo 18 (em x=6)' },
          { label: 'B', text: 'Mínimo 3 (em x=3), Máximo 18 (em x=6)' },
          { label: 'C', text: 'Mínimo 3 (em x=3), Máximo 6 (em x=6)' },
          { label: 'D', text: 'Mínimo 2 (no vértice x=2), Máximo 3 (em x=3)' },
        ],
        correctIndex: 1,
        explanation: 'Completando o quadrado: g(x) = (x - 2)² + 2. O eixo de simetria é x = 2, que está fora de [3, 6]. A função é crescente em [3, 6]. Mínimo em x=3: g(3)=3; máximo em x=6: g(6)=18.',
      },
      {
        id: 3,
        stageName: 'Nível 3: Regra de Monotonia de Função Composta',
        problem: 'Para y = (1/3)^(x² - 2x), qual é o intervalo de crescimento?',
        latexProblem: 'y = \\left(\\frac{1}{3}\\right)^{x^2 - 2x}',
        options: [
          { label: 'A', text: '[1, +∞)' },
          { label: 'B', text: '(-∞, 1]' },
          { label: 'C', text: '(-∞, 0]' },
          { label: 'D', text: '[0, 2]' },
        ],
        correctIndex: 1,
        explanation: 'A base 1/3 < 1 é estritamente decrescente. Para a composta ser crescente, a interna u = x² - 2x precisa ser decrescente. O eixo é x = 1, decrescente em (-∞, 1].',
      },
      {
        id: 4,
        stageName: 'Nível 4: Composição de Funções por Partes',
        problem: 'Seja f(x) = { 2x + 1 (x < 1); x² - 2 (x ≥ 1) }, qual é o valor de f(f(0))?',
        latexProblem: 'f(x) = \\begin{cases} 2x + 1, & x < 1 \\\\ x^2 - 2, & x \\ge 1 \\end{cases}',
        options: [
          { label: 'A', text: '-1' },
          { label: 'B', text: '3' },
          { label: 'C', text: '1' },
          { label: 'D', text: '-2' },
        ],
        correctIndex: 0,
        explanation: 'Etapa 1: x = 0 < 1, ramo superior: f(0) = 2(0)+1 = 1. Etapa 2: u = 1 ≥ 1, ramo inferior: f(1) = 1² - 2 = -1. Portanto f(f(0)) = -1.',
      },
    ],
  };

  const questions = questionsByLang[lang] || questionsByLang['en'];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const q = questions[Math.min(currentIndex, questions.length - 1)];

  const handleSelectOption = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
    setShowResult(true);
    if (idx === q.correctIndex) {
      setScore((prev) => prev + 25);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                <Trophy className="w-3.5 h-3.5" />
                {lang === 'zh' ? '互动闯关 · 高中生做题练脑模式' : 'Interactive Math Challenge'}
              </span>
              <KeywordBadge type="inner" />
              <KeywordBadge type="outer" />
              <KeywordBadge type="monotonicity" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {t.quizTitle}
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              {t.quizSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
            <span className="text-xs md:text-sm text-slate-500 font-medium">{t.quizScore}:</span>
            <span className="text-lg md:text-xl font-mono font-bold text-indigo-700">{score}</span>
            <div className="flex items-center text-amber-400">
              {[...Array(Math.floor(score / 25))].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs md:text-sm text-slate-600 mb-1.5">
            <span>{t.quizProgress}: {currentIndex + 1} / {questions.length}</span>
            <span className="font-semibold text-indigo-600">{q.stageName}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-2.5 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quiz Body */}
      {!completed ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
          <div className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl">
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block mb-2">
              {lang === 'zh' ? '【题目】' : '[Question]'}
            </span>
            <p className="text-sm md:text-base font-semibold text-slate-900 leading-relaxed mb-3">
              {q.problem}
            </p>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-center font-serif text-base">
              <MathView math={q.latexProblem} block />
            </div>
          </div>

          {/* Options with enlarged font */}
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === q.correctIndex;

              let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
              if (showResult) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-semibold';
                } else if (isSelected) {
                  btnStyle = 'border-rose-400 bg-rose-50/90 text-rose-950';
                } else {
                  btnStyle = 'border-slate-100 bg-slate-50/40 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border text-left text-sm md:text-base transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-slate-100 border border-slate-300 font-bold text-slate-700 flex items-center justify-center shrink-0 text-sm">
                      {opt.label}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {showResult && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation after answering */}
          {showResult && (
            <div className="space-y-4 pt-2">
              <div
                className={`p-4 rounded-xl border text-sm leading-relaxed ${
                  selectedOption === q.correctIndex
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}
              >
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  {selectedOption === q.correctIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{t.quizCorrect}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>{t.quizIncorrect}</span>
                    </>
                  )}
                </div>
                <div className="mt-2 text-slate-700 text-xs md:text-sm">
                  {q.explanation}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  <span>{currentIndex < questions.length - 1 ? t.quizNextBtn : t.quizResultBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Completion View */
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">
            {t.quizPassedTitle}
          </h3>
          <p className="text-sm md:text-base text-slate-600 max-w-md mx-auto">
            {lang === 'zh'
              ? `你已完成所有复合函数与配方法过关测试题！得分：${score} / 100`
              : `You scored ${score} / 100 on the composite function master quiz!`}
          </p>
          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.quizRestartBtn}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
