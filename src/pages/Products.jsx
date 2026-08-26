import { useMemo, useState } from 'react'
import { InputAdornment, MenuItem, Box, Select, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../features/products/productsSlice'
import Shell from '../components/Shell'
import navItems from '../components/navItems'
import PageHeader from '../components/PageHeader'
import Status from '../components/Status'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import Empty from '../components/Empty'

const Products = () => {
  const dispatch = useDispatch(); const { items, categories, status, error } = useSelector((state) => state.products)
  const [query, setQuery] = useState(''); const [category, setCategory] = useState('all'); const [sort, setSort] = useState(''); const [page, setPage] = useState(1)
  const filtered = useMemo(() => items.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()) && (category === 'all' || product.category === category)).sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : sort === 'rating-desc' ? b.rating - a.rating : sort === 'rating-asc' ? a.rating - b.rating : 0), [items, query, category, sort])
  const shown = filtered.slice((page - 1) * 12, page * 12)
  return <Shell navItems={navItems}><PageHeader eyebrow="Catalogue" title="Products" subtitle={`${filtered.length} products in view`} /><Box className="toolbar"><TextField size="small" placeholder="Search products" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> } }} /><Select size="small" value={category} onChange={(event) => setCategory(event.target.value)}><MenuItem value="all">All categories</MenuItem>{categories.map((item) => <MenuItem key={item} value={item}>{item}</MenuItem>)}</Select><Select size="small" displayEmpty value={sort} onChange={(event) => setSort(event.target.value)}><MenuItem value="">Sort products</MenuItem><MenuItem value="price-asc">Price: low to high</MenuItem><MenuItem value="price-desc">Price: high to low</MenuItem><MenuItem value="rating-desc">Rating: high to low</MenuItem><MenuItem value="rating-asc">Rating: low to high</MenuItem></Select></Box><Status status={status} error={error} retry={() => dispatch(fetchProducts())} />{status === 'succeeded' && <>{shown.length ? <Box className="product-grid">{shown.map((product) => <ProductCard key={product.id} product={product} />)}</Box> : <Empty text="No products found." />}<Pagination page={page} total={Math.ceil(filtered.length / 12)} onChange={setPage} /></>}</Shell>
}
export default Products
