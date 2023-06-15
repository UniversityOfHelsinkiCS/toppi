import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from '../connection'

export const contractRequestStatuses = ["waiting", "assigned", "checked", "handled", "rejected"] as const
export type ContractRequestStatus = typeof contractRequestStatuses[number]

class ContractRequest extends Model<
  InferAttributes<ContractRequest>,
  InferCreationAttributes<ContractRequest>
> {
  declare id: CreationOptional<number>

  declare formData: object

  declare status: CreationOptional<ContractRequestStatus>

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;

  toPublic() {
    return {
      id: this.dataValues.id,
      status: this.dataValues.status,
      createdAt: this.dataValues.createdAt,
      updatedAt: this.dataValues.updatedAt,
    }
  }
}

ContractRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    formData: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: contractRequestStatuses,
      defaultValue: "waiting",
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  },
  {
    underscored: true,
    sequelize,
  }
)

export default ContractRequest