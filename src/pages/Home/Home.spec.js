/**
 * Pruebas unitarias para Home component
 */

import Home from './Home';

describe('Home Component', () => {
  it('debería ser un componente válido de React', () => {
    expect(Home).toBeDefined();
    expect(typeof Home).toBe('function');
  });

  it('debería exportar el componente correctamente', () => {
    expect(Home).toBeDefined();
  });
});
