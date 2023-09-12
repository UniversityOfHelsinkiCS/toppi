const translations = {
  navbar: {
    description: '– TOOL FOR OUTSIDE TEACHERS WORKHOUR CALCULATION & CONTRACT REQUESTS',
    signin: 'Sign in',
    signout: 'Sign out',
    frontPage: 'Front page',
    contractRequests: 'Contract requests',
    handlerAddresses: 'Handler addresses',
  },
  status: {
    waiting: 'Waiting',
    handled: 'Handled',
    rejected: 'Rejected',
  },
  errors: {
    required: 'This field is required',
    mustBeBefore: 'Must be before ending date',
    mustBeAfter: 'Must be after starting date',
  },
  setStatusAction: {
    waiting: 'Mark as waiting',
    handled: 'Mark as handled',
    rejected: 'Mark as rejected',
  },
} as const

export default translations
