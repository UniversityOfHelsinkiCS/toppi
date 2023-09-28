export const TESTER_EMAILS = (() => {
  const emails = process.env.TESTER_EMAILS
  if (!emails) {
    console.warn('No tester emails defined')
    return []
  }
  return emails.split(';').map((e) => e.trim())
})()

export const isTester = (email: string) => TESTER_EMAILS.includes(email)
