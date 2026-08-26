import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => (
  <Card component={Link} to={`/products/${product.id}`} className="product-card">
    <Box className="product-image"><img src={product.thumbnail || product.image} alt={product.title} /></Box>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center"><Chip size="small" label={product.category} /><Typography className="rating">★ {product.rating}</Typography></Stack>
      <Typography variant="h6">{product.title}</Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="end"><Typography className="price">${product.price}</Typography><Typography variant="caption">{product.stock} in stock</Typography></Stack>
    </CardContent>
  </Card>
)

export default ProductCard
