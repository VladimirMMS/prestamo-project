import { Navigate, Outlet } from 'react-router-dom';
import {RootState } from '../store';
import { useSelector } from 'react-redux';


interface ProtectedRouteProps {
  path: string;
}

function ProtectedRoute({ path }: ProtectedRouteProps) {
  const auth = useSelector((state: RootState) => state.login);


  if (!auth.isUserLogin) return <Navigate to={path} replace />;

  return <Outlet />;
}

export default ProtectedRoute;
