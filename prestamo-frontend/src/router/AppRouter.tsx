import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AuthPage } from '../pages';
import { AppRoutes } from '../constants';
import Layout from './Layout';
import Solicitud from '../pages/Solicitud/Solicitud';
import Prestamos from '../pages/Prestamos/Prestamos';
import Registrar from '../pages/Registrar/Registrar';

function AppRouter() {

  return (
    <Router>
      <Routes>
        <Route path={AppRoutes.LOGIN} element={<AuthPage />} />
        <Route path={AppRoutes.REGISTRAR} element={<Registrar />} />
        <Route
          path="/"
          element={<ProtectedRoute path={AppRoutes.LOGIN} />}
        >
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={AppRoutes.DASHBOARD} />} />
            {/* <Route path={AppRoutes.DASHBOARD} element={<Dashboard />} /> */}
            <Route path={AppRoutes.SOLICITAR_PRESTAMO} element={<Solicitud />} />
            <Route path={AppRoutes.PRESTAMOS} element={<Prestamos />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={AppRoutes.LOGIN} />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
