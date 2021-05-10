import React from "react";
import TextField from "./TextField";

export default {
  title: "TextField",
};

/* eslint-disable no-console */

export const TextFieldNoState = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      setTimeout(() => ref.current?.focus(), 100);
    }
  }, [ref.current]);

  return <TextField pending ref={ref} required onFocus={console.log} />;
};

export const TextFieldValue = () => {
  const [value, setValue] = React.useState("test");
  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
    />
  );
};
