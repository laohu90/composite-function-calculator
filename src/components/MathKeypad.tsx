import React from 'react';
import { Delete, X } from 'lucide-react';

interface MathKeypadProps {
  onInsert: (token: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  targetVar?: 'x' | 'u';
}

export const MathKeypad: React.FC<MathKeypadProps> = ({
  onInsert,
  onClear,
  onBackspace,
  targetVar = 'x',
}) => {
  const v = targetVar;

  const keyGroups = [
    {
      label: '常用高中结构',
      keys: [
        { label: `${v}²`, insert: `${v}^2` },
        { label: `${v}³`, insert: `${v}^3` },
        { label: `${v}^n`, insert: `${v}^` },
        { label: `√${v}`, insert: `sqrt(${v})` },
        { label: `1/${v}`, insert: `1/(${v})` },
        { label: `|${v}|`, insert: `abs(${v})` },
      ],
    },
    {
      label: '对数与指数',
      keys: [
        { label: `log₂(${v})`, insert: `log2(${v})` },
        { label: `lg(${v})`, insert: `lg(${v})` },
        { label: `ln(${v})`, insert: `ln(${v})` },
        { label: `2^${v}`, insert: `2^${v}` },
        { label: `e^${v}`, insert: `e^${v}` },
        { label: `(1/2)^${v}`, insert: `(1/2)^${v}` },
      ],
    },
    {
      label: '基本运算与三角',
      keys: [
        { label: '+', insert: ' + ' },
        { label: '-', insert: ' - ' },
        { label: '×', insert: ' * ' },
        { label: '÷', insert: ' / ' },
        { label: '(', insert: '(' },
        { label: ')', insert: ')' },
        { label: `sin(${v})`, insert: `sin(${v})` },
        { label: `cos(${v})`, insert: `cos(${v})` },
      ],
    },
  ];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs shadow-xs">
      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-200 text-slate-500 font-medium">
        <span className="flex items-center gap-1.5 font-semibold text-slate-700">
          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
          数学符号快捷输入盘 (针对变量 {v})
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onBackspace}
            title="退格"
            className="p-1 hover:bg-slate-200 rounded text-slate-600 transition-colors cursor-pointer"
          >
            <Delete className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onClear}
            title="清空"
            className="px-1.5 py-0.5 hover:bg-slate-200 rounded text-[11px] text-slate-600 font-medium transition-colors cursor-pointer"
          >
            清空
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {keyGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <span className="text-[10px] text-slate-400 font-medium block">
              {group.label}
            </span>
            <div className="grid grid-cols-3 gap-1">
              {group.keys.map((k, kIdx) => (
                <button
                  key={kIdx}
                  type="button"
                  onClick={() => onInsert(k.insert)}
                  className="px-1.5 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 text-slate-700 font-mono text-[11px] font-semibold rounded border border-slate-200 shadow-2xs transition-all active:scale-95 cursor-pointer text-center"
                >
                  {k.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
