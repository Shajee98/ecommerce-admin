import { Navigate, Outlet } from 'react-router-dom'

interface Props {
    redirectPath: string
}

const ProtectedRoute = ({redirectPath}: Props) => {
  let a = 0
    if (a == 1) {
      return <Navigate to={redirectPath} replace />
    }
    
    return <Outlet />
  };

export default ProtectedRoute