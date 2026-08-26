import { useState } from 'react'
import { AppBar, Avatar, Box, Chip, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

const Shell = ({ children, admin = false, navItems }) => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const links = admin ? navItems.slice(2) : navItems.slice(0, 2)

  return (
    <Box className="app-shell">
      <AppBar position="fixed" className="topbar">
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(true)} className="mobile-menu"><Menu /></IconButton>
          <Typography className="brand">NORTHSTAR <span>COMMERCE</span></Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Chip avatar={<Avatar>AD</Avatar>} label="Admin account" variant="outlined" className="account-chip" />
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => setOpen(false)} className="drawer">
        <Sidebar links={links} location={location} close={() => setOpen(false)} />
      </Drawer>
      <Box className="sidebar-desktop"><Sidebar links={links} location={location} /></Box>
      <Box component="main" className="main-content">{children}</Box>
    </Box>
  )
}

export default Shell
