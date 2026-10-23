export type SupportedLang = 'en' | 'es' | 'fr' | 'pt' | 'zh';

export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  katexBadge: string;
  historyBtn: string;
  ocrBtn: string;
  // Tabs
  tabEvaluator: string;
  tabCompletingSquare: string;
  tabAxisClassification: string;
  tabRoots: string;
  tabChainDerivatives: string;
  tabPiecewise: string;
  tabQuiz: string;
  tabClassic: string;
  tabAiTutor: string;
  // Evaluator
  evaluatorTitle: string;
  evaluatorSubtitle: string;
  keyboardToggleOpen: string;
  keyboardToggleClose: string;
  quickPresetsLabel: string;
  innerFuncLabel: string;
  innerFuncSub: string;
  outerFuncLabel: string;
  outerFuncSub: string;
  evalPointLabel: string;
  evalPointSub: string;
  calcRealtime: string;
  keypadTitle: string;
  keypadCommon: string;
  keypadLogExp: string;
  keypadTrig: string;
  clearBtn: string;
  // Step visualizer
  pipelineTitle: string;
  pipelineBadge: string;
  sourceInput: string;
  step1Inner: string;
  step2Pass: string;
  step3Outer: string;
  stepsHeader: string;
  copyStepsBtn: string;
  copiedBtn: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step3Title: string;
  step4Title: string;
  domainValid: string;
  domainInvalid: string;
  finalConclusion: string;
  contrastTitle: string;
  contrastDesc: string;
  currentOrder: string;
  reverseOrder: string;
  foldComparison: string;
  expandComparison: string;
  // Keywords
  keywordInner: string;
  keywordOuter: string;
  keywordAxis: string;
  keywordVertex: string;
  keywordMonotonicity: string;
  keywordDomain: string;
  keywordRange: string;
  keywordChainRule: string;
  // Completing square
  sqTitle: string;
  sqSubtitle: string;
  sqStepHeader: string;
  sqParamSection: string;
  sqIntervalSection: string;
  sqIntervalToggle: string;
  sqOuterSection: string;
  sqAxisFormula: string;
  sqVertexFormula: string;
  sqOpenUp: string;
  sqOpenDown: string;
  sqIntervalRange: string;
  sqMonotonicityLaw: string;
  sqExamTipsTitle: string;
  sqExamTip1: string;
  sqExamTip2: string;
  // Axis classification
  axisTitle: string;
  axisSubtitle: string;
  axisSliderLabel: string;
  axisCase1: string;
  axisCase2: string;
  axisCase3: string;
  axisCopyExam: string;
  axisCopiedExam: string;
  axisCurrentMin: string;
  axisCurrentMax: string;
  // Roots
  rootsTitle: string;
  rootsSubtitle: string;
  rootsTargetInputLabel: string;
  rootsTargetInputSub: string;
  rootsTotalCount: string;
  rootsCanvasTitle: string;
  // Chain derivatives
  chainTitle: string;
  chainSubtitle: string;
  chainFormula: string;
  chainInnerLabel: string;
  chainOuterLabel: string;
  chainPointLabel: string;
  chainSlope: string;
  chainTangentEq: string;
  // Quiz
  quizTitle: string;
  quizSubtitle: string;
  quizScore: string;
  quizProgress: string;
  quizNextBtn: string;
  quizResultBtn: string;
  quizRestartBtn: string;
  quizCorrect: string;
  quizIncorrect: string;
  quizPassedTitle: string;
  // History
  historyModalTitle: string;
  historyClearBtn: string;
  historyEmpty: string;
  historyLoadBtn: string;
  // OCR
  ocrModalTitle: string;
  ocrModalSub: string;
  ocrDropText: string;
  ocrPasteHint: string;
  ocrNotePlaceholder: string;
  ocrStartBtn: string;
  ocrLoading: string;
  // AI Tutor
  aiTitle: string;
  aiSubtitle: string;
  aiPromptPlaceholder: string;
  aiSubmitBtn: string;
  aiLoadingBtn: string;
  aiReportTitle: string;
  // Footer
  footerText: string;
  footerCore: string;
}

