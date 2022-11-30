import React from "react";
import { PhoneNumberValidationResponseType } from "../utils/types/responses";

type DetailsProps = {
  values: PhoneNumberValidationResponseType;
};

export const Details: React.FunctionComponent<DetailsProps> = ({ values }) => {
  return (
    <div>
      <h3>Results</h3>
      <div>Is Valid : {String(values.isValid)}</div>
      <div>Is Possible : {String(values.isPossible)}</div>
      <div>Phone Type : {values.phoneType}</div>
      <div>International Format : {values.internationalFormat}</div>
    </div>
  );
};
