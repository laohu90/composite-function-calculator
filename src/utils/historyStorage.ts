/**
 * Local storage manager for user's composite function calculation history & bookmarks
 */

export interface CalculationRecord {
  id: string;
  timestamp: number;
  innerExpr: string;
  outerExpr: string;
  x0: number;
  innerVal: number | null;
  outerVal: number | null;
  tags?: string[];
  isBookmarked?: boolean;
}

const STORAGE_KEY = 'composite_math_calc_history_v1';

export function getCalcHistory(): CalculationRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCalcRecord(record: Omit<CalculationRecord, 'id' | 'timestamp'>): CalculationRecord {
  const history = getCalcHistory();
  const newRecord: CalculationRecord = {
    ...record,
    id: 'rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    timestamp: Date.now(),
    isBookmarked: false,
  };

  // Avoid consecutive duplicates
  const filtered = history.filter(
    (h) => !(h.innerExpr === record.innerExpr && h.outerExpr === record.outerExpr && h.x0 === record.x0)
  );

  const updated = [newRecord, ...filtered].slice(0, 30); // keep last 30
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save to localStorage', e);
  }
  return newRecord;
}

export function toggleBookmark(id: string): CalculationRecord[] {
  const history = getCalcHistory();
  const updated = history.map((item) =>
    item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn(e);
  }
  return updated;
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn(e);
  }
}