export const translations: Record<SupportedLang, TranslationDictionary> = {
  en: {
    appName: 'Composite Function & Completing the Square Calculator',
    appSubtitle: 'High school math focus: Inner vs Outer layer decomposition, Completing the Square, and Chain Rule calculus',
    katexBadge: 'Standard Math Notation (KaTeX)',
    historyBtn: 'History & Bookmarks',
    ocrBtn: 'Photo / Screenshot Solver',
    tabEvaluator: 'Composite Evaluation & Steps',
    tabCompletingSquare: 'Completing the Square',
    tabAxisClassification: 'Dynamic Axis Classification',
    tabRoots: 'Composite Equation Roots & Zeros',
    tabChainDerivatives: 'Chain Rule Derivatives',
    tabPiecewise: 'Piecewise Composition',
    tabQuiz: 'Interactive Step Quiz',
    tabClassic: 'Classic Exam Problems',
    tabAiTutor: 'AI Math Tutor',

    evaluatorTitle: 'Composite Function Configuration & Evaluation Point',
    evaluatorSubtitle: 'Students often confuse inner and outer layers. Enter your functions to break them down layer by layer.',
    keyboardToggleOpen: 'Open Math Keypad',
    keyboardToggleClose: 'Close Math Keypad',
    quickPresetsLabel: 'Quick Presets:',
    innerFuncLabel: '【Inner Function】 u = g(x)',
    innerFuncSub: 'Independent variable is x',
    outerFuncLabel: '【Outer Function】 y = f(u)',
    outerFuncSub: 'Independent variable is u',
    evalPointLabel: 'Evaluation Point x = x₀',
    evalPointSub: 'Initial numerical input',
    calcRealtime: 'Realtime output:',
    keypadTitle: 'Virtual Math Keypad (for variable',
    keypadCommon: 'Common Functions',
    keypadLogExp: 'Log & Exponential',
    keypadTrig: 'Basic & Trig',
    clearBtn: 'Clear',

    pipelineTitle: 'Data Flow Pipeline',
    pipelineBadge: 'x passes through inner layer then outer layer',
    sourceInput: 'Source Variable',
    step1Inner: 'Inner Layer u = g(x)',
    step2Pass: 'Pass to Outer',
    step3Outer: 'Outer Layer y = f(u)',
    stepsHeader: 'Standard Step-by-Step Solution',
    copyStepsBtn: '📋 Copy Formatted Solution',
    copiedBtn: '✓ Copied to Clipboard',
    step1Title: 'Identify Inner and Outer Layers (Set intermediate variable u)',
    step1Desc: 'Peel the function like an onion from outer to inner.',
    step2Title: 'Calculate Inner Value: Substitute x = x₀ into g(x)',
    step3Title: 'Validate Outer Domain Requirements',
    step4Title: 'Calculate Outer Value: Substitute intermediate u into f(u)',
    domainValid: 'The intermediate value u satisfies the outer domain constraints.',
    domainInvalid: 'Domain Violation:',
    finalConclusion: 'Standard Solution Conclusion',
    contrastTitle: 'High School Trap Warning: f(g(x)) vs g(f(x))',
    contrastDesc: 'Function composition is NOT commutative! Reversing order yields completely different values.',
    currentOrder: 'Current Order: f(g(x₀))',
    reverseOrder: 'Reverse Order: g(f(x₀))',
    foldComparison: 'Fold Contrast',
    expandComparison: 'Expand Contrast',

    keywordInner: 'Inner Layer u=g(x)',
    keywordOuter: 'Outer Layer y=f(u)',
    keywordAxis: 'Axis of Symmetry',
    keywordVertex: 'Vertex (h, k)',
    keywordMonotonicity: 'Monotonicity Law',
    keywordDomain: 'Domain',
    keywordRange: 'Range',
    keywordChainRule: 'Chain Rule',

    sqTitle: 'Completing the Square Breakdown & Range Analysis',
    sqSubtitle: 'For quadratic inner function g(x) = ax² + bx + c: Complete the square to find vertex and axis, analyze interval extrema, then apply monotonicity law.',
    sqStepHeader: 'Step-by-Step Algebraic Derivation',
    sqParamSection: '① Quadratic Coefficients: g(x) = ax² + bx + c',
    sqIntervalSection: '② Bounded Interval x ∈ [m, n]',
    sqIntervalToggle: 'Enable Interval Constraint',
    sqOuterSection: '③ Outer Function Composition y = f(u)',
    sqAxisFormula: 'Axis of Symmetry:',
    sqVertexFormula: 'Vertex Coordinates:',
    sqOpenUp: 'Opens Upward (a > 0)',
    sqOpenDown: 'Opens Downward (a < 0)',
    sqIntervalRange: 'Inner Function Range:',
    sqMonotonicityLaw: 'Monotonicity Composition Rule:',
    sqExamTipsTitle: 'Exam Problem Strategy',
    sqExamTip1: 'Rule 1: Always compute the inner function range first as the new domain for the outer function.',
    sqExamTip2: 'Rule 2: For interval extrema, check whether the axis of symmetry x = -b/(2a) lies inside [m, n].',

    axisTitle: 'Parameter Classification: Dynamic Axis vs Interval Explorer',
    axisSubtitle: 'When axis of symmetry x = a varies, systematically classify: ① Axis to the left, ② Axis inside, ③ Axis to the right.',
    axisSliderLabel: 'Symmetry Axis Parameter a (Drag Slider)',
    axisCase1: 'Case ①: Axis to the Left of Interval (a < m)',
    axisCase2: 'Case ②: Axis Inside the Interval (m ≤ a ≤ n)',
    axisCase3: 'Case ③: Axis to the Right of Interval (a > n)',
    axisCopyExam: 'Copy 3-Case Exam Solution',
    axisCopiedExam: '✓ Copied Standard 3-Case Format',
    axisCurrentMin: 'Current Minimum:',
    axisCurrentMax: 'Current Maximum:',

    rootsTitle: 'Composite Equation Roots & Zeros Counter: f(g(x)) = c',
    rootsSubtitle: 'Exam Strategy: Let u = g(x), solve outer equation f(u) = c for u_i, then find intersections of horizontal lines y = u_i with inner parabola g(x).',
    rootsTargetInputLabel: '② Intermediate Roots u from Outer Equation (Comma separated)',
    rootsTargetInputSub: 'Example: 0, 3 or -1, 2',
    rootsTotalCount: 'Total Real Roots Count:',
    rootsCanvasTitle: 'Intersection & Graphical Analysis',

    chainTitle: 'Chain Rule Derivatives & Tangent Line: [f(g(x))]\' = f\'(g(x)) · g\'(x)',
    chainSubtitle: 'Calculus mastery: Differentiate outer function keeping inner intact, then multiply by derivative of inner function.',
    chainFormula: 'Chain Rule Formula',
    chainInnerLabel: '① Inner Quadratic g(x) = ax² + bx + c',
    chainOuterLabel: '② Outer Function y = f(u)',
    chainPointLabel: '③ Evaluation Point x = x₀',
    chainSlope: 'Tangent Line Slope k =',
    chainTangentEq: 'Tangent Line Equation:',

    quizTitle: 'Interactive Step-by-Step Mastery Quiz',
    quizSubtitle: 'Active practice: Master onion peeling, vertex placement, monotonicity rules, and piecewise selection.',
    quizScore: 'Current Score:',
    quizProgress: 'Quiz Progress',
    quizNextBtn: 'Next Question',
    quizResultBtn: 'View Final Score',
    quizRestartBtn: 'Retry Quiz',
    quizCorrect: 'Correct! +25 Points',
    quizIncorrect: 'Incorrect. Here is the teacher explanation:',
    quizPassedTitle: 'Congratulations! Quiz Completed!',

    historyModalTitle: 'Recent Calculation History & Bookmarks',
    historyClearBtn: 'Clear History',
    historyEmpty: 'No calculation history yet. Calculations will be saved automatically.',
    historyLoadBtn: 'Load Problem',

    ocrModalTitle: 'Photo / Screenshot Problem OCR & Solver',
    ocrModalSub: 'Upload phone photos, drag files, or paste screenshots directly (Ctrl + V)',
    ocrDropText: 'Click to select image or drag homework screenshot here',
    ocrPasteHint: 'Supports direct pasting with Ctrl + V (JPG, PNG, WebP)',
    ocrNotePlaceholder: 'Additional instruction (Optional, e.g. solve step 2 only)',
    ocrStartBtn: 'Start AI Recognition & Solver',
    ocrLoading: 'Recognizing & Solving...',

    aiTitle: 'AI Math Master Teacher: In-Depth Tutoring',
    aiSubtitle: 'Have a tricky composite function question? Ask AI tutor for step-by-step guidance and common mistakes.',
    aiPromptPlaceholder: 'Type composite function problem here, e.g. Find range of y = log2(x² - 2x + 5) on [0, 4] with completing the square...',
    aiSubmitBtn: 'Submit to AI Tutor',
    aiLoadingBtn: 'AI Teacher is calculating...',
    aiReportTitle: 'AI Step-by-Step Pedagogical Report',

    footerText: 'High School Composite Functions & Completing the Square Educational Platform',
    footerCore: 'Core Principles: Peel inside out · Enforce domain chain · Complete the square for range · Dynamic 3-case discussion',
  },

  es: {
    appName: 'Calculadora de Funciones Compuestas y Completación del Cuadrado',
    appSubtitle: 'Enfoque de bachillerato: Descomposición de capa interna vs externa, completación de cuadrados y cálculo diferencial',
    katexBadge: 'Notación Matemática Estándar (KaTeX)',
    historyBtn: 'Historial y Favoritos',
    ocrBtn: 'Escanear Foto / Captura',
    tabEvaluator: 'Evaluación y Pasos',
    tabCompletingSquare: 'Completación del Cuadrado',
    tabAxisClassification: 'Clasificación de Eje Dinámico',
    tabRoots: 'Raíces y Ceros Compuestos',
    tabChainDerivatives: 'Regla de la Cadena',
    tabPiecewise: 'Funciones a Trozos',
    tabQuiz: 'Práctica Interactiva',
    tabClassic: 'Problemas de Examen',
    tabAiTutor: 'Tutor de IA',

    evaluatorTitle: 'Configuración de Función Compuesta y Punto de Evaluación',
    evaluatorSubtitle: 'Los estudiantes a menudo confunden la capa interna con la externa. Descompóngalas paso a paso.',
    keyboardToggleOpen: 'Abrir Teclado Matemático',
    keyboardToggleClose: 'Cerrar Teclado Matemático',
    quickPresetsLabel: 'Ejemplos Rápidos:',
    innerFuncLabel: '【Función Interna】 u = g(x)',
    innerFuncSub: 'La variable independiente es x',
    outerFuncLabel: '【Función Externa】 y = f(u)',
    outerFuncSub: 'La variable independiente es u',
    evalPointLabel: 'Punto de Evaluación x = x₀',
    evalPointSub: 'Valor numérico de entrada',
    calcRealtime: 'Resultado en tiempo real:',
    keypadTitle: 'Teclado Virtual Matemático (variable',
    keypadCommon: 'Funciones Comunes',
    keypadLogExp: 'Logaritmos y Exponenciales',
    keypadTrig: 'Operaciones y Trigonometría',
    clearBtn: 'Limpiar',

    pipelineTitle: 'Flujo de Datos de la Función Compuesta',
    pipelineBadge: 'x atraviesa la capa interna y luego la externa',
    sourceInput: 'Variable Inicial',
    step1Inner: 'Capa Interna u = g(x)',
    step2Pass: 'Pasar a Externa',
    step3Outer: 'Capa Externa y = f(u)',
    stepsHeader: 'Pasos de Solución Detallados y Estándar',
    copyStepsBtn: '📋 Copiar Solución Formateada',
    copiedBtn: '✓ Copiado al Portapapeles',
    step1Title: 'Distinguir Capas Interna y Externa (Variable intermedia u)',
    step1Desc: 'Despeje la función como una cebolla de afuera hacia adentro.',
    step2Title: 'Calcular Valor Interno: Sustituir x = x₀ en g(x)',
    step3Title: 'Verificar Dominio de la Función Externa',
    step4Title: 'Calcular Valor Externo: Sustituir valor intermedio en f(u)',
    domainValid: 'El valor intermedio u cumple con las condiciones del dominio externo.',
    domainInvalid: 'Violación de Dominio:',
    finalConclusion: 'Conclusión Final',
    contrastTitle: 'Alerta de Trampa de Examen: f(g(x)) vs g(f(x))',
    contrastDesc: '¡La composición de funciones NO es conmutativa! Invertir el orden genera resultados distintos.',
    currentOrder: 'Orden Actual: f(g(x₀))',
    reverseOrder: 'Orden Inverso: g(f(x₀))',
    foldComparison: 'Ocultar Contraste',
    expandComparison: 'Mostrar Contraste',

    keywordInner: 'Capa Interna u=g(x)',
    keywordOuter: 'Capa Externa y=f(u)',
    keywordAxis: 'Eje de Simetría',
    keywordVertex: 'Vértice (h, k)',
    keywordMonotonicity: 'Composición de Monotonía',
    keywordDomain: 'Dominio',
    keywordRange: 'Rango / Imagen',
    keywordChainRule: 'Regla de la Cadena',

    sqTitle: 'Completación del Cuadrado y Análisis de Rango',
    sqSubtitle: 'Para la función interna cuadrática g(x) = ax² + bx + c: Completar cuadrados, hallar eje y vértice, y analizar extremos en intervalos.',
    sqStepHeader: 'Demostración Algebraica Paso a Paso',
    sqParamSection: '① Coeficientes Cuadráticos: g(x) = ax² + bx + c',
    sqIntervalSection: '② Intervalo Cerrado x ∈ [m, n]',
    sqIntervalToggle: 'Habilitar Restricción de Intervalo',
    sqOuterSection: '③ Composición de Función Externa y = f(u)',
    sqAxisFormula: 'Eje de Simetría:',
    sqVertexFormula: 'Coordenadas del Vértice:',
    sqOpenUp: 'Abre hacia arriba (a > 0)',
    sqOpenDown: 'Abre hacia abajo (a < 0)',
    sqIntervalRange: 'Rango de Función Interna:',
    sqMonotonicityLaw: 'Regla de Monotonía Compuesta:',
    sqExamTipsTitle: 'Estrategia de Examen',
    sqExamTip1: 'Regla 1: Halle siempre primero el rango interno como nuevo dominio para la función externa.',
    sqExamTip2: 'Regla 2: Verifique siempre si el eje x = -b/(2a) se encuentra dentro del intervalo [m, n].',

    axisTitle: 'Clasificación de Parámetros: Explorador de Eje Dinámico vs Intervalo',
    axisSubtitle: 'Cuando el eje x = a varía, clasifique en 3 casos: ① Eje a la izquierda, ② Eje en el interior, ③ Eje a la derecha.',
    axisSliderLabel: 'Parámetro de Eje a (Arrastre el Control)',
    axisCase1: 'Caso ①: Eje a la Izquierda del Intervalo (a < m)',
    axisCase2: 'Caso ②: Eje Dentro del Intervalo (m ≤ a ≤ n)',
    axisCase3: 'Caso ③: Eje a la Derecha del Intervalo (a > n)',
    axisCopyExam: 'Copiar Solución de 3 Casos',
    axisCopiedExam: '✓ Copiado Formato Estándar de 3 Casos',
    axisCurrentMin: 'Mínimo Actual:',
    axisCurrentMax: 'Máximo Actual:',

    rootsTitle: 'Ecuaciones Compuestas y Ceros: f(g(x)) = c',
    rootsSubtitle: 'Estrategia: Haga u = g(x), resuelva la ecuación externa f(u) = c, luego halle intersecciones con la parábola interna.',
    rootsTargetInputLabel: '② Raíces Intermedias u de la Ecuación Externa (Separadas por comas)',
    rootsTargetInputSub: 'Ejemplo: 0, 3 o -1, 2',
    rootsTotalCount: 'Total de Raíces Reales:',
    rootsCanvasTitle: 'Análisis Gráfico de Intersecciones',

    chainTitle: 'Derivadas con Regla de la Cadena: [f(g(x))]\' = f\'(g(x)) · g\'(x)',
    chainSubtitle: 'Derivar la función externa manteniendo la interna intacta, luego multiplicar por la derivada interna.',
    chainFormula: 'Fórmula de Regla de la Cadena',
    chainInnerLabel: '① Cuadrática Interna g(x) = ax² + bx + c',
    chainOuterLabel: '② Función Externa y = f(u)',
    chainPointLabel: '③ Punto de Evaluación x = x₀',
    chainSlope: 'Pendiente de Recta Tangente k =',
    chainTangentEq: 'Ecuación de la Tangente:',

    quizTitle: 'Reto Interactivo Paso a Paso',
    quizSubtitle: 'Práctica activa: Domine la separación de capas, ubicación de vértices y reglas de monotonía.',
    quizScore: 'Puntuación:',
    quizProgress: 'Progreso',
    quizNextBtn: 'Siguiente Pregunta',
    quizResultBtn: 'Ver Resultado Final',
    quizRestartBtn: 'Reintentar Reto',
    quizCorrect: '¡Correcto! +25 Puntos',
    quizIncorrect: 'Incorrecto. Explicación del profesor:',
    quizPassedTitle: '¡Felicidades! ¡Reto Completado!',

    historyModalTitle: 'Historial de Cálculos Recientes y Favoritos',
    historyClearBtn: 'Borrar Historial',
    historyEmpty: 'Aún no hay cálculos guardados. Se guardarán automáticamente.',
    historyLoadBtn: 'Cargar Ejercicio',

    ocrModalTitle: 'Reconocimiento y Resolución por Foto / Captura',
    ocrModalSub: 'Suba fotos del teléfono, arrastre archivos o pegue capturas directamente (Ctrl + V)',
    ocrDropText: 'Haga clic para seleccionar imagen o arrastre su captura aquí',
    ocrPasteHint: 'Admite pegar capturas con Ctrl + V (JPG, PNG, WebP)',
    ocrNotePlaceholder: 'Instrucción adicional (Opcional, ej: resolver solo la parte 2)',
    ocrStartBtn: 'Iniciar Reconocimiento y Resolución',
    ocrLoading: 'Reconociendo y Resolviendo...',

    aiTitle: 'Tutor de Matemáticas IA: Explicación Detallada',
    aiSubtitle: '¿Tiene dudas sobre funciones compuestas? Consulte al tutor para pasos detallados y errores comunes.',
    aiPromptPlaceholder: 'Escriba su ejercicio aquí, ej: Hallar el rango de y = log2(x² - 2x + 5) en [0, 4] completando cuadrados...',
    aiSubmitBtn: 'Consultar al Tutor IA',
    aiLoadingBtn: 'El profesor de IA está deduciendo...',
    aiReportTitle: 'Informe Pedagógico de IA',

    footerText: 'Plataforma Educativa de Funciones Compuestas y Completación del Cuadrado',
    footerCore: 'Principios: Descomponer de adentro hacia afuera · Validar dominio · Completar cuadrados · Discusión de 3 casos',
  },

  fr: {
    appName: 'Calculateur de Fonctions Composées et Forme Canonique',
    appSubtitle: 'Mathématiques lycée : Décomposition couche interne vs externe, complétion du carré et calcul de dérivées',
    katexBadge: 'Notation Mathématique Standard (KaTeX)',
    historyBtn: 'Historique et Favoris',
    ocrBtn: 'Scanner Photo / Capture',
    tabEvaluator: 'Évaluation & Étapes',
    tabCompletingSquare: 'Forme Canonique (Complétion)',
    tabAxisClassification: 'Classification de l\'Axe Mobile',
    tabRoots: 'Racines et Zéros Composés',
    tabChainDerivatives: 'Dérivée et Règle de la Chaîne',
    tabPiecewise: 'Fonctions par Morceaux',
    tabQuiz: 'Exercices Interactifs',
    tabClassic: 'Problèmes Classiques du Bac',
    tabAiTutor: 'Tuteur IA',

    evaluatorTitle: 'Configuration de la Fonction Composée et Point d\'Évaluation',
    evaluatorSubtitle: 'Les élèves confondent souvent la couche interne et externe. Décomposez pas à pas.',
    keyboardToggleOpen: 'Ouvrir le Clavier Mathématique',
    keyboardToggleClose: 'Fermer le Clavier Mathématique',
    quickPresetsLabel: 'Modèles Rapides :',
    innerFuncLabel: '【Fonction Interne】 u = g(x)',
    innerFuncSub: 'La variable indépendante est x',
    outerFuncLabel: '【Fonction Externe】 y = f(u)',
    outerFuncSub: 'La variable indépendante est u',
    evalPointLabel: 'Point d\'Évaluation x = x₀',
    evalPointSub: 'Valeur numérique d\'entrée',
    calcRealtime: 'Résultat en temps réel :',
    keypadTitle: 'Clavier Virtuel Mathématique (variable',
    keypadCommon: 'Fonctions Usuelles',
    keypadLogExp: 'Logarithmes & Exponentielles',
    keypadTrig: 'Opérations & Trigonométrie',
    clearBtn: 'Effacer',

    pipelineTitle: 'Pipeline de Flux de Données',
    pipelineBadge: 'x traverse la couche interne puis la couche externe',
    sourceInput: 'Variable Initiale',
    step1Inner: 'Couche Interne u = g(x)',
    step2Pass: 'Transmettre à l\'Externe',
    step3Outer: 'Couche Externe y = f(u)',
    stepsHeader: 'Étapes Détaillées de Résolution Standard',
    copyStepsBtn: '📋 Copier la Rédaction Formatée',
    copiedBtn: '✓ Copié dans le Presse-Papier',
    step1Title: 'Identifier les Couches Interne et Externe (Variable intermédiaire u)',
    step1Desc: 'Épluchez la fonction comme un oignon de l\'extérieur vers l\'intérieur.',
    step2Title: 'Calculer la Valeur Interne : Remplacer x = x₀ dans g(x)',
    step3Title: 'Vérifier le Domaine de Définition de la Fonction Externe',
    step4Title: 'Calculer la Valeur Externe : Remplacer la valeur intermédiaire dans f(u)',
    domainValid: 'La valeur intermédiaire u respecte les contraintes du domaine externe.',
    domainInvalid: 'Violation du Domaine :',
    finalConclusion: 'Conclusion Standardisée',
    contrastTitle: 'Piège Fréquent au Bac : f(g(x)) vs g(f(x))',
    contrastDesc: 'La composition de fonctions n\'est PAS commutative ! Inverser l\'ordre donne des résultats distincts.',
    currentOrder: 'Ordre Actuel : f(g(x₀))',
    reverseOrder: 'Ordre Inverse : g(f(x₀))',
    foldComparison: 'Masquer la Comparaison',
    expandComparison: 'Afficher la Comparaison',

    keywordInner: 'Couche Interne u=g(x)',
    keywordOuter: 'Couche Externe y=f(u)',
    keywordAxis: 'Axe de Symétrie',
    keywordVertex: 'Sommet (h, k)',
    keywordMonotonicity: 'Règle de Monotonie',
    keywordDomain: 'Domaine de Définition',
    keywordRange: 'Image / Intervalle',
    keywordChainRule: 'Règle de la Chaîne',

    sqTitle: 'Complétion du Carré (Forme Canonique) & Image',
    sqSubtitle: 'Pour la fonction interne g(x) = ax² + bx + c : Déterminer la forme canonique, l\'axe et le sommet, et analyser les extrémums sur intervalle.',
    sqStepHeader: 'Dérivation Algébrique Étape par Étape',
    sqParamSection: '① Coefficients du Trinôme : g(x) = ax² + bx + c',
    sqIntervalSection: '② Intervalle Fermé x ∈ [m, n]',
    sqIntervalToggle: 'Activer la Contrainte d\'Intervalle',
    sqOuterSection: '③ Composition avec la Fonction Externe y = f(u)',
    sqAxisFormula: 'Axe de Symétrie :',
    sqVertexFormula: 'Coordonnées du Sommet :',
    sqOpenUp: 'Parabole tournée vers le haut (a > 0)',
    sqOpenDown: 'Parabole tournée vers le bas (a < 0)',
    sqIntervalRange: 'Image de la Fonction Interne :',
    sqMonotonicityLaw: 'Règle de Monotonie Composée :',
    sqExamTipsTitle: 'Conseil d\'Épreuve',
    sqExamTip1: 'Règle 1 : Calculez toujours d\'abord l\'image interne comme nouveau domaine pour la fonction externe.',
    sqExamTip2: 'Règle 2 : Vérifiez toujours si l\'axe x = -b/(2a) se situe à l\'intérieur de [m, n].',

    axisTitle: 'Discussion avec Paramètre : Axe Mobile vs Intervalle',
    axisSubtitle: 'Lorsque l\'axe x = a varie, distinguez 3 cas : ① Axe à gauche, ② Axe à l\'intérieur, ③ Axe à droite.',
    axisSliderLabel: 'Paramètre de l\'Axe a (Glisser pour ajuster)',
    axisCase1: 'Cas ① : Axe à Gauche de l\'Intervalle (a < m)',
    axisCase2: 'Cas ② : Axe dans l\'Intervalle (m ≤ a ≤ n)',
    axisCase3: 'Cas ③ : Axe à Droite de l\'Intervalle (a > n)',
    axisCopyExam: 'Copier la Rédaction en 3 Cas',
    axisCopiedExam: '✓ Format Bac en 3 Cas Copié',
    axisCurrentMin: 'Minimum Actuel :',
    axisCurrentMax: 'Maximum Actuel :',

    rootsTitle: 'Équations Composées & Décompte des Zéros : f(g(x)) = c',
    rootsSubtitle: 'Méthode : Poser u = g(x), résoudre l\'équation externe f(u) = c, puis trouver les intersections avec la parabole interne.',
    rootsTargetInputLabel: '② Solutions Intermédiaires u de l\'Équation Externe (Séparées par virgules)',
    rootsTargetInputSub: 'Exemple : 0, 3 ou -1, 2',
    rootsTotalCount: 'Nombre Total de Racines Réelles :',
    rootsCanvasTitle: 'Analyse Graphique des Intersections',

    chainTitle: 'Dérivée Composée & Tangente : [f(g(x))]\' = f\'(g(x)) · g\'(x)',
    chainSubtitle: 'Dériver la fonction externe en gardant l\'interne, puis multiplier par la dérivée interne.',
    chainFormula: 'Formule de la Règle de la Chaîne',
    chainInnerLabel: '① Trinôme Interne g(x) = ax² + bx + c',
    chainOuterLabel: '② Fonction Externe y = f(u)',
    chainPointLabel: '③ Point d\'Évaluation x = x₀',
    chainSlope: 'Coefficient Directeur de la Tangente k =',
    chainTangentEq: 'Équation de la Tangente :',

    quizTitle: 'Défi Interactif Étape par Étape',
    quizSubtitle: 'Entraînement actif : Maîtrisez le découpage en couches, la position du sommet et les règles de monotonie.',
    quizScore: 'Score :',
    quizProgress: 'Progression',
    quizNextBtn: 'Question Suivante',
    quizResultBtn: 'Voir le Résultat',
    quizRestartBtn: 'Recommencer le Défi',
    quizCorrect: 'Correct ! +25 Points',
    quizIncorrect: 'Incorrect. Explication du professeur :',
    quizPassedTitle: 'Félicitations ! Défi Réussi !',

    historyModalTitle: 'Historique des Calculs et Favoris',
    historyClearBtn: 'Effacer l\'Historique',
    historyEmpty: 'Aucun calcul enregistré. Les calculs seront sauvegardés automatiquement.',
    historyLoadBtn: 'Charger l\'Exercice',

    ocrModalTitle: 'Reconnaissance et Résolution par Photo / Capture',
    ocrModalSub: 'Importez des photos, glissez des fichiers ou collez directement une capture (Ctrl + V)',
    ocrDropText: 'Cliquez pour sélectionner une image ou glissez votre capture ici',
    ocrPasteHint: 'Prend en charge le collage direct avec Ctrl + V (JPG, PNG, WebP)',
    ocrNotePlaceholder: 'Consigne additionnelle (Optionnel, ex : résoudre seulement la question 2)',
    ocrStartBtn: 'Lancer la Résolution par IA',
    ocrLoading: 'Reconnaissance et Résolution en cours...',

    aiTitle: 'Tuteur Mathématique IA : Explications Détaillées',
    aiSubtitle: 'Une difficulté sur une fonction composée ? Demandez au tuteur IA pour des étapes détaillées.',
    aiPromptPlaceholder: 'Écrivez votre problème ici, ex : Trouver l\'image de y = log2(x² - 2x + 5) sur [0, 4] avec la forme canonique...',
    aiSubmitBtn: 'Interroger le Tuteur IA',
    aiLoadingBtn: 'Le tuteur IA effectue les calculs...',
    aiReportTitle: 'Rapport Pédagogique de l\'IA',

    footerText: 'Plateforme Pédagogique de Fonctions Composées et Forme Canonique',
    footerCore: 'Principes clés : Décomposer de l\'intérieur vers l\'extérieur · Respecter la chaîne des domaines · Discussion en 3 cas',
  },

  pt: {
    appName: 'Calculadora de Funções Compostas e Completamento de Quadrados',
    appSubtitle: 'Foco do Ensino Médio: Decomposição de camada interna vs externa, forma canônica e regra da cadeia',
    katexBadge: 'Notação Matemática Padrão (KaTeX)',
    historyBtn: 'Histórico e Favoritos',
    ocrBtn: 'Escanear Foto / Captura',
    tabEvaluator: 'Avaliação e Passos',
    tabCompletingSquare: 'Completamento de Quadrados',
    tabAxisClassification: 'Classificação de Eixo Dinâmico',
    tabRoots: 'Raízes e Zeros Compostos',
    tabChainDerivatives: 'Regra da Cadeia',
    tabPiecewise: 'Funções Definidas por Partes',
    tabQuiz: 'Desafio Interativo',
    tabClassic: 'Problemas de Vestibular',
    tabAiTutor: 'Tutor de IA',

    evaluatorTitle: 'Configuração da Função Composta e Ponto de Avaliação',
    evaluatorSubtitle: 'Estudantes frequentemente confundem a camada interna com a externa. Decomponha passo a passo.',
    keyboardToggleOpen: 'Abrir Teclado Matemático',
    keyboardToggleClose: 'Fechar Teclado Matemático',
    quickPresetsLabel: 'Modelos Rápidos:',
    innerFuncLabel: '【Função Interna】 u = g(x)',
    innerFuncSub: 'A variável independente é x',
    outerFuncLabel: '【Função Externa】 y = f(u)',
    outerFuncSub: 'A variável independente é u',
    evalPointLabel: 'Ponto de Avaliação x = x₀',
    evalPointSub: 'Valor numérico inicial',
    calcRealtime: 'Resultado em tempo real:',
    keypadTitle: 'Teclado Virtual Matemático (variável',
    keypadCommon: 'Funções Comuns',
    keypadLogExp: 'Logaritmos e Exponenciais',
    keypadTrig: 'Operações e Trigonometria',
    clearBtn: 'Limpar',

    pipelineTitle: 'Fluxo de Dados da Função Composta',
    pipelineBadge: 'x passa pela camada interna e depois pela externa',
    sourceInput: 'Variável Inicial',
    step1Inner: 'Camada Interna u = g(x)',
    step2Pass: 'Passar para Externa',
    step3Outer: 'Camada Externa y = f(u)',
    stepsHeader: 'Passos Detalhados de Resolução Padrão',
    copyStepsBtn: '📋 Copiar Resolução Formatada',
    copiedBtn: '✓ Copiado para a Área de Transferência',
    step1Title: 'Identificar Camadas Interna e Externa (Variável intermediária u)',
    step1Desc: 'Descasque a função como uma cebola de fora para dentro.',
    step2Title: 'Calcular Valor Interno: Substituir x = x₀ em g(x)',
    step3Title: 'Verificar Domínio da Função Externa',
    step4Title: 'Calcular Valor Externo: Substituir valor intermediário em f(u)',
    domainValid: 'O valor intermediário u satisfaz as restrições do domínio externo.',
    domainInvalid: 'Violação de Domínio:',
    finalConclusion: 'Conclusão Padronizada',
    contrastTitle: 'Alerta de Pegadinha: f(g(x)) vs g(f(x))',
    contrastDesc: 'A composição de funções NÃO é comutativa! Inverter a ordem resulta em valores completamente diferentes.',
    currentOrder: 'Ordem Atual: f(g(x₀))',
    reverseOrder: 'Ordem Inversa: g(f(x₀))',
    foldComparison: 'Ocultar Comparação',
    expandComparison: 'Exibir Comparação',

    keywordInner: 'Camada Interna u=g(x)',
    keywordOuter: 'Camada Externa y=f(u)',
    keywordAxis: 'Eixo de Simetria',
    keywordVertex: 'Vértice (h, k)',
    keywordMonotonicity: 'Regra de Monotonia',
    keywordDomain: 'Domínio',
    keywordRange: 'Imagem / Conjunto Imagem',
    keywordChainRule: 'Regra da Cadeia',

    sqTitle: 'Completamento de Quadrados e Análise de Imagem',
    sqSubtitle: 'Para a função quadrática interna g(x) = ax² + bx + c: Complete quadrados, encontre eixo e vértice e analise extremos.',
    sqStepHeader: 'Demonstração Algébrica Passo a Passo',
    sqParamSection: '① Coeficientes Quadráticos: g(x) = ax² + bx + c',
    sqIntervalSection: '② Intervalo Fechado x ∈ [m, n]',
    sqIntervalToggle: 'Ativar Restrição de Intervalo',
    sqOuterSection: '③ Composição de Função Externa y = f(u)',
    sqAxisFormula: 'Eixo de Simetria:',
    sqVertexFormula: 'Coordenadas do Vértice:',
    sqOpenUp: 'Abre para cima (a > 0)',
    sqOpenDown: 'Abre para baixo (a < 0)',
    sqIntervalRange: 'Imagem da Função Interna:',
    sqMonotonicityLaw: 'Regra de Monotonia Composta:',
    sqExamTipsTitle: 'Dica para Provas e Vestibulares',
    sqExamTip1: 'Regra 1: Sempre determine a imagem interna primeiro como novo domínio para a função externa.',
    sqExamTip2: 'Regra 2: Verifique se o eixo de simetria x = -b/(2a) está dentro do intervalo [m, n].',

    axisTitle: 'Discussão de Parâmetros: Eixo Móvel vs Intervalo',
    axisSubtitle: 'Quando o eixo x = a varia, classifique em 3 casos: ① Eixo à esquerda, ② Eixo no interior, ③ Eixo à direita.',
    axisSliderLabel: 'Parâmetro do Eixo a (Arraste para ajustar)',
    axisCase1: 'Caso ①: Eixo à Esquerda do Intervalo (a < m)',
    axisCase2: 'Caso ②: Eixo no Interior do Intervalo (m ≤ a ≤ n)',
    axisCase3: 'Caso ③: Eixo à Direita do Intervalo (a > n)',
    axisCopyExam: 'Copiar Resolução em 3 Casos',
    axisCopiedExam: '✓ Formato Padrão em 3 Casos Copiado',
    axisCurrentMin: 'Mínimo Atual:',
    axisCurrentMax: 'Máximo Atual:',

    rootsTitle: 'Equações Compostas e Zeros: f(g(x)) = c',
    rootsSubtitle: 'Estratégia: Faça u = g(x), resolva a equação externa f(u) = c, depois encontre interseções com a parábola interna.',
    rootsTargetInputLabel: '② Raízes Intermediárias u da Equação Externa (Separadas por vírgulas)',
    rootsTargetInputSub: 'Exemplo: 0, 3 ou -1, 2',
    rootsTotalCount: 'Total de Raízes Reais:',
    rootsCanvasTitle: 'Análise Gráfica de Interseções',

    chainTitle: 'Derivadas com Regra da Cadeia: [f(g(x))]\' = f\'(g(x)) · g\'(x)',
    chainSubtitle: 'Derivar a função externa mantendo a interna intacta e multiplicar pela derivada interna.',
    chainFormula: 'Fórmula da Regra da Cadeia',
    chainInnerLabel: '① Quadrática Interna g(x) = ax² + bx + c',
    chainOuterLabel: '② Função Externa y = f(u)',
    chainPointLabel: '③ Ponto de Avaliação x = x₀',
    chainSlope: 'Coeficiente Angular da Reta Tangente k =',
    chainTangentEq: 'Equação da Reta Tangente:',

    quizTitle: 'Desafio Interativo Passo a Passo',
    quizSubtitle: 'Prática ativa: Domine o isolamento de camadas, localização de vértices e regras de monotonia.',
    quizScore: 'Pontuação:',
    quizProgress: 'Progresso',
    quizNextBtn: 'Próxima Questão',
    quizResultBtn: 'Ver Pontuação Final',
    quizRestartBtn: 'Reiniciar Desafio',
    quizCorrect: 'Correto! +25 Pontos',
    quizIncorrect: 'Incorreto. Veja a explicação do professor:',
    quizPassedTitle: 'Parabéns! Desafio Concluído!',

    historyModalTitle: 'Histórico de Cálculos e Favoritos',
    historyClearBtn: 'Limpar Histórico',
    historyEmpty: 'Nenhum cálculo registrado. Os cálculos serão salvos automaticamente.',
    historyLoadBtn: 'Carregar Exercício',

    ocrModalTitle: 'Reconhecimento e Resolução por Foto / Captura',
    ocrModalSub: 'Carregue fotos do celular, arraste arquivos ou cole capturas diretamente (Ctrl + V)',
    ocrDropText: 'Clique para selecionar uma imagem ou arraste sua captura aqui',
    ocrPasteHint: 'Suporta colar capturas com Ctrl + V (JPG, PNG, WebP)',
    ocrNotePlaceholder: 'Instrução adicional (Opcional, ex: resolver apenas o item 2)',
    ocrStartBtn: 'Iniciar Reconhecimento com IA',
    ocrLoading: 'Reconhecendo e Resolvendo...',

    aiTitle: 'Tutor de Matemática com IA: Explicação Completa',
    aiSubtitle: 'Tem dúvidas em funções compostas? Pergunte ao tutor para explicações passo a passo.',
    aiPromptPlaceholder: 'Digite seu problema aqui, ex: Determinar a imagem de y = log2(x² - 2x + 5) em [0, 4] completando quadrados...',
    aiSubmitBtn: 'Consultar Tutor IA',
    aiLoadingBtn: 'O professor de IA está calculando...',
    aiReportTitle: 'Relatório Pedagógico da IA',

    footerText: 'Plataforma Educacional de Funções Compostas e Completamento de Quadrados',
    footerCore: 'Princípios fundamentais: Decomposição de dentro para fora · Validação de domínio · Discussão em 3 casos',
  },

  zh: {
    appName: '复合函数求值与配方法拆解计算器',
    appSubtitle: '高中数学重难点专项：内层外层分步剖析 · 配方法极值与值域 · 链式法则微积分衔接',
    katexBadge: '高中数学公式规范 (KaTeX)',
    historyBtn: '演算历史与收藏',
    ocrBtn: '拍照 / 截图识题',
    tabEvaluator: '复合函数求值与拆解',
    tabCompletingSquare: '配方法全过程拆解专项',
    tabAxisClassification: '动轴定区间分类讨论演练',
    tabRoots: '复合方程与零点个数求根器',
    tabChainDerivatives: '复合求导与链式法则',
    tabPiecewise: '分段函数多层嵌套求值',
    tabQuiz: '分步闯关练脑模式',
    tabClassic: '高考经典题型库',
    tabAiTutor: 'AI 特级教师深度答疑',

    evaluatorTitle: '复合函数表达式与求值点配置',
    evaluatorSubtitle: '高中学生常因搞混内层与外层导致做错。在此输入或选择典型题，系统将逐步剥离内层与外层。',
    keyboardToggleOpen: '展开数学符号键盘',
    keyboardToggleClose: '收起数学键盘',
    quickPresetsLabel: '快捷母题:',
    innerFuncLabel: '【内层函数】 u = g(x)',
    innerFuncSub: '自变量为 x',
    outerFuncLabel: '【外层函数】 y = f(u)',
    outerFuncSub: '自变量为 u',
    evalPointLabel: '自变量求值点 x = x₀',
    evalPointSub: '初始数值输入',
    calcRealtime: '实时计算:',
    keypadTitle: '数学符号快捷输入盘 (针对变量',
    keypadCommon: '常用高中结构',
    keypadLogExp: '对数与指数',
    keypadTrig: '基本运算与三角',
    clearBtn: '清空',

    pipelineTitle: '复合函数数据流向管道 (Data Flow Pipeline)',
    pipelineBadge: '自变量 x 依次穿透内层与外层',
    sourceInput: '【源头自变量】',
    step1Inner: '【内层函数】 u = g(x)',
    step2Pass: '传递给外层',
    step3Outer: '【外层函数】 y = f(u)',
    stepsHeader: '高中标准规范解题步骤 (Detailed Solution Steps)',
    copyStepsBtn: '📋 一键复制规范答题步骤',
    copiedBtn: '✓ 已复制到剪贴板',
    step1Title: '分清内外层函数（设中间变量 u）',
    step1Desc: '解决学生痛点：“像洋葱一样由外向内拆，或由内向外算”。',
    step2Title: '先算内层函数值：将 x = x₀ 代入内层 g(x)',
    step3Title: '检查外层函数的定义域要求（合规性检验）',
    step4Title: '再算外层函数值：将中间值代入外层 f(u)',
    domainValid: '中间值符合外层函数定义域要求。',
    domainInvalid: '定义域不合法：',
    finalConclusion: '【标准答题规范结论】',
    contrastTitle: '高中易混易错警示：f(g(x)) 与 g(f(x)) 究竟有何本质不同？',
    contrastDesc: '函数复合绝不满足交换律！计算顺序颠倒会导致截然不同的中间值和最终答案。',
    currentOrder: '当前顺序：f(g(x₀))',
    reverseOrder: '反向顺序：g(f(x₀)) （对照组）',
    foldComparison: '折叠对比',
    expandComparison: '展开对比',

    keywordInner: '内层函数 u=g(x)',
    keywordOuter: '外层函数 y=f(u)',
    keywordAxis: '对称轴方程',
    keywordVertex: '顶点坐标 (h, k)',
    keywordMonotonicity: '同增异减口诀',
    keywordDomain: '定义域要求',
    keywordRange: '值域取值范围',
    keywordChainRule: '链式相乘法则',

    sqTitle: '配方法全流程拆解与复合值域求值',
    sqSubtitle: '内层是二次函数 g(x) = ax² + bx + c 时，通过“配方”找对称轴与顶点，判断对称轴是否在给定区间内，再结合外层函数“同增异减”求最值与值域。',
    sqStepHeader: '配方法完整推导步骤 (Step-by-Step Breakdown)',
    sqParamSection: '① 二次项与系数设定：g(x) = ax² + bx + c',
    sqIntervalSection: '② 自变量限定区间 x ∈ [m, n]',
    sqIntervalToggle: '启用区间限制',
    sqOuterSection: '③ 外层复合函数 y = f(u)',
    sqAxisFormula: '对称轴方程：',
    sqVertexFormula: '顶点坐标：',
    sqOpenUp: '开口向上 (a > 0)',
    sqOpenDown: '开口向下 (a < 0)',
    sqIntervalRange: '内层函数值域：',
    sqMonotonicityLaw: '“同增异减”判定口诀：',
    sqExamTipsTitle: '高中生易错题型解题秘诀',
    sqExamTip1: '秘诀1：求解复合函数值域时，必须先求出内层函数的值域作为外层函数的“新自变量定义域”，切勿直接求导或忽视中间取值限制！',
    sqExamTip2: '秘诀2：二次函数在闭区间 [m, n] 上的最值，首要看对称轴 x = -b/(2a) 是否在区间内部，分类讨论是高考大题的最高频得分点！',

    axisTitle: '配方法含参讨论：动轴定区间三段式分类讨论器',
    axisSubtitle: '高中二次函数在闭区间 [m, n] 上的最值问题，由于对称轴含参 x = a 左右移动，必须分：① 对称轴在左侧、② 对称轴在内部、③ 对称轴在右侧。',
    axisSliderLabel: '对称轴参数 a (可实时滑动)',
    axisCase1: '情形①：对称轴在区间左侧 (a < m)',
    axisCase2: '情形②：对称轴在区间内部 (m ≤ a ≤ n)',
    axisCase3: '情形③：对称轴在区间右侧 (a > n)',
    axisCopyExam: '一键复制标准大题解答',
    axisCopiedExam: '✓ 已复制标准大题答题规范',
    axisCurrentMin: '当前函数最小值 min:',
    axisCurrentMax: '当前函数最大值 max:',

    rootsTitle: '复合方程 f(g(x)) = c 的换元拆解与零点计数',
    rootsSubtitle: '核心思路：令 u = g(x)，将复合方程化为外层方程 f(u) = c，求出实数解 u_i，再转化统计水平线 y = u_i 与内层图像 y = g(x) 的交点总数！',
    rootsTargetInputLabel: '② 外层方程解出的中间根 u 值（以逗号分隔）',
    rootsTargetInputSub: '例如: 0, 3 或 -1, 2',
    rootsTotalCount: '实数根总个数：',
    rootsCanvasTitle: '图像交点数形结合直观演示',

    chainTitle: '复合函数求导与切线方程：[f(g(x))]\' = f\'(g(x)) · g\'(x)',
    chainSubtitle: '导数大题求单调性与极值的核心就是复合求导！牢记口诀：“外层求导内层不变，乘以内层求导”。',
    chainFormula: '链式相乘法则公式',
    chainInnerLabel: '① 内层函数 g(x) = ax² + bx + c',
    chainOuterLabel: '② 外层函数 y = f(u)',
    chainPointLabel: '③ 求导与切线点 x = x₀',
    chainSlope: '切线斜率 k =',
    chainTangentEq: '切线方程:',

    quizTitle: '复合函数与配方法逐关过关挑战',
    quizSubtitle: '做题才是检验理清内外层的终极标准！涵盖“洋葱剥皮”、“配方极值陷阱”、“同增异减判定”与“分段穿透”。',
    quizScore: '当前得分:',
    quizProgress: '关卡进度',
    quizNextBtn: '进入下一关',
    quizResultBtn: '查看闯关总评价',
    quizRestartBtn: '重新挑战刷题',
    quizCorrect: '回答正确！+25分',
    quizIncorrect: '回答错误，来看看名师解析：',
    quizPassedTitle: '恭喜完成复合函数与配方法全部关卡！',

    historyModalTitle: '最近演算历史与题目收藏',
    historyClearBtn: '清空历史',
    historyEmpty: '暂无演算历史，在主计算器中输入函数将自动留存。',
    historyLoadBtn: '载入此题',

    ocrModalTitle: '拍照 / 截图识题 · 复合函数智能拆解',
    ocrModalSub: '支持手机相册上传、桌面拖拽或键盘直接粘贴 (Ctrl + V)',
    ocrDropText: '点击选择图片，或将错题截图拖拽至此',
    ocrPasteHint: '支持直接按 Ctrl+V 粘贴剪贴板截图 (JPG, PNG, WebP)',
    ocrNotePlaceholder: '补充说明（选填，例如：只看第(2)问、重点写配方过程）',
    ocrStartBtn: '开始 AI 识题拆解',
    ocrLoading: 'AI 识别与解题中...',

    aiTitle: 'AI 高中数学特级教师 · 复合函数深度精讲',
    aiSubtitle: '遇到任何搞不懂的复合函数难题？输入题目内容，AI 导师将为你提供内层外层分步剖析与配方过程。',
    aiPromptPlaceholder: '在此输入复合函数题目，例如：求 y = log2(-x^2 + 4x + 12) 的值域并写出配方过程...',
    aiSubmitBtn: '提交 AI 详细拆解',
    aiLoadingBtn: '特级教师正在推导中...',
    aiReportTitle: 'AI 导师规范教学解析报告',

    footerText: '高中数学复合函数与配方法教学计算器 · 专为理清内层与外层逻辑设计',
    footerCore: '核心原则：由内及外逐步求值 · 中间量严控定义域 · 配方法结合单调性分析值域 · 动轴定区间三段讨论',
  },
};
