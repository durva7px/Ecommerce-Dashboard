import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Protected = ({ children }) => useSelector((state) => state.auth.isAuthenticated) ? children : <Navigate to="/admin/login" replace />
export default Protected
