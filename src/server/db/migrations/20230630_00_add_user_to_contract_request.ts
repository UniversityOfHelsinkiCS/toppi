import { DataTypes } from 'sequelize'

import { Migration } from '../connection'

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('contract_requests', 'user_id', {
    type: DataTypes.STRING,
    references: {
      model: 'users',
      key: 'id',
    },
    allowNull: true,
  })
}

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('contract_requests', 'user_id')
}
