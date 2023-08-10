import ContractRequest from './ContractRequest'
import HandlerAddress from './HandlerAddress'
import User from './User'

ContractRequest.belongsTo(User)
User.hasMany(ContractRequest)

HandlerAddress.belongsTo(User, {
  foreignKey: 'addedById',
})

export { User, ContractRequest, HandlerAddress }
