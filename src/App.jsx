import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Dashboard, { DataProvider } from './pages/Dashboard'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import AdminLogin from './pages/AdminLogin'
import AdminProducts from './pages/AdminProducts'
import Users from './pages/Users'
import Orders from './pages/Orders'
import Protected from './pages/Protected'
import './App.css'

const theme = createTheme({ palette: { primary: { main: '#ed684a' }, secondary: { main: '#24424a' }, background: { default: '#f5f6f2', paper: '#fff' }, text: { primary: '#203237', secondary: '#6d7d7e' } }, typography: { fontFamily: '"DM Sans", sans-serif', h4: { fontFamily: '"Fraunces", serif', fontWeight: 700 }, h5: { fontFamily: '"Fraunces", serif', fontWeight: 700 } }, shape: { borderRadius: 12 } })

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <DataProvider />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Protected><Dashboard admin /></Protected>} />
        <Route path="/admin/products" element={<Protected><AdminProducts /></Protected>} />
        <Route path="/admin/users" element={<Protected><Users /></Protected>} />
        <Route path="/admin/orders" element={<Protected><Orders /></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
