import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from '../connection'
import { ContractRequestStatus, contractRequestStatuses } from "../../../shared/types";

class ContractRequest extends Model<
  InferAttributes<ContractRequest>,
  InferCreationAttributes<ContractRequest>
> {
  declare id: CreationOptional<number>

  declare data: object

  declare status: CreationOptional<ContractRequestStatus>

  declare userId: CreationOptional<ForeignKey<string>>

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
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
      defaultValue: "waiting",
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      }
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