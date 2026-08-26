import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material'

const Status = ({ status, error, retry }) => {
  if (status === 'loading') return <Box className="state"><CircularProgress size={30} /><Typography>Loading workspace data...</Typography></Box>
  if (status === 'failed') return <Alert severity="error" action={<Button onClick={retry}>Retry</Button>}>{error || 'Something went wrong.'}</Alert>
  return null
}

export default Status
