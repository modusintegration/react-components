import React from "react";
import classnames from "classnames";
import { format as dateFormat } from "date-fns";
import Field, { Loader, Placeholder, InvalidIcon } from "components/Field";

import { WithValidationProps } from "../../hocs/withValidation";
import { BaseInput } from "../shared/types";
import { Kind, InputSize, KeyCode } from "../../types";
import Calendar from "./components/Calendar";
import CalendarIcon from "./components/CalendarIcon";
import "./DatePicker.scss";

type DateValue = Date | undefined;

interface BaseDatePickerProps extends BaseInput {
  kind?: `${Kind}`;
  size?: `${InputSize}`;
  className?: string;
  format?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  invalid?: boolean;
  pending?: boolean;
  onChange?: (date: DateValue) => void;
}

export type DatePickerProps = BaseDatePickerProps &
  Partial<WithValidationProps>;
export default React.forwardRef(function DatePicker(
  {
    kind = Kind.Primary,
    size = InputSize.Large,
    className,
    format = "MMM do yyyy, HH:mm:ss",
    placeholder,
    value,
    required,
    invalid,
    pending,
    onChange,
    ...props
  }: DatePickerProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
): JSX.Element {
  function getDateFromString(date?: string): DateValue {
    return date ? new Date(date) : undefined;
  }

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedDate, setDate] = React.useState<DateValue>(
    getDateFromString(value)
  );
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    setDate(getDateFromString(value));
  }, [value]);

  function getStringFromDate(date?: Date): string {
    if (date) {
      return dateFormat(date, format);
    }
    return "";
  }

  function enter() {
    setFocused(true);
    setOpen(true);
    inputRef.current?.focus();
  }

  function leave() {
    setFocused(false);
    setOpen(false);
  }

  function onDayClick(day: Date, selected?: boolean) {
    const newDate = selected ? undefined : day;
    setDate(newDate);
    inputRef.current?.focus();
    onChange?.(newDate);
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (!focused) {
      props.onFocus?.(e);
      enter();
    }
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!focused) {
      props.onBlur?.(e);
    }
  }

  function onFieldClick(e: React.MouseEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === inputRef.current) {
      return;
    }
    if (open) {
      leave();
    } else {
      enter();
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const { keyCode } = e;

    if (keyCode === KeyCode.Tab) {
      leave();
      return;
    }
    if (keyCode === KeyCode.Return) {
      e.preventDefault();
      if (open) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }
  }

  const inputClassName = classnames([
    "rc-datepicker",
    `rc-datepicker--${size}`,
  ]);

  const visibleValue = getStringFromDate(selectedDate);

  return (
    <Field
      kind={kind}
      className={className}
      size={size}
      required={required && selectedDate === undefined}
      invalid={invalid}
      disabled={props.disabled}
      focused={focused}
      onClick={onFieldClick}
      onClickOutside={leave}
      ref={forwardedRef}
      validation={props.validation}
    >
      {placeholder && (
        <Placeholder
          label={placeholder}
          active={!!selectedDate || focused}
          size={size}
        />
      )}
      <input
        {...props}
        className={inputClassName}
        type="text"
        ref={inputRef}
        onChange={(e) => e.preventDefault()}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        value={visibleValue}
        readOnly
      />
      {pending && <Loader size={size} />}
      {invalid && <InvalidIcon size={size} />}
      <CalendarIcon size={size} />
      {open && <Calendar selectedDate={selectedDate} onDayClick={onDayClick} />}
    </Field>
  );
});
