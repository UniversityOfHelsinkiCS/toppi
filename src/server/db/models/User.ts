import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { sequelize } from '../connection'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>

  declare firstName: string

  declare lastName: string

  declare email: string

  declare createdAt: CreationOptional<Date>

  declare updatedAt: CreationOptional<Date>

  toPublic() {
    return {
      id: this.dataValues.id,
      createdAt: this.dataValues.createdAt,
      updatedAt: this.dataValues.updatedAt,
    }
  }
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
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

export default User
