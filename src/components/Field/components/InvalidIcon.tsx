import Icon from "components/Icon";
import { getIconSizeByComponentSize } from "utils/size";
import { InputSize } from "../../../types";
import WarningSign from "../../../resources/icons/warning-sign.svg";
import "./InvalidIcon.scss";

export interface InvalidIconProps {
  size: `${InputSize}`;
}

export default function InvalidIcon({
  size = InputSize.Large,
}: InvalidIconProps) {
  return (
    <Icon
      size={getIconSizeByComponentSize(size)}
      icon={<WarningSign />}
      className="rc-invalid-icon"
    />
  );
}
