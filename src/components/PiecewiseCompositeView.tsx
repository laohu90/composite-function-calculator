import React, { useState } from 'react';
import { MathView } from './MathView';
import { evaluateRaw, exprToLatex } from '../utils/mathParser';
import { useI18n } from '../i18n/context';
import { KeywordBadge } from './KeywordBadge';
import { GitBranch, ArrowRight, Play, CheckCircle2, RotateCcw } from 'lucide-react';

export const PiecewiseCompositeView: React.FC = () => {
  const { lang, t } = useI18n();
  const isZh = lang === 'zh';

  // Branch 1: x >= 0 -> expr1
  const [expr1, setExpr1] = useState<string>('x^2 - 1');
  const [condType1, setCondType1] = useState<'>=' | '>' | '<=' | '<'>('>=');
  const [splitVal1, setSplitVal1] = useState<number>(0);

  // Branch 2: x < 0 -> expr2
  const [expr2, setExpr2] = useState<string>('2*x + 3');

  // Input x0
  const [x0, setX0] = useState<number>(-2);
  // Nesting times
  const [nestingCount, setNestingCount] = useState<number>(2); // f(f(x0))

  // Presets
  const presets = [
    {
      labelZh: '二次与一次：f(f(-2))',
      labelEn: 'Quadratic & Linear: f(f(-2))',
      expr1: 'x^2 - 1',
      condType1: '>=' as const,
      splitVal1: 0,
      expr2: '2*x + 3',
      x0: -2,
      nestingCount: 2,
    },
    {
      labelZh: '对数与指数：f(f(4))',
      labelEn: 'Log & Exp: f(f(4))',
      expr1: 'log2(x)',
      condType1: '>' as const,
      splitVal1: 0,
      expr2: '3^x - 1',
      x0: 4,
      nestingCount: 2,
    },
    {
      labelZh: '三层自嵌套：f(f(f(2)))',
      labelEn: '3-Layer Nesting: f(f(f(2)))',
      expr1: '-x + 3',
      condType1: '>' as const,
      splitVal1: 1,
      expr2: '2*x',
      x0: 2,
      nestingCount: 3,
    },
  ];

  const loadPreset = (p: typeof presets[0]) => {
    setExpr1(p.expr1);
    setCondType1(p.condType1);
    setSplitVal1(p.splitVal1);
    setExpr2(p.expr2);
    setX0(p.x0);
    setNestingCount(p.nestingCount);
  };

  // Evaluate single step of piecewise function
  const evalPiecewise = (val: number): { result: number; branchIndex: 1 | 2; reason: string; exprUsed: string } => {
    let satisfiesBranch1 = false;
    if (condType1 === '>=') satisfiesBranch1 = val >= splitVal1;
    else if (condType1 === '>') satisfiesBranch1 = val > splitVal1;
    else if (condType1 === '<=') satisfiesBranch1 = val <= splitVal1;
    else satisfiesBranch1 = val < splitVal1;

    if (satisfiesBranch1) {
      const res = evaluateRaw(expr1, { x: val });
      return {
        result: res,
        branchIndex: 1,
        reason: isZh
          ? `中间量 ${val} 满足条件「x ${condType1} ${splitVal1}」，代入上分支解析式`
          : `Intermediate ${val} satisfies condition x ${condType1} ${splitVal1}, using upper branch`,
        exprUsed: expr1,
      };
    } else {
      const res = evaluateRaw(expr2, { x: val });
      const oppositeCond = condType1.includes('>') ? (condType1 === '>=' ? '<' : '<=') : (condType1 === '<=' ? '>' : '>=');
      return {
        result: res,
        branchIndex: 2,
        reason: isZh
          ? `中间量 ${val} 满足条件「x ${oppositeCond} ${splitVal1}」，代入下分支解析式`
          : `Intermediate ${val} satisfies condition x ${oppositeCond} ${splitVal1}, using lower branch`,
        exprUsed: expr2,
      };
    }
  };

  // Compute multi-layer nesting steps
  const executionSteps: {
    layer: number;
    input: number;
    output: number;
    branchIndex: 1 | 2;
    reason: string;
    exprUsed: string;
  }[] = [];

  let currentVal = x0;
  let hasError = false;
  let errorMsg = '';

  for (let i = 1; i <= nestingCount; i++) {
    try {
      const step = evalPiecewise(currentVal);
      executionSteps.push({
        layer: i,
        input: currentVal,
        output: step.result,
        branchIndex: step.branchIndex,
        reason: step.reason,
        exprUsed: step.exprUsed,
      });
      currentVal = step.result;
    } catch (e: any) {
      hasError = true;
      errorMsg = e.message || 'Calculation error';
      break;
    }
  }

  // Format conditions for display
  const oppositeCondStr = condType1.includes('>')
    ? condType1 === '>=' ? '<' : '\\le'
    : condType1 === '<=' ? '>' : '\\ge';
  const condStr1 = condType1 === '>=' ? '\\ge' : condType1 === '<=' ? '\\le' : condType1;

  const piecewiseLatex = `f(x) = \\begin{cases} ${exprToLatex(expr1, 'x')}, & x ${condStr1} ${splitVal1} \\\\ ${exprToLatex(expr2, 'x')}, & x ${oppositeCondStr} ${splitVal1} \\end{cases}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                <GitBranch className="w-3.5 h-3.5" />
                {isZh ? '高频压轴题型 · 分段函数嵌套' : 'Piecewise Composition & Nesting'}
              </span>
              <KeywordBadge type="inner" />
              <KeywordBadge type="outer" />
              <KeywordBadge type="domain" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {t.tabPiecewise}
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-2 max-w-3xl leading-relaxed">
              {isZh
                ? '高中生在面对分段函数复合（如 f(f(x)) 或 f(f(f(x)))）时，常因忽略中间结果落入哪个区间而选错分支。此工具直观呈现每层分支判断路径与标准格式！'
                : 'Step-by-step evaluator for piecewise compositions f(f(x)) or multi-layer nesting. Visualizes branch condition checks at each evaluation step.'}
            </p>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => loadPreset(p)}
                className="text-xs sm:text-sm bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border border-slate-200 hover:border-emerald-200 px-3 py-1.5 rounded-lg transition-all font-medium text-left cursor-pointer"
              >
                {isZh ? p.labelZh : p.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Piecewise Editor */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <span className="text-sm font-bold text-slate-800 block">
              {isZh ? '① 分段函数各分支解析式及判断条件' : '① Piecewise Function Branches & Conditions'}
            </span>

            {/* Branch 1 */}
            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs md:text-sm font-bold text-slate-800 block">
                {isZh ? '第一分支 (Upper Branch)' : 'Upper Branch'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500 block mb-1">
                    {isZh ? '解析式 1' : 'Expression 1'}
                  </label>
                  <input
                    type="text"
                    value={expr1}
                    onChange={(e) => setExpr1(e.target.value)}
                    className="w-full text-sm font-mono border border-slate-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1/2">
                    <label className="text-xs text-slate-500 block mb-1">
                      {isZh ? '条件' : 'Condition'}
                    </label>
                    <select
                      value={condType1}
                      onChange={(e) => setCondType1(e.target.value as any)}
                      className="w-full text-sm border border-slate-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                    >
                      <option value=">=">x ≥</option>
                      <option value=">">x &gt;</option>
                      <option value="<=">x ≤</option>
                      <option value="<">x &lt;</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="text-xs text-slate-500 block mb-1">
                      {isZh ? '临界值' : 'Split Value'}
                    </label>
                    <input
                      type="number"
                      value={splitVal1}
                      onChange={(e) => setSplitVal1(parseFloat(e.target.value) || 0)}
                      className="w-full text-sm font-mono border border-slate-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Branch 2 */}
            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs md:text-sm font-bold text-slate-800 block">
                {isZh ? '第二分支 (Lower Branch: 自动取补集区间)' : 'Lower Branch (Complement Domain)'}
              </span>
              <div>
                <label className="text-xs text-slate-500 block mb-1">
                  {isZh ? '解析式 2' : 'Expression 2'}
                </label>
                <input
                  type="text"
                  value={expr2}
                  onChange={(e) => setExpr2(e.target.value)}
                  className="w-full text-sm font-mono border border-slate-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Target Input and Preview */}
          <div className="space-y-4">
            <span className="text-sm font-bold text-slate-800 block">
              {isZh ? '② 初始自变量与嵌套层数' : '② Initial Value & Nesting Depth'}
            </span>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-600 font-semibold block mb-1">
                  {isZh ? '初始自变量 x₀' : 'Initial x₀'}
                </label>
                <input
                  type="number"
                  value={x0}
                  onChange={(e) => setX0(parseFloat(e.target.value) || 0)}
                  className="w-full text-sm font-mono font-bold border border-slate-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-600 font-semibold block mb-1">
                  {isZh ? '自嵌套层数 n' : 'Nesting Depth n'}
                </label>
                <select
                  value={nestingCount}
                  onChange={(e) => setNestingCount(parseInt(e.target.value))}
                  className="w-full text-sm font-bold border border-slate-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                >
                  <option value={1}>{isZh ? '1 层：f(x₀)' : '1 Layer: f(x₀)'}</option>
                  <option value={2}>{isZh ? '2 层：f(f(x₀))' : '2 Layers: f(f(x₀))'}</option>
                  <option value={3}>{isZh ? '3 层：f(f(f(x₀)))' : '3 Layers: f(f(f(x₀)))'}</option>
                  <option value={4}>{isZh ? '4 层：f(f(f(f(x₀))))' : '4 Layers: f(f(f(f(x₀))))'}</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <span className="text-xs font-bold text-emerald-900 block mb-2">
                {isZh ? '分段函数标准数学表达式：' : 'Piecewise Function Math Representation:'}
              </span>
              <div className="bg-white p-3 rounded-lg border border-emerald-100 text-center font-serif text-sm">
                <MathView math={piecewiseLatex} block />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluation Result Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
        <h3 className="text-base md:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          {isZh ? '分步拆解穿透报告 (Step-by-Step Evaluation Breakdown)' : 'Step-by-Step Evaluation Breakdown'}
        </h3>

        {hasError ? (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm">
            {errorMsg}
          </div>
        ) : (
          <div className="space-y-4">
            {executionSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 text-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                      {step.layer}
                    </span>
                    {isZh ? `第 ${step.layer} 层求值：输入为 ${step.input.toFixed(3)}` : `Layer ${step.layer}: Input = ${step.input.toFixed(3)}`}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      step.branchIndex === 1
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-purple-100 text-purple-800 border border-purple-200'
                    }`}
                  >
                    {isZh ? `命中第 ${step.branchIndex} 分支` : `Branch ${step.branchIndex} Activated`}
                  </span>
                </div>

                <div className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  <strong>{isZh ? '区间判定' : 'Interval Check'}:</strong> {step.reason}
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs md:text-sm text-slate-600 font-mono">
                    {isZh ? '代入解析式: ' : 'Expression: '} <MathView math={`f(${step.input.toFixed(2)}) = ${exprToLatex(step.exprUsed, step.input.toString())}`} />
                  </span>
                  <span className="text-sm font-mono font-bold text-emerald-800">
                    = {step.output.toFixed(4)}
                  </span>
                </div>
              </div>
            ))}

            {/* Final Answer */}
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
              <span className="text-xs md:text-sm font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                {isZh ? '高考规范答题最终值' : 'Final Composite Value'}
              </span>
              <div className="text-xl md:text-2xl font-mono font-bold text-emerald-950">
                f^{nestingCount}({x0}) = {currentVal.toFixed(4)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
