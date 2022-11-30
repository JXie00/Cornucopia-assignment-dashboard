import React from "react";
import { PhoneNumberValidationResponseType } from "../utils/types/responses";
import { CSVLink, CSVDownload } from "react-csv";

type DetailsProps = {
  values: PhoneNumberValidationResponseType;
};

export const Details: React.FunctionComponent<DetailsProps> = ({ values }) => {
  const buildCsvData = () => {
    return [Object.keys(values), Object.values(values)];
  };

  return (
    <div>
      <h3>Results</h3>
      <div>Is Valid : {String(values.isValid)}</div>
      <div>Is Possible : {String(values.isPossible)}</div>
      <div>Phone Type : {values.phoneType}</div>
      <div>International Format : {values.internationalFormat}</div>
      <CSVLink data={buildCsvData()}>Download me</CSVLink>
    </div>
  );
};
