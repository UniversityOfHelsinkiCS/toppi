import React from 'react'
import { Box, Button, Input, Sheet, Typography } from '@mui/joy'
import { privateClient } from '../api'
import { loginAs } from '../util/loginAs'
import { UserParams } from '../../shared/types'
import { useQuery } from '@tanstack/react-query'

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
  const { data: users, isPending } = useQuery<UserParams[]>({
    queryKey: ['users'],
    queryFn: () => privateClient.get('/users').then((res) => res.data),
  })
  const [search, setSearch] = React.useState('')
  const [focusIndex, setFocusIndex] = React.useState(0)

  const filteredUsers = React.useMemo(() => {
    if (!users) return []
    return users.filter((user) => user.email.includes(search))
  }, [users, search])

  const handleKeyPress = (event: any) => {
    if (isPending || !users) return
    if (event.key === 'Enter' && users.length > 0) loginAs(users[focusIndex])
    if (event.key === 'ArrowDown') {
      setFocusIndex(Math.min(focusIndex + 1, users.length - 1))
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
      <Input sx={{}} placeholder="Search users by email" variant="outlined" onChange={(ev) => setSearch(ev.target.value)} />
      {filteredUsers.map((user, index) => (
        <User key={user.id} user={user} handleLoginAs={loginAs} isFocused={index === focusIndex} />
      ))}
    </Box>
  )
}

export default Admin
