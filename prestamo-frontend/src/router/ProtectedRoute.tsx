import { Navigate, Outlet } from 'react-router-dom';


interface ProtectedRouteProps {
  path: string;
}

function ProtectedRoute({ path }: ProtectedRouteProps) {
  const isUserLogin = true
  if (!isUserLogin) return <Navigate to={path} replace />;

  return <Outlet />;
}

export default ProtectedRoute;
