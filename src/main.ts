import { initializeWidget } from './widget/bootstrap';

// Polyfill for process (browser compatibility)
if (typeof window !== 'undefined' && typeof (window as any).process === 'undefined') {
  (window as any).process = {
    env: {
      NODE_ENV: 'production',
    },
  };
}

// Initialize widget when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWidget);
} else {
  initializeWidget();
}

// Export for manual initialization if needed
(window as any).ZakatWidget = {
  init: initializeWidget,
};


