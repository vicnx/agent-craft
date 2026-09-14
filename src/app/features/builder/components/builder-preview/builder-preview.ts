import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AgentConfigService } from '../../../../core/services/agent-config.service';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { parseMarkdownForPreview } from '../../../../core/utils/markdown-highlighter.util';

@Component({
  selector: 'app-builder-preview',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './builder-preview.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderPreview {
  readonly agentConfig = inject(AgentConfigService);
  readonly isCopied = signal(false);

  readonly previewLines = computed(() => parseMarkdownForPreview(this.agentConfig.compiledMarkdown()));

  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.agentConfig.compiledMarkdown());
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    } catch {
      // Manejar error silenciosamente
    }
  }

  downloadFile(): void {
    const markdown = this.agentConfig.compiledMarkdown();
    const filename = this.agentConfig.activeOption().filename;
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
