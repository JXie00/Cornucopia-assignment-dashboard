import { FormikProps, useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { getAvailableCountriesList } from "../utils/apis";
import { PhoneNumberValidationRequestType } from "../utils/types/requests";
import { PhoneNumberValidationResponseType } from "../utils/types/responses";

const MainPage: React.FunctionComponent<{}> = () => {
  // page navigation
  const nav = useNavigate();

  // snackbar to display information
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [availableContries, setAvailableCountries] = React.useState<string[]>(
    []
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [response, setResponse] = React.useState<
    PhoneNumberValidationResponseType
  >();

  const [enableFormikValidation, setEnableFormikValidation] = React.useState<
    boolean
  >(false);

  interface FormFormikProps extends PhoneNumberValidationRequestType {}

  const validationSchema = yup.object({
    countryName: yup.string().required("Country name is required"),
    phoneNumber: yup.string().required("Phone number is required"),
  });

  const Formik: FormikProps<FormFormikProps> = useFormik<FormFormikProps>({
    enableReinitialize: true,
    initialValues: {
      countryName: "",
      phoneNumber: "",
    },
    validationSchema,
    validateOnChange: enableFormikValidation,
    validateOnBlur: enableFormikValidation,
    onSubmit: async (values) => {
      try {
      } catch (err) {
        enqueueSnackbar("Something went wrong, Please try again later", {
          variant: "error",
          autoHideDuration: 10000,
          onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            closeSnackbar(),
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const updateFormikByName = React.useCallback(
    (name: string) => {
      return (value: string | undefined): void => {
        Formik.setFieldValue(name, value);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  React.useEffect(() => {
    const getCountryList = async () => {
      try {
        const { data } = await getAvailableCountriesList();
        setAvailableCountries(data);
      } catch (err) {
        enqueueSnackbar("Something went wrong, Please try again later", {
          variant: "error",
          autoHideDuration: 10000,
          onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            closeSnackbar(),
        });
      }
    };
    getCountryList();
  }, []);

  return (
    <div>
      <div>Hi it"s me </div>

      <div>{availableContries[0]}</div>
    </div>
  );
};

export default MainPage;
