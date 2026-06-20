import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const token = localStorage.getItem('praxire_token');
  if (!token) return <Navigate to="/founders-room/login" replace />;
  return <>{children}</>;
}
