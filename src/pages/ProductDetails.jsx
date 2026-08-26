import { useEffect } from 'react'
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct } from '../features/products/productsSlice'
import Shell from '../components/Shell'
import navItems from '../components/navItems'
import Status from '../components/Status'

const ProductDetails = () => { const { id } = useParams(); const dispatch = useDispatch(); const { selected, detailStatus, error } = useSelector((state) => state.products); useEffect(() => { dispatch(fetchProduct(id)) }, [dispatch, id]); return <Shell navItems={navItems}><Button component={Link} to="/products" startIcon={<ArrowBack />} className="back-button">Back to products</Button><Status status={detailStatus} error={error} retry={() => dispatch(fetchProduct(id))} />{detailStatus === 'succeeded' && selected && <Box className="detail-layout"><Box className="detail-gallery">{(selected.images || [selected.thumbnail]).slice(0, 4).map((image) => <img key={image} src={image} alt={selected.title} />)}</Box><Box><Chip label={selected.category} /><Typography variant="h4" sx={{ mt: 2 }}>{selected.title}</Typography><Typography color="text.secondary" sx={{ my: 2 }}>{selected.description}</Typography><Typography className="detail-price">${selected.price}</Typography><Stack direction="row" spacing={1} sx={{ my: 2 }}><Chip label={`★ ${selected.rating} rating`} /><Chip label={`${selected.stock} in stock`} variant="outlined" /></Stack><Divider sx={{ my: 3 }} /><Stack spacing={1}><Typography><b>Brand</b> {selected.brand || 'Northstar private label'}</Typography><Typography><b>Discount</b> {selected.discountPercentage}%</Typography><Typography><b>SKU</b> NS-{selected.id.toString().padStart(4, '0')}</Typography></Stack></Box></Box>}</Shell> }
export default ProductDetails
