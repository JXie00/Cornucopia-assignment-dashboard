import { FormikProps, useFormik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Details } from "../components/Details";
import { PhoneValidationForm } from "../components/Form";
import { getAvailableCountriesList, validatePhoneNumber } from "../utils/apis";
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

  const [validationResponse, setValidationResponse] = React.useState<
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
        setIsLoading(true);
        const { data } = await validatePhoneNumber(values);
        setValidationResponse(data);
        enqueueSnackbar("Succeed", {
          variant: "success",
          autoHideDuration: 10000,
          onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            closeSnackbar(),
        });
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
  const handleSubmission = (e: React.MouseEvent<Element, MouseEvent>) => {
    setEnableFormikValidation(true);
    return Formik.handleSubmit();
  };

  React.useEffect(() => {
    setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    getCountryList();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <PhoneValidationForm
            numberOnChange={updateFormikByName("phoneNumber")}
            countryOnChange={updateFormikByName("countryName")}
            numberValue={Formik.values.phoneNumber}
            options={availableContries}
            title={"Country"}
            onSubmit={handleSubmission}
            numberError={Formik.errors.phoneNumber}
            optionError={Formik.errors.countryName}
          />
        </div>
      )}
      {validationResponse != null && <Details values={validationResponse} />}
    </div>
  );
};

export default MainPage;
