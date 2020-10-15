import RegisterModal from "../modals/RegisterModal";
import PhoneNumber from "../modals/PhoneNumber";
export const modalTypes = {
  RegisterModal: "RegisterModal",
  PhoneNumberModal: "PhoneNumber",
};

let modalComps = {};

modalComps[modalTypes.RegisterModal] = RegisterModal;

modalComps[modalTypes.PhoneNumberModal] = PhoneNumber;

export const modalComponents = Object.assign({}, modalComps);
