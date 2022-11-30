import React from "react";

type FormProps = {
  numberOnChange: Function;
  countryOnChange: Function;
  numberValue: string;
  options: string[];
  title: string;
  onSubmit: Function;
  optionError?: string;
  numberError?: string;
  disabled: boolean;
};

export const PhoneValidationForm: React.FunctionComponent<FormProps> = ({
  numberOnChange,
  countryOnChange,
  options,
  title,
  numberValue,
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
    <form>
      <label>{title}</label>
      <select name="selector" id="selector" onChange={handleCountryChange}>
        <option value="" label="Select a Country">
          " "
        </option>
        {options.map((text, index) => (
          <option key={index} value={text}>
            {text}
          </option>
        ))}
      </select>
      <div>{<span>{optionError || " "}</span>}</div>

      <input value={numberValue} onChange={handleNumberChange} />

      <div>{<span>{numberError || " "}</span>}</div>

      <button type="submit" onClick={handleSubmit} disabled={disabled}>
        Submit
      </button>
    </form>
  );
};
