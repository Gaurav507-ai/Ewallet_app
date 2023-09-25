import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const customRender = (ui, options = {}) => {
  return render(ui, { wrapper: MemoryRouter, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
