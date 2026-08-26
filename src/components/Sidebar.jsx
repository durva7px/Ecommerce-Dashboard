import { Box, Button, Stack, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Logout } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

const Sidebar = ({ links, location, close }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Box className="sidebar">
      <Box className="sidebar-intro">
        <Typography variant="overline">Workspace</Typography>
        <Typography variant="h6">Operations hub</Typography>
      </Box>
      <Stack spacing={0.5}>
        {links.map((item) => (
          <Button key={item.path} component={Link} to={item.path} onClick={close} startIcon={item.icon} className={location.pathname === item.path ? 'nav-active' : ''}>
            {item.label}
          </Button>
        ))}
      </Stack>
      <Box className="sidebar-foot">
        <Typography variant="caption">Data source</Typography>
        <Typography variant="body2">DummyJSON API · live demo</Typography>
        {location.pathname.startsWith('/admin') && (
          <Button startIcon={<Logout />} onClick={() => { dispatch(logout()); navigate('/admin/login') }}>
            Log out
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Sidebar
