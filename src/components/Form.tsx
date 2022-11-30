import React from "react";
import classes from "./Form.module.css";

type FormProps = {
  numberOnChange: Function;
  countryOnChange: Function;
  numberValue: string;
  countryNameValue: string;
  options: string[];
  onSubmit: Function;
  optionError?: string;
  numberError?: string;
  disabled: boolean;
};

export const PhoneValidationForm: React.FunctionComponent<FormProps> = ({
  numberOnChange,
  countryOnChange,
  options,
  numberValue,
  countryNameValue,
  onSubmit,
  optionError,
  numberError,
  disabled,
}) => {
  const handleNumberChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    numberOnChange(event.target.value);
  };

  const handleCountryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    countryOnChange(event.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <div>
      <form className={classes.form}>
        <label>Country</label>
        <select
          className={classes.element}
          name="selector"
          id="selector"
          value={countryNameValue}
          onChange={handleCountryChange}
        >
          <option value="" label=""></option>
          {options.map((text, index) => (
            <option key={index} value={text}>
              {text}
            </option>
          ))}
        </select>

        <div className={classes.warning}>{optionError || " "}</div>

        <label>Phone Number</label>
        <input
          className={classes.element}
          value={numberValue}
          onChange={handleNumberChange}
        />

        <div className={classes.warning}>{numberError || " "}</div>

        <button type="submit" onClick={handleSubmit} disabled={disabled}>
          Submit
        </button>
      </form>
    </div>
  );
};
