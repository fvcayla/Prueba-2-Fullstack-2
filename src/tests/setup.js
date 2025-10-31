/**
 * Configuración global para las pruebas
 */

// Polyfills para pruebas
if (typeof window !== 'undefined') {
  // Mock de localStorage si no está disponible
  if (!window.localStorage) {
    window.localStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {}
    };
  }
}

// Mock de React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useParams: () => ({}),
  useLocation: () => ({ pathname: '/' }),
  Link: ({ children, to }) => `<a href="${to}">${children}</a>`
}));
