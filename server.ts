import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "15mb" }));

// Initialize Google GenAI if key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API endpoint for Image OCR & composite function solving
app.post("/api/gemini/ocr-solve", async (req, res) => {
  try {
    const { imageBase64, mimeType, additionalNote, lang = 'en' } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: "Please provide image data" });
    }

    if (!ai) {
      return res.status(503).json({
        error: "GEMINI_API_KEY is not configured.",
      });
    }

    const langInstructions: Record<string, string> = {
      en: "Respond entirely in English. You are an expert high school math teacher specializing in composite functions, completing the square, and chain rule calculus. Please transcribe the math problem into LaTeX, break down inner function u = g(x) and outer function y = f(u), explain the step-by-step resolution, and highlight common traps.",
      es: "Responda completamente en Español. Usted es un profesor experto en matemáticas de bachillerato especializado en funciones compuestas, completación del cuadrado y regla de la cadena. Transcriba el problema a LaTeX, descomponga la función interna u = g(x) y la externa y = f(u), explique paso a paso y resalte errores comunes.",
      fr: "Répondez entièrement en Français. Vous êtes un professeur de mathématiques de lycée expert en fonctions composées, complétion du carré et dérivation composée. Transcrivez le problème en LaTeX, décomposez la fonction interne u = g(x) et externe y = f(u), détaillez la résolution étape par étape et signalez les pièges fréquents.",
      pt: "Responda totalmente em Português. Você é um professor experiente de matemática do ensino médio especialista em funções compostas, completamento de quadrados e regra da cadeia. Transcreva o problema em LaTeX, decomponha a camada interna u = g(x) e externa y = f(u), explique passo a passo e aponte armadilhas comuns.",
      zh: "全程使用简体中文回答。你是一位经验丰富的高中数学特级教师，擅长通过题目图片/手写试卷识别复合函数题目并进行权威解析。请转录为 LaTeX 公式，详细剖析内层函数 u = g(x) 与外层函数 y = f(u)，展示配方法或求值步骤，并指出易错失分点。",
    };

    const systemInstruction = langInstructions[lang] || langInstructions.en;

    const promptText = `Please recognize the math problem in this image, focusing on composite functions, completing the square, domain verification, or chain rule steps.
${additionalNote ? `User note: ${additionalNote}` : ""}`;

    const imagePart = {
      inlineData: {
        mimeType: mimeType || "image/jpeg",
        data: imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, ""),
      },
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: {
        parts: [imagePart, { text: promptText }],
      },
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    const reply = response.text || "Could not recognize problem contents from the image.";
    return res.json({ result: reply });
  } catch (err: any) {
    console.error("Gemini OCR Solve error:", err);
    return res.status(500).json({
      error: "Image recognition failed: " + (err.message || "Unknown error"),
    });
  }
});

// API endpoint for AI Math tutoring & complex composite question step-by-step breakdown
app.post("/api/gemini/solve", async (req, res) => {
  try {
    const { problem, questionType, lang = 'en' } = req.body;
    if (!problem || typeof problem !== "string") {
      return res.status(400).json({ error: "Please provide problem content" });
    }

    if (!ai) {
      return res.status(503).json({
        error: "GEMINI_API_KEY is not configured.",
      });
    }

    const langInstructions: Record<string, string> = {
      en: "Respond in English. You are an expert high school math teacher specializing in composite functions, completing the square, domain and range chains, and chain rule calculus. Provide structured pedagogical steps with LaTeX formulas, clearly separating inner layer u = g(x) and outer layer y = f(u), explaining monotonicity, and highlighting exam traps.",
      es: "Responda en Español. Es un profesor experto de matemáticas especializado en funciones compuestas, completación del cuadrado y regla de la cadena. Proporcione pasos pedagógicos estructurados con fórmulas en LaTeX, separando claramente la capa interna u = g(x) y externa y = f(u).",
      fr: "Répondez en Français. Vous êtes un professeur expert en mathématiques spécialisé dans les fonctions composées, la forme canonique et la règle de la chaîne. Fournissez des étapes pédagogiques claires avec LaTeX, en séparant la couche interne u = g(x) et externe y = f(u).",
      pt: "Responda em Português. Você é um professor especialista em funções compostas, completamento de quadrados e regra da cadeia. Forneça passos pedagógicos com fórmulas LaTeX, separando a camada interna u = g(x) e externa y = f(u).",
      zh: "使用中文回答。你是一位经验丰富的高中数学特级教师，专精高中复合函数（嵌套函数）、配方法拆解与值域/最值分析。提供条理极度清晰的教学步骤，明确指出内层 u = g(x) 与外层 y = f(u)，说明单调性口诀与配方过程。",
    };

    const systemInstruction = langInstructions[lang] || langInstructions.en;
    const prompt = `[Topic]: ${questionType || "Composite Function Breakdown"}
[Problem]: ${problem}

Please provide detailed step-by-step resolution with LaTeX formatting.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    const reply = response.text || "No response received";
    return res.json({ result: reply });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    return res.status(500).json({
      error: "AI service error: " + (err.message || "Unknown error"),
    });
  }
});

// Explicit sitemap.xml endpoint for Search Console
app.get("/sitemap.xml", (_req, res) => {
  res.header("Content-Type", "application/xml");
  res.sendFile(path.resolve(__dirname, "public/sitemap.xml"));
});

// Setup Vite middlewares in development or static serving in production
async function startServer() {
  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
