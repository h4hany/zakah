import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createStandaloneRouter } from './app/router';
import { initLocalization } from './services/localizationService';
import './index.css';

// Initialize localization
initLocalization();

// Create router
const router = createStandaloneRouter();

// Render app directly (standalone mode, not widget)
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

