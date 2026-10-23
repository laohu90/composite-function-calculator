import React, { useState } from 'react';
import { MathView } from './MathView';
import { KeywordBadge } from './KeywordBadge';
import { BookOpen, ChevronRight, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface ClassicProblem {
  id: string;
  category: string;
  title: string;
  difficulty: '基础' | '中档' | '压轴';
  description: string;
  latexProblem: string;
  innerExpr?: string;
  outerExpr?: string;
  x0?: number;
  coreThinking: string;
  steps: {
    title: string;
    content: string;
    latex?: string;
  }[];
  trapWarning: string;
}

interface ClassicProblemsProps {
  onLoadToCalculator?: (inner: string, outer: string, x: number) => void;
}

export const ClassicProblems: React.FC<ClassicProblemsProps> = ({ onLoadToCalculator }) => {
  const problems: ClassicProblem[] = [
    {
      id: 'p1',
      category: '配方法与值域',
      difficulty: '中档',
      title: '对数复合二次函数值域（高考真题经典模型）',
      latexProblem: '求函数 \\, y = \\log_2(x^2 - 4x + 12) \\, 在区间 \\, x \\in [1, 5] \\, 上的值域与最值。',
      description: '考察内层二次函数配方法、区间极值讨论，以及外层对数函数的单调性。',
      innerExpr: 'x^2 - 4*x + 12',
      outerExpr: 'log2(u)',
      x0: 2,
      coreThinking: '“先求内层值域，再求外层值域”。千万不能直接求导或把端点乱代入。',
      steps: [
        {
          title: '第一步：设中间变量，拆解内层与外层',
          content: '设中间变量 u = g(x) = x^2 - 4x + 12，则外层函数为 y = f(u) = \\log_2(u)。',
          latex: 'u = x^2 - 4x + 12, \\quad y = \\log_2(u)',
        },
        {
          title: '第二步：运用【配方法】求内层二次函数在给定区间的值域',
          content: '内层函数配方：g(x) = (x - 2)^2 + 8。对称轴为 x = 2，落在所给区间 [1, 5] 内部！',
          latex: 'g(x) = (x - 2)^2 + 8',
        },
        {
          title: '第三步：比较顶点与两端点数值',
          content: '最小值在顶点处取得：g(2) = 8；最大值在离对称轴更远的端点 x = 5 处取得：g(5) = (5-2)^2 + 8 = 17。故内层函数值域为 u ∈ [8, 17]。',
          latex: 'u \\in [8, 17]',
        },
        {
          title: '第四步：结合外层对数函数单调性求解',
          content: '外层函数 y = \\log_2(u) 底数 2 > 1，在 (0, +∞) 上单调递增。因此：',
          latex: 'y_{\\min} = \\log_2(8) = 3, \\quad y_{\\max} = \\log_2(17)',
        },
        {
          title: '第五步：给出标准答案',
          content: '函数在 [1, 5] 上的值域为 [3, \\log_2(17)]，最小值为 3，最大值为 \\log_2(17)。',
          latex: 'y \\in [3, \\log_2(17)]',
        },
      ],
      trapWarning: '易错警示：很多同学误以为端点 x=1 和 x=5 一定对应极值，忽视了顶点 x=2 在区间内！',
    },
    {
      id: 'p2',
      category: '同增异减口诀',
      difficulty: '中档',
      title: '指数复合二次函数单调区间与最值',
      latexProblem: '已知 \\, y = \\left(\\frac{1}{2}\\right)^{x^2 - 2x - 3}，求其单调递增区间与在 \\, x \\in [0, 4] \\, 上的最大值。',
      description: '外层为底数小于1的减函数，必须严格应用“同增异减”口诀进行单调性判断。',
      innerExpr: 'x^2 - 2*x - 3',
      outerExpr: '(1/2)^u',
      x0: 1,
      coreThinking: '外层 y = (1/2)^u 是减函数。要让复合函数单调递增，必须内层函数单调递减（异减 → 复合增）。',
      steps: [
        {
          title: '第一步：设中间变量 u = g(x)',
          content: '令 u = x^2 - 2x - 3，外层为 y = (1/2)^u。定义域为全体实数 ℝ。',
          latex: 'u = x^2 - 2x - 3 = (x - 1)^2 - 4',
        },
        {
          title: '第二步：分析内层函数单调性',
          content: '对称轴为 x = 1，开口向上。所以在 (-∞, 1] 上单调递减；在 [1, +∞) 上单调递增。',
          latex: 'x \\in (-\\infty, 1] \\downarrow, \\quad x \\in [1, +\\infty) \\uparrow',
        },
        {
          title: '第三步：应用“同增异减”口诀判定复合单调性',
          content: '外层 y = (1/2)^u 底数 0 < 1/2 < 1 为减函数。内层减区间上，复合函数为增函数！因此单调递增区间为 (-∞, 1]。',
          latex: '\\text{单调递增区间为 } (-\\infty, 1]',
        },
        {
          title: '第四步：在区间 [0, 4] 上求最大值',
          content: '在 [0, 1] 上递增，在 [1, 4] 上递减。故最大值在 x = 1 处取得：此时 u 取得最小值 -4，所以 y 取得最大值 (1/2)^(-4) = 16。',
          latex: 'y_{\\max} = \\left(\\frac{1}{2}\\right)^{-4} = 16',
        },
      ],
      trapWarning: '易错警示：外层是减函数时，自变量求最大值对应的反而是内层函数的最小值！',
    },
    {
      id: 'p3',
      category: '根式与定义域限制',
      difficulty: '基础',
      title: '二次根式复合函数的定义域与值域',
      latexProblem: '求函数 \\, y = \\sqrt{-x^2 + 2x + 8} \\, 的定义域与值域。',
      description: '高中函数第一法则：“定义域优先”。根号下被开方数必须大于等于0。',
      innerExpr: '-x^2 + 2*x + 8',
      outerExpr: 'sqrt(u)',
      x0: 1,
      coreThinking: '牢记先列出被开方数非负的不等式，求出定义域后，再在定义域内配方。',
      steps: [
        {
          title: '第一步：求定义域（必须被开方数 ≥ 0）',
          content: '令 -x^2 + 2x + 8 ≥ 0，即 x^2 - 2x - 8 ≤ 0，因式分解 (x - 4)(x + 2) ≤ 0。解得定义域为 [-2, 4]。',
          latex: 'x \\in [-2, 4]',
        },
        {
          title: '第二步：在定义域 [-2, 4] 内对内层配方',
          content: 'u = -x^2 + 2x + 8 = -(x - 1)^2 + 9。对称轴 x = 1 落在 [-2, 4] 内部。',
          latex: 'u = -(x - 1)^2 + 9',
        },
        {
          title: '第三步：确定内层函数 u 的取值范围',
          content: '在顶点 x = 1 处 u 取得最大值 9；在端点 x = -2 和 x = 4 处 u 取得最小值 0。因此 u ∈ [0, 9]。',
          latex: 'u \\in [0, 9]',
        },
        {
          title: '第四步：代入外层 y = √u',
          content: '外层 y = \\sqrt{u} 是增函数，所以 y \\in [\\sqrt{0}, \\sqrt{9}] = [0, 3]。',
          latex: 'y \\in [0, 3]',
        },
      ],
      trapWarning: '易错警示：如果不先求定义域，容易将 x 扩展到全体实数导致根号下为负数！',
    },
    {
      id: 'p4',
      category: '换元法求解析式',
      difficulty: '中档',
      title: '已知复合函数解析式，换元求原函数 f(x)',
      latexProblem: '已知 \\, f(2x + 1) = 4x^2 - 2x + 3，求 \\, f(x) \\, 的解析式及 \\, f(3)。',
      description: '换元法（令中间变量 t）是高中数学拆解复合函数的最通用工具。',
      coreThinking: '令括号内的整体为 t，反解出 x 后代入等式右侧。最后务必将自变量符号统一写回 x。',
      steps: [
        {
          title: '第一步：设中间变量 t 进行换元',
          content: '令 t = 2x + 1，则反解得到 x = (t - 1) / 2。',
          latex: 't = 2x + 1 \\implies x = \\frac{t - 1}{2}',
        },
        {
          title: '第二步：将 x 表达式代入原方程右侧',
          content: 'f(t) = 4 \\cdot \\left(\\frac{t-1}{2}\\right)^2 - 2 \\cdot \\left(\\frac{t-1}{2}\\right) + 3。',
          latex: 'f(t) = 4 \\cdot \\frac{(t-1)^2}{4} - (t - 1) + 3',
        },
        {
          title: '第三步：展开并化简整理',
          content: 'f(t) = (t^2 - 2t + 1) - t + 1 + 3 = t^2 - 3t + 5。',
          latex: 'f(t) = t^2 - 3t + 5',
        },
        {
          title: '第四步：替换自变量字母为 x，并求 f(3)',
          content: '因此 f(x) = x^2 - 3x + 5。代入 x = 3 得：f(3) = 3^2 - 3(3) + 5 = 5。',
          latex: 'f(x) = x^2 - 3x + 5, \\quad f(3) = 5',
        },
      ],
      trapWarning: '易错警示：使用换元法时，若原自变量 x 有取值范围，必须写出新变量 t 的定义域！',
    },
    {
      id: 'p5',
      category: '周期性与递归嵌套',
      difficulty: '压轴',
      title: '高考分段复合函数周期与多次循环求值',
      latexProblem: '已知函数 \\, f(x) = \\begin{cases} x - 3, & x \\ge 6 \\\\ f(x + 2), & x < 6 \\end{cases}，求 \\, f(1) \\, 的值。',
      description: '考察递推嵌套求值，通过层层向内或向外渗透，直到自变量落入能直接求值的分支。',
      coreThinking: '自变量不足 6 时，利用 f(x) = f(x+2) 逐步提升自变量数值，直到 ≥ 6。',
      steps: [
        {
          title: '第一步：代入 x = 1 观察分支条件',
          content: '因为 1 < 6，落入下分支条件，故 f(1) = f(1 + 2) = f(3)。',
          latex: 'f(1) = f(3)',
        },
        {
          title: '第二步：继续代入 x = 3',
          content: '因为 3 < 6，依然落入下分支条件，故 f(3) = f(3 + 2) = f(5)。',
          latex: 'f(3) = f(5)',
        },
        {
          title: '第三步：继续代入 x = 5',
          content: '因为 5 < 6，仍落入下分支条件，故 f(5) = f(5 + 2) = f(7)。',
          latex: 'f(5) = f(7)',
        },
        {
          title: '第四步：到达上分支临界点 x = 7 ≥ 6',
          content: '此时 7 ≥ 6，终于符合上分支解析式！直接代入计算：f(7) = 7 - 3 = 4。',
          latex: 'f(7) = 7 - 3 = 4',
        },
        {
          title: '第五步：得出结果',
          content: '因此 f(1) = f(3) = f(5) = f(7) = 4。',
          latex: 'f(1) = 4',
        },
      ],
      trapWarning: '易错警示：遇到递归型嵌套，务必沉住气步步递推，千万不要死记结论或算错跳步！',
    },
  ];

  const [selectedId, setSelectedId] = useState<string>('p1');
  const activeProblem = problems.find((p) => p.id === selectedId) || problems[0];

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                Exam Problem Database
              </span>
              <KeywordBadge type="inner" />
              <KeywordBadge type="outer" />
              <KeywordBadge type="monotonicity" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              高中数学高考经典复合函数题型库
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
              涵盖配方法拆解、同增异减口诀、定义域链条、换元法与分段递归，精选高考高频母题与解题范例。
            </p>
          </div>
        </div>

        {/* Categories / Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-6 pt-5 border-t border-slate-100">
          {problems.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedId === p.id
                  ? 'bg-indigo-50/80 border-indigo-400 text-indigo-900 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/90 border border-slate-200">
                  {p.category}
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    p.difficulty === '基础'
                      ? 'bg-emerald-100 text-emerald-800'
                      : p.difficulty === '中档'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {p.difficulty}
                </span>
              </div>
              <div className="text-sm font-bold line-clamp-1 mt-1 text-slate-900">
                {p.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Problem Detailed Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800">
                {activeProblem.category}
              </span>
              <h3 className="text-base md:text-lg font-bold text-slate-900">
                {activeProblem.title}
              </h3>
            </div>
            <p className="text-xs md:text-sm text-slate-500">{activeProblem.description}</p>
          </div>

          {activeProblem.innerExpr && activeProblem.outerExpr && onLoadToCalculator && (
            <button
              onClick={() =>
                onLoadToCalculator(
                  activeProblem.innerExpr!,
                  activeProblem.outerExpr!,
                  activeProblem.x0 ?? 1
                )
              }
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs md:text-sm font-semibold rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              一键导入主计算器演算
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Problem statement card */}
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            【题目完整呈现】
          </span>
          <div className="text-base md:text-lg text-slate-900 font-serif">
            <MathView math={activeProblem.latexProblem} block />
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200 text-xs md:text-sm text-indigo-700 flex items-center gap-2 font-medium">
            <span>💡 破题思维核心：</span>
            <span>{activeProblem.coreThinking}</span>
          </div>
        </div>

        {/* Step-by-step breakdown */}
        <div className="space-y-4">
          <span className="text-sm font-bold text-slate-800 block">
            【规范详细解题步骤】
          </span>
          {activeProblem.steps.map((st, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-sm font-bold text-slate-900">{st.title}</span>
              </div>
              <div className="pl-8 text-xs md:text-sm text-slate-700 leading-relaxed">
                {st.content}
              </div>
              {st.latex && (
                <div className="pl-8 pt-1">
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-sm inline-block shadow-2xs">
                    <MathView math={st.latex} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trap Warning Box */}
        <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-xl flex items-start gap-3 text-xs md:text-sm text-amber-950">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">{activeProblem.trapWarning}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
