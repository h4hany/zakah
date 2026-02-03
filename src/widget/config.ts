export interface WidgetConfig {
  language?: 'en' | 'ar';
  position?: 'bottom-right' | 'bottom-left';
  theme?: {
    primary?: string;
    dark?: string;
    surface?: string;
    radius?: string;
    font?: string;
    logo?: string;
  };
}

const defaultConfig: Required<WidgetConfig> = {
  language: 'en',
  position: 'bottom-right',
  theme: {
    primary: '#C9A24D',
    dark: '#212325',
    surface: '#E7E9EB',
    radius: '16px',
    font: 'Outfit',
    logo: '',
  },
};

export function getConfig(): Required<WidgetConfig> {
  const globalConfig = (window as any).ZakatWidgetConfig as WidgetConfig | undefined;
  
  if (!globalConfig) {
    return defaultConfig;
  }

  return {
    language: globalConfig.language || defaultConfig.language,
    position: globalConfig.position || defaultConfig.position,
    theme: {
      primary: globalConfig.theme?.primary || defaultConfig.theme.primary,
      dark: globalConfig.theme?.dark || defaultConfig.theme.dark,
      surface: globalConfig.theme?.surface || defaultConfig.theme.surface,
      radius: globalConfig.theme?.radius || defaultConfig.theme.radius,
      font: globalConfig.theme?.font || defaultConfig.theme.font,
      logo: globalConfig.theme?.logo || defaultConfig.theme.logo,
    },
  };
}

export function applyTheme(config: Required<WidgetConfig>, shadowRoot: ShadowRoot) {
  const style = document.createElement('style');
  style.textContent = `
    :host {
      --gold: ${config.theme.primary};
      --dark: ${config.theme.dark};
      --surface: ${config.theme.surface};
      --radius: ${config.theme.radius};
      --font: ${config.theme.font}, sans-serif;
    }
  `;
  shadowRoot.appendChild(style);
}


