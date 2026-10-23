/**
 * Completing the Square (配方法) breakdown and quadratic composite function analyzer
 */

export interface CompletingSquareResult {
  a: number;
  b: number;
  c: number;
  h: number; // axis of symmetry: -b / (2a)
  k: number; // vertex value: c - b^2 / (4a)
  axisOfSymmetry: string; // e.g., "x = 2"
  vertex: string; // e.g., "(2, 4)"
  isOpenUpward: boolean;
  steps: {
    title: string;
    description: string;
    latex: string;
    note?: string;
  }[];
  // Interval analysis if provided
  intervalAnalysis?: {
    hasInterval: boolean;
    xMin: number;
    xMax: number;
    axisInInterval: boolean;
    yLeft: number;
    yRight: number;
    yVertex?: number;
    uMin: number;
    uMax: number;
    rangeLatex: string;
    explanation: string;
  };
  // Outer function composition analysis
  outerAnalysis?: {
    outerName: string;
    outerFormula: string;
    outerMonotonicity: 'strictly_increasing' | 'strictly_decreasing' | 'non_monotonic';
    outerDomainCondition: string;
    isValidDomain: boolean;
    domainViolationReason?: string;
    finalRange?: {
      yMin?: number | string;
      yMax?: number | string;
      latex: string;
    };
    monotonicityExplanation: string;
  };
}

// Format fractional or decimal numbers for LaTeX nicely
export function formatNum(n: number): string {
  if (Math.abs(n - Math.round(n)) < 1e-6) {
    return Math.round(n).toString();
  }
  // Try simple fractions with small denominator
  for (let d = 2; d <= 24; d++) {
    const num = Math.round(n * d);
    if (Math.abs(n - num / d) < 1e-5) {
      if (num < 0) {
        return `-\\frac{${Math.abs(num)}}{${d}}`;
      }
      return `\\frac{${num}}{${d}}`;
    }
  }
  return n.toFixed(2).replace(/\.?0+$/, '');
}

export function formatSignedNum(n: number): string {
  if (n >= 0) {
    return `+ ${formatNum(n)}`;
  } else {
    return `- ${formatNum(Math.abs(n))}`;
  }
}

