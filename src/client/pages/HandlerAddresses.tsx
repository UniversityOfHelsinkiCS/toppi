import { Box, Button, Input } from "@mui/joy"
import React, { useEffect } from "react"
import { deleteHandlerAddress, postHandlerAddress } from "../api"
import { DataTable } from "../components/CustomTable"
import { HandlerAddress } from "../types"
import { useFaculties } from "../hooks/useFaculties"
import { toast } from "sonner"
import { useLoaderData } from "react-router-dom"
import { z } from "zod"
import { HandlerAddressChip, SmallHelsinkiFi } from "../components/common"

const validator = z.string().email()
const validateAddress = (address: string, addresses: HandlerAddress[]) => {
  if (address.length < 3) return false
  try {
    validator.parse(`${address}@helsinki.fi`)
  } catch (e) { 
    return false
  }
  if (addresses.some(a => a.address === address)) return false
  return true
}


const Row = ({ addresses, onAdd, onDelete }: { addresses: HandlerAddress[], onAdd: (address: string) => Promise<void>, onDelete: (address: HandlerAddress) => Promise<void> }) => {
  const [address, setAddress] = React.useState("")
  const [isPending, setIsPending] = React.useState(false)

  const isValidAddress = () => {
    return validateAddress(address, addresses)
  } 

  return (
    <Box p="0.5rem" display="flex" alignItems="center" gap="0.5rem" flexWrap="wrap">
      {addresses?.map(address => (
        <Box key={address.id}>
          <HandlerAddressChip address={address} onDelete={onDelete} />
        </Box>
      ))}
      <Box display="flex" gap="0.5rem">
        <Input value={address} onChange={ev => setAddress(ev.target.value.toLowerCase())} placeholder="Uusi käsittelijän osoite/IAM" endDecorator={<SmallHelsinkiFi />} variant="soft"/>
        <Button onClick={async () => {
            setIsPending(true)
            await onAdd(address)
            setIsPending(false)
            setAddress("")
          }} 
          loading={isPending}
          disabled={!isValidAddress()}  
        >
          Lisää
        </Button>
      </Box>
    </Box>
  )
}

const HandlerAddressess = () => {
  const faculties = useFaculties()
  const handlerAddressList = useLoaderData() as HandlerAddress[]

  const [handlerAddresses, setHandlerAddresses] = React.useState<{ [code: string]: HandlerAddress[] }>({})
  useEffect(() => {
    if (!faculties || Object.keys(handlerAddresses).length !== 0) return;

    const newHandlerAddresses: { [code: string]: HandlerAddress[] } = {}

    faculties.forEach(f => {
      newHandlerAddresses[f.code] = []
    })
    handlerAddressList.forEach(adress => {
      newHandlerAddresses[adress.facultyCode].push(adress)
    })
    setHandlerAddresses(newHandlerAddresses)

  }, [faculties])

  const handleAddAddress = async (facultyCode: string, address: string) => {
    const res = await postHandlerAddress({ facultyCode, address }) as HandlerAddress
    toast.success(`Lisätty: ${res.address}`)
    setHandlerAddresses({
      ...handlerAddresses,
      [res.facultyCode]: [...handlerAddresses[res.facultyCode], res]
    })
  }

  const handleDeleteAddress = async (facultyCode: string, address: HandlerAddress) => {
    await deleteHandlerAddress(address.id)
    toast.success(`Poistettu: ${address.address}`)
    setHandlerAddresses({
      ...handlerAddresses,
      [facultyCode]: handlerAddresses[facultyCode].filter(a => a.id !== address.id)
    })
  }

  return (
    <Box p="2rem">
      <Box display="flex">
        <DataTable>
          <thead>
            <tr>
              <th>TDK</th><th>Osoitteet</th>
            </tr>
          </thead>
          <tbody>
            {faculties && faculties.map(faculty => (
              <tr key={faculty.code}>
                <td>{faculty.name['fi']}</td>
                <td><Row addresses={handlerAddresses[faculty.code]} onAdd={(address) => handleAddAddress(faculty.code, address)} onDelete={(address) => handleDeleteAddress(faculty.code, address)}/></td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </Box>
    </Box>
  )
}

export default HandlerAddressess
