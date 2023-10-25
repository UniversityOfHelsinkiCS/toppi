import { Box, Button, Typography } from '@mui/joy'
import { useEffect } from 'react'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'
import * as Sentry from '@sentry/browser'
import { useTranslation } from 'react-i18next'
import { handleLogin } from './util/login'
import { useCurrentUser } from './hooks/useCurrentUser'
import { AxiosError } from 'axios'

export const Error = () => {
  const { t } = useTranslation()
  const user = useCurrentUser()
  const error = useRouteError() as any
  const navigate = useNavigate()

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      console.log('Route error: ', error)
      if (error.status === 401) {
        handleLogin()
        return
      }
    } else if (error instanceof AxiosError) {
      console.log('Axios error: ', error)
      if (error.response?.status === 401) {
        handleLogin()
        return
      }
    } else {
      console.log('Unknown error: ', error)
      Sentry.captureException(error)
    }
  }, [error, user])

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <Box p="2rem">
        <Typography level="title-md">{t('common.unknownError')}</Typography>
        <Typography>{error.statusText}</Typography>
        <Typography sx={{ py: '1rem', mb: '2rem' }}>{error.response?.statusText || error.message}</Typography>
        <Button variant="soft" sx={{ my: '1rem' }} onClick={() => navigate(-1)}>
          {t('common.goBack')}
        </Button>
        <Typography level="body-md">{t('common.details')}:</Typography>
        {error.response && error.response.data && (
          <Typography level="body-sm" fontFamily="monospace" whiteSpace="pre-wrap" variant="outlined" p="1rem">
            {JSON.stringify(error.response.data, null, 2)}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
