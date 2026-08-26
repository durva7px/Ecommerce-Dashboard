import { Assessment, Inventory2, People, ReceiptLong, Settings, TrendingUp } from '@mui/icons-material'

const navItems = [
  { label: 'Overview', path: '/', icon: <Assessment /> },
  { label: 'Products', path: '/products', icon: <Inventory2 /> },
  { label: 'Admin dashboard', path: '/admin/dashboard', icon: <TrendingUp /> },
  { label: 'Product management', path: '/admin/products', icon: <Settings /> },
  { label: 'Users · in progress', path: '/admin/users', icon: <People /> },
  { label: 'Orders · in progress', path: '/admin/orders', icon: <ReceiptLong /> },
]

export default navItems
