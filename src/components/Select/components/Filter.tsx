import Icon from "components/Icon";
import { getIconSizeByComponentSize } from "utils/size";
import Search from "bootstrap-icons/icons/search.svg";
import { InputSize } from "../../../types";
import "./Filter.scss";

interface FilterProps {
  size: `${InputSize}`;
}

function Filter({ size }: FilterProps) {
  return (
    <Icon
      size={getIconSizeByComponentSize(size)}
      icon={<Search />}
      className="rc-select__filter"
    />
  );
}

export default Filter;
