import React from 'react'

import { Button, Sheet, Typography } from '@mui/joy'
import { UserParams } from '../../shared/types'

const AdminLoggedInAsBanner = () => {
  const [user, setUser] = React.useState<UserParams>()

  React.useEffect(() => {
    const loggedInAs = localStorage.getItem('toppi-admin-logged-in-as')
    if (!loggedInAs) return

    setUser(JSON.parse(loggedInAs) as UserParams)
  }, [])

  const handleClick = () => {
    localStorage.removeItem('toppi-admin-logged-in-as')
    window.location.reload()
  }

  if (!user) return null

  return (
    <Sheet
      sx={{
        position: 'sticky',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        p: '1rem',
        zIndex: 10,
      }}
      variant="soft"
      color="warning"
    >
      <Typography textColor="warning.lightChannel">Logged in as {user.email}</Typography>
      <Button onClick={handleClick} sx={{ ml: 'auto' }}>
        Return to yourself
      </Button>
    </Sheet>
  )
}

export default AdminLoggedInAsBanner
