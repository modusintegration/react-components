import React, { ComponentType } from "react";
import Tooltip from "components/Tooltip";
import { Position } from "../../components/Tooltip";
import { Kind } from "../../types";

export interface WithTooltipProps {
  tooltipKind?: `${Kind}`;
  tooltipLabel?: string;
  tooltipContent?: React.ReactNode;
  tooltipPosition?: Position;
}

function withTooltip<Props>(Component: ComponentType<Props>) {
  return function WithTooltip({
    tooltipLabel,
    tooltipKind,
    tooltipPosition,
    tooltipContent,
    ...props
  }: Props & WithTooltipProps) {
    if (!tooltipLabel && !tooltipContent) {
      return <Component {...(props as Props)} />;
    }
    return (
      <Tooltip
        label={tooltipLabel}
        kind={tooltipKind}
        position={tooltipPosition}
        content={tooltipContent}
      >
        <Component {...(props as Props)} />
      </Tooltip>
    );
  };
}

export default withTooltip;
