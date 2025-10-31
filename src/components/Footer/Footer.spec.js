/**
 * Pruebas unitarias para Footer component
 */

import Footer from './Footer';

describe('Footer Component', () => {
  it('debería ser un componente válido de React', () => {
    expect(Footer).toBeDefined();
    expect(typeof Footer).toBe('function');
  });

  it('debería exportar el componente correctamente', () => {
    expect(Footer).toBeDefined();
  });
});
