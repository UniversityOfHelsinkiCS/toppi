import { DataTypes } from 'sequelize'

import { Migration } from '../connection'
import { contractRequestStatuses } from '../../../shared/types'

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable("contract_requests", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    form_data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: "waiting",
      values: contractRequestStatuses,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  })
}

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("contract_requests")
}