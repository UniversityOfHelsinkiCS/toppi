export const contractRequestStatuses = ["waiting", "assigned", "checked", "handled", "rejected"] as const
export type ContractRequestStatus = typeof contractRequestStatuses[number]