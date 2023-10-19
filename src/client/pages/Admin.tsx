import React from 'react'
import { Box, Button, Input, Sheet, Typography } from '@mui/joy'
import { privateClient } from '../api'
import { loginAs } from '../util/loginAs'
import { UserParams } from '../../shared/types'

const User = ({ user, handleLoginAs, isFocused }: { user: UserParams; handleLoginAs: (user: UserParams) => void; isFocused: boolean }) => (
  <Sheet sx={{ m: '1rem', p: '1rem' }} variant="soft">
    <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Typography>{user.email}</Typography>
      <Button sx={{ ml: 'auto' }} variant="plain" onClick={() => handleLoginAs(user)}>
        Login as
      </Button>
    </Box>
    <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Typography level="body-sm">{user.roles?.join(', ') ?? 'No roles'}</Typography>
      {isFocused && (
        <Typography sx={{ ml: 'auto' }} level="body-sm">
          Or press enter to log in as
        </Typography>
      )}
    </Box>
  </Sheet>
)

const Admin = () => {
  const [potentialUsers, setPotentialUsers] = React.useState<UserParams[]>([])
  const [focusIndex, setFocusIndex] = React.useState(0)

  const handleChange = async (query: string) => {
    if (query.length < 5) return

    const params = {
      email: query,
    }

    const { data } = await privateClient.get('/users', { params })
    const users = data as UserParams[]

    setPotentialUsers(users)
    setFocusIndex(Math.min(focusIndex, users.length > 0 ? users.length - 1 : 0))
  }

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter' && potentialUsers.length > 0) loginAs(potentialUsers[focusIndex])
    if (event.key === 'ArrowDown') {
      setFocusIndex(Math.min(focusIndex + 1, potentialUsers.length - 1))
      event.preventDefault()
    }
    if (event.key === 'ArrowUp') {
      setFocusIndex(Math.max(focusIndex - 1, 0))
      event.preventDefault()
    }
  }

  return (
    <Box sx={{ p: '1rem' }} onKeyDown={handleKeyPress}>
      <Typography sx={{ mb: '1rem' }}>Login as other users, to act on their behalf or reproduce issues.</Typography>
      <Input sx={{}} placeholder="Search users by email" variant="outlined" onChange={(ev) => handleChange(ev.target.value)} />

      {potentialUsers.map((user, index) => (
        <User key={user.id} user={user} handleLoginAs={loginAs} isFocused={index === focusIndex} />
      ))}
    </Box>
  )
}

export default Admin
