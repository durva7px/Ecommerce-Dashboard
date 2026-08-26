import { Button, Stack } from '@mui/material'

const Pagination = ({ page, total, onChange }) => total > 1 && (
  <Stack direction="row" justifyContent="center" spacing={1} className="pagination">
    {Array.from({ length: total }, (_, index) => <Button key={index} onClick={() => onChange(index + 1)} variant={page === index + 1 ? 'contained' : 'outlined'}>{index + 1}</Button>)}
  </Stack>
)

export default Pagination
