import RegisterModal from "../modals/RegisterModal";
import PhoneNumber from "../modals/PhoneNumber";
import DisplayName from "../modals/DisplayName";
import BusinessManager from "../modals/BusinessManager";
import Products from "../modals/Products";

const stockModals = {
  PhoneNumberModal: "PhoneNumber",

  CreateGroup: "CreateGroup",
  BusinessManager: "BusinessManager",
  Products: "Products",
};

export const verificationMap = {
  //in order, things that should be set true
  //in our account
  // PasswordSet: "PasswordSet",
  DisplayNameSet: "DisplayNameSet",

  //if setPassword is false in DB, launch a model to setpassword
};

export const modalTypes = Object.assign(stockModals, verificationMap);

let modalComps = {};

modalComps[modalTypes.RegisterModal] = RegisterModal;

modalComps[modalTypes.PhoneNumberModal] = PhoneNumber;

modalComps[modalTypes.DisplayNameSet] = DisplayName;
modalComps[modalTypes.BusinessManager] = BusinessManager;

modalComps[modalTypes.Products] = Products;

export const modalComponents = Object.assign({}, modalComps);
