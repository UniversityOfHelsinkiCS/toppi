import dayjs from "dayjs"
import { z } from "zod"

export const contractRequestStatuses = ["waiting", "assigned", "checked", "handled", "rejected"] as const
export const ContractRequestStatusEnum = z.enum(contractRequestStatuses)
export type ContractRequestStatus = z.infer<typeof ContractRequestStatusEnum>

export const contractDurationOptions = ["recommended", "custom"] as const
export const ContractDurationOptionsEnum = z.enum(contractDurationOptions)
export type ContractDurationOption = z.infer<typeof ContractDurationOptionsEnum>

/**
 * Validates YYYY-MM-DD using dayjs
 */
export const zDate = z.custom<string>((dateString) => typeof dateString === "string" && dayjs(dateString, "YYYY-MM-DD", true).isValid())

export const ContractRequestFormParams = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  birthDate: zDate,
  courseName: z.string(),
  courseStartDate: zDate,
  courseEndDate: zDate,
  contractDuration: ContractDurationOptionsEnum,
  contractStartDate: zDate.optional(),
  contractEndDate: zDate.optional(),
})

export const UserParamsValidator = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
})

export type UserParams = z.infer<typeof UserParamsValidator>

export interface ShibbolethHeaders {
  hypersonsisuid?: string
  givenname?: string
  sn?: string
  mail?: string
  hygroupcn?: string
}
