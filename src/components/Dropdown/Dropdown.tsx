import React from "react";
import classnames from "classnames";
import useOnClickOutside from "hooks/useOnClickOutside";
import Indicator from "components/shared/Indicator";
import { BaseButton } from "components/Button";
import Overlay from "components/Overlay";
import { KeyCode } from "../../types";
import { ButtonProps } from "../Button";
import DropdownItem, { DropdownItemProps } from "./components/DropdownItem";
import "./Dropdown.scss";

function isDropdownItem(child: React.ReactNode): boolean {
  return (child as React.ReactElement).type === DropdownItem;
}

export interface DropdownProps
  extends Omit<ButtonProps, "children" | "iconPosition" | "icon"> {
  children: React.ReactNode;
}

const Dropdown = ({
  kind = "primary",
  className,
  children,
  style,
  size = "large",
  ...props
}: DropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(buttonRef, (e: MouseEvent) => {
    if (overlayRef.current?.contains(e.target as Element)) {
      return;
    }
    setOpen(false);
    buttonRef.current?.blur();
  });

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.keyCode === KeyCode.Tab) {
      setOpen(false);
    }
  }

  const buttonClassname = classnames([className]);

  return (
    <div className="rc-dropdown" style={style}>
      <BaseButton
        {...props}
        size={size}
        kind={kind}
        onKeyDown={onKeyDown}
        onClick={() => setOpen(!open)}
        className={buttonClassname}
        icon={<Indicator open={open} size={size} />}
        iconPosition="right"
        ref={buttonRef}
      />
      {open && (
        <Overlay ref={overlayRef} className="rc-dropdown__overlay" withinWidth>
          <div className="rc-dropdown__overlay-content">
            {React.Children.toArray(children)
              .filter(isDropdownItem)
              .map((child) => child as React.ReactElement<DropdownItemProps>)
              .map((child) =>
                React.cloneElement(child, {
                  ...child.props,
                  onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                    child.props.onClick?.(e);
                    setOpen(false);
                  },
                  kind,
                  size,
                })
              )}
          </div>
        </Overlay>
      )}
    </div>
  );
};

Dropdown.Item = DropdownItem;
export default Dropdown;
