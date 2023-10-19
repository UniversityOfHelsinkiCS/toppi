import dayjs from 'dayjs'
import { z } from 'zod'

export const contractRequestStatuses = ['waiting', 'handled', 'rejected'] as const
export const ContractRequestStatusEnum = z.enum(contractRequestStatuses)
export type ContractRequestStatus = z.infer<typeof ContractRequestStatusEnum>

export const contractDurationOptions = ['recommended', 'custom'] as const
export const ContractDurationOptionsEnum = z.enum(contractDurationOptions)
export type ContractDurationOption = z.infer<typeof ContractDurationOptionsEnum>

/**
 * Validates YYYY-MM-DD using dayjs
 */
export const zDate = z.custom<string>((dateString) => typeof dateString === 'string' && dayjs(dateString, 'YYYY-MM-DD', true).isValid())

export const ContractRequestFormParamsValidator = z
  .object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.string().email(),
    birthDate: zDate,
    faculty: z.string().nonempty(),
    programme: z.string().optional(),
    courseName: z.string().nonempty(),
    courseStartDate: zDate,
    courseEndDate: zDate,
    contractDuration: ContractDurationOptionsEnum,
    contractStartDate: zDate,
    contractEndDate: zDate,
    additionalInfo: z.string().optional(),
  })
  .superRefine((form, ctx) => {
    if (dayjs(form.courseStartDate).isAfter(dayjs(form.courseEndDate))) {
      ctx.addIssue({
        code: 'custom',
        path: ['courseEndDate'],
        message: 'mustBeAfter',
      })
      ctx.addIssue({
        code: 'custom',
        path: ['courseStartDate'],
        message: 'mustBeBefore',
      })
    }

    if (dayjs(form.contractStartDate).isAfter(dayjs(form.contractEndDate))) {
      ctx.addIssue({
        code: 'custom',
        path: ['contractEndDate'],
        message: 'mustBeAfter',
      })
      ctx.addIssue({
        code: 'custom',
        path: ['contractStartDate'],
        message: 'mustBeBefore',
      })
    }
  })

export type ContractRequestFormParams = z.infer<typeof ContractRequestFormParamsValidator>

export const UserParamsValidator = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: zDate.optional(),
  email: z.string().email(),
  iamGroups: z.array(z.string()).optional(),
  newUser: z.boolean().optional(),
})

export type UserParams = z.infer<typeof UserParamsValidator> & { roles?: UserRole[] }
export type UserData = UserParams & { createdAt?: string | Date; updatedAt?: string | Date }

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
  formData: ContractRequestFormParamsValidator,
})

export type ContractRequestParams = z.infer<typeof ContractRequestParamsValidator>

export interface CustomHeaders {
  'x-admin-logged-in-as'?: string
}

export type Locale = {
  fi: string
  en: string
  sv?: string
}

export const specialOrganisationCodes = ['doctoral', 'testers'] as const

/**
 * Represent an organisation that handles contract requests in toppi.
 * These are: faculties, and custom orgs such as the doctoral schools org
 */
export type OrganisationUnit = {
  code: string
  name: Locale
  programmes?: Array<Programme>
}

export type Faculty = OrganisationUnit & {
  programmes: Array<Programme>
}

export type SpecialOrganisation = OrganisationUnit & {
  code: (typeof specialOrganisationCodes)[number]
}

export type Programme = {
  key: string
  name: Locale
  level: 'bachelor' | 'master' | 'doctoral'
  companionFaculties: Array<string>
  international: boolean
}

export const specialGroups = ['kosu', 'superAdmin'] as const
export type SpecialGroup = (typeof specialGroups)[number]

/**
 * Higher gives access to lower
 */
export const UserRoles = {
  AdUser: 0,
  Faculty: 1,
  University: 2,
  Admin: 3,
} as const

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles]

export type RoleName = keyof typeof UserRoles

const roleNames = Object.keys(UserRoles) as RoleName[]

export const ExtraRoles = Object.fromEntries(roleNames.map((r) => [r, []] as [RoleName, string[]])) as { [role in RoleName]: string[] }

export const nameOfRole = (role: UserRole) => Object.entries(UserRoles).filter(([, v]) => v === role)?.[0]?.[0]

export type UserAccess = {
  specialGroups?: {
    [group in SpecialGroup]?: boolean
  }
  codes: string[]
}

export const HandlerAddressParamsValidator = z.object({
  address: z.string(),
  facultyCode: z.string(),
})

export type HandlerAddressParams = z.infer<typeof HandlerAddressParamsValidator>
