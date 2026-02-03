import { renderInShadowRoot } from './shadowRoot';
import { getConfig } from './config';

let shadowRoot: ShadowRoot | null = null;
let widgetContainer: HTMLElement | null = null;
let isOpen = false;

export function initializeWidget() {
  // Create shadow root container
  widgetContainer = document.createElement('div');
  widgetContainer.id = 'zakat-widget-container';
  widgetContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999999;
    display: none;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    padding: 2rem;
  `;
  
  // Create shadow root
  shadowRoot = widgetContainer.attachShadow({ mode: 'open' });
  
  // Render React app
  renderInShadowRoot(shadowRoot);
  
  // Add to body
  document.body.appendChild(widgetContainer);
  
  // Create floating button
  createFloatingButton();
  
  // Close on background click
  widgetContainer.addEventListener('click', (e) => {
    if (e.target === widgetContainer) {
      closeWidget();
    }
  });
}

function createFloatingButton() {
  const config = getConfig();
  const position = config.position === 'bottom-left' ? 'left: 24px;' : 'right: 24px;';
  
  const button = document.createElement('button');
  button.id = 'zakat-widget-float-btn';
  button.innerHTML = `
    <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #C9A24D;">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  `;
  button.style.cssText = `
    position: fixed;
    bottom: 24px;
    ${position}
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: linear-gradient(145deg, #2a2c2e, #212325);
    border: 1px solid rgba(201, 162, 77, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    z-index: 999998;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: bounce 2s ease-in-out infinite;
  `;
  
  // Add bounce animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
  `;
  document.head.appendChild(style);
  
  button.addEventListener('click', () => {
    if (widgetContainer) {
      isOpen = !isOpen;
      widgetContainer.style.display = isOpen ? 'flex' : 'none';
    }
  });
  
  document.body.appendChild(button);
}

export function openWidget() {
  if (widgetContainer) {
    isOpen = true;
    widgetContainer.style.display = 'flex';
  }
}

export function closeWidget() {
  if (widgetContainer) {
    isOpen = false;
    widgetContainer.style.display = 'none';
  }
}

// Export for use in components
(window as any).ZakatWidget = {
  ...(window as any).ZakatWidget,
  close: closeWidget,
  open: openWidget,
};

