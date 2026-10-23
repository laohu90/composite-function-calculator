import React from 'react';
import { useI18n } from '../i18n/context';

export type KeywordType =
  | 'inner'
  | 'outer'
  | 'axis'
  | 'vertex'
  | 'monotonicity'
  | 'domain'
  | 'range'
  | 'chain';

interface KeywordBadgeProps {
  type: KeywordType;
  label?: string;
  math?: string;
  className?: string;
}

export const KeywordBadge: React.FC<KeywordBadgeProps> = ({
  type,
  label,
  math,
  className = '',
}) => {
  const { t } = useI18n();

  const defaultLabels: Record<KeywordType, string> = {
    inner: t.keywordInner,
    outer: t.keywordOuter,
    axis: t.keywordAxis,
    vertex: t.keywordVertex,
    monotonicity: t.keywordMonotonicity,
    domain: t.keywordDomain,
    range: t.keywordRange,
    chain: t.keywordChainRule,
  };

  const displayLabel = label || defaultLabels[type] || type;

  const styles: Record<KeywordType, { bg: string; text: string; border: string; dot: string }> = {
    inner: {
      bg: 'bg-sky-50',
      text: 'text-sky-900',
      border: 'border-sky-200',
      dot: 'bg-sky-500',
    },
    outer: {
      bg: 'bg-purple-50',
      text: 'text-purple-900',
      border: 'border-purple-200',
      dot: 'bg-purple-500',
    },
    axis: {
      bg: 'bg-amber-50',
      text: 'text-amber-900',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
    },
    vertex: {
      bg: 'bg-rose-50',
      text: 'text-rose-900',
      border: 'border-rose-200',
      dot: 'bg-rose-500',
    },
    monotonicity: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-900',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
    },
    domain: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-900',
      border: 'border-indigo-200',
      dot: 'bg-indigo-500',
    },
    range: {
      bg: 'bg-teal-50',
      text: 'text-teal-900',
      border: 'border-teal-200',
      dot: 'bg-teal-500',
    },
    chain: {
      bg: 'bg-cyan-50',
      text: 'text-cyan-900',
      border: 'border-cyan-200',
      dot: 'bg-cyan-500',
    },
  };

  const current = styles[type] || styles.inner;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold border shadow-2xs ${current.bg} ${current.text} ${current.border} ${className}`}
    >
      <span className={`w-2 h-2 rounded-full ${current.dot} shrink-0`} />
      <span>{displayLabel}</span>
      {math && <span className="font-mono text-xs opacity-90">{math}</span>}
    </span>
  );
};
