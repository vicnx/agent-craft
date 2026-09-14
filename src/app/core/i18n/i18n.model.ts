export type Language = 'es' | 'en';

export interface TranslationSchema {
  readonly common: {
    readonly appName: string;
    readonly appSubtitle: string;
    readonly clientSide: string;
    readonly back: string;
    readonly backToHome: string;
    readonly popular: string;
    readonly standard: string;
    readonly autonomous: string;
    readonly readyToEdit: string;
    readonly stepOf: string;
  };
  readonly welcome: {
    readonly badge: string;
    readonly heroTitlePrefix: string;
    readonly heroTitleHighlight: string;
    readonly heroSubtitle: string;
    readonly ctaStartCustom: string;
    readonly ctaExploreTemplates: string;
    readonly templatesTitle: string;
    readonly templatesSubtitle: string;
    readonly formatsSupported: string;
    readonly useTemplate: string;
    readonly featureClientTitle: string;
    readonly featureClientDesc: string;
    readonly featureSyncTitle: string;
    readonly featureSyncDesc: string;
    readonly featureExportTitle: string;
    readonly featureExportDesc: string;
  };
  readonly presets: {
    readonly cursorName: string;
    readonly cursorDesc: string;
    readonly copilotName: string;
    readonly copilotDesc: string;
    readonly agentsName: string;
    readonly agentsDesc: string;
  };
  readonly builder: {
    readonly title: string;
    readonly subtitle: string;
    readonly customConfig: string;
    readonly agentParams: string;
    readonly agentParamsPlaceholderTitle: string;
    readonly agentParamsPlaceholderDesc: string;
    readonly livePreview: string;
    readonly compiledOutput: string;
    readonly compiledOutputDesc: string;
  };
}
