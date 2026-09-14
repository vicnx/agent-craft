import { TranslationSchema } from '../i18n.model';

export const esTranslations: TranslationSchema = {
  common: {
    appName: 'AgentCraft',
    appSubtitle: 'AI Agents & Rules Studio',
    clientSide: '100% Client-Side',
    back: 'Volver',
    backToHome: 'Volver al inicio',
    popular: 'Popular',
    standard: 'Estándar',
    autonomous: 'Autónomo',
    readyToEdit: 'Listo para editar',
    stepOf: 'Paso 1 de 2',
  },
  welcome: {
    badge: 'Generador Visual de Reglas para IA',
    heroTitlePrefix: 'Configura tus agentes de código con',
    heroTitleHighlight: 'precisión quirúrgica',
    heroSubtitle:
      'Diseña visualmente directivas para Cursor, GitHub Copilot y Claude Code. Previsualiza en tiempo real y exporta sin lidiar con markdown manual.',
    ctaStartCustom: 'Crear Configuración Desde Cero',
    ctaExploreTemplates: 'Explorar Plantillas',
    templatesTitle: 'Plantillas de Inicio Rápido',
    templatesSubtitle: 'Selecciona un formato preconfigurado para acelerar tu flujo de trabajo.',
    formatsSupported: '3 formatos soportados',
    useTemplate: 'Usar',
    featureClientTitle: '100% Client-Side',
    featureClientDesc: 'Sin backend ni cuentas. Tus directivas viven solo en tu navegador.',
    featureSyncTitle: 'Live Markdown',
    featureSyncDesc: 'Previsualización inmediata del archivo compilado en tiempo real.',
    featureExportTitle: 'One-Click Export',
    featureExportDesc: 'Copia al portapapeles o descarga el archivo listo para usar.',
  },
  presets: {
    cursorName: 'Cursor IDE',
    cursorDesc: 'Reglas de comportamiento, rol del agente y estándares de código para el editor Cursor.',
    copilotName: 'GitHub Copilot',
    copilotDesc: 'Instrucciones contextuales para guiar las sugerencias de Copilot en todo el repositorio.',
    agentsName: 'Claude / AGENTS.md',
    agentsDesc: 'Directivas maestras de arquitectura, límites de ejecución y flujo Git para agentes autónomos.',
  },
  builder: {
    title: 'Studio de Reglas',
    subtitle: 'Configura directivas, arquitectura y convenciones de código.',
    customConfig: 'Configuración Personalizada',
    agentParams: 'Parámetros del Agente',
    agentParamsPlaceholderTitle: 'Formularios del Configurador',
    agentParamsPlaceholderDesc:
      'Preparado para integrar los campos modulares: Rol, Stack tecnológico, Estándares de calidad y Convenciones.',
    livePreview: 'Previsualización en Vivo',
    compiledOutput: 'Salida Compilada',
    compiledOutputDesc:
      'El motor de generación en tiempo real mostrará aquí el resultado listo para copiar o exportar en 1 clic.',
  },
  footer: {
    createdWith: 'Creado con',
    by: 'por',
    author: 'Xente',
    license: 'Licencia MIT',
  },
};
