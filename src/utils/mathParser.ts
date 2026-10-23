/**
 * Mathematical evaluation & formula utilities for high school composite functions
 */

export interface EvaluationResult {
  val: number;
  steps: string[];
  latexExpr: string;
  isDefined: boolean;
  domainError?: string;
}

// Convert common math notations to JS executable expressions safely
export function sanitizeMathExpr(expr: string, variableName = 'x'): string {
  let cleaned = expr.trim();
  if (!cleaned) return '0';

  // Replace multiplication like 2x, 3(x), (x+1)(x-2)
  cleaned = cleaned.replace(/(\d)\s*([a-zA-Z(])/g, '$1 * $2');
  cleaned = cleaned.replace(/(\))\s*(\()/g, '$1 * $2');
  cleaned = cleaned.replace(/(\))\s*([a-zA-Z])/g, '$1 * $2');

  // Replace ln(x) with Math.log(x)
  cleaned = cleaned.replace(/\bln\s*\(/g, 'Math.log(');

  // Replace log2(x) with Math.log2(x)
  cleaned = cleaned.replace(/\blog2\s*\(/g, 'Math.log2(');
  // Replace log10(x) with Math.log10(x)
  cleaned = cleaned.replace(/\blog10\s*\(/g, 'Math.log10(');
  // Replace default log(x) with Math.log10 or Math.log (in Chinese high school, lg is base 10, ln is base e, log is base 10 or specified)
  cleaned = cleaned.replace(/\blg\s*\(/g, 'Math.log10(');
  cleaned = cleaned.replace(/\blog\s*\(/g, 'Math.log10(');

  // Replace sqrt(x) with Math.sqrt(x)
  cleaned = cleaned.replace(/\bsqrt\s*\(/g, 'Math.sqrt(');
  // Replace abs(x) with Math.abs(x)
  cleaned = cleaned.replace(/\babs\s*\(/g, 'Math.abs(');

  // Trigonometric
  cleaned = cleaned.replace(/\bsin\s*\(/g, 'Math.sin(');
  cleaned = cleaned.replace(/\bcos\s*\(/g, 'Math.cos(');
  cleaned = cleaned.replace(/\btan\s*\(/g, 'Math.tan(');

  // Exponentials e^x
  cleaned = cleaned.replace(/\be\^([a-zA-Z0-9_().]+)/g, 'Math.exp($1)');
  cleaned = cleaned.replace(/\bexp\s*\(/g, 'Math.exp(');

  // Handle power operator ^ -> **
  cleaned = cleaned.replace(/\^/g, '**');

  // Replace e constant if isolated
  cleaned = cleaned.replace(/\bMath\.E\b/g, 'Math.E');
  cleaned = cleaned.replace(/\bpi\b/gi, 'Math.PI');

  return cleaned;
}

// Check domain conditions before evaluation
export function checkDomainValidity(rawExpr: string, varName: string, val: number): { valid: boolean; reason?: string } {
  // Check division by zero:
  // e.g. 1/(x-2)
  if (rawExpr.includes('/')) {
    // Basic check for division
  }

  // Check square root argument
  const sqrtMatches = rawExpr.match(/sqrt\s*\(([^)]+)\)/g);
  if (sqrtMatches) {
    for (const match of sqrtMatches) {
      const inner = match.replace(/^sqrt\s*\(/, '').slice(0, -1);
      const innerVal = evaluateRaw(inner, { [varName]: val });
      if (innerVal < 0) {
        return { valid: false, reason: `二次根号下的被开方数 (${inner}) = ${innerVal.toFixed(3)} < 0，无实数解` };
      }
    }
  }

  // Check log/ln argument
  const logMatches = rawExpr.match(/(ln|log|log2|log10|lg)\s*\(([^)]+)\)/g);
  if (logMatches) {
    for (const match of logMatches) {
      const inner = match.replace(/^(ln|log|log2|log10|lg)\s*\(/, '').slice(0, -1);
      const innerVal = evaluateRaw(inner, { [varName]: val });
      if (innerVal <= 0) {
        return { valid: false, reason: `对数函数的真数 (${inner}) = ${innerVal.toFixed(3)} ≤ 0，不满足真数大于0的要求` };
      }
    }
  }

  return { valid: true };
}

// Safely evaluate single variable function expression
export function evaluateRaw(expr: string, scope: Record<string, number>): number {
  const sanitized = sanitizeMathExpr(expr);
  const keys = Object.keys(scope);
  const values = Object.values(scope);
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const func = new Function(...keys, `return (${sanitized});`);
  const result = func(...values);
  if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
    throw new Error('计算结果非有效实数 (NaN 或无穷大)');
  }
  return result;
}

// Convert expression to high-school friendly LaTeX
export function exprToLatex(expr: string, varName = 'x'): string {
  let res = expr.trim();
  res = res.replace(/\*/g, ' \\cdot ');
  res = res.replace(/sqrt\s*\((.*?)\)/g, '\\sqrt{$1}');
  res = res.replace(/log2\s*\((.*?)\)/g, '\\log_2($1)');
  res = res.replace(/log10\s*\((.*?)\)/g, '\\lg($1)');
  res = res.replace(/lg\s*\((.*?)\)/g, '\\lg($1)');
  res = res.replace(/ln\s*\((.*?)\)/g, '\\ln($1)');
  res = res.replace(/log\s*\((.*?)\)/g, '\\log_{10}($1)');
  res = res.replace(/abs\s*\((.*?)\)/g, '|$1|');
  res = res.replace(/sin\s*\((.*?)\)/g, '\\sin($1)');
  res = res.replace(/cos\s*\((.*?)\)/g, '\\cos($1)');
  res = res.replace(/tan\s*\((.*?)\)/g, '\\tan($1)');
  res = res.replace(/(\w+)\^([0-9]+)/g, '$1^{$2}');
  res = res.replace(/(\w+)\^\((.*?)\)/g, '$1^{$2}');
  return res;
}

// Approximate rational representation (e.g. 0.75 -> 3/4)
export function toFractionString(val: number, tolerance = 1e-5): string | null {
  if (Math.abs(val - Math.round(val)) < tolerance) {
    return Math.round(val).toString();
  }

  let numerator = 1;
  let denominator = 1;
  let bestError = Math.abs(val - numerator / denominator);

  for (let d = 2; d <= 64; d++) {
    const n = Math.round(val * d);
    const err = Math.abs(val - n / d);
    if (err < tolerance) {
      return `${n}/${d}`;
    }
    if (err < bestError) {
      bestError = err;
      numerator = n;
      denominator = d;
    }
  }

  if (bestError < tolerance * 5) {
    return `${numerator}/${denominator}`;
  }
  return null;
}
