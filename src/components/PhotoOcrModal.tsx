import React, { useState, useEffect } from 'react';
import { MathView } from './MathView';
import { useI18n } from '../i18n/context';
import { Camera, Upload, Sparkles, Loader2, AlertCircle, X, Image as ImageIcon, Clipboard } from 'lucide-react';

interface PhotoOcrModalProps {
  onClose: () => void;
  onImportToCalculator?: (inner: string, outer: string, x: number) => void;
}

export const PhotoOcrModal: React.FC<PhotoOcrModalProps> = ({ onClose, onImportToCalculator }) => {
  const { lang, t } = useI18n();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [additionalNote, setAdditionalNote] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle paste from clipboard
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            readAndSetImage(file);
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const readAndSetImage = (file: File) => {
    setMimeType(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      readAndSetImage(file);
    }
  };

  const handleRecognizeAndSolve = async () => {
    if (!imagePreview) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/gemini/ocr-solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePreview,
          mimeType,
          additionalNote,
          lang,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze image');
      }
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || '识别或解析出错');
    } finally {
      setLoading(false);
    }
  };

  // Render markdown / LaTeX text
  const renderFormattedText = (text: string) => {
    const paragraphs = text.split('\n\n');
    return paragraphs.map((para, idx) => {
      const trimmed = para.trim();
      if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
        const mathContent = trimmed.slice(2, -2).trim();
        return <MathView key={idx} math={mathContent} block />;
      }
      if (trimmed.startsWith('#')) {
        const headingText = trimmed.replace(/^#+\s*/, '');
        return (
          <h4 key={idx} className="text-sm font-bold text-indigo-900 mt-3 mb-1 border-b border-indigo-100 pb-1">
            {headingText}
          </h4>
        );
      }
      const parts = para.split(/(\$[^$]+\$)/g);
      return (
        <p key={idx} className="text-xs text-slate-700 leading-relaxed my-2">
          {parts.map((part, pIdx) => {
            if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
              return <MathView key={pIdx} math={part.slice(1, -1)} inline />;
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
              <Camera className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                拍照 / 截图识题 · 复合函数智能拆解
              </h3>
              <p className="text-[11px] text-slate-500">
                支持手机相册上传、桌面拖拽或键盘直接粘贴 (Ctrl + V)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {!imagePreview ? (
            <label className="border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/20 hover:bg-indigo-50/40 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all">
              <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-800">
                点击选择图片，或将错题截图拖拽至此
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                支持直接按 Ctrl+V 粘贴剪贴板截图 (JPG, PNG, WebP)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="space-y-3">
              <div className="relative border border-slate-200 rounded-xl p-2 bg-slate-50 flex items-center justify-center max-h-56 overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Uploaded problem"
                  className="max-h-52 w-auto object-contain rounded-lg"
                />
                <button
                  onClick={() => {
                    setImagePreview(null);
                    setResult(null);
                  }}
                  className="absolute top-3 right-3 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full text-xs shadow-md"
                  title="重新上传"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <input
                  type="text"
                  value={additionalNote}
                  onChange={(e) => setAdditionalNote(e.target.value)}
                  placeholder="补充说明（选填，例如：只看第(2)问、重点写配方过程）"
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={handleRecognizeAndSolve}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      AI 识别与解题中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      开始 AI 识题拆解
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="p-4 bg-slate-50 border border-indigo-200 rounded-xl space-y-3">
              <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                AI 题目转写与分步解答
              </span>
              <div className="bg-white p-4 rounded-lg border border-slate-200 font-sans text-xs">
                {renderFormattedText(result)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
