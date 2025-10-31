/**
 * Pruebas unitarias para Header component
 */

import Header from './Header';

describe('Header Component', () => {
  it('debería ser un componente válido de React', () => {
    expect(Header).toBeDefined();
    expect(typeof Header).toBe('function');
  });

  it('debería exportar el componente correctamente', () => {
    expect(Header).toBeDefined();
  });
});