export function analyzeCompletingSquare(
  a: number,
  b: number,
  c: number,
  interval?: { xMin: number; xMax: number } | null,
  outerType: 'none' | 'log2' | 'ln' | 'sqrt' | 'exp2' | 'expHalf' | 'inv' = 'none'
): CompletingSquareResult {
  if (a === 0) {
    throw new Error('二次项系数 a 不能为 0，否则不是二次函数。');
  }

  const h = -b / (2 * a);
  const k = c - (b * b) / (4 * a);
  const isOpenUpward = a > 0;

  const hStr = formatNum(h);
  const kStr = formatNum(k);
  const axisOfSymmetry = `x = ${hStr}`;
  const vertex = `(${hStr}, ${kStr})`;

  const steps: CompletingSquareResult['steps'] = [];

  // Step 1: Standard form
  const rawB = b === 1 ? '+ x' : b === -1 ? '- x' : b !== 0 ? formatSignedNum(b) + 'x' : '';
  const rawC = c !== 0 ? formatSignedNum(c) : '';
  const aStr = a === 1 ? '' : a === -1 ? '-' : formatNum(a);
  const originalLatex = `g(x) = ${aStr}x^2 ${rawB} ${rawC}`.replace(/\s+/g, ' ').trim();

  steps.push({
    title: '第一步：展示原二次函数解析式',
    description: '识别二次项系数 a、一次项系数 b 与常数项 c',
    latex: originalLatex,
    note: `二次项系数 a = ${formatNum(a)}, 一次项系数 b = ${formatNum(b)}, 常数项 c = ${formatNum(c)}`,
  });

  // Step 2: Factor out 'a'
  const bOverA = b / a;
  const bOverAStr = bOverA === 1 ? '+ x' : bOverA === -1 ? '- x' : formatSignedNum(bOverA) + 'x';
  const cOutside = c !== 0 ? formatSignedNum(c) : '';
  const step2Latex = a === 1 
    ? `g(x) = x^2 ${rawB} ${rawC}`
    : `g(x) = ${formatNum(a)} \\left( x^2 ${bOverAStr} \\right) ${cOutside}`;

  steps.push({
    title: '第二步：提出二次项系数 a',
    description: a === 1 ? '二次项系数为 1，直接进行下一步' : `将二次项和一次项提取公因数 a = ${formatNum(a)}，括号内保持二次与一次项`,
    latex: step2Latex,
  });

  // Step 3: Add and subtract (b/(2a))^2
  const halfBOverA = b / (2 * a);
  const halfSq = halfBOverA * halfBOverA;
  const halfSqStr = formatNum(halfSq);
  const halfBOverAStr = formatNum(Math.abs(halfBOverA));

  const step3Latex = a === 1
    ? `g(x) = \\left[ x^2 ${rawB} + \\left(${halfBOverA >= 0 ? halfBOverAStr : '-' + halfBOverAStr}\\right)^2 - \\left(${halfBOverAStr}\\right)^2 \\right] ${cOutside}`
    : `g(x) = ${formatNum(a)} \\left[ x^2 ${bOverAStr} + \\left(${halfBOverA >= 0 ? halfBOverAStr : '-' + halfBOverAStr}\\right)^2 - ${halfSqStr} \\right] ${cOutside}`;

  steps.push({
    title: '第三步：配上一半的平方（配常数）',
    description: `一次项系数为 ${formatNum(bOverA)}，其一半为 ${formatNum(halfBOverA)}。在括号内加上并减去其平方 (${formatNum(halfBOverA)})² = ${halfSqStr}`,
    latex: step3Latex,
    note: '核心技巧：加上一个常数再减去同一个数，式子整体数值不变（恒等变形）',
  });

  // Step 4: Complete square form a(x - h)^2 + k
  const signH = -h >= 0 ? `+ ${formatNum(-h)}` : `- ${formatNum(h)}`;
  const insideBracket = h === 0 ? 'x' : `x ${signH}`;
  const signK = k >= 0 ? `+ ${kStr}` : `- ${formatNum(Math.abs(k))}`;
  const vertexLatex = a === 1
    ? `g(x) = (${insideBracket})^2 ${k !== 0 ? signK : ''}`
    : `g(x) = ${formatNum(a)}(${insideBracket})^2 ${k !== 0 ? signK : ''}`;

  steps.push({
    title: '第四步：化为完全平方顶点式 a(x - h)² + k',
    description: `前三项合并为完全平方式 (${insideBracket})²，将减去的常数项乘回 a 并与常数项合并`,
    latex: vertexLatex,
    note: `对称轴方程为 \\mathbf{${axisOfSymmetry}}，抛物线顶点坐标为 \\mathbf{${vertex}}`,
  });

  // Step 5: Monotonicity & opening
  steps.push({
    title: '第五步：判定抛物线开口方向与单调区间',
    description: isOpenUpward
      ? `由于 a = ${formatNum(a)} > 0，抛物线开口向上，存在全局最小值。`
      : `由于 a = ${formatNum(a)} < 0，抛物线开口向下，存在全局最大值。`,
    latex: isOpenUpward
      ? `g(x)_{\\min} = g(${hStr}) = ${kStr}, \\quad x \\in (-\\infty, ${hStr}] \\downarrow, \\quad x \\in [${hStr}, +\\infty) \\uparrow`
      : `g(x)_{\\max} = g(${hStr}) = ${kStr}, \\quad x \\in (-\\infty, ${hStr}] \\uparrow, \\quad x \\in [${hStr}, +\\infty) \\downarrow`,
  });

  // Interval analysis if provided
  let intervalAnalysis: CompletingSquareResult['intervalAnalysis'];
  if (interval && interval.xMin < interval.xMax) {
    const { xMin, xMax } = interval;
    const axisInInterval = h >= xMin && h <= xMax;
    const yLeft = a * xMin * xMin + b * xMin + c;
    const yRight = a * xMax * xMax + b * xMax + c;
    const yVertex = k;

    let uMin: number;
    let uMax: number;
    let explanation = '';

    if (isOpenUpward) {
      if (axisInInterval) {
        uMin = yVertex;
        uMax = Math.max(yLeft, yRight);
        explanation = `对称轴 x = ${hStr} 落在区间 [${xMin}, ${xMax}] 内，故在顶点处取得最小值 u_min = g(${hStr}) = ${formatNum(uMin)}；在距离对称轴较远的端点取得最大值 u_max = ${formatNum(uMax)}。`;
      } else if (h < xMin) {
        uMin = yLeft;
        uMax = yRight;
        explanation = `对称轴 x = ${hStr} 在区间左侧（${hStr} < ${xMin}），函数在 [${xMin}, ${xMax}] 上单调递增。最小值在左端点 g(${xMin}) = ${formatNum(uMin)}，最大值在右端点 g(${xMax}) = ${formatNum(uMax)}。`;
      } else {
        uMin = yRight;
        uMax = yLeft;
        explanation = `对称轴 x = ${hStr} 在区间右侧（${hStr} > ${xMax}），函数在 [${xMin}, ${xMax}] 上单调递减。最大值在左端点 g(${xMin}) = ${formatNum(uMax)}，最小值在右端点 g(${xMax}) = ${formatNum(uMin)}。`;
      }
    } else {
      // Open downward
      if (axisInInterval) {
        uMax = yVertex;
        uMin = Math.min(yLeft, yRight);
        explanation = `对称轴 x = ${hStr} 落在区间 [${xMin}, ${xMax}] 内，故在顶点处取得最大值 u_max = g(${hStr}) = ${formatNum(uMax)}；在距离对称轴较远的端点取得最小值 u_min = ${formatNum(uMin)}。`;
      } else if (h < xMin) {
        uMax = yRight;
        uMin = yLeft;
        explanation = `对称轴 x = ${hStr} 在区间左侧，函数在 [${xMin}, ${xMax}] 上单调递减。最大值在左端点 g(${xMin}) = ${formatNum(uMax)}，最小值在右端点 g(${xMax}) = ${formatNum(uMin)}。`;
      } else {
        uMax = yLeft;
        uMin = yRight;
        explanation = `对称轴 x = ${hStr} 在区间右侧，函数在 [${xMin}, ${xMax}] 上单调递增。最小值在左端点 g(${xMin}) = ${formatNum(uMin)}，最大值在右端点 g(${xMax}) = ${formatNum(uMax)}。`;
      }
    }

    intervalAnalysis = {
      hasInterval: true,
      xMin,
      xMax,
      axisInInterval,
      yLeft,
      yRight,
      yVertex: axisInInterval ? yVertex : undefined,
      uMin,
      uMax,
      rangeLatex: `u \\in [${formatNum(uMin)}, ${formatNum(uMax)}]`,
      explanation,
    };
  }

  // Outer function composition analysis
  let outerAnalysis: CompletingSquareResult['outerAnalysis'];
  if (outerType !== 'none') {
    const uMinVal = intervalAnalysis ? intervalAnalysis.uMin : (isOpenUpward ? k : -Infinity);
    const uMaxVal = intervalAnalysis ? intervalAnalysis.uMax : (isOpenUpward ? Infinity : k);

    let outerName = '';
    let outerFormula = '';
    let outerMonotonicity: 'strictly_increasing' | 'strictly_decreasing' | 'non_monotonic' = 'strictly_increasing';
    let outerDomainCondition = '';
    let isValidDomain = true;
    let domainViolationReason: string | undefined;
    let yMin: number | string | undefined;
    let yMax: number | string | undefined;
    let monotonicityExplanation = '';

    switch (outerType) {
      case 'log2':
        outerName = '对数函数 (以 2 为底)';
        outerFormula = 'y = \\log_2(u)';
        outerMonotonicity = 'strictly_increasing';
        outerDomainCondition = '真数 u = g(x) > 0';
        if (uMinVal <= 0) {
          isValidDomain = false;
          domainViolationReason = `内层函数最小值 ${formatNum(uMinVal)} ≤ 0，真数必须恒大于 0，在该区间无法完全复合！`;
        } else {
          yMin = Math.log2(uMinVal);
          yMax = isFinite(uMaxVal) ? Math.log2(uMaxVal) : '+\\infty';
        }
        monotonicityExplanation = '外层函数 y = \\log_2(u) 底数 2 > 1，为增函数。根据"同增异减"原则：复合函数 y = \\log_2(g(x)) 的单调性与内层函数 g(x) 完全一致！';
        break;

      case 'ln':
        outerName = '自然对数函数 ln';
        outerFormula = 'y = \\ln(u)';
        outerMonotonicity = 'strictly_increasing';
        outerDomainCondition = '真数 u = g(x) > 0';
        if (uMinVal <= 0) {
          isValidDomain = false;
          domainViolationReason = `内层函数最小值 ${formatNum(uMinVal)} ≤ 0，真数必须恒大于 0！`;
        } else {
          yMin = Math.log(uMinVal);
          yMax = isFinite(uMaxVal) ? Math.log(uMaxVal) : '+\\infty';
        }
        monotonicityExplanation = '外层函数 y = \\ln(u) 为增函数。复合函数单调区间与内层函数 g(x) 保持一致。';
        break;

      case 'sqrt':
        outerName = '二次根式函数';
        outerFormula = 'y = \\sqrt{u}';
        outerMonotonicity = 'strictly_increasing';
        outerDomainCondition = '被开方数 u = g(x) \\ge 0';
        if (uMinVal < 0) {
          isValidDomain = false;
          domainViolationReason = `内层函数最小值 ${formatNum(uMinVal)} < 0，根号下必须非负！`;
        } else {
          yMin = Math.sqrt(uMinVal);
          yMax = isFinite(uMaxVal) ? Math.sqrt(uMaxVal) : '+\\infty';
        }
        monotonicityExplanation = '外层函数 y = \\sqrt{u} 在 [0, +\\infty) 上为单调递增函数。复合函数单调性与内层相同。';
        break;

      case 'exp2':
        outerName = '指数函数 (以 2 为底)';
        outerFormula = 'y = 2^u';
        outerMonotonicity = 'strictly_increasing';
        outerDomainCondition = '定义域为全体实数 R';
        yMin = Math.pow(2, uMinVal);
        yMax = isFinite(uMaxVal) ? Math.pow(2, uMaxVal) : '+\\infty';
        monotonicityExplanation = '外层函数 y = 2^u 底数 2 > 1 为单调递增函数。复合函数单调性与内层相同。';
        break;

      case 'expHalf':
        outerName = '指数函数 (以 1/2 为底)';
        outerFormula = 'y = \\left(\\frac{1}{2}\\right)^u';
        outerMonotonicity = 'strictly_decreasing';
        outerDomainCondition = '定义域为全体实数 R';
        // Monotonically decreasing reverses order:
        yMin = isFinite(uMaxVal) ? Math.pow(0.5, uMaxVal) : 0;
        yMax = Math.pow(0.5, uMinVal);
        monotonicityExplanation = '外层函数 y = (1/2)^u 底数 0 < 1/2 < 1，为单调递减函数！根据"同增异减"原则：内层增则复合减，内层减则复合增（单调性完全相反）！内层最大值对应复合函数的最小值。';
        break;

      case 'inv':
        outerName = '反比例函数';
        outerFormula = 'y = \\frac{1}{u}';
        outerMonotonicity = 'strictly_decreasing';
        outerDomainCondition = '分母 u \\ne 0';
        if (uMinVal <= 0 && uMaxVal >= 0) {
          isValidDomain = false;
          domainViolationReason = `内层函数值域跨越了 0，分母不能为 0！`;
        } else {
          yMin = 1 / uMaxVal;
          yMax = 1 / uMinVal;
        }
        monotonicityExplanation = '外层函数 y = 1/u 在同号区间上为减函数。单调性与内层相反。';
        break;
    }

    let finalRangeLatex = '';
    if (isValidDomain && yMin !== undefined && yMax !== undefined) {
      const yMinStr = typeof yMin === 'number' ? formatNum(yMin) : yMin;
      const yMaxStr = typeof yMax === 'number' ? formatNum(yMax) : yMax;
      finalRangeLatex = `y \\in [${yMinStr}, ${yMaxStr}]`;
    }

    outerAnalysis = {
      outerName,
      outerFormula,
      outerMonotonicity,
      outerDomainCondition,
      isValidDomain,
      domainViolationReason,
      finalRange: isValidDomain ? { yMin, yMax, latex: finalRangeLatex } : undefined,
      monotonicityExplanation,
    };
  }

  return {
    a,
    b,
    c,
    h,
    k,
    axisOfSymmetry,
    vertex,
    isOpenUpward,
    steps,
    intervalAnalysis,
    outerAnalysis,
  };
}
