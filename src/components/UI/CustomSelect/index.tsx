import { useMemo, useState } from "react";
import Select, { SingleValue } from "react-select";

import { CustomSelectProps, OptionParams } from "./props";

export const CustomSelect = ({ options, onChange }: CustomSelectProps) => {
  const [activeOption, setActiceOption] = useState(options[0].value);

  const getValue = useMemo(() => {
    return activeOption
      ? options.find((option) => option.value === activeOption)
      : "";
  }, [activeOption, options]);

  const handleChangeSelect = (newValue: SingleValue<string | OptionParams>) => {
    setActiceOption((newValue as OptionParams).value);
    onChange(newValue);
  };

  return (
    <Select
      onChange={handleChangeSelect}
      options={options}
      value={getValue}
      classNamePrefix="custom-select"
      defaultValue={options[0].value}
    />
  );
};
