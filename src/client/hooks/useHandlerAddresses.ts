import React, { useEffect } from "react"
import { getHandlerAddresses } from "../api"
import { HandlerAddress } from "../types"

export const useHandlerAddresses = (query?: { facultyCode?: string, address?: string }) => {

  const [handlerAddresses, setHandlerAddresses] = React.useState<HandlerAddress[]>()

  useEffect(() => {
    getHandlerAddresses(query).then(data => {
      setHandlerAddresses(data)
    })
  }, [query?.facultyCode, query?.address])

  return handlerAddresses
}
