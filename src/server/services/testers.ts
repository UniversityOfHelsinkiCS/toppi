export const TESTER_EMAILS = (() => {
  const emails = process.env.TESTER_EMAILS
  const testerEmails = emails?.split(';').map((e) => e.trim())
  if (!testerEmails?.length) {
    console.warn('No tester emails defined. Set TESTER_EMAILS env variable to a semicolon-separated list of emails')
    return []
  }
  console.log(`Tester emails: ${testerEmails.join(', ')}`)
  return testerEmails
})()

export const isTester = (email: string) => TESTER_EMAILS.includes(email)
