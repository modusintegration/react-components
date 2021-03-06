import React, { forwardRef } from "react";
import classnames from "classnames";
import { format as dateFormat } from "date-fns";
import Field, { Loader, Placeholder, InvalidIcon } from "components/Field";
import { WithValidationProps, WithLabelProps } from "../../hocs";
import { BaseInput } from "../shared/types";
import { Kind, InputSize, KeyCode } from "../../types";
import Calendar from "./components/Calendar";
import CalendarIcon from "./components/CalendarIcon";
import "./DatePicker.scss";

export interface BaseDatePickerProps extends BaseInput {
  kind?: `${Kind}`;
  size?: `${InputSize}`;
  className?: string;
  format?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  invalid?: boolean;
  pending?: boolean;
  withTime: boolean;
  onChange?: (date: Date | undefined) => void;
}

export type DatePickerProps = BaseDatePickerProps &
  Partial<WithValidationProps> &
  WithLabelProps;

export default forwardRef(function DatePicker(
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
    withTime,
    onChange,
    // From hocs
    label,
    validation,
    ...props
  }: DatePickerProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
): JSX.Element {
  function getDateFromString(date?: string): Date | undefined {
    return date ? new Date(date) : undefined;
  }

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedDate, setDate] = React.useState<Date | undefined>(
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
    const date = selected ? undefined : day;

    if (date && selectedDate) {
      const hour = selectedDate.getHours();
      const minute = selectedDate.getMinutes();
      const second = selectedDate.getSeconds();
      date.setHours(hour);
      date.setMinutes(minute);
      date.setSeconds(second);
    }
    setDate(date);
    inputRef.current?.focus();
    onChange?.(date);
  }

  function onTimeChange(hour: number, minute: number, second: number) {
    if (!selectedDate) {
      return;
    }
    const date = new Date(selectedDate);
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(second);
    setDate(date);
    inputRef.current?.focus();
    onChange?.(date);
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
      required={required}
      invalid={invalid}
      disabled={props.disabled}
      focused={focused}
      onClick={onFieldClick}
      onClickOutside={leave}
      ref={forwardedRef}
      label={label}
      hasEmptyValue={selectedDate === undefined}
      validation={validation}
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
      {open && (
        <Calendar
          selectedDate={selectedDate}
          onDayClick={onDayClick}
          onTimeChange={onTimeChange}
          withTime={withTime}
        />
      )}
    </Field>
  );
});
