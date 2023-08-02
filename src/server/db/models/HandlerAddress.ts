import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from '../connection'

class HandlerAddress extends Model<
  InferAttributes<HandlerAddress>,
  InferCreationAttributes<HandlerAddress>
> {
  declare id: CreationOptional<number>

  /**
   * May be IAM or email (firstname.lastname)
   */
  declare address: string

  declare facultyCode: string

  declare addedById: CreationOptional<ForeignKey<string>>

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;

  getFullAddress() {
    return `${this.address}@helsinki.fi`
  }
}

HandlerAddress.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING,
    },
    facultyCode: {
      type: DataTypes.STRING,
    },
    addedById: {
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
    tableName: 'handler_addresses',
    underscored: true,
    sequelize,
  }
)

export default HandlerAddress
