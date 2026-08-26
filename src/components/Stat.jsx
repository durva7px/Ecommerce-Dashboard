import { Card, CardContent, Typography } from '@mui/material'

const Stat = ({ label, value, detail, accent = false }) => (
  <Card className={`stat-card ${accent ? 'stat-accent' : ''}`}>
    <CardContent><Typography variant="overline">{label}</Typography><Typography variant="h4">{value}</Typography><Typography variant="body2">{detail}</Typography></CardContent>
  </Card>
)

export default Stat
