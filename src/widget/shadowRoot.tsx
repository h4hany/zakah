import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from './router';
import { applyThemeToShadowRoot } from '@/services/themeService';
import { initLocalization, setShadowRoot } from '@/services/localizationService';
import i18n from 'i18next';
import '@/index.css';

export function renderInShadowRoot(shadowRoot: ShadowRoot) {
  // Set shadow root reference for language changes
  setShadowRoot(shadowRoot);
  
  // Apply theme
  applyThemeToShadowRoot(shadowRoot);
  
  // Initialize localization
  initLocalization();
  
  // Function to inject CSS into shadow root
  const injectCSS = () => {
    try {
      // Try to find the CSS file - look for link tag or script location
      const scripts = document.getElementsByTagName('script');
      let cssPath = './dist/zakat-widget.css';
      
      // Check if there's a link tag with the CSS
      const links = document.getElementsByTagName('link');
      for (let i = 0; i < links.length; i++) {
        const href = links[i].href;
        if (href && href.includes('zakat-widget.css')) {
          cssPath = href;
          break;
        }
      }
      
      // If not found in link tags, find from script location
      if (cssPath === './dist/zakat-widget.css') {
        for (let i = 0; i < scripts.length; i++) {
          const src = scripts[i].src;
          if (src && src.includes('zakat-widget.js')) {
            const basePath = src.substring(0, src.lastIndexOf('/'));
            cssPath = `${basePath}/zakat-widget.css`;
            break;
          }
        }
      }
      
      // Use link tag for better compatibility (works in Shadow DOM)
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssPath;
      link.onerror = () => {
        // Fallback if CSS file not found
        injectFallbackStyles(shadowRoot);
      };
      shadowRoot.appendChild(link);
    } catch (error) {
      console.warn('Failed to load widget CSS, using fallback styles:', error);
      injectFallbackStyles(shadowRoot);
    }
  };
  
  // Inject fallback styles
  const injectFallbackStyles = (root: ShadowRoot) => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Source+Code+Pro:wght@400;500;600&display=swap');
      
      * {
        font-family: 'Outfit', sans-serif;
        box-sizing: border-box;
      }
      
      .mono {
        font-family: 'Source Code Pro', monospace;
      }
      
      .widget-card {
        background: linear-gradient(145deg, #2a2c2e, #212325);
        border: 1px solid rgba(201, 162, 77, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      }
      
      .excel-grid {
        display: grid;
        grid-template-columns: 32px repeat(auto-fit, minmax(120px, 1fr));
        background: #1a1c1e;
        font-size: 0.813rem;
      }
      
      .cell {
        border: 1px solid rgba(255, 255, 255, 0.03);
        padding: 0.625rem;
      }
      
      .cell-header {
        background: rgba(201, 162, 77, 0.08);
        border-bottom: 1px solid rgba(201, 162, 77, 0.25);
        font-weight: 600;
        position: sticky;
        top: 0;
        z-index: 10;
      }
      
      .cell-row-num {
        background: rgba(0, 0, 0, 0.3);
        color: #666;
        font-size: 0.688rem;
        text-align: center;
      }
      
      .tag-selector {
        display: inline-block;
        background: rgba(201, 162, 77, 0.15);
        border: 1px solid rgba(201, 162, 77, 0.3);
        color: #C9A24D;
        font-size: 0.625rem;
        padding: 0.125rem 0.5rem;
        border-radius: 9999px;
        margin-top: 0.25rem;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .tag-selector:hover {
        background: rgba(201, 162, 77, 0.25);
        border-color: rgba(201, 162, 77, 0.5);
      }
      
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      
      @keyframes slideUp {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      .float-bounce {
        animation: bounce 2s ease-in-out infinite;
      }
      
      .slide-up {
        animation: slideUp 0.3s ease-out;
      }
    `;
    root.appendChild(style);
  };
  
  // Inject CSS (async)
  injectCSS();
  
  // Create router
  const router = createRouter();
  
  // Create React root
  const container = document.createElement('div');
  container.id = 'widget-root';
  container.style.cssText = 'width: 100%; height: 100%;';
  // Set initial direction based on current language
  const currentLang = i18n.language || 'en';
  container.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  container.lang = currentLang;
  shadowRoot.appendChild(container);
  
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

