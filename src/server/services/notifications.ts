import { ContractRequest, HandlerAddress } from "../db/models";

export const notifyOnContractRequest = async (contractRequest: ContractRequest) => {
  const facultyCode = contractRequest.data.formData.faculty
  if (!facultyCode) {
    console.log("Faculty code missing for CR. No notifications will be sent")
  }

  const handlerAddresses = await HandlerAddress.findAll({
    where: {
      facultyCode
    }
  })

  // Send mail to each...
  handlerAddresses.forEach(address => {
    console.log(`Sending notification to ${address.getFullAddress()}`)
  })
}
