import { parseBoldSegments, parseMarkdownForPreview } from './markdown-highlighter.util';

describe('markdown-highlighter.util', () => {
  it('should parse bold segments correctly', () => {
    const segments = parseBoldSegments('- **Principio DRY:** cero duplicidad');
    expect(segments.length).toBe(3);
    expect(segments[0]).toEqual({ text: '- ', isBold: false });
    expect(segments[1]).toEqual({ text: 'Principio DRY:', isBold: true });
    expect(segments[2]).toEqual({ text: ' cero duplicidad', isBold: false });
  });

  it('should return single non-bold segment if no asterisks are present', () => {
    const segments = parseBoldSegments('Texto normal sin negrita');
    expect(segments.length).toBe(1);
    expect(segments[0]).toEqual({ text: 'Texto normal sin negrita', isBold: false });
  });

  it('should identify and style H1, H2, H3 headings with colors', () => {
    const md = [
      '# Directivas: AgentCraft',
      '## 1. Visión del Proyecto',
      '## 2. Stack Tecnológico',
      '## 3. Arquitectura',
      '## 4. UI/UX y Diseño',
      '## 5. Git Workflow',
      '## 6. Guardrails',
      '### Comandos de Verificación',
    ].join('\n');

    const lines = parseMarkdownForPreview(md);
    expect(lines[0].type).toBe('h1');
    expect(lines[0].colorClass).toContain('text-indigo-300');

    expect(lines[1].type).toBe('h2');
    expect(lines[1].colorClass).toContain('text-sky-400');

    expect(lines[2].type).toBe('h2');
    expect(lines[2].colorClass).toContain('text-emerald-400');

    expect(lines[3].type).toBe('h2');
    expect(lines[3].colorClass).toContain('text-indigo-400');

    expect(lines[4].type).toBe('h2');
    expect(lines[4].colorClass).toContain('text-fuchsia-400');

    expect(lines[5].type).toBe('h2');
    expect(lines[5].colorClass).toContain('text-amber-400');

    expect(lines[6].type).toBe('h2');
    expect(lines[6].colorClass).toContain('text-rose-400');

    expect(lines[7].type).toBe('h3');
    expect(lines[7].colorClass).toContain('text-cyan-300');
  });

  it('should format code blocks, quotes and comments with appropriate styles', () => {
    const md = [
      '<!-- Generated comment -->',
      '> App description',
      '```bash',
      '# Build',
      'npm run build',
      '```',
    ].join('\n');

    const lines = parseMarkdownForPreview(md);
    expect(lines[0].type).toBe('comment');
    expect(lines[1].type).toBe('quote');
    expect(lines[2].type).toBe('code-fence');
    expect(lines[3].type).toBe('code-comment');
    expect(lines[4].type).toBe('code');
    expect(lines[5].type).toBe('code-fence');
  });
});
