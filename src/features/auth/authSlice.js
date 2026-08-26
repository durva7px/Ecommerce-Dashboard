import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: localStorage.getItem('ecom-admin-auth') === 'true' },
  reducers: {
    login: (state) => { state.isAuthenticated = true; localStorage.setItem('ecom-admin-auth', 'true') },
    logout: (state) => { state.isAuthenticated = false; localStorage.removeItem('ecom-admin-auth') },
  },
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer
