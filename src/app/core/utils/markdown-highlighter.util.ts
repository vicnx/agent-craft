export interface TextSegment {
  readonly text: string;
  readonly isBold: boolean;
}

export interface PreviewLine {
  readonly type: 'h1' | 'h2' | 'h3' | 'comment' | 'quote' | 'code-fence' | 'code' | 'code-comment' | 'frontmatter' | 'text';
  readonly raw: string;
  readonly colorClass: string;
  readonly borderClass: string;
  readonly segments: readonly TextSegment[];
}

export function parseBoldSegments(line: string): readonly TextSegment[] {
  if (!line.includes('**')) return [{ text: line, isBold: false }];
  return line.split('**').map((part, i) => ({ text: part, isBold: i % 2 === 1 })).filter((s) => s.text.length > 0);
}

function getH2Classes(line: string): { color: string; border: string } {
  if (line.includes('1.') || /visio?n|scope|rol\b|role\b/i.test(line)) return { color: 'text-sky-600 dark:text-sky-400', border: 'border-sky-500/25' };
  if (line.includes('2.') || /stack|tecnolog/i.test(line)) return { color: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/25' };
  if (line.includes('3.') || /arquitectura|architecture/i.test(line)) return { color: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-500/25' };
  if (line.includes('4.') || /dise[nñ]o|design|ui/i.test(line)) return { color: 'text-fuchsia-600 dark:text-fuchsia-400', border: 'border-fuchsia-500/25' };
  if (line.includes('5.') || /git|flujo|workflow/i.test(line)) return { color: 'text-amber-600 dark:text-amber-400', border: 'border-amber-500/25' };
  if (line.includes('6.') || /instruccion|guardrail|restric/i.test(line)) return { color: 'text-rose-600 dark:text-rose-400', border: 'border-rose-500/25' };
  return { color: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/25' };
}

export function parseMarkdownForPreview(markdown: string): readonly PreviewLine[] {
  let inCode = false;
  return markdown.split('\n').map((raw) => {
    if (raw.startsWith('```')) {
      inCode = !inCode;
      return { type: 'code-fence', raw, colorClass: 'text-slate-400 dark:text-slate-500', borderClass: '', segments: [{ text: raw, isBold: false }] };
    }
    if (inCode) {
      return raw.startsWith('#')
        ? { type: 'code-comment', raw, colorClass: 'text-slate-400 dark:text-slate-500 italic', borderClass: '', segments: [{ text: raw, isBold: false }] }
        : { type: 'code', raw, colorClass: 'text-emerald-600 dark:text-emerald-400', borderClass: '', segments: [{ text: raw, isBold: false }] };
    }
    if (raw.startsWith('# ')) {
      return { type: 'h1', raw, colorClass: 'text-indigo-600 dark:text-indigo-300 font-bold', borderClass: '', segments: [{ text: raw, isBold: false }] };
    }
    if (raw.startsWith('## ')) {
      const { color, border } = getH2Classes(raw);
      return { type: 'h2', raw, colorClass: color, borderClass: border, segments: [{ text: raw, isBold: false }] };
    }
    if (raw.startsWith('### ')) {
      return { type: 'h3', raw, colorClass: 'text-cyan-700 dark:text-cyan-300 font-semibold', borderClass: '', segments: [{ text: raw, isBold: false }] };
    }
    if (raw.startsWith('<!--')) {
      return { type: 'comment', raw, colorClass: 'text-slate-400 dark:text-slate-500 italic', borderClass: '', segments: [{ text: raw, isBold: false }] };
    }
    if (raw.startsWith('>')) {
      return { type: 'quote', raw, colorClass: 'text-amber-800 dark:text-amber-200/90 italic', borderClass: 'border-amber-500/40', segments: parseBoldSegments(raw) };
    }
    if (raw === '---') {
      return { type: 'frontmatter', raw, colorClass: 'text-slate-400 dark:text-slate-600', borderClass: '', segments: [{ text: raw, isBold: false }] };
    }
    return { type: 'text', raw, colorClass: 'text-slate-700 dark:text-slate-300', borderClass: '', segments: parseBoldSegments(raw) };
  });
}
