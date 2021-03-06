import { Story } from "@storybook/react";
import log from "resources/log";
import TextField, { TextFieldProps } from "./TextField";

export default {
  title: "Components/TextField",
  component: TextField,
};

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "test",
  kind: "primary",
  size: "large",
  value: "test",
  disabled: false,
  className: undefined,
  placeholder: "Type something",
  required: false,
  invalid: false,
  pending: false,
  onChange: log,
  validation: {
    isRequired: false,
    isValid: true,
    messages: [
      { active: false, message: "Test" },
      { active: false, message: "Test" },
      { active: false, message: "Test" },
    ],
  },
};

export const TypePassword = Template.bind({});
TypePassword.args = {
  type: "password",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "Placeholder...",
};

export const Pending = Template.bind({});
Pending.args = {
  pending: true,
};

export const Required = Template.bind({});
Required.args = {
  required: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
  invalid: true,
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "medium",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
};
