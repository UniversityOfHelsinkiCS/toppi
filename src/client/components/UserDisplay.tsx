import { Avatar, IconButton, Sheet, Tooltip, Typography } from '@mui/joy'
import { UserParams } from '../../shared/types'
import { handleLogout } from '../util/logout'
import { Logout } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

export const UserDisplay = ({ user }: { user: UserParams }) => {
  const { t } = useTranslation()
  const userInitials = user.email
    .split('@')[0]
    .split('.')
    .map((name) => name[0])
    .join('')
    .toUpperCase()

  return (
    <Sheet
      id="user-display"
      sx={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        mx: '0.5rem',
        p: '0.5rem',
        borderRadius: '2rem',
      }}
    >
      <Avatar size="sm">{userInitials}</Avatar>
      <Typography level="body-sm">{user.email}</Typography>
      <Tooltip title={t('navbar.signout')}>
        <IconButton onClick={handleLogout} variant="plain" size="sm">
          <Logout />
        </IconButton>
      </Tooltip>
    </Sheet>
  )
}
