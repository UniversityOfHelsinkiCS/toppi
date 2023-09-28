import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useLoaderData, useMatch } from 'react-router-dom'
import { UserParams, UserRoles } from '../../shared/types'
import { Box, Button, Dropdown, IconButton, Link, Menu, MenuButton, MenuItem, Sheet, Typography } from '@mui/joy'
import { inStaging } from '../../config'
import { hasRight } from '../../shared/authorizationUtils'
import { Language, Login } from '@mui/icons-material'
import { handleLogin } from '../util/login'
import hyLogo from '../assets/hy_logo.svg'
import { UserDisplay } from './UserDisplay'

const LanguageSelect = () => {
  const { i18n } = useTranslation()

  return (
    <Box display="flex" alignItems="center">
      <Dropdown>
        <MenuButton startDecorator={<Language />} slotProps={{ root: { variant: 'plain' } }} slots={{ root: IconButton }}>
          {i18n.language.toUpperCase()}
        </MenuButton>
        <Menu>
          <MenuItem onClick={() => i18n.changeLanguage('fi')}>Suomi (FI)</MenuItem>
          <MenuItem onClick={() => i18n.changeLanguage('en')}>English (EN)</MenuItem>
        </Menu>
      </Dropdown>
    </Box>
  )
}

const Navlink = ({ to, label }: { to: string; label: string }) => {
  const isActive = useMatch(to)

  return (
    <Box
      sx={{
        borderBottom: (theme) => `solid 2px ${isActive ? theme.vars.palette.primary.outlinedBorder : 'transparent'}`,
        '&:hover': {
          borderBottom: (theme) => `solid 2px ${theme.vars.palette.primary.outlinedBorder}`,
        },
      }}
    >
      <Link
        component={RouterLink}
        to={to}
        sx={{
          p: '0.5rem',
          px: '1rem',
          textDecorationColor: 'transparent',
        }}
      >
        <Typography
          level="body-lg"
          sx={{
            '&:hover': {
              color: (theme) => theme.vars.palette.primary.outlinedColor,
            },
            color: (theme) => (isActive ? theme.vars.palette.primary.outlinedColor : theme.vars.palette.text.tertiary),
            fontWeight: isActive ? 'bold' : 'normal',
          }}
        >
          {label}
        </Typography>
      </Link>
    </Box>
  )
}

export const Navbar = () => {
  const { t } = useTranslation()
  const user = useLoaderData() as UserParams | undefined

  return (
    <Sheet
      sx={{
        px: '1rem',
        pt: '1rem',
        mb: '4rem',
        borderRadius: '1rem',
      }}
    >
      <Box
        sx={{
          columnGap: '1rem',
          alignItems: 'center',
          display: 'flex',
          pb: '1rem',
        }}
      >
        <RouterLink to={user ? '/private' : '/'} style={{ textDecoration: 'none' }}>
          <Box display="flex" alignItems="center" columnGap="1rem">
            <Box width="2rem">
              <img src={hyLogo} alt="hy logo" />
            </Box>
            <Typography>TOPPI</Typography>
          </Box>
        </RouterLink>
        <Typography level="body-sm" sx={{ userSelect: 'none', mr: 'auto' }}>
          {t('navbar.description')}
        </Typography>
        {inStaging && <Typography sx={{ ml: '1rem' }}>STAGING</Typography>}
        <LanguageSelect />
        {user ? (
          <UserDisplay user={user} />
        ) : (
          <Button onClick={handleLogin} variant="soft" size="sm" endDecorator={<Login />}>
            {t('navbar.signin')}
          </Button>
        )}
      </Box>
      {user && (
        <Box display="flex" justifyContent="center" width="100%" pt="1rem" gap="1rem">
          <Navlink to="/private" label={t('navbar.frontPage')} />
          <Navlink to="/private/contract-requests" label={t('navbar.contractRequests')} />
          {hasRight(user, UserRoles.Admin) && <Navlink to="/private/handler-addresses" label={t('navbar.handlerAddresses')} />}
        </Box>
      )}
    </Sheet>
  )
}
