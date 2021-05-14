import React from "react";
import classnames from "classnames";
import "./Options.scss";
import Icon from "components/Icon";
import { InputSize } from "types";
import { getIconSizeByComponentSize } from "components/shared";
import InfoSmall from "../../../assets/icons/info-small.svg";
import CloseSmall from "../../../assets/icons/close-small.svg";
// import ScrollBox from '../ScrollBox';
// import Tooltip from '../Tooltip';

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/tabindex-no-positive */

export type OptionValue = string | number | boolean;
type OptionLabel = string | number;

export type Option = {
  value: OptionValue;
  label: OptionLabel;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
};

interface OptionProps {
  className?: string;
  size: `${InputSize}`;
  highlighted?: boolean;
  selected?: boolean;
  disabled?: boolean;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  label: OptionLabel;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

function OptionItem({
  className,
  size,
  label,
  icon,
  selected = false,
  disabled = false,
  highlighted = false,
  onClick,
}: OptionProps) {
  const optionsClassNames = classnames([
    "rc-select__option-item",
    size === InputSize.Small && "rc-select__option-item--small",
    size === InputSize.Medium && "rc-select__option-item--medium",
    size === InputSize.Large && "rc-select__option-item--large",
    selected && "rc-select__option-item--selected",
    disabled && "rc-select__option-item--disabled",
    highlighted && "rc-select__option-item--highlighted",
    className,
  ]);
  return (
    <div
      className={optionsClassNames}
      onClick={onClick}
      role="presentation"
      tabIndex={1}
    >
      {icon && (
        <Icon
          className="rc-select__option-item__icon"
          icon={icon}
          size={getIconSizeByComponentSize(size)}
        />
      )}
      <div className="rc-select__option-item__label">{label}</div>
    </div>
  );
}

interface OptionsProps {
  options: Option[];
  highlighted?: OptionValue;
  selected?: OptionValue;
  size: `${InputSize}`;
  clearable?: boolean;
  // maxHeight?: number;
  reverse?: boolean;
  onSelect: (option: Option) => void;
  onClear: () => void;
  optionsRef?: React.RefObject<HTMLDivElement>;
}

function Options({
  options,
  highlighted,
  selected,
  size,
  clearable,
  // maxHeight,
  reverse,
  onSelect,
  onClear,
  optionsRef,
}: OptionsProps) {
  const className = classnames([
    "rc-select__options-wrapper",
    reverse && "rc-select__options-wrapper--reverse",
    !reverse && "rc-select__options-wrapper--regular",
    size === InputSize.Small &&
      reverse &&
      "rc-select__options-wrapper--reverse-small",
    size === InputSize.Small &&
      !reverse &&
      "rc-select__options-wrapper--regular-small",
    size === InputSize.Medium &&
      reverse &&
      "rc-select__options-wrapper--reverse-medium",
    size === InputSize.Medium &&
      !reverse &&
      "rc-select__options-wrapper--regular-medium",
    size === InputSize.Large &&
      reverse &&
      "rc-select__options-wrapper--reverse-large",
    size === InputSize.Large &&
      !reverse &&
      "rc-select__options-wrapper--regular-large",
  ]);

  let clearOption = null;
  if (clearable && selected !== undefined) {
    clearOption = (
      <OptionItem
        onClick={onClear}
        size={size}
        label="Clear"
        icon={<CloseSmall fill="#c33" />}
        className="rc-select__option-item--clear"
      />
    );
  }

  let optionItems = null;
  if (options.length > 0) {
    optionItems = options.map((item, index) => (
      <OptionItem
        size={size}
        highlighted={item.value === highlighted}
        label={item.label}
        icon={item.icon}
        disabled={item.disabled === true}
        key={index.toString()}
        selected={selected === item.value}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSelect(item);
        }}
      />
    ));
  } else {
    optionItems = (
      <div className="rc-select__option-item--no-options__box">
        <Icon
          icon={<InfoSmall fill="#999" />}
          size={getIconSizeByComponentSize(size)}
        />
        <div className="rc-select__option-item--no-options__message">
          No options available
        </div>
      </div>
    );
  }
  return (
    <div className="rc-select__options" ref={optionsRef}>
      <div
        className={className}
        style={{ maxHeight: "100px", overflow: "auto" }}
      >
        {/* <ScrollBox
          style={{ maxHeight }}
          handleStyle={{ borderRadius: "3px" }}
          trackStyle={{
            top: "2px",
            bottom: "2px",
            right: "4px",
            width: "5px",
          }}
          showTrack={false}
        > */}
        {clearOption}
        {optionItems}
        {/* </ScrollBox> */}
      </div>
    </div>
  );
}

export default Options;