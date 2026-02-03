import { getConfig } from '@/widget/config';

export function applyThemeToShadowRoot(shadowRoot: ShadowRoot) {
  const config = getConfig();
  
  const style = document.createElement('style');
  style.textContent = `
    :host {
      --gold: ${config.theme.primary};
      --dark: ${config.theme.dark};
      --surface: ${config.theme.surface};
      --radius: ${config.theme.radius};
      --font: ${config.theme.font}, sans-serif;
    }
    
    * {
      font-family: var(--font);
    }
  `;
  
  shadowRoot.appendChild(style);
}


