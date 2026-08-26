import { Paper, Typography } from '@mui/material'

const Empty = ({ text }) => <Paper className="empty"><Typography variant="h6">{text}</Typography><Typography color="text.secondary">Try adjusting your filters.</Typography></Paper>

export default Empty
