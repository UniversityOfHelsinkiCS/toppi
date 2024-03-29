import React from 'react'
import { Accordion, AccordionDetails, AccordionGroup, AccordionSummary, Box, Button, Input, Sheet, Typography } from '@mui/joy'
import { privateClient } from '../api'
import { loginAs } from '../util/loginAs'
import { UserData, nameOfRole } from '../../shared/types'
import { useQuery } from '@tanstack/react-query'
import { DataTable, TableItem } from '../components/CustomTable'

const UserDetails = ({ userDetails }: { userDetails: UserData }) => {
  return (
    <DataTable>
      <tbody>
        <TableItem label="roles" value={'' + userDetails.roles?.map(nameOfRole).join(', ')} />
        <TableItem label="iam groups" value={'' + userDetails.iamGroups?.join(', ')} />
        <TableItem label="first logged in" value={'' + String(userDetails?.createdAt)} />
      </tbody>
    </DataTable>
  )
}

const User = ({ user, handleLoginAs, isFocused }: { user: UserData; handleLoginAs: (user: UserData) => void; isFocused: boolean }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const { data: userDetails, isPending } = useQuery<UserData>({
    queryKey: ['userDetails', user.id],
    queryFn: () => privateClient.get(`/users/${user.id}`).then((res) => res.data),
    enabled: isOpen,
  })

  return (
    <Sheet sx={{ m: '1rem', p: '1rem' }} variant="soft">
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Typography>{user.email}</Typography>
        <Button sx={{ ml: 'auto' }} variant="plain" onClick={() => handleLoginAs(user)}>
          Login as
        </Button>
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
        <AccordionGroup sx={{ flex: 0.7 }}>
          <Accordion onChange={(_ev, expanded) => setIsOpen(expanded)} expanded={isOpen}>
            <AccordionSummary>Details</AccordionSummary>
            <AccordionDetails>
              <Box>{isPending || !userDetails ? 'Loading...' : <UserDetails userDetails={userDetails} />}</Box>
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
        {isFocused && (
          <Typography sx={{ ml: 'auto' }} level="body-sm">
            Or press enter to log in as
          </Typography>
        )}
      </Box>
    </Sheet>
  )
}

const Admin = () => {
  const { data: users, isPending } = useQuery<UserData[]>({
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
      {search.length > 3 && filteredUsers.length === 0 && <Typography sx={{ mt: '1rem' }}>No users found. Maybe they have not logged into Toppi.</Typography>}
    </Box>
  )
}

export default Admin
