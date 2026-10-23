import React, { useMemo } from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
  inline?: boolean;
}

export const MathView: React.FC<MathViewProps> = ({
  math,
  block = false,
  className = '',
  inline = false,
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block && !inline,
        throwOnError: false,
        strict: false,
      });
    } catch (err) {
      console.warn('KaTeX render error:', err);
      return math;
    }
  }, [math, block, inline]);

  if (block && !inline) {
    return (
      <div
        className={`overflow-x-auto py-1.5 px-1 my-1 text-slate-800 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`inline-block mx-0.5 text-slate-800 align-baseline ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
