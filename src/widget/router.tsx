import { createMemoryRouter } from 'react-router-dom';
import Calculator from '@/app/pages/Calculator';
import AppLayout from '@/app/components/AppLayout';

export function createRouter() {
  return createMemoryRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Calculator />,
        },
      ],
    },
  ], {
    initialEntries: ['/'],
  });
}

