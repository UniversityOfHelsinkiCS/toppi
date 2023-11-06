import { Box, Container, Typography } from '@mui/joy'
import { useTranslation } from 'react-i18next'

export const Ingress = () => {
  const { t } = useTranslation()

  return (
    <Container
      sx={{
        display: 'flex',
        mb: '4rem',
      }}
    >
      <Box sx={{}}>
        <Typography
          level="body-xs"
          sx={{
            mb: '1rem',
          }}
        >
          {t('ingress.title')}
        </Typography>
        <Typography
          sx={{
            whiteSpace: 'pre-line',
          }}
        >
          {t('ingress.text')}
        </Typography>
      </Box>
    </Container>
  )
}
