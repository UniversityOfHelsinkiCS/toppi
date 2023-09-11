import { Avatar, Box, Button, IconButton, Sheet, Tooltip, Typography } from '@mui/joy'
import { UserParams } from '../../shared/types'
import { handleLogout } from '../util/logout'
import { Logout } from '@mui/icons-material'

export const UserDisplay = ({ user }: { user: UserParams }) => {
  const userInitials = user.email
    .split('@')[0]
    .split('.')
    .map((name) => name[0])
    .join('')
    .toUpperCase()

  return (
    <Sheet
      id="user-display"
      variant="outlined"
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
      <Tooltip title="Kirjaudu ulos">
        <IconButton onClick={handleLogout} variant="plain" size="sm">
          <Logout />
        </IconButton>
      </Tooltip>
    </Sheet>
  )
}
