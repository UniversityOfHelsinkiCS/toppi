import { Box, Button, IconButton, Input } from '@mui/joy'
import React, { useEffect } from 'react'
import { deleteHandlerAddress, postHandlerAddress } from '../api'
import { DataTable } from '../components/CustomTable'
import { HandlerAddress } from '../types'
import { useOrganisationUnits } from '../hooks/useFaculties'
import { toast } from 'sonner'
import { useLoaderData } from 'react-router-dom'
import { z } from 'zod'
import { HandlerAddressChip, SmallHelsinkiFi } from '../components/common'
import { Add } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'

const validator = z.string().email()
const validateAddress = (address: string, addresses: HandlerAddress[]) => {
  if (address.length < 3) return false
  try {
    validator.parse(`${address}@helsinki.fi`)
  } catch (e) {
    return false
  }
  if (addresses.some((a) => a.address === address)) return false
  return true
}

const Row = ({
  addresses,
  onAdd,
  onDelete,
  open,
  setOpen,
}: {
  addresses: HandlerAddress[]
  onAdd: (address: string) => Promise<void>
  onDelete: (address: HandlerAddress) => Promise<void>
  open: boolean
  setOpen: () => void
}) => {
  const { t } = useTranslation()
  const [address, setAddress] = React.useState('')
  const [isPending, setIsPending] = React.useState(false)

  const isValidAddress = () => {
    return validateAddress(address, addresses)
  }

  return (
    <Box p="0.5rem" display="flex" alignItems="center" gap="0.5rem" flexWrap="wrap">
      {addresses?.map((address) => (
        <Box key={address.id}>
          <HandlerAddressChip address={address} onDelete={onDelete} />
        </Box>
      ))}
      <Box display="flex" gap="0.5rem">
        {open && (
          <>
            <Input
              value={address}
              onChange={(ev) => setAddress(ev.target.value.toLowerCase())}
              placeholder={t('handlerAddresses.newAddress')}
              endDecorator={<SmallHelsinkiFi />}
              variant="soft"
              size="sm"
            />
            <Button
              onClick={async () => {
                setIsPending(true)
                await onAdd(address)
                setIsPending(false)
                setAddress('')
              }}
              loading={isPending}
              disabled={!isValidAddress()}
              size="sm"
            >
              {t('common.add')}
            </Button>
          </>
        )}
        {!open && (
          <IconButton onClick={setOpen} size="sm" variant={addresses?.length === 0 ? 'solid' : 'plain'}>
            <Add />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}

const HandlerAddressess = () => {
  const { t } = useTranslation()
  const [openFaculty, setOpenFaculty] = React.useState<string | null>(null)
  const organisations = useOrganisationUnits()
  const handlerAddressList = useLoaderData() as HandlerAddress[]

  const [handlerAddresses, setHandlerAddresses] = React.useState<{ [code: string]: HandlerAddress[] }>({})
  useEffect(() => {
    if (!organisations || Object.keys(handlerAddresses).length !== 0) return

    const newHandlerAddresses: { [code: string]: HandlerAddress[] } = {}

    organisations.forEach((f) => {
      newHandlerAddresses[f.code] = []
    })
    handlerAddressList.forEach((adress) => {
      newHandlerAddresses[adress.facultyCode].push(adress)
    })
    setHandlerAddresses(newHandlerAddresses)
  }, [organisations])

  const handleAddAddress = async (facultyCode: string, address: string) => {
    const res = (await postHandlerAddress({ facultyCode, address })) as HandlerAddress
    toast.success(`${t('common.added')}: ${res.address}`)
    setHandlerAddresses({
      ...handlerAddresses,
      [res.facultyCode]: [...handlerAddresses[res.facultyCode], res],
    })
  }

  const handleDeleteAddress = async (facultyCode: string, address: HandlerAddress) => {
    if (!window.confirm(t('handlerAddresses.removeConfirm', { address: address.address, facultyCode }))) return
    await deleteHandlerAddress(address.id)
    toast.success(`${t('common.removed')}: ${address.address}`)
    setHandlerAddresses({
      ...handlerAddresses,
      [facultyCode]: handlerAddresses[facultyCode].filter((a) => a.id !== address.id),
    })
  }

  return (
    <Box p="2rem">
      <Box display="flex">
        <DataTable>
          <thead>
            <tr>
              <th>{t('common.facultyShort')}</th>
              <th>{t('common.addresses')}</th>
            </tr>
          </thead>
          <tbody>
            {organisations &&
              organisations.map((faculty) => (
                <tr key={faculty.code}>
                  <td>{faculty.name['fi']}</td>
                  <td>
                    <Row
                      open={faculty.code === openFaculty}
                      setOpen={() => setOpenFaculty(faculty.code)}
                      addresses={handlerAddresses[faculty.code]}
                      onAdd={(address) => handleAddAddress(faculty.code, address)}
                      onDelete={(address) => handleDeleteAddress(faculty.code, address)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </DataTable>
      </Box>
    </Box>
  )
}

export default HandlerAddressess
