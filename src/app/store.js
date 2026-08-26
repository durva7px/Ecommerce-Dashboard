import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
import usersReducer from '../features/users/usersSlice'
import ordersReducer from '../features/orders/ordersSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    users: usersReducer,
    orders: ordersReducer,
    auth: authReducer,
  },
})
