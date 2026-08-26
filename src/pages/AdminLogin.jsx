import { useState } from 'react'
import { Alert, Box, Button, Card, Stack, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'

const AdminLogin = () => { const [username, setUsername] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const dispatch = useDispatch(); const navigate = useNavigate(); return <Box className="login-page"><Card className="login-card"><Typography variant="overline" className="eyebrow">Northstar commerce</Typography><Typography variant="h4">Welcome back.</Typography><Typography color="text.secondary" sx={{ mb: 3 }}>Sign in to the operations hub.</Typography><Stack component="form" spacing={2} onSubmit={(event) => { event.preventDefault(); if (username === 'admin' && password === 'admin123') { dispatch(login()); navigate('/admin/dashboard') } else setError('Incorrect username or password.') }}><TextField label="Username" value={username} onChange={(event) => setUsername(event.target.value)} /><TextField label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />{error && <Alert severity="error">{error}</Alert>}<Button type="submit" variant="contained" size="large">Sign in</Button><Button component={Link} to="/">Return to overview</Button></Stack></Card></Box> }
export default AdminLogin
