import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { sequelize } from '../connection'
import { ContractRequestParams, ContractRequestStatus, contractRequestStatuses } from '../../../shared/types'

class ContractRequest extends Model<InferAttributes<ContractRequest>, InferCreationAttributes<ContractRequest>> {
  declare id: CreationOptional<number>

  declare data: ContractRequestParams

  declare status: CreationOptional<ContractRequestStatus>

  declare userId: CreationOptional<ForeignKey<string>>

  declare isTest: CreationOptional<boolean>

  declare createdAt: CreationOptional<Date>

  declare updatedAt: CreationOptional<Date>
}

ContractRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: contractRequestStatuses,
      defaultValue: 'waiting',
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    isTest: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    underscored: true,
    sequelize,
  }
)

export default ContractRequest
