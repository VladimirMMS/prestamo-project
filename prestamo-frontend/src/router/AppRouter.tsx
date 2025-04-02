import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AuthPage, Dashboard } from '../pages'; // Asegúrate de importar el componente NotFound
import { AppRoutes } from '../constants';
import Layout from './Layout';
import Solicitud from '../pages/Solicitud/Solicitud';
import Prestamos from '../pages/Prestamos/Prestamos';
import Registrar from '../pages/Registrar/Registrar';
import CuentaBancaria from '../pages/CuentaBancaria/CuentaBancaria';
import SolicitudesPedientes from '../pages/SolicitudesPedientes/SolicitudesPedientes';
import NotFound from '../pages/error/not-found/page';

function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path={AppRoutes.LOGIN} element={<AuthPage />} />
        <Route path={AppRoutes.REGISTRAR} element={<Registrar />} />

        {/* Rutas protegidas */}
        <Route path="/" element={<ProtectedRoute path={AppRoutes.LOGIN} />}>
          <Route path="/" element={<Layout />}>
            <Route path={AppRoutes.DASHBOARD} element={<Dashboard />} />
            <Route path={AppRoutes.SOLICITAR_PRESTAMO} element={<Solicitud />} />
            <Route path={AppRoutes.PRESTAMOS} element={<Prestamos />} />
            <Route path={AppRoutes.CUENTRAS_BANCARIAS} element={<CuentaBancaria />} />
            <Route path={AppRoutes.SOLICITUDES_PENDIENTES} element={<SolicitudesPedientes />} />
            {/* <Route index element={<Navigate to={AppRoutes.DASHBOARD} replace />} /> */}
          </Route>
        </Route>

        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;