const translations = {
  navbar: {
    description: '– TYÖKALU ULKOPUOLISTEN TUNTIOPETTAJIEN TYÖAIKOJEN JA PALKKIOIDEN LASKEMISEEN',
  },
  status: {
    waiting: 'Odottaa',
    handled: 'Käsitelty',
    rejected: 'Hylätty',
  },
  errors: {
    required: 'Tämä kenttä on pakollinen',
    mustBeBefore: 'On oltava lopetuspäivämäärää ennen',
    mustBeAfter: 'On oltava aloituspäivämäärän jälkeen',
  },
  setStatusAction: {
    waiting: 'Merkkaa odottavaksi',
    handled: 'Merkkaa käsitellyksi',
    rejected: 'Merkkaa hylätyksi',
  },
} as const

export default translations
