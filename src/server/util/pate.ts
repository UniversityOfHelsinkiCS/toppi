export type Mail = {
  recipient: string
  subject: string
  text: string
}

interface Pate {
  sendMail: (mail: Mail) => Promise<void>
}

export const pateClient: Pate = {
  sendMail(mail: Mail) {
    console.log(`[Pate] sending mail ${mail.subject} to ${mail.recipient}: \n${mail.text}`)
    return new Promise((resolve) => setTimeout(resolve, 2000))
  },
}
