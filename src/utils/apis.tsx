import { get, post } from "./axios";
import { PhoneNumberValidationRequestType } from "./types/requests";
import { PhoneNumberValidationResponseType } from "./types/responses";

export const getAvailableCountriesList = async () => {
  const url = `${process.env.REACT_APP_SERVER_URL}/phonenumbers/availableCountries`;
  return await get<string[]>(url);
};

export const validatePhoneNumber = async (
  req: PhoneNumberValidationRequestType
) => {
  const url = `${process.env.REACT_APP_SERVER_URL}}/phonenumbers/validate`;
  return await post<PhoneNumberValidationResponseType>(url, req);
};
