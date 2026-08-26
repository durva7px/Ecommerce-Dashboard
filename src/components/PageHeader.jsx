import { Box, Typography } from '@mui/material'

const PageHeader = ({ eyebrow, title, subtitle, action }) => (
  <Box className="page-header"><Box><Typography variant="overline" className="eyebrow">{eyebrow}</Typography><Typography variant="h4">{title}</Typography>{subtitle && <Typography color="text.secondary">{subtitle}</Typography>}</Box>{action}</Box>
)

export default PageHeader
