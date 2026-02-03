import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from './widget/router';
import { initLocalization } from './services/localizationService';
import './index.css';

// Initialize localization
initLocalization();

// Create router
const router = createRouter();

// Render app directly (not in shadow DOM for dev)
const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);


