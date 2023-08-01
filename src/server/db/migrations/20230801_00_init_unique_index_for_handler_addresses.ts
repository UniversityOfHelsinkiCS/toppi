

import { Migration } from '../connection'

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addIndex('handler_addresses', {
    fields: [
      'address',
      'faculty_code',
    ],
    unique: true,
  })
}

export const down: Migration = async () => {
  // await queryInterface.removeIndex('') how?
}