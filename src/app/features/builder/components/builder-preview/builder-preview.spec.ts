import { TestBed } from '@angular/core/testing';
import { BuilderPreview } from './builder-preview';
import { AgentConfigService } from '../../../../core/services/agent-config.service';

describe('BuilderPreview', () => {
  let agentConfig: AgentConfigService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [BuilderPreview],
      providers: [AgentConfigService],
    }).compileComponents();

    agentConfig = TestBed.inject(AgentConfigService);
  });

  it('should create the builder preview component', () => {
    const fixture = TestBed.createComponent(BuilderPreview);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should copy compiled markdown to clipboard and set isCopied state', async () => {
    const fixture = TestBed.createComponent(BuilderPreview);
    const component = fixture.componentInstance;
    const writeTextSpy = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText: writeTextSpy } });

    await component.copyToClipboard();
    expect(writeTextSpy).toHaveBeenCalledWith(agentConfig.compiledMarkdown());
    expect(component.isCopied()).toBe(true);
  });

  it('should handle clipboard copy error gracefully', async () => {
    const fixture = TestBed.createComponent(BuilderPreview);
    const component = fixture.componentInstance;
    const writeTextSpy = vi.fn().mockRejectedValue(new Error('Clipboard error'));
    Object.assign(navigator, { clipboard: { writeText: writeTextSpy } });

    await component.copyToClipboard();
    expect(component.isCopied()).toBe(false);
  });

  it('should trigger file download with compiled markdown', () => {
    const fixture = TestBed.createComponent(BuilderPreview);
    const component = fixture.componentInstance;

    const clickSpy = vi.fn();
    const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue({
      set href(_: string) {},
      set download(_: string) {},
      click: clickSpy,
    } as unknown as HTMLAnchorElement);

    const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-url');
    const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL').mockReturnValue(undefined);

    component.downloadFile();

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();
    expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:mock-url');

    createElementSpy.mockRestore();
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });
});
