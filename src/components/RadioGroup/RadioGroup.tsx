import React, { ChangeEvent } from "react";
import classnames from "classnames";
import { Kind } from "../../types";
import Radio, { RadioProps } from "./Radio";
import withLabel, { WithLabelProps } from "../../hocs/withLabel";
import "./RadioGroup.scss";

type Option = Pick<RadioProps, "label" | "value" | "disabled" | "id" | "kind">;

export interface BaseRadioGroupProps {
  kind?: `${Kind}`;
  id?: string;
  name?: string;
  selected?: string;
  disabled?: boolean;
  options: Option[];
  vertical?: boolean;
  onChange: (value: string) => void;
}
export type RadioGroupProps = BaseRadioGroupProps & WithLabelProps;

function RadioGroup({
  kind,
  id,
  name,
  disabled,
  selected,
  options,
  vertical,
  onChange,
}: RadioGroupProps) {
  const [selectedOption, setSelected] = React.useState(selected);
  React.useEffect(() => {
    setSelected(selected);
  }, [selected]);
  const compositeOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    onChange?.(e.target.value);
  };
  const classNames = classnames([
    "rc-radiogroup",
    vertical && "rc-radiogroup--vertical",
  ]);
  return (
    <div className={classNames} id={id}>
      <div className="rc-radiogroup__inputs">
        {options.map((option: Option, index: number) => (
          <Radio
            kind={option.kind || kind}
            key={index.toString()}
            id={id}
            onChange={compositeOnChange}
            name={name}
            checked={selectedOption === option.value}
            label={option.label}
            value={option.value}
            disabled={option.disabled || disabled}
            vertical={vertical}
          />
        ))}
      </div>
    </div>
  );
}

export default withLabel(RadioGroup);
