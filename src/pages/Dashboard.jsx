import { useEffect, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Box, Card, CardContent, Chip, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchProducts } from '../features/products/productsSlice'
import { fetchUsers } from '../features/users/usersSlice'
import { fetchOrders } from '../features/orders/ordersSlice'
import Shell from '../components/Shell'
import navItems from '../components/navItems'
import PageHeader from '../components/PageHeader'
import Status from '../components/Status'
import Stat from '../components/Stat'

const DataProvider = () => {
  const dispatch = useDispatch()
  useEffect(() => { dispatch(fetchProducts()); dispatch(fetchCategories()); dispatch(fetchUsers()); dispatch(fetchOrders()) }, [dispatch])
  return null
}

const Dashboard = ({ admin = false }) => {
  const { items: products, status, error } = useSelector((state) => state.products)
  const users = useSelector((state) => state.users.items)
  const orders = useSelector((state) => state.orders.items)
  const revenue = orders.reduce((sum, order) => sum + order.total, 0)
  const categories = useMemo(() => Object.entries(products.reduce((accumulator, item) => { accumulator[item.category] = (accumulator[item.category] || 0) + 1; return accumulator }, {})).map(([name, value]) => ({ name, value })).slice(0, 6), [products])
  const ratings = useMemo(() => [1, 2, 3, 4, 5].map((rating) => ({ rating: `${rating} star`, count: products.filter((product) => Math.round(product.rating) === rating).length })), [products])
  return <Shell admin={admin} navItems={navItems}><PageHeader eyebrow={admin ? 'Admin control centre' : 'Commerce intelligence'} title={admin ? 'Good morning, admin.' : 'Your store at a glance.'} subtitle="A clear view of the signals that move your business." action={<Chip label="Live data" color="success" variant="outlined" />} /><Status status={status} error={error} retry={() => window.location.reload()} />{status === 'succeeded' && <><Box className="stats-grid"><Stat label="Total products" value={products.length} detail="Across your catalogue" accent /><Stat label="Total users" value={users.length || '—'} detail="Registered customers" /><Stat label="Total orders" value={orders.length || '—'} detail="From live cart data" /><Stat label="Total revenue" value={revenue ? `$${(revenue / 1000).toFixed(1)}k` : '—'} detail="Gross cart value" /></Box><Box className="charts-grid"><Card><CardContent><Typography variant="h6">Products by category</Typography><Typography variant="body2" color="text.secondary">Catalogue mix by department</Typography><Box className="chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={categories}><CartesianGrid vertical={false} stroke="#e8ece7" /><XAxis dataKey="name" tick={{ fontSize: 11 }} tickFormatter={(value) => value.slice(0, 10)} /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="value" fill="#ed684a" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></Box></CardContent></Card><Card><CardContent><Typography variant="h6">Rating distribution</Typography><Typography variant="body2" color="text.secondary">Customer sentiment across products</Typography><Box className="chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={ratings} dataKey="count" nameKey="rating" innerRadius={65} outerRadius={100} paddingAngle={3}>{ratings.map((entry, index) => <Cell key={entry.rating} fill={['#ed684a', '#f49b59', '#f1c75b', '#8db4a4', '#457c7d'][index]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></Box></CardContent></Card></Box></>}</Shell>
}

export { DataProvider }
export default Dashboard
