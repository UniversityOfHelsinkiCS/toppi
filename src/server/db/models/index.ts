import ContractRequest from "./ContractRequest";
import User from "./User";

ContractRequest.belongsTo(User)
User.hasMany(ContractRequest)

export {
  User,
  ContractRequest,
}
