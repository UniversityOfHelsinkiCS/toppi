import dayjs from "dayjs"
import { z } from "zod"

export const contractRequestStatuses = ["waiting", "handled", "rejected"] as const
export const ContractRequestStatusEnum = z.enum(contractRequestStatuses)
export type ContractRequestStatus = z.infer<typeof ContractRequestStatusEnum>

export const contractDurationOptions = ["recommended", "custom"] as const
export const ContractDurationOptionsEnum = z.enum(contractDurationOptions)
export type ContractDurationOption = z.infer<typeof ContractDurationOptionsEnum>

/**
 * Validates YYYY-MM-DD using dayjs
 */
export const zDate = z.custom<string>((dateString) => typeof dateString === "string" && dayjs(dateString, "YYYY-MM-DD", true).isValid())

export const ContractRequestFormParamsValidator = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  birthDate: zDate,
  faculty: z.string().optional(),
  programme: z.string().optional(),
  courseName: z.string(),
  courseStartDate: zDate,
  courseEndDate: zDate,
  contractDuration: ContractDurationOptionsEnum,
  contractStartDate: zDate.optional(),
  contractEndDate: zDate.optional(),
  additionalInfo: z.string().optional(),
})

export type ContractRequestFormParams = z.infer<typeof ContractRequestFormParamsValidator>

export const UserParamsValidator = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: zDate.optional(),
  email: z.string().email(),
  iamGroups: z.array(z.string()).optional(),
})

export type UserParams = z.infer<typeof UserParamsValidator>

export const OptionValidator = z.object({
  label: z.string(),
  value: z.number(),
})

export const CalculatorParamsValidator = z.object({
  teachingHours: z.number().optional(),
  courseType: OptionValidator.optional(),
  credits: OptionValidator.optional(),
  studentCount: OptionValidator.optional(),
  hourlyRate: z.number().optional(),
  preparationHours: z.number().optional(),
  totalHours: z.number().optional(),
  salary: z.number().optional(),
})

export type CalculatorParams = z.infer<typeof CalculatorParamsValidator>

export const ContractRequestParamsValidator = z.object({
  calculatorData: CalculatorParamsValidator,
  formData: ContractRequestFormParamsValidator
})

export type ContractRequestParams = z.infer<typeof ContractRequestParamsValidator>

export interface ShibbolethHeaders {
  hypersonsisuid?: string
  givenname?: string
  sn?: string
  mail?: string
  hygroupcn?: string
  schacdateofbirth?: string
  shib_logout_url?: string
  "x-admin-logged-in-as"?: string
}

export type Locale = {
  fi: string
  en: string
  sv: string
}

export type Programme = {
  key: string
  name: Locale
  level: string
  companionFaculties: Array<string>
  international: boolean
}

export interface OrganisationData {
  code: string
  name: Locale
  programmes: Array<Programme>
}

export const specialGroups = ["kosu", "superAdmin"] as const
export type SpecialGroup = typeof specialGroups[number]

export type UserOrganisationAccess = {
  specialGroup?: {
    [group in SpecialGroup]?: boolean
  }
} & {
  [code: string]: {
    read: boolean,
    write: boolean,
    admin: boolean,
  },
}

/**
 * Higher gives access to lower
 */
export const UserRoles = {
  AdUser: 0,
  Faculty: 1,
  University: 2,
  Admin: 3,
} as const

export type UserRole = typeof UserRoles[keyof typeof UserRoles]
