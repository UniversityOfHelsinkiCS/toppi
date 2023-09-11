import { Box, Button, Typography } from '@mui/joy'
import { useEffect } from 'react'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import * as Sentry from '@sentry/browser'

export const Error = () => {
  const error = useRouteError() as any
  const navigate = useNavigate()

  console.error(error)

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      Sentry.captureException(error.error)
    } else {
      Sentry.captureException(error)
    }
  }, [error])

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <Box p="2rem">
        <Typography level="title-md">something went wrong ._.</Typography>
        <Typography>{error.statusText}</Typography>
        <Typography sx={{ py: '1rem', mb: '2rem' }}>{error.response?.statusText || error.message}</Typography>
        <Button variant="soft" sx={{ my: '1rem' }} onClick={() => navigate(-1)}>
          Go back...
        </Button>
        <Typography level="body-md">Details:</Typography>
        {error.response && error.response.data && (
          <Typography level="body-sm" fontFamily="monospace" whiteSpace="pre-wrap" variant="outlined" p="1rem">
            {JSON.stringify(error.response.data, null, 2)}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
