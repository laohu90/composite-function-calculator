# Composite Function & Completing the Square Calculator
### 复合函数求值与配方法拆解计算器

An educational mathematics application tailored for high school calculus and pre-calculus students. It addresses one of the most persistent bottlenecks in learning functions: **distinguishing inner vs. outer layers in composite functions**, performing **step-by-step completing the square**, classifying **dynamic axis-interval relationships**, and applying the **Chain Rule**.

---

## 🌟 Key Features

1. **Composite Function Evaluator (`f(g(x))`)**
   - Onion peel decomposition: clearly identifies inner intermediate variable $u = g(x)$ and outer function $y = f(u)$.
   - Real-time step-by-step computation pipeline with domain safety checks.
   - Non-commutative comparison warning ($f(g(x)) \neq g(f(x))$).
   - Interactive dual coordinate graph tracking $(x_0, u_0) \to (u_0, y_0)$.

2. **Completing the Square Decomposition (`配方法过程精析`)**
   - Full algebraic steps: factoring $a$, adding & subtracting $(b/2a)^2$, binomial identity $(x-h)^2$, and constant simplification.
   - Closed interval $[m, n]$ extrema determination: checks if the vertex lies within the interval.
   - Monotonicity composition rule: "同增异减" (increasing + increasing $\to$ increasing, increasing + decreasing $\to$ decreasing).

3. **Dynamic Symmetry Axis Classification (`动轴定区间讨论器`)**
   - Real-time parameter slider for symmetry axis $x = a$.
   - Live 3-case partition analysis:
     - Case 1: Axis to the left of the interval ($a < m$).
     - Case 2: Axis inside the interval ($m \le a \le n$).
     - Case 3: Axis to the right of the interval ($a > n$).
   - One-click copy for standard exam response templates.

4. **Composite Equation Roots & Zeros Counter (`f(g(x)) = c`)**
   - Solves outer roots $u_i$, then intersects horizontal lines $y = u_i$ with the inner parabola.
   - Computes discriminants $\Delta$ and real root counts.

5. **Chain Rule Derivatives & Tangent Line (`微积分导数与切线`)**
   - Formula: $[f(g(x))]' = f'(g(x)) \cdot g'(x)$.
   - Dynamic tangent line visualizer and instantaneous slope at point $x_0$.

6. **Piecewise Function Multi-Layer Nesting (`分段函数嵌套求值`)**
   - Evaluates multi-layer expressions such as $f(f(x))$ or $f(f(f(x)))$.
   - Live branch condition checks at each level.

7. **Interactive Quiz Mode (`互动闯关练习`)**
   - 4-level progressive mastery challenge covering onion peeling, interval extrema traps, monotonicity rules, and piecewise logic.

8. **AI Tutor & Screenshot / Photo Problem Solver**
   - Powered by Google Gemini AI with LaTeX output and step-by-step breakdown.
   - OCR mathematical parser accepts handwritten or textbook image uploads.

9. **Multilingual Support (默认英语)**
   - English (`en` - Default)
   - Spanish (`es`)
   - French (`fr`)
   - Portuguese (`pt`)
   - Chinese (`zh`)

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Math Typography**: KaTeX
- **Icons**: Lucide React
- **AI Backend**: Express + `@google/genai` (Gemini API)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation

```bash
git clone https://github.com/laohu90/composite-function-calculator.git
cd composite-function-calculator
npm install
```

### Environment Configuration

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Provide your `GEMINI_API_KEY` for AI Tutor and OCR features.

### Development Server

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
npm run build
npm run start
```

---

## 📄 License
Apache-2.0
