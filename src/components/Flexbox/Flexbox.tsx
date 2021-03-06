import React from "react";
import { AlignItems, JustifyContent } from "./types";

export interface FlexboxProps {
  wrap?: boolean;
  grow?: number;
  shrink?: number;
  basis?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface BaseProps {
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  flexDirection: "row" | "column";
}

export default function Flexbox({
  alignItems,
  justifyContent,
  flexDirection,
  wrap = false,
  grow,
  shrink,
  basis = "auto",
  className,
  style = {},
  children,
}: FlexboxProps & BaseProps) {
  const styles: React.CSSProperties = {
    display: "flex",
    flexDirection,
    flexWrap: wrap ? "wrap" : undefined,
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
    alignItems,
    justifyContent,
    ...style,
  };
  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
}
